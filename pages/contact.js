// Contact us Form Page

import Layout from '../components/Layout';
// import Link from 'next/link';
import Head from 'next/head';
import { DOMAIN, APP_NAME, FB_APP_ID } from '../config';
import ContactForm from '../components/form/ContactFormComponent'; // Contact Form Component


// ------------------------ PAGE HEAD ---------------------------
// Working on page metadata - < HEAD > section

const head = () => (

  <Head>

    <title>Contact | {APP_NAME}</title>
    <meta
      name="description"
      content="Contact HumbleBee. Contact us HumbleBee.live" />

    <link rel="canonical" href={`${DOMAIN}/contact`} />

    <meta property="og:title" content={`Contact | ${APP_NAME}`} />
    <meta
      property="og:description"
      content="Contact HumbleBee. Contact us HumbleBee.live" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={`${DOMAIN}/contact`} />
    <meta property="og:site_name" content={`${APP_NAME}`} />
    <meta property="og:image" content={`${DOMAIN}/static/images/web-logo-HumbleBee.jpg`} />
    <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/web-logo-HumbleBee.jpg`} />
    <meta property="og:image:type" content="image/jpg" />
    <meta property="fb:app_id" content={`${FB_APP_ID}`} />

  </Head>
);

// --------------------------------------------------------------------



const Contact = () => {

  // ---------------------------------
  return (

    <div>

      {head()}

      <Layout>

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8 offset-md-2">

              <h2 style={{ textAlign: "center" }}>
                Contact Form
            </h2>

              <hr />

              <ContactForm />

            </div>
          </div>
        </div>

      </Layout>
    </div>
  );
};

export default Contact;