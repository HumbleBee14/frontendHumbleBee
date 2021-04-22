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
        content="Programming Blogs and Tutorials on React Node Next Vue Php ... Web Development !!" />

      <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />


      <meta property="og:title" content={`Latest web Developments Tutorials | ${APP_NAME}`} />
      <meta
        property="og:description"
        content="Programming Blogs an Tutorials on React Node Next Vue Php ... Web Development !!" />
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


  // This is for showing new Loaded blogs that will be shown after user clicks on Load More button. (new loaded blogs will be stored in 'loadedBlogs' state)
  const showLoadedBlogs = () => {
    return loadedBlogs.map((blog, i) => (

      <article key={i}>

        <Card blog={blog} />

      </article>

    ));

  };



  // --------------------------------

  // Looping through all the blog Categories
  const showAllCategories = () => {
    return categories.map((c, i) => (
      <Link href={`/categories/${c.slug}`} key={i} passHref>
        <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
      </Link>
    ));
  };


  // --------------------------------

  // Looping through all the blog Tags
  const showAllTags = () => {
    return tags.map((t, i) => (
      <Link href={`/tags/${t.slug}`} key={i} passHref>
        <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
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
                <h1 className="display-4 font-weight-bold text-center">Blogs & Random Stuff 😁</h1>
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


          <div className="container-fluid">{showAllBlogs()}</div>

          <div className="container-fluid">{showLoadedBlogs()}</div>

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
      console.log(data.error);
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
