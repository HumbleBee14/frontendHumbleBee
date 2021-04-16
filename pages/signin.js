import Layout from '../components/Layout';
import { withRouter } from 'next/router'; // to grab the router query as prop
import SigninComponent from '../components/authComp/SigninComponent';
import { stringify } from 'query-string';


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

        <h2 className="text-center pt-4 pv-4">Let's Signin 😎</h2>
        <br />

        <div className="row">
          <div className="col-md-6 offset-md-3">
            {showRedirectMessage()}
          </div>
        </div>

        {/* {JSON > stringify(router)} */}

        <div className="row">
          <div className="col-md-6 offset-md-3">

            <SigninComponent />

          </div>
        </div>

      </div>

    </Layout>
  );
};

export default withRouter(Signin);