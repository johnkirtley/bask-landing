# Fix: Vercel deploys broken by scheduler publishing posts with empty heroImage

## Diagnosis
- Build fails at `src/pages/blog/index.astro:70` because `best-uv-index-for-tanning.mdx`
  has `heroImage: ""` (line 5). Astro's `image()` schema rejects empty strings.
- The other 9 posts all use `heroImage: ./_images/hero-placeholder.png`.
- Root cause: the `bask-publisher` scheduled job (mimo-v2.5) ignored its own template
  (`content-loops/agents/05-publisher.md:105` says to set the placeholder) and skipped
  its `npm run build` verification step before pushing.

## Fix 1 — unblock the deploy (required)
File: `src/content/blog/best-uv-index-for-tanning.mdx` line 5
```diff
-heroImage: ""
+heroImage: ./_images/hero-placeholder.png
```

## Fix 2 — make the build scheduler-proof (the chosen approach)
Default every post to the existing placeholder image when `heroImage` is missing/empty,
so future scheduler slip-ups can never break Vercel again. BlogPost.astro is left
unchanged — it always receives a real `ImageMetadata`.

### 2a. `src/content.config.ts`
Make `heroImage` optional:
```diff
-      heroImage: image(),
+      heroImage: image().optional(),
```

### 2b. `src/pages/blog/index.astro`
Import the placeholder once and fall back to it per post.

Frontmatter — add after line 4 (Layout import):
```ts
import placeholderHero from '../../content/blog/_images/hero-placeholder.png';
```
Inside the `posts.map` callback (line 58), before `return (`:
```ts
const heroImage = post.data.heroImage ?? placeholderHero;
```
Line 71 — change `src={post.data.heroImage}` → `src={heroImage}`.

### 2c. `src/pages/blog/[...slug].astro`
Same fallback before passing to `<BlogPost>`.

Frontmatter — add after line 6:
```ts
import placeholderHero from '../../content/blog/_images/hero-placeholder.png';
```
After line 16 (`const { post } = Astro.props;`), add:
```ts
const heroImage = post.data.heroImage ?? placeholderHero;
```
Line 24 — change `heroImage={post.data.heroImage}` → `heroImage={heroImage}`.

(BlogPost.astro is untouched: it still requires `heroImage: ImageMetadata` and always
receives one.)

## Verify
- `npm run build` passes locally.
- Commit message: `fix(blog): default missing heroImage to placeholder; fix tanning post deploy`
- `git push origin main` → Vercel redeploys clean.

## Not in scope (per user)
- No changes to the publisher scheduler prompt or model this pass.
- The placeholder fallback in code is the safety net.
