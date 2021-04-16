// Activate Account Page Component

import { useState, useEffect } from 'react';
import { withRouter } from 'next/router'; // to get router parameters (for grabbing token ID from the url )

import Layout from '../../../../components/Layout';
import { signup } from '../../../../actions/authAction';

// To decode the jwt TOKEN(to get new user data(name, email, password) from the token url);
import jwt from 'jsonwebtoken';
import { loadGetInitialProps } from 'next/dist/next-server/lib/utils';


// ===========================================================
// Activate Account Component


const ActivateAccount = ({ router }) => {

  const [values, setValues] = useState({
    name: '',
    token: '',
    error: '',
    loading: false,
    success: false,
    showButton: true
  });


  const { name, token, error, loading, success, showButton } = values;

  // run the below effect code whenever the router changes
  useEffect(() => {
    // set the token & name
    let token = router.query.id; // from router / url

    if (token) {
      const { name } = jwt.decode(token); // grabbing user's 'name' from the token (decoding)
      // Note: Instead of decoding data here, we can decode it on the Backend also.

      setValues({ ...values, name, token }); // saving name & token in state and make it available across this component
    }
  }, [router]);


  // submit handler

  const clickSubmit = e => {
    e.preventDefault();

    setValues({ ...values, loading: true, error: false });

    // sending new Validated (clicked the validation link through his email sent from us) user's information to Backend to Signup and create account in Database by sending user's data through the 'token' which has name, email, password encrypted signed in jwt token, created while preSignup
    // token => has data {name, email, password}

    signup({ token }).then(data => {

      if (data.error) {
        setValues({ ...values, error: data.error, loading: false, showButton: false });
      } else {
        setValues({ ...values, loading: false, success: true, showButton: false });
      }
    });
  };


  // ------------------------

  const showLoading = () => loading ? (<h2><span class="spinner-grow spinner-grow-sm"></span>  Loading...</h2>) : '';




  // ----------------- render ----------------

  return (
    <Layout>
      <div className="container">
        <h3 className="pb-4">Hey {name}, Ready to activate your account?</h3>

        {showLoading()}

        {/* // if there's any error, show error */}
        {error && error}

        {/* // If success = true, account created , show this Message  */}
        {success && 'You have successfully activated your account. Please signin'}

        {showButton && <button onClick={clickSubmit} className="btn btn-outline-primary">Activate Account</button>}

      </div>
    </Layout>
  );




};


export default withRouter(ActivateAccount);
