import Layout from '../components/Layout';
import { withRouter } from 'next/router'; // to grab the router query as prop
import SigninComponent from '../components/authComp/SigninComponent';
// import { stringify } from 'query-string';


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

    </Layout >
  );
};

export default withRouter(Signin);