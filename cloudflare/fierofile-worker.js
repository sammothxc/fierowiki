// Cloudflare Worker for fierofile.samwarr.dev.
//
// The wiki links every download as https://fierofile.samwarr.dev/<folder>/<file>.
// This worker redirects those to wherever the files actually live, so moving
// hosts means editing TARGETS here instead of rewriting links in the repo.
//
// Deploy: Cloudflare dashboard → Workers & Pages → Create → paste this file,
// then Settings → Domains & Routes → add custom domain fierofile.samwarr.dev.

// First path segment → base URL it redirects to. A request for
// /docs/FC_BrakeSpec.pdf goes to TARGETS.docs + "FC_BrakeSpec.pdf".
const TARGETS = {
  "3d-files": "https://archive.org/download/fierowiki-3d-files/",
  "docs": "https://archive.org/download/fierowiki-docs/",
  "history": "https://archive.org/download/fierowiki-history/",
  "website_archives": "https://archive.org/download/fierowiki-website-archives/",
};

// Where unknown paths (and the bare domain) go.
const FALLBACK = "https://fierowiki.samwarr.dev/";

// The redirect itself needs CORS headers, or in-browser fetches like the
// viewstl.com 3D viewer fail before ever reaching the file.
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
  "Access-Control-Allow-Headers": "*",
};

export default {
  async fetch(request) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS });
    }

    const url = new URL(request.url);
    const [folder, ...rest] = url.pathname.replace(/^\/+/, "").split("/");
    const base = TARGETS[folder];
    const location = base && rest.length ? base + rest.join("/") : FALLBACK;

    // 302, not 301: browsers cache 301s indefinitely, which would pin old
    // visitors to the old host after TARGETS changes.
    return new Response(null, {
      status: 302,
      headers: { Location: location, "Cache-Control": "public, max-age=3600", ...CORS },
    });
  },
};
