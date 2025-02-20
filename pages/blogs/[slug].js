// Note: [page-parameter].js This page will Dynamically change based on Router parameters (here based on 'slug'). Useful to render Dynamic content

import Head from 'next/head'; // Useful for page metadata
import Link from 'next/link';
// import { withRouter } from 'next/router'; // to grab Router query details (to get the slug from the url) - We have removed it because we are ggeting these details from server side 'query' and getting data through props - getInitialProps
import Layout from '../../components/Layout';
import React, { useState, useEffect } from 'react';

//-----------------------------------------------------------------------
// Code Syntax highligting
import Prism from "prismjs"; // to style Code samples
// Note: we need the CSS so import that in _app.js where global CSS is imported.

// import "prismjs/components/prism-jsx.min";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp.min"; // Note: for CPP C++, we also have to First add for C also. 
import "prismjs/components/prism-java"; // Note: for CPP C++, we also have to First add for C also. 
import "prismjs/components/prism-python"; // Note: for CPP C++, we also have to First add for C also. 
import "prismjs/components/prism-javascript.min";


import "prismjs/plugins/unescaped-markup/prism-unescaped-markup.min.js";

// import "prismjs/plugins/autoloader/prism-autoloader";

// import "prismjs/plugins/line-numbers/prism-line-numbers";



//-----------------------------------------------------------------------

import { getSingleBlog, listRelated } from '../../actions/blogAction'; // Function defined in actions for fetching Blogs from backend
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';

// import renderHTML from 'react-render-html';
import parseHTML from 'html-react-parser';

import dayjs from 'dayjs';
import relativeTimePlugin from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTimePlugin);

import SmallCard from '../../components/blog/RelatedBlogSmallCardComponent';

import DisqusThread from '../../components/DisqusThread.js'; // for Disqus Comment Section




// --------------------------------------------------------------------------------------------

