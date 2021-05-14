import Layout from '../components/Layout';
import Head from 'next/head';
import { DOMAIN, APP_NAME, FB_APP_ID } from '../config';
import { withRouter } from 'next/router'; // to grab the router query as prop
import SigninComponent from '../components/authComp/SigninComponent';
// import { stringify } from 'query-string';



// ------------------------ PAGE HEAD ---------------------------
// Working on page metadata - < HEAD > section

const head = () => (

  <Head>

    <title>Signin | {APP_NAME}</title>
    <meta
      name="description"
      content="Signin on HumbleBee" />

    <link rel="canonical" href={`${DOMAIN}/signin`} />

    <meta property="og:title" content={`Signin | ${APP_NAME}`} />
    <meta
      property="og:description"
      content="Signin on HumbleBee" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={`${DOMAIN}/signin`} />
    <meta property="og:site_name" content={`${APP_NAME}`} />
    <meta property="og:image" content={`${DOMAIN}/static/images/web-logo-HumbleBee.jpg`} />
    <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/web-logo-HumbleBee.jpg`} />
    <meta property="og:image:type" content="image/jpg" />
    <meta property="fb:app_id" content={`${FB_APP_ID}`} />

  </Head>
);

// --------------------------------------------------------------------




const Signin = ({ router }) => {
  // console.log('This is Signin Page !');

  const showRedirectMessage = () => {
    if (router.query.message) {
      return <div className="alert alert-danger alert-dismissible fade show">{router.query.message}</div>;
    }
    else {
      return;
    }
  };


  // -------------------------------------------------
  return (

    <div>

      {head()}

      <Layout>

        <div className="container-fluid">
          <br />
          <h2 className="text-center bold pt-5 pv-4" style={{ fontWeight: "bold" }}>Welcome Back to HumbleBee</h2>
          <p className="text-center pt-3 pv-4"><b>Sign in</b> to continue to your account.</p>
          <br />

          {/* <div className="row"> */}
          {/* <div className="col-md-6 offset-md-3"> */}
          <div className="container" style={{ display: "flex", justifyContent: "center" }}>
            <div className="box">
              {showRedirectMessage()}
            </div>
          </div>

          {/* {JSON > stringify(router)} */}

          {/* <div className="row"> */}
          {/* <div className="col-md-6 offset-md-3"> */}
          <div className="container" style={{ display: "flex", justifyContent: "center" }}>
            <div className="box" style={{
              flexGrow: "0.4",
              // border: "solid"
            }}>

              <SigninComponent />

            </div>
          </div>

        </div >

      </Layout>

    </div>
  );
};

export default withRouter(Signin);