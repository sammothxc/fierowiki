# Wiki.js → MkDocs migration checklist

Not published to the site (lives outside `docs/`). Delete once everything is ticked.

## Done on the `mkdocs-migration` branch

- [x] Move site content into `docs/` (`home.md` → `docs/index.md`)
- [x] Rename archive notice pages to `*-notice.md` so they don't overwrite each archive's own `index.html`
- [x] Strip Wiki.js front matter (keep `title` / `description`)
- [x] Convert Wiki.js callouts (`> … {.is-warning}`) to Material admonitions
- [x] Convert inline-styled `<a>` buttons to `{ .md-button }` links
- [x] Convert Wiki.js image sizing (`=600x`) to `{ width="600" }`
- [x] Rewrite root-absolute links (`/copyright`) to relative `.md` links so MkDocs can validate them
- [x] Point `/contact` and `/about` links at the home page's Contributing / What Is FieroWiki sections
- [x] Point the `/LICENSE` link at `LICENSE.md` on GitHub
- [x] Make relative file-server links (`/api/public/dl/…`) absolute (`https://fierowiki.samwarr.dev/api/public/dl/…`) so they keep working until the files move
- [x] Rewrite `resources/3d-files.html` as Markdown with a CSS card grid (`docs/stylesheets/extra.css`)
- [x] Remove Wiki.js-only features (tags, comments, "powered by Wiki.js") from the home page and README
- [x] Fix README links for the new `docs/` paths
- [x] `mkdocs.yml`, pinned `requirements.txt`, and a GitHub Pages workflow (`.github/workflows/deploy.yml`) that runs `mkdocs build --strict` on PRs and deploys on `main`

## Before switching DNS (blocking)

- [ ] **Re-host the 100 files on the file server (FieroFile).** Every download, 3D viewer, part thumbnail, manual PDF and archive zip points at `https://fierowiki.samwarr.dev/api/public/dl/EvpPN0OJ/…`. Pointing the domain at GitHub Pages breaks all of them. Options:
  - archive.org item(s): free and permanent, and fits a preservation project. Big PDFs are fine.
  - GitHub Releases on this repo: up to 2 GB per file. Fine for the 3D files and PDFs.
  - Cloudflare R2 (free egress) on something like `files.samwarr.dev`
  - Or keep the current file server running on a different subdomain for now
  
  Once the files are re-hosted, swap the base URL across the repo. The 3D viewer iframes have the URL percent-encoded (`https%3A%2F%2Ffierowiki.samwarr.dev%2Fapi%2Fpublic%2Fdl%2F`), so replace that form too. Pages that reference the file server: `docs/index.md`, `docs/archived-websites/*-notice.md`, `docs/resources/{manuals,history,3d-files}.md`, `docs/resources/3d-files/*.md`, plus 13 HTML pages inside the archives (fierosails `fierosails_docs/*.pdf` links, and others).
- [ ] Check that viewstl.com can fetch STLs from the new host (needs CORS allowed). If it can't, consider self-hosting the viewer, e.g. `<model-viewer>` with GLB files.
- [ ] Update the "Files and Downloads" section in `docs/index.md` and `README.md`, which still describes FieroFile and the `/api/public/dl/` base URL.
- [ ] Enable Pages in the repo: Settings → Pages → Source: **GitHub Actions**.
- [ ] Merge to `main`, confirm the deploy works at `https://sammothxc.github.io/fierowiki/`, then set the custom domain `fierowiki.samwarr.dev` in Settings → Pages and update DNS (CNAME → `sammothxc.github.io`). Tick "Enforce HTTPS".
  - Note: the archived HTML and `site.webmanifest` use a few root-absolute paths, so the `github.io/fierowiki/` preview will have some broken links. They work once the custom domain serves the site at `/`.

## Content / policy (your wording)

