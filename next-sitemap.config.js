// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://franc-alvenn-dela-cruz.vercel.app", 
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ["/404", "/500"],
  generateIndexSitemap: false,
};