import Head from 'next/head'; // Useful for page metadata - title, meta, canonical urls, meta-description, meta title, etc all this goes into the website Head, so  using Head component by 'next/head' for that.
import Link from 'next/link';
import { withRouter } from 'next/router';
import Layout from '../../components/Layout';
import React, { useState } from 'react';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';

import { listBlogsWithCategoriesAndTags } from '../../actions/blogAction'; // Function defined in actions for fetching list of Blogs from backend

import Card from '../../components/blog/BlogCardComponent'; // Each Blog Card in the list wil be rendered using this component


// Note: this page is going to be fully SSR (Server side rendered) using 'getInitialProps' method provided by Nextjs
/*
'getInitialProps' enables (SSR) server-side rendering in a page and allows you to do initial data population, it means sending the page with the data already populated from the server. This is especially useful for SEO.
*/


// Function to create a list of blog cards on /blogs page (Note: This page gets all blogs as parameter/prop from the below getInitialProps())
const Blogs = ({ blogs, categories, tags, totalBlogs, blogsLimit, blogsSkip, router }) => {

  // ------------------------ PAGE HEAD ---------------------------
  // Working on page metadata - < HEAD > section

  const head = () => (

    <Head>

      <title>Programming Blogs | {APP_NAME}</title>
      <meta
        name="description"
        content="Programming Blogs and Tutorials" />

      <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />


      <meta property="og:title" content={`Latest Programming Tutorials | ${APP_NAME}`} />
      <meta
        property="og:description"
        content="Programming Blogs and Tutorials." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />
      <meta property="og:image" content={`${DOMAIN}/static/images/web-logo-512.png`} />
      <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/web-logo-512.png`} />
      <meta property="og:image:type" content="image/png" />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />

    </Head>
  );

  // --------------------------------------------------------------------

  // --------------- Load More Blogs ---------------

  const [limit, setLimit] = useState(blogsLimit); // to keep track of current limit value on client side
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(totalBlogs);
  const [loadedBlogs, setLoadedBlogs] = useState([]); //  To keep track of already loaded blogs

  // So, on First Page load, we'll load the first few blogs based on whatever the limit is set by default (in getInitialProps below) and after that whenever User click on Load More, then we'll load more blogs and they'll added here - 'setLoadedBlogs' - to keep track of loaded blogs


  // Load More function => to populate the loadedBlogs in the state
  const loadMore = () => {
    let toSkip = skip + limit; // this will skip already loaded blogs(based on limit value) on current page to load more, so that we can merge new ones with them

    listBlogsWithCategoriesAndTags(toSkip, limit).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setLoadedBlogs([...loadedBlogs, ...data.blogs]); // Here we are Merging the old already loaded blogs on current page with the newly one loading after clicking on Load More button.

        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  // Load More Button
  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit &&
      (
        <button onClick={loadMore} className="btn btn-outline-primary btn-lg">
          Load More
        </button>
      )
    );
  };

  //------------------------------------------------------------------

  // Looping through each blog available through 'props' from getInitialProps()
  const showAllBlogs = () => {

    // Error Handling 

    // Check if there's any error while fetching Blogs from backend
    // if (blogs === undefined) {
    if (typeof blogs === 'undefined') {
      // console.log("Error Fetching Data (Blogs)");

      return (<div>
        <h1 className="alert alert-heading alert-danger" style={{ textAlign: 'center' }}>ERROR FETCHING DATA 😕</h1>
        <br />
        <blockquote className="blockquote text-center">
          <p className="lead" style={{ fontSize: "clamp(20px, calc(20px + (35 - 20) * ((100vw - 420px) / (1200 - 420))), 35px)" }}>"People fill their homes with excess things and travel to be free of them"</p>
        </blockquote>
      </div>);
    }

    if (!blogs.length) {
      // blog.length = 0
      console.log("No Blog Exists. Please check Database!");

      return <h1 className="alert alert-heading alert-warning" style={{ textAlign: 'center' }}>NO BLOG FOUND! 🙄</h1>;
    }


    //-------------------- On Successfully getting Blogs Data
    return blogs.map((blog, i) => { // () if you use bracket (..)then you don't have to mention return, else in case curly braces {..} you have to mention return <.../>

      // Looping through each blog using 'map'. Each Blog we want to be as an Article

      // The <article> tag specifies independent, self-contained content.
      return (

        <article key={i}>

          <Card blog={blog} />

        </article>

      );
    });
  };

  //-----------------------------------------

  // This is for showing new Loaded blogs that will be shown after user clicks on Load More button. (new loaded blogs will be stored in 'loadedBlogs' state)
  const showLoadedBlogs = () => {

    // Check if there's any error while fetching more Blogs from backend
    // if (typeof loadedBlogs === 'undefined') {
    //   return <p className="alert alert-danger">ERROR FETCHING DATA</p>;
    // }

    return loadedBlogs.map((blog, i) => (

      <article key={i}>

        <Card blog={blog} />

      </article>

    ));

  };



  // --------------------------------

  // Looping through all the blog Categories
  const showAllCategories = () => {

    // Check if there's any error while fetching data from backend
    if (typeof categories === 'undefined') {
      console.log("Error Fetching Data (Categories list)");

      return;
      // return <h1 className="alert alert-heading alert-danger" style={{ textAlign: 'center' }}>ERROR WHILE FETCHING DATA 😕</h1>;
    }

    // -----------------------
    return categories.map((c, i) => (
      <Link href={`/categories/${c.slug}`} key={i} passHref>
        <a className="btn btn-primary mr-1 ml-1 mt-2" style={{ fontSize: "clamp(12px, 1.5vw, 15px)" }}>{c.name}</a>
      </Link >
    ));
  };

  // Dynamic Responsive font size based on screen
  // font-size: min(max(16px, 4vw), 22px) === fontSize: "clamp(12px, 2vw, 15px)"

  // Try this smooth transition for responsive text font size
  // style={{
  //   fontSize: "clamp(25px, calc(25px + (53 - 25) * ((100vw - 420px) / (1200 - 420))), 53px)"
  // }}


  // --------------------------------

  // Looping through all the blog Tags
  const showAllTags = () => {

    // Check if there's any error while fetching data from backend
    if (typeof tags === 'undefined') {
      console.log("Error Fetching Data (Tags list)");

      return;
      // return <h1 className="alert alert-heading alert-danger" style={{ textAlign: 'center' }}>ERROR WHILE FETCHING DATA 😕</h1>;
    }

    // -----------------------
    return tags.map((t, i) => (
      <Link href={`/tags/${t.slug}`} key={i} passHref>
        <a className="btn btn-outline-primary mr-1 ml-1 mt-2" style={{ fontSize: "clamp(12px, 1.5vw, 15px)" }}>{t.name}</a>
      </Link>
    ));
  };



  //-----------------------------------------------------
  //------------------------------------------------------
  return (

    <React.Fragment>

      {/* Page Head Section for better SEO  Search Engine Optimization*/}
      {head()}

      <Layout>

        <main>

          <div className="container-fluid">
            <header>
              <div className="col-md-12 pt-3">
                <br />
                <br />
                <h1 className="display-4 font-weight-bold text-center" style={{
                  fontSize: "clamp(35px, calc(35px + (53 - 35) * ((100vw - 420px) / (1200 - 420))), 53px)"
                }}>Blogs & Random Stuff</h1>
              </div>

              <section>

                <div className="pb-5 text-center">
                  {/* <p> Show Categories and Tags </p> */}

                  {showAllCategories()}
                  <br />
                  {showAllTags()}

                </div>

                {/* <p className="text-muted">[Note: Currently only Admin authorized to create new Categories & Tags ]</p> */}
              </section>


            </header>

          </div>

          <div className="container">

            <div className="container-fluid">{showAllBlogs()}</div>

            <div className="container-fluid">{showLoadedBlogs()}</div>

          </div>

          <div className="text-center pt-5 pb-5">{loadMoreButton()}</div>


        </main>

      </Layout>

    </React.Fragment>

  );
};

// ==========================================================================================================================
// Below we are fetching the data from backend for server side rendering (FOr first time- this will happen on the server side itself). This data will be available as 'props' as properties to the above functional component

// WARNING: 'getInitProps' can be used Only on Pages, Not in components !!

// On First Page Load, this function runs & it return the blogs (limit=2) and anything that happens later will be handled by loadMore
Blogs.getInitialProps = () => { // Here we just request to backend to get the data and Return the data. So that all these will be available as 'props'

  let skip = 0; // Default skip value
  let limit = 5; // limit = 5 ===> On first page load, we will get 2 blogs first by default


  return listBlogsWithCategoriesAndTags(skip, limit).then(data => {

    if (data.error) {
      console.log("Data Error --> ", data.error);
    }
    else {
      return {
        // check these properties from backend controller code - Check this middleware's response - 'listAllBlogsCategoriesTags' in blogController.js
        blogs: data.blogs,
        categories: data.categories,
        tags: data.tags,
        totalBlogs: data.size, // Number of Blogs returned at one time from backend  (PAGINATION :)
        blogsLimit: limit,
        blogsSkip: skip
      };
    }
  })
    .catch(err => {
      console.log("\n Error getting BLOGS from Backend --> ", err, "\n\n");
      // console.log("------------- END --------------");

      // return; // undefined - could throw eror
      return {}; // send empty object, instead of nothing (undefined)
      // return {blogs: [] };

      // throw new Error(err); // Error objects are thrown when runtime errors occur.
      // It is more like a return ERROR Object and if there's no further function that will be handling this error, it'll then HALT here with the error , else we can capture it in further function calls where it's called and handle it as we want to.

      /*
      try {
        throw new Error('Whoops!')
        } catch (e) {
            console.error(e.name + ': ' + e.message)
          }
      */
    });
};


export default withRouter(Blogs); // getInitalProps <-- static method
/* NOTE::::::::::::::::::::::::::::::::::::
// Note: This page is going to be fully SSR (Server side rendered) using 'getInitialProps' method provided by Nextjs

THIS PAGE loads on the server side Only for 'FIRST Time', after that if user navigates around this page it'l be loaded rendered on client side.

'getInitialProps' enables (SSR) server-side rendering in a page and allows you to do initial data population, it means sending the page with the data already populated from the server. This is especially useful for SEO.


NOTE: If you're using Next.js 9.3 or newer, we recommend that you use 'getStaticProps' or 'getServerSideProps' instead of 'getInitialProps'.
*/

/*
withRouter()  --> to make router props available, we wrap default component with withRouter()

Note: All Nextjs pages have 'router' as prop by default
*/
