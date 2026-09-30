#!/usr/bin/env python3
"""Reject content commits that hide drafts behind an invalid workflow status."""
import subprocess
import sys

ALLOWED = {'DRAFT', 'NEEDS REVIEW', 'READY TO PUBLISH', 'PUBLISHED'}

def valid_status(text):
    first = text.splitlines()[0] if text.splitlines() else ''
    return first.startswith('Status: ') and first.removeprefix('Status: ') in ALLOWED

def validate(ref='HEAD'):
    paths = subprocess.check_output(['git', 'ls-tree', '-r', '--name-only', ref, '--', 'content-loops/posts'], text=True).splitlines()
    errors = []
    for path in paths:
        if not path.endswith('.md'):
            continue
        source = subprocess.check_output(['git', 'show', f'{ref}:{path}'], text=True)
        if not valid_status(source):
            errors.append(f'{path}: invalid article status. Use NEEDS REVIEW for a blocked article; failed is a run outcome only.')
    for error in errors:
        print(error, file=sys.stderr)
    return 1 if errors else 0

if __name__ == '__main__':
    sys.exit(validate(sys.argv[1] if len(sys.argv) > 1 else 'HEAD'))