// const SingleBlog = ({ blog, router }) => { // router is replaced by it's server side counterpart - query - that we passed as prop through getInitialprops
const SingleBlog = ({ blog, query }) => {


  // Once the component Mounts,then we will load and show the related blogs
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  const loadRelatedBlogs = () => {

    // make call to backend to get related blogs using this action
    listRelated({ blog }).then(data => {

      // Error Handling
      // Check if there's any error while fetching related blogs from backend
      if (data === undefined) {
        console.log("Error Fetching Data (Related blogs) from Backend (Related Blogs)");

        return;  // returning nothing, just to stop function execution here
      }

      // -----------------------------
      if (data.error) {
        console.log("Related blogs error --> ", data.error);
      } else {
        setRelatedBlogs(data); // this will update the relatedBlogs in the 'relatedBlogs' state
      }
    });
  };


  // loading the related blogs only when the component mounts
  useEffect(() => {
    loadRelatedBlogs();

    if (typeof window !== 'undefined') {
      setTimeout(Prism.highlightAll, 2000); // to style Code samples using prism.js (We just want highlightAll() to run once when the component DOM is ready)
    }

    // showDelayedFeaturedImage();
  }, []);



  // ------------------- PAGE HEAD --------------------
  const head = () => (

    <Head>

      <title>{blog.title} | {APP_NAME}</title>
      <meta
        name="description"
        content={blog.mdesc} />

      <link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`} />


      <meta property="og:title" content={`${blog.title} | ${APP_NAME}`} />
      <meta
        property="og:description"
        content={blog.mdesc} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />
      <meta property="og:image" content={`${API}/blog/photo/${blog.slug}`} />
      <meta property="og:image:secure_url" content={`${API}/blog/photo/${blog.slug}`} />
      <meta property="og:image:type" content="image/*" />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />


    </Head>
  );
  // ------------------- PAGE HEAD ENDS  --------------------

  // Show Categories associated with the current Blog
  const showBlogCategories = blog => (
    blog.categories.map((c, i) => (

      <Link key={i} href={`/categories/${c.slug}`} passHref>
        <a className="btn btn-primary mr-1 ml-1 mt-3" style={{ fontSize: "clamp(10px, 1.2vw, 15px)" }}> {c.name} </a>
      </Link>

    ))
  );

  // Show Tags associated with the current Blog
  const showBlogTags = blog => {
    return (
      blog.tags.map((t, i) => (

        <Link key={i} href={`/tags/${t.slug}`} passHref>
          <a className="btn btn-outline-primary mr-1 ml-1 mt-3" style={{ fontSize: "clamp(10px, 1.2vw, 15px)" }}> {t.name} </a>
        </Link>
      ))
    );
  };


  // Show related blogs
  const showRelatedBlogs = () => {
    return relatedBlogs.map((blog, i) => (
      <div className="col-md-4" key={i}>

        <article>
          <SmallCard blog={blog} />
        </article>

      </div>
    ));
  };


  // Disqus Comment section
  const showComments = () => {
    return (
      <div>

        <DisqusThread
          id={blog._id}
          title={blog.title}
          path={`/blog/${blog.slug}`}
        />

      </div>
    );
  };






  // ---------------------- RENDERING Blog Page ------------------------
  return ((!blog) ?
    (
      <div>
        <Layout>
          <br />
          {
            (blog === undefined) ?
              (
                <>
                  <h2 className="alert alert-heading alert-warning" style={{ textAlign: 'center' }}>ERROR FETCHING BLOG 😕</h2>
                  <br />
                  <h5 className="alert alert-heading alert-danger" style={{ textAlign: 'center' }}>Connection issue, please contact developer 👽</h5>
                </>
              ) : (
                <>
                  <h2 className="alert alert-heading alert-danger" style={{ textAlign: 'center' }}>NO BLOG FOUND! 🤔</h2>
                  <br />
                  <h4 className="quote-error" style={{ textAlign: 'center' }}>One should live like a Humble Bee 🐝 Drink the nectar of flowers and make honey with everyone and share with everyone :)</h4>
                </>
              )
          }
          <br />
        </Layout >
      </div >
    ) : (

      <React.Fragment>

        {head()}

        <Layout>

          <main className="header">
            <article className="blog-post">
              {/* --------------------------------------------------------------------- */}
              <div>

                {/* ------------------------ */}

                <section>
                  {/* {JSON.stringify(router)} */}
                  {/* {JSON.stringify(blog)} */}

                  <div className="row" style={{
                    width: "100%",
                    margin: "0 auto",
                    textAlign: "center"
                  }}>

                  <img
                    onError={(e) => (e.target.src = "/static/images/defaultImagePlaceholder.png")}
                    src={blog?.slug ? `${API}/blog/photo/${blog.slug}` : "/static/images/defaultImagePlaceholder.png"}
                    alt={blog?.title || "Blog Image"}
                    className="img img-fluid featured-image"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />


                  </div>

                </section>
                {/* ------------------------------------------------------------ */}
                <section>

                  <div className="container" style={{
                    width: "100%",
                    margin: "0 auto",
                  }}>

                    <h1
                      className="display-2 pb-3 pt-3 text-center font-weight-bold blog-title">
                      {blog.title}
                    </h1>

                    <p className="lead mt-3 mark" style={{ fontSize: "clamp(0.95rem, 2vw, 1.25rem)" }}>
                      Written by {(blog.postedBy) ?
                        (
                          <Link href={`/profile/${blog.postedBy.username}`} passHref>
                            <a>{blog.postedBy.username}</a>
                          </Link>
                        ) : (
                          <a className="text-muted">&lt; User Removed &gt;</a>
                        )
                      } | Published {dayjs(blog.createdAt).fromNow()}
                    </p>

                    {(dayjs(blog.createdAt).fromNow() !== dayjs(blog.updatedAt).fromNow()) && <p className="text-muted">Last Updated {dayjs(blog.updatedAt).fromNow()}</p>}


                    <div className="pb-3">
                      {showBlogCategories(blog)}
                      {showBlogTags(blog)}
                      <br />
                      <br />
                    </div>

                  </div>

                </section>

              </div>

              {/* ------------------------------------------------------------ */}

              <div className="container" style={{
                // overflow: "hidden",
                width: "100%",
                margin: "0 auto",
              }}>

                <section>
                  <div className="col-md-12 lead main-blog-body">
                    {/* {renderHTML(blog.body)} */}
                    {parseHTML(blog.body)}

                  </div>
                </section>

                {/*  To make images under Blog Body Responsive image, CSS:
                    .main-blog-body img {
                          max-width: 100% !important;
                          height: auto !important;
                          }
                */}

              </div>

              {/* ------------------------------------------------------------ */}
              <div className="container pb-5">
                <h4 className="text-center pt-5 pb-5 h2">Related blogs you might like</h4>
                <hr />

                {/* {JSON.stringify(relatedBlogs)} */}
                <div className="row ml-4 mr-4" style={{ display: 'flex' }}>{showRelatedBlogs()}</div>

              </div>
              {/* ------------------------------------------------------------ */}
              <hr />

              <div className="container pt-5 pb-5">
                {showComments()}
              </div>

              {/* ------------------------------------------------------------ */}

            </article>
          </main>

        </Layout>

      </React.Fragment >)

  );

};


/* NOTE: On Client side, we acces Router details using the variable = 'router'
and on Server Side, we grab the router details using the variable = 'query'
It's the same thing, just different varibles on client and server side
*/
// for SSR (Server Side Rendering)
SingleBlog.getInitialProps = ({ query }) => { // grabbing the query

  // We get the slug using query passed in url [USING FETCH RESPONSE]
  return getSingleBlog(query.slug).then(data => {

    // Error handling
    if (data === undefined) {
      // Uable to fetch data from backend API (connection faiure)
      return { blog: undefined, query };
    }

    else if (data.error) {
      // Able to connect to backend but There's no Data related to this query in database (BLOG NOT FOUND)

      // console.log({ data });
      console.log("Error while fetching this blog -->", data.error);

      return { blog: null, query };
    }
    else {
      // on successfully getting Blog from backend database

      // Test to see if getInitialProps runs on Server Side on first visit
      // console.log('GET INITIAL PROPS IN SINGLE BLOG (CHECK on SERVER SIDE, not on Browser)', data);

      return { blog: data, query }; // returning blog (data) & 'query' (query is similar to 'router' on client side) and now we can access these in our client side (browser) props
    }
  })
    .catch(err => {
      console.log("Error caught -->", err);
    });
};

/*
// USING AXIOS RESPONSE (incomplete)
return getSingleBlog(query.slug).then(res => {
        console.log("response received -->", { res });

  // console.log(res.response.status, res.response.data.error);

  // // response = undefined (Backend Connection Failure, unable to Connect)
  // if (res.response === undefined) {
  //   console.log("Backend Connection Failure! Please check");
  //   return;
  // }

  // if (response.data.error) {
  if (res.response.data.error) {
        console.log(response.data.error);
  } else {
    return {blog: res.data, query };
  }
})
  .catch(err => {
        console.log("\n Error getting this Blog from Backend --> ", err);
    return {};
  });
};
*/

//-------------------------------------------




export default SingleBlog;
// export default withRouter(SingleBlog); // Not needed now since we are getting the router details from backend itself when we are loading the data using getInitialProps using 'query'
