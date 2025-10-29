// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://franc-alvenn-dela-cruz.vercel.app",
  generateRobotsTxt: true,               // creates public/robots.txt
  changefreq: "weekly",
  priority: 0.7,

  additionalPaths: async (config) => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const path = require("path");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require("fs");

    const blogDir = path.join(process.cwd(), "app", "blog");
    if (!fs.existsSync(blogDir)) return [];

    // Get every folder that contains a page.tsx
    const blogSlugs = fs
      .readdirSync(blogDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .filter((dirent) => {
        const pageFile = path.join(blogDir, dirent.name, "page.tsx");
        return fs.existsSync(pageFile);
      })
      .map((dirent) => `/blog/${dirent.name}`);

    // Return sitemap entries
    return blogSlugs.map((loc) => ({
      loc,
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: 0.8,
    }));
  },
};