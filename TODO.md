# Wiki.js → MkDocs migration checklist

Not published to the site (lives outside `docs/`). Delete once everything is ticked.

## Done on the `mkdocs-migration` branch

- [x] Move site content into `docs/` (`home.md` → `docs/index.md`)
- [x] Strip Wiki.js front matter (keep `title` / `description`)
- [x] Convert Wiki.js callouts (`> … {.is-warning}`) to Material admonitions
- [x] Convert inline-styled `<a>` buttons to `{ .md-button }` links
- [x] Convert Wiki.js image sizing (`=600x`) to `{ width="600" }`
- [x] Rewrite root-absolute links (`/copyright`) to relative `.md` links so MkDocs can validate them
- [x] Point `/contact` and `/about` links at the home page's Contributing / What Is FieroWiki sections
- [x] Point the `/LICENSE` link at `LICENSE.md` on GitHub
- [x] Rewrite `resources/3d-files.html` as Markdown with a CSS card grid (`docs/stylesheets/extra.css`)
- [x] Remove Wiki.js-only features (tags, comments, "powered by Wiki.js") from the home page and README
- [x] Remove comments/Akismet/accounts/self-hosting text from the privacy policy and terms of use. "Last edited in the right sidebar" now points to the GitHub history.
- [x] Fix README links for the new `docs/` paths
- [x] Keep the archive notice pages at their Wiki.js URLs (`/archived-websites/fierocave/`). Each archive's own `index.html` became `home.html`, and the 156 archive links to it were updated.
- [x] Repair 1,228 broken local links inside the archived sites (`.htm` → `.html`, filename case, folders saved without `[brackets]`, subfolder pages written relative to the site root)
- [x] Point every download at `https://fierofile.samwarr.dev/<folder>/<file>` (164 links, including the percent-encoded viewstl iframes; `?inline=true` dropped)
- [x] `cloudflare/fierofile-worker.js`: 302-redirects `fierofile.samwarr.dev/<folder>/…` to a per-folder target, with CORS headers so the 3D viewer works
- [x] `mkdocs.yml`, pinned `requirements.txt`, and a GitHub Pages workflow (`.github/workflows/deploy.yml`) that runs `mkdocs build --strict` on PRs and deploys on `main`

## Before shutting down Wiki.js (grab these first)

- [ ] **Export the Wiki.js theme CSS / code injection** (Administration → Theme → CSS Override and Head/Body HTML Injection). The archived pages ship no stylesheet of their own; fierocave's menus (`sf-menu`, `header`, `footer` classes) were styled by Wiki.js. Without it they render as plain nested lists. Put the CSS in e.g. `docs/archived-websites/fierocave/css/site.css` and add a `<link>` to the pages.
- [ ] Final database dump + copy of the FieroFile storage folder for offline backups.

## Files: archive.org + fierofile.samwarr.dev

- [ ] Upload the 100 files to archive.org. The worker currently expects four items mirroring the folders: `fierowiki-3d-files`, `fierowiki-docs`, `fierowiki-history`, `fierowiki-website-archives` (`ia upload <item> <folder>/*`). Consider splitting the Haynes/Chilton `CR_*.pdf` manuals into their own item so a takedown can't hide everything. Just add a `TARGETS` entry, or a path-specific rule, in the worker.
- [ ] Wait for archive.org processing, then spot-check a few `https://archive.org/download/<item>/<file>` URLs.
- [ ] Deploy the worker (Workers & Pages → Create → paste `cloudflare/fierofile-worker.js`) and add the custom domain `fierofile.samwarr.dev`.
  - If you want downloads working before the upload finishes, temporarily point `TARGETS` at the old server. Note that it has to live on a hostname other than `fierowiki.samwarr.dev` once that domain moves to GitHub Pages.
- [ ] Spot-check through the worker: a PDF, a zip, a part thumbnail on the 3D Files page, and a viewstl 3D viewer.

## Go live

- [ ] Enable Pages in the repo: Settings → Pages → Source: **GitHub Actions**.
- [ ] Merge to `main`, confirm the deploy works at `https://sammothxc.github.io/fierowiki/`, then set the custom domain `fierowiki.samwarr.dev` in Settings → Pages and update the Cloudflare DNS record (CNAME → `sammothxc.github.io`, DNS-only/grey cloud while GitHub issues the certificate). Tick "Enforce HTTPS".
  - The `github.io/fierowiki/` preview will have some broken links because `site.webmanifest` and a few archive links are root-absolute. They work once the custom domain serves the site at `/`.
- [ ] Wiki.js URLs had no trailing slash (`/copyright`). GitHub Pages redirects `/copyright` → `/copyright/`, so these should be fine. Spot-check after launch.
- [ ] Remove the status badge from `README.md` (status.samwarr.dev monitor #13) or repoint the monitor at the new site.

## Content (your wording)

- [ ] Decide on a contact method. Wiki.js `/contact` links now go to the home page's Contributing section. A real `docs/contact.md` would be cleaner.
- [ ] The "Contributing" text could invite GitHub issues/PRs now that the repo is the only editing path. The header also has an "edit this page" pencil via `edit_uri`.
- [ ] `docs/copyright.md` says the license is at `fierowiki.samwarr.dev/LICENSE`. It now links to GitHub, so reword if needed.
- [ ] Stub pages ("Coming soon"): `quick-resources/{error-codes,rpo-codes,troubleshooting}.md` and `resources/photos.md`. Fill them in, or drop them from `nav` in `mkdocs.yml` since the wiki is effectively frozen.
- [ ] `docs/fiero-sam.md` is a log for a car you no longer own. Maybe add a closing note, or move it under an "About" section.
- [ ] The 3D Files grid lists two "coming soon" parts (Airbox Lid, Front Speaker Cover) with no pages. Keep or remove them.
- [ ] "In progress" archive (Driven Visions) and the watchlist on `docs/archived-websites.md`: finish them or mark as not planned.

## Archived sites

- [ ] 105 local links in the archives still point at files the original crawl never captured. The biggest are `css/btn-back.gif` (24, fierocave) and `PartsManual.html` (23, fierosails), plus scattered images. These may be recoverable from the Wayback Machine.
- [ ] The archived HTML files still start with a Wiki.js `<!-- title: … -->` comment and have no `<!doctype html>`/`<meta charset>`, so they render in quirks mode. That's probably fine for 2000s-era pages, but check a few in the browser.

## Later

- [ ] **Material for MkDocs reaches end of life on May 5, 2027** (the build prints this banner). Move to [Zensical](https://zensical.org/docs/compatibility/mkdocs/migration/) before then. It reads the existing `mkdocs.yml`.

<details>
<summary>All 100 files currently on the file server (paths after <code>https://fierofile.samwarr.dev/</code>)</summary>

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
