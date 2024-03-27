import { writeFileSync } from "fs";
import prettier from "prettier";
// Sitemap has a limitation in 50mb per file or 50_000 items in a one file
// If you have a lot of languages and pages the better approach is to use sitemap_index.xml and sitemap-[lang].xml.gz
// And it in sitemap_index store links to .gz archives. You can refer to Zert landing project
// This sitemap generator is for single language only

// TODO change domain and public/robots.txt Sitemap: ...
const DOMAIN = "https://idealogic.dev";

const ROUTES = {
  root: "/",
  home: "home",
  login: "login",
};

export const languages = {
  EN: "en-US",
};

const routes = [
  { path: "/", name: "Landing" },
  { path: `/${ROUTES.home}`, name: "Home" },
  { path: `/${ROUTES.login}`, name: "Login" },
];

const generateXHTML = path => {
  return Object.values(languages)
    .reduce((acc, curr) => {
      if (curr === languages.EN) {
        return [
          ...acc,
          `<xhtml:link rel="alternate" hreflang="x-default" href="${DOMAIN}${path}" />\n`,
          `<xhtml:link rel="alternate" hreflang="${curr}" href="${DOMAIN}${path}" />\n`,
        ];
      } else {
        return [...acc, `<xhtml:link rel="alternate" hreflang="${curr}" href="${DOMAIN}${path}" />\n`];
      }
    }, [])
    .join("");
};

const generateSitemapUrl = path => {
  const correctPath = path === ROUTES.landing ? "" : path;
  return `<url>\n<loc>${`${DOMAIN}${correctPath}`}</loc>\n${generateXHTML(correctPath)}\n</url>\n`;
};

const generateSitemap = async () => {
  const prettierConfig = await prettier.resolveConfig("./.prettierrc.js");

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
            ${routes
              .map(({ path }) => {
                return Object.values(languages)
                  .map(language => {
                    return generateSitemapUrl(path, language);
                  })
                  .join("");
              })
              .join("")}
        </urlset>
        `;

  const formatted = await prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html",
  });

  writeFileSync("public/sitemap.xml", formatted);
};

generateSitemap();
