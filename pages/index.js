import Layout from '../components/Layout';
import Link from 'next/link';
import Head from 'next/head';
import { DOMAIN, APP_NAME, FB_APP_ID } from '../config';

// import Cookies from 'js-cookie';


// --------------------------------------------------------------------

// ------------------------ PAGE HEAD ---------------------------
// Working on page metadata - < HEAD > section

const head = () => (

  <Head>

    <title>{APP_NAME}</title>
    <meta
      name="description"
      content="Programming blogs and blogs on some random topics by a budding Software Engineer : HumbleBee" />

    <link rel="canonical" href={`${DOMAIN}`} />


    <meta property="og:title" content={`HumblebBee Programming Blogs | ${APP_NAME}`} />
    <meta
      property="og:description"
      content="Programming Blogs by HumbleBee" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={`${DOMAIN}`} />
    <meta property="og:site_name" content={`${APP_NAME}`} />
    <meta property="og:image" content={`${DOMAIN}/static/images/web-logo-512.png`} />
    <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/web-logo-512.png`} />
    {/* <meta property="og:image:type" content="image/png" /> */}
    <meta property="fb:app_id" content={`${FB_APP_ID}`} />

  </Head>
);

// --------------------------------------------------------------------






// ================================================================================
const Index = () => {
  // console.log('This is Index Page !');

  // ----------------------------------------------------------
  return (

    <div>

      {head()}

      <Layout>

        <article className="overflow-hidden">
          <div className="container">
            <div className="row">

              <div className="col-md-12 text-center">
                <h1 className="display-4 font-weight-bold">
                  PROGRAMMING & WEB DEVELOPMENT BLOGS
              </h1>
              </div>

            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center pt-4 pb-5">
                <p className="lead">
                  Blogs on various topics that interest me 😵<br />You can share too !🙂
              </p>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-4">
                <div className="flip flip-horizontal">
                  <div
                    className="front"
                    style={{
                      backgroundImage:
                        'url(' +
                        'https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg' +
                        ')'
                    }}>

                    <h2 className="text-shadow text-center h1">Machine Learning</h2>
                  </div>
                  <div className="back text-center">
                    <Link href="/categories/machine-learning">
                      <a>
                        <h3 className="h1">Machine Learning</h3>
                      </a>
                    </Link>

                    <p className="lead">Hot dog or Not hot dog?<br />I don't know, even I'm training my Model👨‍💻<br />Nope, It's not bunch of if-else (-_-)</p>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="flip flip-horizontal">
                  <div
                    className="front"
                    style={{
                      backgroundImage:
                        'url(' +
                        'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?cs=srgb&dl=pexels-antonio-batini%C4%87-4164418.jpg' +
                        ')'
                    }}>

                    <h2 className="text-shadow text-center h1">Web Development</h2>
                  </div>
                  <div className="back text-center">
                    <Link href="/categories/web-development">
                      <a>
                        <h3 className="h1">Web Development</h3>
                      </a>
                    </Link>
                    <p className="lead">
                      Do you like building, creating, and Crashing things?<br />Are you a JavaScript Ninjas?🐱‍👤<br />
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="flip flip-horizontal">
                  <div
                    className="front"
                    style={{
                      backgroundImage:
                        'url(' +
                        'https://images.pexels.com/photos/414860/pexels-photo-414860.jpeg?cs=srgb&dl=pexels-pixabay-414860.jpg' +
                        ')'
                    }}>

                    <h2 className="text-shadow text-center h1">Electronics</h2>
                  </div>
                  <div className="back text-center">
                    <Link href="/categories/electronics">
                      <a>
                        <h3 className="h1">Electronics</h3>
                      </a>
                    </Link>
                    <p className="lead">It all started with a spark ⚡<br />Don't be a resistance, be a good conductor.<br />You are an Inductor or Capacitor?<br />What is your curent state?
                  </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </article>

      </Layout>

    </div>

  );
};

export default Index;


/*
 <h2>Index Page :)</h2>
// This Refreshes/reloads the Whole page everytime
// <a href="/signup">Signup</a>

// This LINK just changes the Component instead of refreshing/reloading the page

<Link href="/signup" passHref>
  <a>Signup</a>
</Link>
*/