- [ ] `docs/data-privacy.md` and `docs/terms-of-use.md` still describe comments, Akismet spam filtering and self-hosted servers. Rewrite for a static site on GitHub Pages: no comments, no cookies from FieroWiki itself, and GitHub's privacy statement covers hosting logs.
- [ ] Decide on a contact method. Wiki.js `/contact` links now go to the home page's Contributing section. A real `docs/contact.md` would be cleaner.
- [ ] The "Contributing" text could invite GitHub issues/PRs now that the repo is the only editing path. The header also has an "edit this page" pencil via `edit_uri`.
- [ ] `docs/copyright.md` says the license is at `fierowiki.samwarr.dev/LICENSE`. It now links to GitHub, so reword if needed.
- [ ] Stub pages ("Coming soon"): `quick-resources/{error-codes,rpo-codes,troubleshooting}.md` and `resources/photos.md`. Fill them in, or drop them from `nav` in `mkdocs.yml` since the wiki is effectively frozen.
- [ ] `docs/fiero-sam.md` is a log for a car you no longer own. Maybe add a closing note, or move it under an "About" section.
- [ ] The 3D Files grid lists two "coming soon" parts (Airbox Lid, Front Speaker Cover) with no pages. Keep or remove them.

## Archived sites

- [ ] The archived HTML has ~1,340 local links that don't resolve (some were probably broken under Wiki.js too):
  - 477 are `foo.htm` links where `foo.html` exists. They can be fixed mechanically if you're OK with that edit to the "as-is" mirror.
  - The rest are missing images/pages from the original crawl.
  
  To regenerate the report, build the site and check every local `href`/`src` under `site/archived-websites/`.
- [ ] The archived HTML files still start with a Wiki.js `<!-- title: … -->` comment and have no `<!doctype html>`/`<meta charset>`, so they render in quirks mode. That's probably fine for 2000s-era pages, but check a few in the browser.
- [ ] "In progress" archive (Driven Visions) and the watchlist on `docs/archived-websites.md`: finish them or mark as not planned.

## Redirects (optional)

- [ ] Old Wiki.js URLs like `/archived-websites/fierocave` (the notice page) now land on the archive's own `index.html`, skipping the notice. If that matters, add the `mkdocs-redirects` plugin or a tiny HTML redirect, or link the notice from inside the archive.
- [ ] Wiki.js URLs had no trailing slash (`/copyright`). GitHub Pages redirects `/copyright` → `/copyright/` automatically, so these should be fine. Spot-check after launch.

## Later

