import importlib.util
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

spec = importlib.util.spec_from_file_location('guard', Path(__file__).with_name('pipeline-guard.py'))
guard = importlib.util.module_from_spec(spec)
spec.loader.exec_module(guard)

class Child:
    def __init__(self, text, code=0):
        self.stdout = text.splitlines(keepends=True)
        self.code = code

    def wait(self):
        return self.code

class OutcomeTests(unittest.TestCase):
    def outcome(self, text, pending=None, changed=False, new=False, live_errors=None):
        with tempfile.TemporaryDirectory() as directory:
            state = Path(directory)
            calls = 0
            def git(*args):
                nonlocal calls
                if args == ('config', '--global', '--get', 'user.name'):
                    return 'Owner'
                if args == ('config', '--global', '--get', 'user.email'):
                    return 'owner@example.com'
                if args == ('rev-parse', 'HEAD'):
                    calls += 1
                    return 'after' if changed and calls > 1 else 'before'
                if args == ('rev-parse', 'origin/main'):
                    return 'after' if changed else 'before'
                return ''
            publications = [{}, {'test-post': 'Test post'}] if new else [{}, {}]
            with patch.object(guard, 'STATE', state), patch.object(guard, 'git', side_effect=git), \
                 patch.object(guard, 'pending', return_value=pending or []), \
                 patch.object(guard, 'published', side_effect=publications), \
                 patch.object(guard.subprocess, 'Popen', return_value=Child(text)), \
                 patch.object(guard, 'live', return_value=live_errors or []):
                return guard.run('test-review', ['fake-agent'])

    def test_scheduled_commands_cannot_request_interactive_approval(self):
        self.assertEqual(self.outcome('Status: skipped\n'), 0)
        permission = guard.json.loads(guard.os.environ['OPENCODE_PERMISSION'])
        self.assertEqual(permission['task'], 'deny')
        self.assertEqual(permission['question'], 'deny')
        self.assertEqual(permission['bash']['*'], 'deny')
        self.assertEqual(permission['bash']['rtk git *'], 'allow')

    def test_completed_empty_queue_can_skip(self):
        self.assertEqual(self.outcome('Status: skipped\nReason: empty queue\n'), 0)

    def test_zero_exit_does_not_hide_reported_failure(self):
        self.assertEqual(self.outcome('Status: **failed**\nReason: lock rejected\n'), 1)

    def test_step_exhaustion_is_failure(self):
        self.assertEqual(self.outcome('Maximum steps for this agent have been reached.\nStatus: success\n'), 1)

    def test_pending_work_cannot_skip(self):
        self.assertEqual(self.outcome('Status: skipped\n', pending=['blocked']), 1)

    def test_pending_work_requires_committed_progress(self):
        self.assertEqual(self.outcome('Status: success\n', pending=['blocked']), 1)

    def test_completed_review_requires_push_and_contract(self):
        self.assertEqual(self.outcome('**Status:** success\n', pending=['blocked'], changed=True), 0)
        self.assertEqual(self.outcome('All done\n', changed=True), 1)

    def test_missing_live_article_fails_publication(self):
        self.assertEqual(self.outcome('Status: success\n', changed=True, new=True,
                                      live_errors=['production returned 404']), 1)

class LiveTests(unittest.TestCase):
    def verify(self, heading='Expected title', indexed=True):
        base = guard.SITE[guard.ROOT.name]
        class Response:
            status = 200
            def __init__(self, request):
                self.url = request.full_url
            def __enter__(self):
                return self
            def __exit__(self, *args):
                pass
            def read(self):
                if 'sitemap' in self.url:
                    location = base + '/blog/example' if indexed else base + '/blog/other'
                    if self.url.endswith('sitemap-index.xml'):
                        return ('<sitemapindex><sitemap><loc>' + base + '/sitemap-0.xml</loc></sitemap></sitemapindex>').encode()
                    return ('<urlset><url><loc>' + location + '</loc></url></urlset>').encode()
                return ('<html><h1>' + heading + '</h1></html>').encode()
        with patch.object(guard.urllib.request, 'urlopen', side_effect=lambda request, **kwargs: Response(request)):
            return guard.live({'example': 'Expected title'})

    def test_correct_title_and_sitemap_pass(self):
        self.assertEqual(self.verify(), [])

    def test_soft_404_does_not_pass(self):
        self.assertTrue(self.verify(heading='Page not found'))

    def test_article_missing_from_sitemap_fails(self):
        self.assertTrue(self.verify(indexed=False))

class SourceStatusTests(unittest.TestCase):
    def test_run_outcomes_cannot_be_article_statuses(self):
        spec = importlib.util.spec_from_file_location('source_status', Path(__file__).with_name('validate-source-status.py'))
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        for status in ['DRAFT', 'NEEDS REVIEW', 'READY TO PUBLISH', 'PUBLISHED']:
            self.assertTrue(module.valid_status('Status: ' + status + '\n# Article'))
        for status in ['failed', 'success', 'skipped', '']:
            self.assertFalse(module.valid_status('Status: ' + status + '\n# Article'))

if __name__ == '__main__':
    unittest.main()
