module.exports = {
  site: "https://pixel-store-seven.vercel.app",
  paths: [
    "/index.html",
    "/html/Home.html",
    "/html/Products.html",
    // Add more paths as needed
  ],
  lighthouseOptions: {
    extends: "lighthouse:default",
    settings: {
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
      emulatedFormFactor: "desktop",
      throttlingMethod: "simulate",
    },
  },
};
