import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { children } from "@/lib/mock";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const paths: string[] = [
          "/",
          "/children",
          "/reports",
          "/reports/week",
          "/messages",
          "/messages/announcements",
          "/account",
          "/account/profile",
          "/account/preferences",
          "/account/help",
        ];
        for (const c of children) {
          paths.push(`/children/${c.id}`);
          paths.push(`/children/${c.id}/history`);
        }
        const urls = paths
          .map(
            (p) =>
              `  <url>\n    <loc>${BASE_URL}${p}</loc>\n    <changefreq>weekly</changefreq>\n  </url>`,
          )
          .join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});