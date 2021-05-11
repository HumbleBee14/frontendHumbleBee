import Head from 'next/head';
// import { DOMAIN, APP_NAME, FB_APP_ID } from '../config';

import { useEffect } from 'react';
import { useRouter } from 'next/router';

// Note: you add CSS directly Import .css files as global stylesheets.

// import '../public/static/css/index.css';

// import '../public/static/css/styles.css';

// import "../styles/global.scss"; // global styles
// add bootstrap css 
// import 'bootstrap/dist/css/bootstrap.css'
// own css files here
// import "../css/customcss.css";

import "prismjs/themes/prism-tomorrow.css"; // // Global CSS for prism. Needed for code syntax highligting


import * as gtag from '../lib/gtag';

// The simplest way to log pageviews in your Next.js app is to subscribe to your router and listen for the routeChangeComplete event. (for Google Analytics )



import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    color: #333644;
    font-family: sans-serif;
    background: orange;
  }
`;

// --------------------------------------------------------------------
const App = ({ Component, pageProps }) => {


  // --------------- for Google Analytics gtag --------------------------
  const router = useRouter();

  useEffect(() => {
    // Event handler wil be called whenever route changes (User Navigates)
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };

    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  // Note: The above code makes sure that GA is aware of each activity happening on this app and will be update GA on each page change/route change by calling the event handler

  // --------------- for Google Analytics gtag --------------------------


  // ------------------------------
  return (
    <>

      <Head>

        {/* <link rel="icon" href="/public/images/logo/favicon.png" type="image/png" sizes="16x16" /> */}
        {/* <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" /> */}

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta> */}

        {/* <title>{APP_NAME}</title> */}

        {/* BootStrap css */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/css/bootstrap.min.css" />

        {/* nProgress Animation CSS file */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" />

        {/* Custom CSS Stylesheet */}
        <link rel="stylesheet" href="/static/css/styles.css" />


      </Head>

      <Component {...pageProps} />

      {/* <GlobalStyle /> */}

    </>
  );
};



export default App;