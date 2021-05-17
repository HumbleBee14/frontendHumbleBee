import Router from 'next/router';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { signin, authenticate, isAuth } from '../../actions/authAction'; // frontend to backend data transfer and getting back response from backend to here using "signup"
import LoginGoogle from './LoginGoogle';







// ---------------------------------------------------------------------------

const SigninComponent = () => {

  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    message: '',
    showForm: true
  });

  const { email, password, error, loading, message, showForm } = values;


  // If User is already Authenticated (logged in), then redirect it to Homepage (if we directly click / enter Signin URL manually)
  useEffect(() => {
    isAuth() && Router.push(`/`);
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    // console.table({ name, email, password, error, loading, message, showForm });

    // Before we Submit values (to backend), we are setting values in 'state'
    setValues({ ...values, loading: true, error: false });
    //'loading' -  when we start submitting, we set it to TRUE and once we get the response, we set it to False

    // 

    // Note:  Below, we are passing 'signin' function the user login details, that it'll pass eventually to Backend from authAction.js file via POST request and it'll receive back the Response back from backend (user info and token for authentication) and that response is captured here in 'data' object variable.

    const user = { email, password };

    signin(user)
      .then(data => {

        // Error handling
        if (data === undefined) {
          console.log("Error connecting to backend service for Login");
          setValues({ ...values, error: "Error connecting Login service", loading: false });
          return;
        }

        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        }
        else {
          // Save user token to Cookie
          // Save user info to localstorage
          // Authenticate the user (above all functionalities are implemented through authenticate function)
          authenticate(data, () => {
            // Redirecting to Dashboard (user & admin based on role ,after successfull login)

            if (isAuth() && isAuth().role === 1) {
              Router.push(`/admin`);
            }
            else {
              Router.push(`/user`);
            }
          });

        }
      })
      .catch(err => {
        console.log("Error signing in --> ", err);
        setValues({ ...values, error: err, loading: false });
      });

  };


  // -----------------------------------------------
  // e = event

  const handleChange = name => (e) => {
    // console.log(e.target.value);
    setValues({ ...values, error: false, [name]: e.target.value });
  };
  // name = here (above only) is generic for all - name, email, password



  const showLoading = () => (loading ? <div className="alert alert-info"><span className="spinner-border spinner-border-sm"></span>  Loading...</div> : '');

  const showError = () => (error ? <div className="alert alert-danger alert-dismissible fade show">{error}</div> : '');

  const showMessage = () => (message ? <div className="alert alert-info alert-dismissible fade show">{message}</div> : '');




  // ----------------------------------------------------------------
  const signinForm = () => {


    return (
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <input
            // style={{ maxWidth: "25em" }}
            value={email}
            onChange={handleChange('email')}
            type="email"
            className="form-control"
            placeholder="Type your email"
            autoComplete="off"
            required />
        </div>

        <div className="form-group">
          <input
            // style={{ maxWidth: "25em" }}
            value={password}
            onChange={handleChange('password')}
            type="password"
            className="form-control"
            placeholder="Type your password"
            autoComplete="off"
            required />
        </div>

        <div>

          <button className="btn btn-primary signin-button-style">Signin</button>

        </div>

      </form>
    );
  };

  // -------------------------------------------------------------
  return (
    <React.Fragment>


      {showError()}
      {showLoading()}
      {showMessage()}

      <LoginGoogle />

      {/*  'signinForm()' will be displayed only when showForm is TRUE */}
      {showForm && signinForm()}

      <br />
      <br />
      <br />


      <div className="row">

        <div className="pl-3 pt-2">
          <Link href="/signup">
            <a className="btn btn-outline-dark btn-sml">Create new account</a>
          </Link>
        </div>

        <div className="pl-3 pt-2">
          <Link href="/auth/password/forgot">
            <a className="btn btn-outline-danger btn-sml">Forgot Password?</a>
          </Link>
        </div>

      </div>


    </React.Fragment>
  );
};

export default SigninComponent;