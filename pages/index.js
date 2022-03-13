import Layout from '../components/Layout';
import Link from 'next/link';
import Head from 'next/head';
import { DOMAIN, APP_NAME, FB_APP_ID } from '../config';

import UnderMaintSvg from '../public/static/images/svgs/tructor_svg.svg';

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
      content="Programming blogs and blogs on some random topics by a budding Software Engineer : grepGuru" />

    <link rel="canonical" href={`${DOMAIN}`} />


    <meta property="og:title" content={`HumblebBee Programming Blogs | ${APP_NAME}`} />
    <meta
      property="og:description"
      content="Programming Blogs by grepGuru" />
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
                   PROGRAMMING BLOGS <p className="text-muted">;)</p>
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

              <div className="col-md-4">
                <div className="flip flip-horizontal">
                  <div
                    className="front"
                    style={{
                      backgroundImage: 'url(' + '/static/images/pexels-photo-min.jpg' + ')'
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
                      // backgroundImage:'url(' +'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?cs=srgb&dl=pexels-antonio-batini%C4%87-4164418.jpg' +')'}}>
                      backgroundImage: 'url(' + '/static/images/pexels-antonio-batinic-min.jpg' + ')'
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
                    style={{ backgroundImage: 'url(' + '/static/images/pexels-pixabay-min.jpg' + ')' }}>

                    <h2 className="text-shadow text-center h1">Electronics</h2>
                  </div>
                  <div className="back text-center">
                    <Link href="/categories/electronics">
                      <a>
                        <h3 className="h1">Electronics</h3>
                      </a>
                    </Link>
                    <p className="lead">It all started with a Shock ⚡<br />To Whom? Obviously to me! 😵<br /> That's how my love story started, which made me realised that don't be a resistance, be a good conductor.<br />Anyway, What's your curent state?
                  </p>
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

                <img src={UnderMaintSvg} style={{
                  // overflow: 'hidden',
                  maxWidth: '100%',
                  height: 'auto',
                  flex: '1',
                  display: 'block',
                  // width: '100%',
                  width: 'auto',
                  resizeMode: 'contain',
                  margin: '0'
                }} />
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
                  Under Development <br />💨💨💨
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