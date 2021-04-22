// Dynamic SSR rendered page
// User Public Profile Page

import Head from 'next/head'; // Useful for page metadata
import Link from 'next/link';
import React from 'react';
// import { withRouter } from 'next/router'; // to grab Router query details (to get the slug from the url) - We have removed it because we are ggeting these details from server side 'query' and getting data through props - getInitialProps
import Layout from '../../components/Layout';
import { userPublicProfile } from '../../actions/userAction'; // Function defined in actions for fetching User Public Profile (with user blogs) from backend
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import moment from 'moment'; // for displaying date-time in readable format (' few minutes ago ')

import ContactForm from '../../components/form/ContactFormComponent'; // Contact Form Component



// -------------------------------------------------------

const UserProfile = ({ user, blogs, query }) => {


  // ------------------- PAGE HEAD --------------------
  const head = () => (

    <Head>

      <title>{user.name} - {user.username} | {APP_NAME}</title>
      <meta
        name="description"
        content={`Blogs by ${user.name} | ${user.username}`} />

      <link rel="canonical" href={`${DOMAIN}/profile/${query.username}`} />


      <meta property="og:title" content={`${user.username} | ${APP_NAME}`} />
      <meta
        property="og:description"
        content={`Blogs by ${user.username}`} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/profile/${query.username}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      {/* Note: Below we have set the common static image for this page, but you can later change that to User Photo or anything */}
      <meta property="og:image" content={`${DOMAIN}/static/images/web-logo-512.png`} />
      <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/web-logo-512.png`} />
      <meta property="og:image:type" content="image/png" />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />

    </Head>
  );
  // ------------------- PAGE HEAD ENDS  --------------------





  // ------------------------------------------------

  const showUserBlogs = () => {
    return blogs.map((blog, i) => {

      return (
        <div className="mt-4 mb-4" key={i}>
          <Link href={`/blogs/${blog.slug}`}>
            <a className="lead">{blog.title}</a>
          </Link>
        </div>
      );

    });
  };




  // ===================================================

  return (
    <React.Fragment>

      {head()}

      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">


                  <div className="row">

                    <div className="col-md-8">
                      <h5>{user.name}</h5>
                      {/* <Link href={`${user.profile}`} passHref><a>View Profile</a></Link> */}
                      <Link href={`/profile/${user.username}`} passHref><a>View Profile</a></Link>
                      <p className="text-muted">Joined {moment(user.createdAt).fromNow()}</p>
                    </div>

                    <div className="col-md-4">
                      <img
                        src={`${API}/user/photo/${user.username}`}
                        className="img img-fluid img-thumbnail mb-3"
                        style={{ maxHeight: '150px', maxWidth: '100%' }}
                        alt="User Profile Photo"
                      />

                    </div>

                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>


        <br />

        <div className="container pb-5">
          <div className="row">


            <div className="col-md-6">
              <div className="card">
                <div className="card-body">

                  <h5 className="card-title bg-primary pt-4 pb-4 pl-4 pr-4 text-light">Recent Blogs by {user.name}</h5>

                  {showUserBlogs()}

                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card">
                <div className="card-body">

                  <h5 className="card-title bg-primary pt-4 pb-4 pl-4 pr-4 text-white">Message {user.name}</h5>

                  <br />

                  <ContactForm authorEmail={user.email} authorName={user.name} />

                </div>
              </div>
            </div>

          </div>
        </div>

      </Layout>


    </React.Fragment>
  );
};

// ==============================================

// Since this is a Server Side Rendered Page (SSR) (bcoz we want user's public profile to be available on Google, SEO :) .
// For SSR to work, therefore using getInitialProps() to make it Run on the server itself on the first page request/load.

UserProfile.getInitialProps = ({ query }) => {

  // console.log("_______________ Query Passed (username): ", query); // output =>  { username: 'humblebee' } // 'username' property is from the page name

  return userPublicProfile(query.username).then(data => {
    // console.log("__________________ Data from Backend : ", data);

    if (data === undefined)  // 'undefined' because the backend didn't return any response
    {
      console.log("Backend Connection Failure!! (No response from userAction)");

      return;
    }
    if (data.error) {
      console.log("Error @[username] -->", data.error);
      // 400, error: User Not Found ! Show Error on this page (or redirect or Error page)
      return;
    }
    else {
      // console.log("Data Received (from backend) : ================> ", data.user);
      // console.log("Blogs Received for this user (from backend) : ================> ", data.blogs);

      return { user: data.user, blogs: data.blogs, query };
      // Response (received from Backend (userController)): User -> user public profile , blogs -> Blogs by this user
    }
  });

};





export default UserProfile;