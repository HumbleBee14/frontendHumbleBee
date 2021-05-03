// Note: [page-parameter].js This page will Dynamically change based on Router parameters (here based on 'slug'). Useful to render Dynamic content

import Head from 'next/head'; // Useful for page metadata
import Link from 'next/link';
// import { withRouter } from 'next/router'; // to grab Router query details (to get the slug from the url) - We have removed it because we are ggeting these details from server side 'query' and getting data through props - getInitialProps
import Layout from '../../components/Layout';
import React, { useState, useEffect } from 'react';
import { getSingleBlog, listRelated } from '../../actions/blogAction'; // Function defined in actions for fetching Blogs from backend
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import renderHTML from 'react-render-html';
import moment from 'moment'; // for displaying date-time in readable format (' few minutes ago ')
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

    // showDelayedFeaturedImage();
  }, []);


  /* useEffect(() => {
     effect
     return () => {
       cleanup
     }
   }, [input])
   */

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
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />

    </Head>
  );
  // ------------------- PAGE HEAD ENDS  --------------------

  // Show Categories associated with the current Blog
  const showBlogCategories = blog => (
    blog.categories.map((c, i) => (

      <Link key={i} href={`/categories/${c.slug}`} passHref>
        <a className="btn btn-primary mr-1 ml-1 mt-3"> {c.name} </a>
      </Link>

    ))
  );

  // Show Tags associated with the current Blog
  const showBlogTags = blog => {
    return (
      blog.tags.map((t, i) => (

        <Link key={i} href={`/tags/${t.slug}`} passHref>
          <a className="btn btn-outline-primary mr-1 ml-1 mt-3"> {t.name} </a>
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






  // ---------------------- RENDERING ------------------------
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

          <main>
            <article>
              <div className="container-fluid">
                <section>
                  {/* {JSON.stringify(router)} */}
                  {/* {JSON.stringify(blog)} */}

                  <div className="row" style={{
                    // marginTop: '30px'
                  }}>

                    <img onError={(image) => image.target.setAttribute("src", "/static/images/defaultImagePlaceholder.png")} src={`${API}/blog/photo/${blog.slug}`} alt={blog.title} className="img img-fluid featured-image" />

                  </div>

                </section>

                <section>

                  <div className="container">

                    <h1
                      className="display-2 pb-3 pt-3 text-center font-weight-bold blog-title"
                      style={{
                        fontSize: "clamp(2.3rem, 5vw, 5rem)",
                      }}>
                      {blog.title}
                    </h1>

                    <p className="lead mt-3 mark">
                      Written by {(blog.postedBy) ?
                        (
                          <Link href={`/profile/${blog.postedBy.username}`} passHref>
                            <a>{blog.postedBy.username}</a>
                          </Link>
                        ) : (
                          <a className="text-muted">&lt; User Removed &gt;</a>
                        )
                      } | Published {moment(blog.updatedAt).fromNow()}
                    </p>

                    <div className="pb-3">
                      {showBlogCategories(blog)}
                      {showBlogTags(blog)}
                      <br />
                      <br />
                    </div>

                  </div>

                </section>

              </div>

              <div className="container">
                <section>
                  <div className="col-md-12 lead main-blog-body">
                    {renderHTML(blog.body)}
                  </div>
                </section>
              </div>

              <div className="container pb-5">
                <h4 className="text-center pt-5 pb-5 h2">Related Blogs</h4>
                <hr />

                {/* {JSON.stringify(relatedBlogs)} */}
                <div className="row ml-4 mr-4" style={{ display: 'flex' }}>{showRelatedBlogs()}</div>

              </div>

              <hr />

              <div className="container pt-5 pb-5">
                {showComments()}
              </div>

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
    return { };
  });
};
*/

//-------------------------------------------




export default SingleBlog;
// export default withRouter(SingleBlog); // Not needed now since we are getting the router details from backend itself when we are loading the data using getInitialProps using 'query'
