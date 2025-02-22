import Layout from '../components/Layout';
import Link from 'next/link';
import Head from 'next/head';
import { DOMAIN, APP_NAME, FB_APP_ID } from '../config';

// import UnderMaintSvg from '../public/static/images/svgs/tructor_svg.svg';

// import FetchQuote from "../components/quotesFetch";


// import Cookies from 'js-cookie';


// --------------------------------------------------------------------

// ------------------------ PAGE HEAD ---------------------------
// Working on page metadata - < HEAD > section

const head = () => (

  <Head>

    <title>{APP_NAME}</title>
    <meta
      name="description"
      content="Programming blogs and blogs on some random topics by a budding Software Engineers" />

    <link rel="canonical" href={`${DOMAIN}`} />


    <meta property="og:title" content={`HumblebBee Programming Blogs | ${APP_NAME}`} />
    <meta
      property="og:description"
      content="Programming Blogs by Dinesh" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={`${DOMAIN}`} />
    <meta property="og:site_name" content={`${APP_NAME}`} />
    <meta property="og:image" content={`${DOMAIN}/static/images/web-logo-HumbleBee.jpg`} />
    <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/web-logo-HumbleBee.jpg`} />
    <meta property="og:image:type" content="image/jpg" />
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

        {/* <FetchQuote /> */}


        <article className="overflow-hidden">
          <div className="container">
            <div className="row">

              <div className="col-md-12 text-center">
                <h1
                  style={{
                    // display: 'inline',
                    fontSize: "calc(2em + 1.5vw)",
                  }}
                  className="display-4 font-weight-bold pl-20 pr-20 ">
                  {/* <small className="text-muted">- - - - - - - - - - - - -</small> */}
                  {/* <br /> */}
                   Tech Blogs <p className="text-muted"></p>
                </h1>
              </div>

            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center pt-4 pb-5">
                <p className="lead">
                  Blogs on various topics that I find interesting.<br />You can share too !🙂
              </p>
              </div>
            </div>
          </div>


          <div className="container-fluid">
            <div className="row">

              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="flip flip-horizontal">
                  <div className="front" style={{ backgroundImage: 'url(/static/images/pexels-photo-min.jpg)' }}>
                    <h2 className="text-shadow text-center h1">Machine Learning</h2>
                  </div>
                  <div className="back text-center">
                    <Link href="/categories/machine-learning">
                      <a><h3 className="h1">Machine Learning</h3></a>
                    </Link>
                    <p className="lead">Hot dog or Not hot dog? I don't know, even I'm training my Model👨‍💻</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="flip flip-horizontal">
                  <div className="front" style={{ backgroundImage: 'url(/static/images/pexels-antonio-batinic-min.jpg)' }}>
                    <h2 className="text-shadow text-center h1">Software Development</h2>
                  </div>
                  <div className="back text-center">
                    <Link href="/categories/Software">
                      <a><h3 className="h1">Software Development</h3></a>
                    </Link>
                    <p className="lead">Do you like Building, Creating, and Crashing things? Are you a Coding Ninja?🐱‍👤</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="flip flip-horizontal">
                  <div className="front" style={{ backgroundImage: 'url(/static/images/pexels-pixabay-min.jpg)' }}>
                    <h2 className="text-shadow text-center h1">Electronics</h2>
                  </div>
                  <div className="back text-center">
                    <Link href="/categories/electronics">
                      <a><h3 className="h1">Electronics</h3></a>
                    </Link>
                    <p className="lead">It all started with a Shock ⚡ What's your current state (+) or (-)?</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="flip flip-horizontal">
                  <div className="front" style={{ backgroundImage: 'url(/static/images/blockchain-bg.png)' }}>
                    <h2 className="text-shadow text-center h1">Blockchain</h2>
                  </div>
                  <div className="back text-center">
                    <Link href="/categories/blockchain">
                      <a><h3 className="h1">Blockchain</h3></a>
                    </Link>
                    <p className="lead">Decentralization, Cryptos, Smart Contracts - The future is here! 🔗</p>
                  </div>
                </div>
              </div>

            </div>
          </div>


        </article>

        <br />
        <hr />
        <br />



        <div className="container">
          <div className="row">

            <div className="col-md-8">

              <div className="front">

              </div>

            </div>

            <div className="col-md-4 text-muted">

              <div className="front">
                <h2 style={{
                  position: 'absolute',
                  // bottom: '0px',
                  display: 'block',
                  left: '0px',
                  height: 'auto',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: '10px',
                  textAlign: 'justify'
                }}>
                  {/* Under Development <br />💨💨💨 */}
                </h2>

              </div>

            </div>

          </div>
        </div>

      </Layout>

    </div >

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