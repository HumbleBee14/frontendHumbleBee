// Generate Sitemap for website

const fs = require("fs");
const fetch = require("node-fetch");

//----------------------------------------------
const fetchBlogsAPI = "https://humblebee.live/api/blogs";
const fetchCategoriesAPI = "https://humblebee.live/api/categories";
const fetchTagsAPI = "https://humblebee.live/api/tags";

const YOUR_DOMAIN = "https://humblebee.live";

// Static Page routes
const routes = ["", "/index", "/contact", "/blogs", "/signin", "/signup",];


//----------------------------------------------

const toUrl = (route, freq, priority) =>
  // `<url><loc>http://www.${host}${route}</loc></url>`;
  `<url>
  <loc>${YOUR_DOMAIN}${route}</loc>
  <lastmod>${new Date().toISOString()}</lastmod> 
  <changefreq>${freq}</changefreq>
  <priority>${priority}</priority>
  </url>`;


const createSitemap = (
  routes, // Static routes
  blogsSlug,
  categoriesSlug,
  tagsSlug
) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${routes.map((route) => toUrl(route, "monthly", 0.80)).join("")}
    ${blogsSlug.map((blog) => toUrl(`/blogs/${blog}`, "Daily", 1.0)).join("")}
    ${categoriesSlug.map((category) => toUrl(`/categories/${category}`, "monthly", 0.80)).join("")}
    ${tagsSlug.map((tag) => toUrl(`/tags/${tag}`, "monthly", 0.80)).join("")}
    </urlset>`;


// ---------------------------------------------
// Fetch list data for dynamic pages from API

// const blogs = [123, 232,nisds-sds,yut-sds 4545];  //You can fetch the blogs list from an API
// const categories = [123, 232, dsdsd, 4545];
// const tags = [123, 232, 4545];

// ----------------------------------------------------------
// Async API Fetch Request
(async () => {

  // console.log("ASYNC CALLED");

  try {
    const fetchBlogs = await fetch(fetchBlogsAPI)
      .then(res => res.json())
      .catch(err => console.log(err));

    const fetchCategories = await fetch(fetchCategoriesAPI)
      .then(res => res.json())
      .catch(err => console.log(err));

    const fetchTags = await fetch(fetchTagsAPI)
      .then(res => res.json())
      .catch(err => console.log(err));

    // ----------------------------------
    const blogsSlug = [];
    Object.values(fetchBlogs).forEach(blog => blogsSlug.push(blog.slug));
    // console.log(blogsSlug);

    const categoriesSlug = [];
    Object.values(fetchCategories).forEach(category => categoriesSlug.push(category.slug));
    // console.log(categoriesSlug);

    const tagsSlug = [];
    Object.values(fetchTags).forEach(tag => tagsSlug.push(tag.slug));
    // console.log(tagsSlug);

    // --------------------------------------------------------------------

    const sitemap = createSitemap(routes, blogsSlug, categoriesSlug, tagsSlug);
    // console.log("---------------- Site Map Called --------------");

    // Save XML Response in a file 
    fs.writeFileSync('website-sitemap.xml', sitemap, function (err) {
      if (err) {
        throw err;
      };
      console.log('Results Saved');
    });

    // console.log("---------------- After File Create Function --------------");

    // ----------------------------------
  } catch (err) {
    console.log("Error --->", err.message); //can be console.error
  }
})();

// -------------------------------------------------------------------


// NOTE: To allow 'fs' module to work, Add this webpack configuration in the next.config.js
/*
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.node = {
      fs: 'empty'
    };
    return config;
  },
*/


/*
    // res.setHeader('Content-Type', 'text/xml');
    // res.write(sitemap);
    // res.end();
    // return res;

*/