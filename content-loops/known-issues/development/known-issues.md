# Development Known Issues — Running Ledger

Source of truth for build/deploy gotchas that have broken (or nearly broken) a
deployment. **Scan this file before opening any PR** and apply the Pre-PR checklist
below so we don't repeat a failed Vercel build. Add an entry whenever a new
build/deploy issue is discovered.

| ID      | Category    | Symptom / Error                                                                                                                       | Root cause                                                                                                                                                                                                                  | Fix / Prevention                                                                                                                           | First hit  | Status           |
| ------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------- | ---------------- |
| DEV-001 | MDX / build | `astro build` fails with `[@mdx-js/rollup] Unexpected character '2' (U+0032) before name, expected a character that can start a name` | MDX v3 (`@astrojs/mdx` v4) treats `<` as the start of a JSX/HTML tag. A bare `<` immediately followed by a digit or space (e.g. `(<20 ng/mL)`) is read as an illegal tag name and aborts the build at the first occurrence. | Escape as `&lt;` (renders identically as `<`) or write it out ("less than 20"). Never use a bare `<` before a digit/space in `.mdx` prose. | 2026-06-20 | RESOLVED (PR #7) |

## Pre-PR checklist (run before every PR)

- [ ] **Build passes locally:** `npm run build` exits 0. This catches almost everything below.
- [ ] **MDX angle brackets:** In `.mdx` prose, escape bare `<` / `>` as `&lt;` / `&gt;` (or rewrite as "less than" / "greater than"). Valid lowercase HTML tags like `<td>`, `<tr>`, `<br />` are fine — the problem is `<` followed by a digit or space.
  - Quick scan: search `.mdx` files for `<` followed by a digit or space, e.g. `rg '<(?=[0-9 ])' src/content` — every hit must be intentional markup, not prose.
- [ ] **Required frontmatter resolves:** every post has the fields the schema requires (e.g. `heroImage` points at a real file under `_images/`), per `src/content.config.ts`.
- [ ] **Component imports resolve:** any `import` at the top of an `.mdx` file points to an existing component (e.g. `src/components/mdx/Callout.astro`).
- [ ] **No new env-var assumptions at build time** unless the variable is set in Vercel (see `src/pages/leaderboard.astro` for the safe `??` fallback pattern).

## How to add an entry

1. Add a row to the table with the next `DEV-NNN` id.
2. Capture the exact error string (copy from the Vercel/`astro build` log) so it's greppable.
3. State the root cause and the concrete fix/prevention — prefer a rule that can be checked mechanically (a search pattern, a build command, a schema field).
4. If the fix implies a recurring check, add it to the Pre-PR checklist above.
5. Set Status to `RESOLVED (PR #N)` once shipped, or `OPEN` if still a live trap.
