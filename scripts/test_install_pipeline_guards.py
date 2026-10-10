import importlib.util
import unittest
from pathlib import Path

spec = importlib.util.spec_from_file_location(
    'pipeline_job_command',
    Path(__file__).with_name('pipeline_job_command.py'),
)
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


class JobFilesTests(unittest.TestCase):
    def test_parse_job_files_splits_comma_joined_paths(self):
        raw = 'content-loops/agents/02-topic-strategist.md,bask-seo-autocomplete-research.md'
        self.assertEqual(
            module.parse_job_files(raw),
            [
                'content-loops/agents/02-topic-strategist.md',
                'bask-seo-autocomplete-research.md',
            ],
        )

    def test_opencode_file_flags_use_separate_file_arguments(self):
        raw = 'a.md,b.md'
        self.assertEqual(module.opencode_file_flags(raw), ['--file', 'a.md', '--file', 'b.md'])

    def test_build_opencode_run_command_includes_all_files(self):
        argv = module.build_opencode_run_command(
            {
                'agent': 'build',
                'model': 'openai/gpt-5.6-terra',
                'variant': 'high',
                'files': 'one.md,two.md',
                'prompt': 'do work',
            },
            opencode_bin='/bin/opencode',
        )
        self.assertEqual(
            argv,
            [
                '/bin/opencode',
                'run',
                '--agent',
                'build',
                '--model',
                'openai/gpt-5.6-terra',
                '--variant',
                'high',
                '--file',
                'one.md',
                '--file',
                'two.md',
                '--',
                'do work',
            ],
        )


if __name__ == '__main__':
    unittest.main()
