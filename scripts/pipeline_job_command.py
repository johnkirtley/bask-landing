"""Build opencode argv fragments for scheduled content-pipeline jobs."""
from __future__ import annotations


def parse_job_files(files: str | None) -> list[str]:
    """Split a job spec ``files`` field into separate repo-relative paths."""
    if not files or not str(files).strip():
        return []
    return [part.strip() for part in str(files).split(',') if part.strip()]


def opencode_file_flags(files: str | None) -> list[str]:
    """Return alternating ``--file`` flags and paths for opencode run."""
    flags: list[str] = []
    for path in parse_job_files(files):
        flags.extend(['--file', path])
    return flags


def build_opencode_run_command(
    spec: dict,
    opencode_bin: str = '/root/.opencode/bin/opencode',
) -> list[str]:
    """Assemble the guarded opencode ``run`` argv from a repository job spec."""
    command = [
        opencode_bin,
        'run',
        '--agent',
        spec.get('agent', 'build'),
        '--model',
        spec['model'],
        '--variant',
        spec.get('variant', 'high'),
    ]
    command.extend(opencode_file_flags(spec.get('files')))
    command.extend(['--', spec['prompt']])
    return command