- [ ] **Material for MkDocs reaches end of life on May 5, 2027** (the build prints this banner). Move to [Zensical](https://zensical.org/docs/compatibility/mkdocs/migration/) before then. It reads the existing `mkdocs.yml`.
- [ ] Shut down the Wiki.js instance and its database once the new site and file hosting are verified. Keep a final DB dump with your offline backups.
- [ ] Remove the status badge from `README.md` (status.samwarr.dev monitor #13) or repoint the monitor at the new site.

<details>
<summary>All 100 files currently on the file server (paths after <code>/api/public/dl/EvpPN0OJ/</code>)</summary>

- `3d-files/airbox_3mf1.3mf`
- `3d-files/airbox_3mf2.3mf`
- `3d-files/airbox_3mf3.3mf`
- `3d-files/airbox_fcstd.FCStd`
- `3d-files/airbox.jpg`
- `3d-files/airbox_stl1.stl`
- `3d-files/airbox_stl2.stl`
- `3d-files/airbox_stl3.stl`
- `3d-files/air_intake_hose_cpe.zip`
- `3d-files/air_intake_hose_e57.zip`
- `3d-files/air_intake_hose_faro.zip`
- `3d-files/air_intake_hose.jpg`
- `3d-files/air_intake_hose_mesh.stl`
- `3d-files/air_intake_hose_obj.obj`
- `3d-files/air_intake_hose_pcd.pcd`
- `3d-files/air_intake_hose_ply.ply`
- `3d-files/air_intake_hose_pts.zip`
- `3d-files/apillar_trim_clip.jpg`
- `3d-files/apiller_trim_clip_stl.stl`
- `3d-files/ashtray_insert.jpg`
- `3d-files/ashtray_insert_logo_stl.stl`
- `3d-files/ashtray_insert_plain_stl.stl`
- `3d-files/coming_soon.jpg`
- `3d-files/external_trim_clip_1.jpg`
- `3d-files/external_trim_clip1_stl.stl`
- `3d-files/external_trim_clip_2.jpg`
- `3d-files/external_trim_clip2_stl.stl`
- `3d-files/external_trim_clip_img.webp`
- `3d-files/notchback_sail_panel_emblem.jpg`
- `3d-files/notchback_sail_panel_emblem_stl.stl`
- `3d-files/power_window_switch.jpg`
- `3d-files/power_window_switch_stl.stl`
- `3d-files/rear_pontiac_badge_img.jpg`
- `3d-files/rear_pontiac_badge.jpg`
- `3d-files/rear_pontiac_badge_stl.stl`
- `3d-files/transmission_crush_washer_3mf.3mf`
- `3d-files/transmission_crush_washer_f3d.f3d`
- `3d-files/transmission_crush_washer.jpg`
- `3d-files/transmission_crush_washer_stl.stl`
- `3d-files/vss_gear_3mf.3mf`
- `3d-files/vss_gear_cpe.zip`
- `3d-files/vss_gear_e57.zip`
- `3d-files/vss_gear_f3d.f3d`
- `3d-files/vss_gear_faro.zip`
- `3d-files/vss_gear.jpg`
- `3d-files/vss_gear_mesh.stl`
- `3d-files/vss_gear_obj.obj`
- `3d-files/vss_gear_ply.zip`
- `3d-files/vss_gear_pts.zip`
- `3d-files/vss_gear_stl.stl`
- `docs/CR_ChiltonsRepairManualFiero.pdf`
- `docs/CR_FieroParts&Illustrations.pdf`
- `docs/CR_HaynesRepairManualFiero.pdf`
- `docs/DS_FanResistor.pdf`
- `docs/DS_TBIBottomFeed.pdf`
- `docs/DS_TBISinglePoint.pdf`
- `docs/FC_1227748ECMVehiclesList.pdf`
- `docs/FC_1227748VehiclesList.pdf`
- `docs/FC_BrakeSpec.pdf`
- `docs/FC_FieroAlignment.pdf`
- `docs/fierosails_docs/CarInsurance.pdf`
- `docs/fierosails_docs/Decal_Instructions.pdf`
- `docs/fierosails_docs/EngineTurning.pdf`
- `docs/fierosails_docs/InsideAlternators.pdf`
- `docs/fierosails_docs/KitCar.pdf`
- `docs/fierosails_docs/PerformanceTires.pdf`
- `docs/OEM_84FieroDoItYourself.pdf`
- `docs/OEM_84FieroElectricalTroubleshooting.pdf`
- `docs/OEM_84FieroMaintenanceSchedule.pdf`
- `docs/OEM_84FieroServiceManual.pdf`
- `docs/OEM_85FieroDoItYourself.pdf`
- `docs/OEM_85FieroServiceManual.pdf`
- `docs/OEM_85FieroV6EmissionsandDrivability.pdf`
- `docs/OEM_86BodyServiceManual.pdf`
- `docs/OEM_86FieroDoItYourself.pdf`
- `docs/OEM_86FieroMaintenanceSchedule.pdf`
- `docs/OEM_86FieroOwnersManual.pdf`
- `docs/OEM_87-88BodyServiceManual.pdf`
- `docs/OEM_87BodyServiceManual.pdf`
- `docs/OEM_87FieroOwnersManual.pdf`
- `docs/OEM_88FieroMaintenanceSchedule.pdf`
- `docs/OEM_88FieroOwnersManual.pdf`
- `docs/OEM_88FieroServiceManual.pdf`
- `docs/OEM_Chevrolet60V6ServiceManual.pdf`
- `docs/OEM_Chevrolet60V6ShortManual.pdf`
- `docs/OEM_DelcoETRMusicSystem2000Series.pdf`
- `docs/OEM_Muncie5SpdServiceManual.pdf`
- `docs/OEM_PatentTwoWayCheckValve.pdf`
- `docs/OEM_SunshadeInstructions.pdf`
- `docs/OEM_TH125CServiceManual.pdf`
- `docs/TSB_88RearBrake.pdf`
- `docs/TSB_CamGear.pdf`
- `docs/TSB_V6OilPressureSender.pdf`
- `history/Car_&_Driver_-_The_Periodic_Table_of_Sports_Cars.pdf`
- `history/Fiero_by_Gary_Witzenburg.pdf`
- `history/FieroMera.pdf`
- `history/Keith_Goodyear_feature_article_March_April_2020.pdf`
- `history/Pontiac_Goes_Mid_Engine_Designing_the_1984-88_Pontiac_Fiero's_Interior_(with_Marv_Fisher`
- `website_archives/fierocave_archive.zip`
- `website_archives/fierosails_archive.zip`
</details>
