import Layout from '../components/Layout';
import Head from 'next/head';
import { DOMAIN, APP_NAME, FB_APP_ID } from '../config';

import SignupComponent from '../components/authComp/SignupComponent';
// import Link from 'next/link';


// ------------------------ PAGE HEAD ---------------------------
// Working on page metadata - < HEAD > section

const head = () => (

  <Head>

    <title>Signup | {APP_NAME}</title>
    <meta
      name="description"
      content="Signup on grepGuru. Join grepguru.com" />

    <link rel="canonical" href={`${DOMAIN}/signup`} />

    <meta property="og:title" content={`Signup | ${APP_NAME}`} />
    <meta
      property="og:description"
      content="Signup on grepGuru. Join grepguru.com" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={`${DOMAIN}/signup`} />
    <meta property="og:site_name" content={`${APP_NAME}`} />
    <meta property="og:image" content={`${DOMAIN}/static/images/web-logo-HumbleBee.jpg`} />
    <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/web-logo-HumbleBee.jpg`} />
    <meta property="og:image:type" content="image/jpg" />
    <meta property="fb:app_id" content={`${FB_APP_ID}`} />

  </Head>
);

// --------------------------------------------------------------------



const Signup = () => {

  // -----------------
  return (
    <div>

      {head()}

      <Layout>
        <div className="container-fluid">
          <br />
          <h2 className="text-center pt-5 pv-4" style={{ fontWeight: "bold" }}>Signup</h2>
          <p className="text-center pt-4 pv-4">Let's begin your onboarding process 👩‍🚀</p>
          <br />
          {/* <Link href="/" passHref><a>Home</a></Link> */}
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <SignupComponent />
            </div>
          </div>

        </div>
      </Layout>
    </div>
  );
};

export default Signup;