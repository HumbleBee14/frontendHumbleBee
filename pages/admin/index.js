import Layout from '../../components/Layout';
import Admin from '../../components/authComp/Admin';
import Link from 'next/link';
import Head from 'next/head';
import { DOMAIN, APP_NAME, FB_APP_ID } from '../../config';


// ------------------------ PAGE HEAD ---------------------------
// Working on page metadata - < HEAD > section

const head = () => (

  <Head>

    <title>Dashboard | {APP_NAME}</title>
    <meta
      name="description"
      content="User Dashboard. Manage account, profile and blogs." />

    <link rel="canonical" href={`${DOMAIN}/admin`} />

    <meta property="og:title" content={`Dashboard | ${APP_NAME}`} />
    <meta
      property="og:description"
      content="User Dashboard. Manage account, profile and blogs." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={`${DOMAIN}/admin`} />
    <meta property="og:site_name" content={`${APP_NAME}`} />
    <meta property="og:image" content={`${DOMAIN}/static/images/web-logo-HumbleBee.jpg`} />
    <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/web-logo-HumbleBee.jpg`} />
    <meta property="og:image:type" content="image/jpg" />
    <meta property="fb:app_id" content={`${FB_APP_ID}`} />

  </Head>
);

// --------------------------------------------------------------------



const AdminIndex = () => {


  // -----------------------------

  return (
    <div>

      {head()}

      <Layout>

        <Admin>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 pt-5 pb-5">
                <h2 style={{ textAlign: "center" }}> ADMIN Dashboard 🕵️‍♀️ </h2>
              </div>

              <div className="col-md-4">
                {/* LEFT SIDE LIST*/}
                <ul className="list-group">

                  <li className="list-group-item">
                    {/* <Link href="/admin/crud/category-tag" passHref> */}
                    <a href="/admin/crud/category-tag">Create Category & Tags</a>
                    {/* // Forcing Page Reload/Refresh on clicking Create Category (by using <a> tag and Not using <Link>) above so that all the scripts & css gets properly loaded (for text editor-quill) */}
                  </li>

                  <li className="list-group-item">
                    <Link href="/admin/crud/blog" passHref>
                      <a>Create New Blog</a>
                    </Link>
                  </li>


                  <li className="list-group-item">
                    <Link href="/admin/crud/blogs" passHref>
                      <a>Update/Delete Blog</a>
                    </Link>
                  </li>


                  <li className="list-group-item">
                    <Link href="/user/update" passHref>
                      <a>Update Profile</a>
                    </Link>
                  </li>

                </ul>

              </div>

              <div className="col-md-4">

                {/* RIGHT SIDE LIST */}

              </div>

            </div>
          </div>
        </Admin>

      </Layout>
    </div>
  );
};

export default AdminIndex;