import Layout from '../../components/Layout';
import Private from '../../components/authComp/Private';
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

    <link rel="canonical" href={`${DOMAIN}/user`} />

    <meta property="og:title" content={`Dashboard | ${APP_NAME}`} />
    <meta
      property="og:description"
      content="User Dashboard. Manage account, profile and blogs. " />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={`${DOMAIN}/user`} />
    <meta property="og:site_name" content={`${APP_NAME}`} />
    <meta property="og:image" content={`${DOMAIN}/static/images/web-logo-HumbleBee.jpg`} />
    <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/web-logo-HumbleBee.jpg`} />
    <meta property="og:image:type" content="image/jpg" />
    <meta property="fb:app_id" content={`${FB_APP_ID}`} />

  </Head>
);

// --------------------------------------------------------------------


const UserIndex = () => {
  // console.log('This is Index Page !');
  // ----------------------------------
  return (

    <div>

      {head()}

      <Layout>

        <Private>


          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 pt-5 pb-5">
                <h2 style={{ textAlign: "center" }}>User Dashboard 👨‍🚀</h2>
              </div>

              <div className="col-md-4">
                {/* LEFT SIDE LIST*/}
                <ul className="list-group">

                  {/* <li className="list-group-item">
                  <a href="/admin/crud/category-tag">Create Category</a>
                </li>
// Disabled these because only Admin is allowed to create categories and tags
                <li className="list-group-item">
                  <Link href="/admin/crud/category-tag" passHref>
                    <a>Create Tag</a>
                  </Link>
                </li> */}


                  <li className="list-group-item">
                    <Link href="/user/crud/blog">Create New Blog</Link>
                  </li>


                  <li className="list-group-item">
                    <Link href="/user/crud/blogs">Update/Delete Blog</Link>
                  </li>

                  <li className="list-group-item">
                    <Link href="/user/update">Update Profile</Link>
                  </li>


                  <li className="list-group-item">
                    <Link href={`/`}>Your Public Profile</Link>
                  </li>


                </ul>

              </div>

              <div className="col-md-4">

                {/* RIGHT SIDE LIST */}

              </div>

            </div>
          </div>

        </Private>

      </Layout>

    </div>
  );
};

export default UserIndex;