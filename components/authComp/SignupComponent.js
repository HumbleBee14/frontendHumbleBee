import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { preSignup, signup, isAuth } from '../../actions/authAction'; // frontend to backend data transfer and getting back response from backend to here using "signup"
import LoginGoogle from './LoginGoogle';

const SignupComponent = () => {

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    loading: false,
    message: '',
    showForm: true
  });

  const { name, email, password, error, loading, message, showForm } = values;

  // If User is already Authenticated (logged in), then redirect it to Homepage (if we directly click / enter Signup URL manually)
  useEffect(() => {
    isAuth() && Router.push(`/`);
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('handle submit');
    // console.table({ name, email, password, error, loading, message, showForm });

    // Before we Submit values (to backend), we are setting values in 'state'
    setValues({ ...values, loading: true, error: false });
    //'loading' -  when we start submitting, we set it to TRUE and once we get the response, we set it to False

    // To create New User
    const user = { name, email, password };

    // signup(user).then(...)  // Disabled this because first we will Verify Account Email using preSignup method, then only we will initiate the account creation using signup later
    preSignup(user).then(data => {

      // Error handling
      if (data === undefined) {
        console.log("Error connecting to backend service for Signup");
        setValues({ ...values, error: "Error connecting Sign up service", loading: false });
        return;
      }

      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      }
      else {
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          error: '',
          loading: false,
          message: data.message, // response from backend
          showForm: false
        });
      }
    })
      .catch(err => {
        console.log("Error signing up user --> ", err);
        setValues({ ...values, error: err, loading: false });
      });
  };

  // e = event

  const handleChange = name => (e) => {
    // console.log(e.target.value);
    setValues({ ...values, error: false, [name]: e.target.value });
  };
  // name = here (above only) is generic for all - name, email, password

  /* try these loading icons - https://www.w3schools.com/bootstrap4/bootstrap_buttons.asp
  <span className="spinner-grow spinner-grow-sm"></span> Loading...
  <span className="spinner-border spinner-border-sm"></span> Loading...
   */

  const showLoading = () => (loading ? <div className="alert alert-info"><span className="spinner-grow spinner-grow-sm"></span> <strong> Loading...</strong></div> : '');
  const showError = () => (error ? <div className="alert alert-danger alert-dismissible fade show">{error}</div> : '');
  const showMessage = () => (message ? <div className="alert alert-info alert-dismissible fade show">{message}</div> : '');

  // -----------------------------------------------

  const signupForm = () => {



    return (
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <input
            value={name}
            onChange={handleChange('name')}
            type="text"
            className="form-control"
            placeholder="Type your name"
            required />
        </div>

        <div className="form-group">
          <input
            autoComplete="off"
            value={email}
            onChange={handleChange('email')}
            type="email"
            className="form-control"
            placeholder="Type your email"
            required />
        </div>

        <div className="form-group">
          <input
            autoComplete="off"
            value={password}
            onChange={handleChange('password')}
            type="password"
            className="form-control"
            placeholder="Type your password"
            required />
        </div>

        <div>
          <button className="btn btn-primary">Signup</button>
        </div>

      </form>
    );
  };

  // -----------------------------------------------------------
  return (
    <React.Fragment>
      {showError()}
      {showLoading()}
      {showMessage()}

      {/* <LoginGoogle /> */}

      {/*  'signupForm()' will be displayed only when showForm is TRUE */}
      {showForm && signupForm()}

      <br />
      <br />
      <br />

      <div className="row">

        <div className="pl-2 pt-2">
          <Link href="/signin" className="btn btn-outline-primary btn-sml">
            Already have account?
          </Link>
        </div>

        <div className="pl-2 pt-2">
          <Link href="/auth/password/forgot" className="btn btn-outline-secondary btn-sml">
            Forgot Password?
          </Link>
        </div>

      </div>


    </React.Fragment>
  );
};

export default SignupComponent;