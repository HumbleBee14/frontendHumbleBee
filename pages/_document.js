// Base template used by Nextjs for rendering every page

import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from "styled-components";


// import Cookies from 'js-cookie';

import { GA_TRACKING_ID } from '../lib/gtag';




class MyDocument extends Document {



  // ---------------------------------------------

  render() {


    // ------------------
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          {/* Blog Rich Text Editor CKEditor content created Stylesheet- required for Blogs / quotes and other styles used */}
          {/* <link rel="stylesheet" href="/static/css/content-styles.css" type="text/css" /> */}
          {/* Note: Now Nextjs has inbuild CSS support- https://nextjs.org/docs/basic-features/built-in-css-support */}
          {/* BootStrap css */}
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/css/bootstrap.min.css" />
          {/* nProgress Animation CSS file */}
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" />
          {/* Custom CSS Stylesheet */}
          <link rel="stylesheet" href="/static/css/styles.css" />
          {/* -------------Global Site Tag (gtag.js) - Google Analytics ------------ */}
          <script
            async
            defer
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            defer
            async
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
          {/* // --------------- for Google Analytics gtag -------------------------- */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html >
    );
  }
}

export default MyDocument;;

// Note: We use _document.js to inject our own Custom scripts which we want available for whole app
//https://www.youtube.com/watch?v=FTLHqyQ9NqY