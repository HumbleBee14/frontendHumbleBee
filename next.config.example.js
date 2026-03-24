module.exports = {

  compiler: {
    styledComponents: true
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },

  publicRuntimeConfig: {
    APP_NAME: 'MyBlog',
    API_DEVELOPMENT: 'http://localhost:8000/api',
    API_PRODUCTION: 'https://yourdomain.com/api',

    PRODUCTION: false,

    DOMAIN_DEVELOPMENT: 'http://localhost:3000',
    DOMAIN_PRODUCTION: 'https://yourdomain.com',

    FB_APP_ID: 'your-facebook-app-id',             // Facebook Open Graph (SEO)
    SHORTNAME: 'your-disqus-shortname',             // Disqus comments
    GOOGLE_CLIENT_ID: 'your-google-client-id',      // Google OAuth
    GA_TRACKING_ID: 'G-XXXXXXXXXX'                  // Google Analytics
  }
};
