// [slug].js ===> dynamic route

import Head from 'next/head'; // Useful for page metadata
// import Link from 'next/link';
import React from 'react';
import Layout from '../../components/Layout';
import { singleCategory } from '../../actions/categoryAction'; // Function defined in actions for fetching Blogs from backend
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
// import renderHTML from 'react-render-html';


import Card from '../../components/blog/BlogCardComponent';


// NOTE: This page is very Important from SEO perspective because it lists all the related blogs with similar related categories.

// This is Server Side Rendered Page (SSR) 

const Category = ({ category, blogs, query }) => { // 'category' & 'blog' is passed as PROP from the getInitialProps from the server


  // ------------------- PAGE HEAD --------------------
  const head = () => (

    <Head>

      <title>{category.name} | {APP_NAME}</title>
      <meta name="description" content={`Best Programming tutorials on ${category.name}`} />

      <link rel="canonical" href={`${DOMAIN}/categories/${query.slug}`} />


      <meta property="og:title" content={`${category.name} | ${APP_NAME}`} />
      <meta
        property="og:description"
        content={`Best Programming tutorials on ${category.name}`} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/categories/${query.slug}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />
      <meta property="og:image" content={`${DOMAIN}/static/images/web-logo-HumbleBee.jpg`} />
      <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/web-logo-HumbleBee.jpg`} />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />

    </Head>
  );
  // ------------------- PAGE HEAD ENDS  --------------------







  //----------------------------------------------------------- 
  return (
    <React.Fragment>

      {head()}


      <Layout>
        <main>
          <div className="container-fluid text-center">
            <header>
              <div className="col-md-12 pt-3">
                <h1 className="display-4 font-weight-bold">{category.name}</h1>

                {
                  blogs.map((b, i) =>
                    // (<div>
                    //   <Card key={i} blog={b} />
                    //   {/* MISTAKE In this is that the key={i} is passed to Card component instead to the List which will be printed user using map. Card is a single entity(single blog), so that doesn't need it */}
                    // </div>)

                    <article key={i}>
                      <Card blog={b} />
                    </article>
                  )
                }

              </div>
            </header>
          </div>
        </main>
      </Layout>
    </React.Fragment>
  );
};



//  --------------- ------------- ---------------------
// To make this page Server Side rendered page, we have to 'getinitialProps' to allow it to run on server itself on first page request.

/*
'getInitialProps' enables server-side rendering in a page and allows you to do initial data population, it means sending the page with the data already populated From the server. This is especially useful for SEO.
*/
// Note: getInitalProps runs on Server only on the first request (good for SEO web crwalers), and thereafter it runs on client side 

Category.getInitialProps = ({ query }) => {  // grabbing router query using {query} on server side
  return singleCategory(query.slug).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      // return { category: data };
      return { category: data.category, blogs: data.blogs, query };  // Note: returning 'query' to use for HEAD section to determine/grab domain name, slug and etc.
    }
  });
};


export default Category;