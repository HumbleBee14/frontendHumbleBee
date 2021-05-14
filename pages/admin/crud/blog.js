import Layout from '../../../components/Layout';
import Admin from '../../../components/authComp/Admin';
import BlogCreate from '../../../components/crud/BlogCreateComponent';
// import Link from 'next/link';
import Head from 'next/head';
import { DOMAIN, APP_NAME, FB_APP_ID } from '../../../config';


// ------------------------ PAGE HEAD ---------------------------
// Working on page metadata - < HEAD > section

const head = () => (

  <Head>

    <title>New Blog | {APP_NAME}</title>
    <meta
      name="description"
      content="Write a blog on HumbleBee. Create a new Blog on HumbleBee.live" />

    <link rel="canonical" href={`${DOMAIN}/admin/crud`} />

    <meta property="og:title" content={`New Blog | ${APP_NAME}`} />
    <meta
      property="og:description"
      content="Write a blog on HumbleBee. Create a new Blog on HumbleBee.live" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={`${DOMAIN}/admin/crud`} />
    <meta property="og:site_name" content={`${APP_NAME}`} />
    <meta property="og:image" content={`${DOMAIN}/static/images/web-logo-HumbleBee.jpg`} />
    <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/web-logo-HumbleBee.jpg`} />
    <meta property="og:image:type" content="image/jpg" />
    <meta property="fb:app_id" content={`${FB_APP_ID}`} />

  </Head>
);

// --------------------------------------------------------------------




const NewBlog = () => {

  return (

    <div>

      {head()}

      <Layout>

        <Admin>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 pt-2 pb-3">
                <h2 style={{}}>
                  Create a new Blog 👩‍🏫</h2>
              </div>

              <div className="col-md-12">

                <BlogCreate />

              </div>

            </div>
          </div>
        </Admin>

      </Layout>
    </div>
  );
};

export default NewBlog;