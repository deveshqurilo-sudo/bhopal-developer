# Landmark builders and developers. — Next.js

Responsive TypeScript / Next.js App Router recreation of the supplied [reference](https://plot-zen-living.lovable.app/#home). The original typography, colors, section order, spacing, responsive breakpoints, and content placeholders are retained. The reference's eight unique content images are hosted locally and mapped to their matching sections.

## Run locally

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Use `npm run lint`, `npm run typecheck`, and `npm run build` for validation. The production static website is generated in `out/`; serve that folder using any static web server. `next start` is not compatible with static exports.

## Replace images and content

- Put your images in `public/images/`.
- Edit `siteImages` in `src/config/site.ts` to set a different image for each section. URLs start with `/images/`, without `/public`.
- Original reference images are in `public/images/reference/`; replace individual files or update the corresponding `siteImages` paths.
- Update company/contact details and legal links in `src/config/site.ts`.
- The contact QR card uses `siteConfig.nextDealUrl` for both the QR and website links. Its PNG is generated at build time with a white quiet zone; changing the URL requires a rebuild. No external QR service or client-side QR library is used.
- Update projects, gallery captions, locations, and stats in `src/features/home/data/content.ts`.
- Fonts and images are served locally. Your existing uploaded photos and the old dummy file are preserved; reference assets are kept in their own directory.
- Reference images are unchanged downloads of the source JPEGs: hero/farmhouse 1920×1088, project/development photos 1200×912, map 1200×1200, and entrance/road 1024×1280. The inspected page, gallery code, and stylesheet expose no higher-resolution alternatives. Source URLs, dimensions, sizes, and hashes are recorded in `docs/reference-images.json`.

## Structure

```text
src/app/                   App Router, metadata, global theme, fonts
src/components/layout/     Header, footer, branding, contact navigation
src/components/ui/         Shared section and button components
src/features/home/         Homepage sections, forms, gallery, typed content
src/config/site.ts         Image slots, business details, navigation
```

## Project details

Each homepage project card opens a statically generated route at `/projects/<slug>`. The three routes are Shiv Shakti Dham, Royal Green Park, and Palm Springs. The pages include an image carousel and fullscreen view, project summary, highlights, features, brochure download, and a site-visit form. The form is a UI demo and clearly states that requests are not sent until a CRM/API is connected.

Projects and slugs are defined in `src/features/home/data/content.ts`. Their gallery, highlights, features, and matching local PDF are defined in `src/features/projects/data/project-details.ts`. The images currently come from the reference asset set and are marked as illustrative on the detail pages; replace them with verified photos for each project before presenting them as actual site photography. Sizes, pricing, approvals, and availability are shown as available on request until confirmed.

Static content uses Server Components. Only the header, forms, gallery, and video player hydrate on the client. The gallery uses a native modal dialog with focus containment, focus return, Escape, previous/next buttons, and arrow-key navigation. Motion respects reduced-motion settings. The light theme intentionally follows the supplied design.

## Video walkthrough and PDF brochure

The **A closer look** section appears immediately after the project cards (`#project-media`). Configure `siteMedia` in `src/config/site.ts`:

| Setting                          | What to paste                                                            |
| -------------------------------- | ------------------------------------------------------------------------ |
| `video.src`                      | Direct public HTTPS URL of a web-optimized MP4 (H.264 video / AAC audio) |
| `video.poster`                   | A small local image path or public HTTPS thumbnail URL                   |
| `video.durationLabel`            | Optional real runtime, such as `02:30`                                   |
| `video.captions`                 | Real WebVTT caption tracks for speech; keep files in `public/captions/`  |
| `brochure.documents`             | List of PDFs displayed in the brochure card                              |
| `brochure.documents[].fileName`  | Exact filename in `public/pdf/`, including spaces and extension          |
| `brochure.documents[].title`     | Display name for the brochure                                            |
| `brochure.documents[].sizeLabel` | Actual file size shown before download                                   |

Use Cloudinary's asset delivery/secure URL, not its dashboard URL. URLs from another HTTPS file host also work. Rebuild/redeploy after configuration changes on a static production host. An empty video URL or brochure document list shows an intentional coming-soon state. HTTP, invalid, executable, and credential-containing media URLs are rejected.

The player is mounted only after Play is clicked, so the initial page does not request the large video. It includes native playback, seek, volume/fullscreen controls where supported, inline mobile playback, and load-error recovery. Playback is requested only after user interaction; if the browser blocks it, native Play remains available. This is a progressive video player, **not** an HLS/DASH player: do not paste `.m3u8`, `.mpd`, YouTube share links, or MOV originals. For longer films, an adaptive player can be added later.

The brochure card lists all three configured PDFs from `public/pdf/`, with individual names, sizes, and Download buttons. Filenames are URL-encoded, so spaces work correctly. Same-origin links use the HTML `download` attribute and preserve the original filenames. PDFs are public, require no sign-in, and are not fetched until clicked; no iframe, client-side PDF library, or Cloudinary upload is required. The static build copies these files into `out/pdf/`. When adding or replacing a file, update the configuration and rebuild before deployment.

### Large Cloudinary uploads

As checked on September 25, 2026, Cloudinary's published plan limits are:

| Asset limit    | Free   | Plus  | Advanced |
| -------------- | ------ | ----- | -------- |
| Video          | 100 MB | 2 GB  | 4 GB     |
| Image/raw file | 10 MB  | 20 MB | 40 MB    |

Check your actual account's limits before uploading. A 250–300 MB video exceeds Free; compress before uploading or use an appropriate account. A 250–300 MB PDF exceeds these standard image/raw limits even on Plus/Advanced. Compress it, request a suitable custom limit, or host it on separate file storage. Renaming the file or uploading in chunks does not bypass account limits.

For API uploads over 100 MB, use chunked upload. The Cloudinary Media Library and Upload Widget handle chunking automatically. Uploading originals is an owner/admin operation; no upload credentials or API secrets belong in `site.ts` or the public website. No account upgrade, upload, or purchase is performed by this implementation.

PDFs normally use Cloudinary's image resource type; raw is also available, including for password-protected files, but does not support image transformations. Free accounts block PDF delivery by default: enable the relevant PDF/ZIP delivery setting when using public PDFs. Generate and verify optimized video renditions before publishing, rather than relying on first-visitor processing of a large original.

Sources: [plan limits](https://cloudinary.com/pricing/compare-plans), [large uploads](https://cloudinary.com/documentation/upload_images#chunked_asset_upload), [PDF delivery](https://cloudinary.com/documentation/paged_and_layered_media).

After adding your real URLs, verify playback/seek on iOS Safari and Android Chrome, caption availability, video failure recovery, PDF access while signed out, and original file download. In DevTools, confirm no video/PDF requests before clicking their actions. The video still needs its real URL before playback can be verified; brochure links and exported files can be checked locally.

## Forms and production integration

Forms validate input but do **not** transmit or store leads; the completion state explicitly identifies this as a demo. The original reference also has no working lead backend. No personal data is logged or stored in localStorage.

Before launching, connect `EnquiryForm` to your API/CRM, add server-side validation, rate limits, bot protection, and your actual privacy/terms pages. Remove `output: "export"` if using Next.js server routes, or retain static hosting and use a separate HTTPS API. Use real contact numbers in the central configuration.

For performance, export replacement images as appropriately sized WebP/AVIF. Static mode uses unoptimized Next Image with explicit geometry and native lazy loading; use an image CDN loader when responsive image transformations are needed. Use a maintained Node LTS runtime in production and `npm ci` for reproducible installs.

Recommended browser acceptance checks: compare against the reference at 1440px, 768px, and 390px; check no horizontal scrolling; verify sticky navigation and section anchors, mobile menu, keyboard gallery navigation and focus return, required/invalid form fields, phone/WhatsApp links after configuring real numbers, and reduced motion. Browser screenshot comparison was not available in this environment.
