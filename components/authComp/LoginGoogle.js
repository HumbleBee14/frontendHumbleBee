// Google Login Component

// import Link from "next/link";
import React, { useState, useEffect } from "react";
import Router from "next/router";
import { loginWithGoogle, authenticate, isAuth } from "../../actions/authAction";
import { GOOGLE_CLIENT_ID } from '../../config';
import { GoogleLogin } from 'react-google-login'; // A Google oAUth Sign-in / Log-in Component for React



// --------------------------------------------------------------

const LoginGoogle = () => {

  const responseGoogle = response => {
    // console.log(response); // check to see what response do we get after login (including token)
    const tokenId = response.tokenId;
    const user = { tokenId };

    // make login request to backend
    loginWithGoogle(user).then(data => {
      // Error Handling
      if (data === undefined) {
        // console.log("GoogleSignin Unable to connect to backend");
        return; //  if the backend server is down
      }

      // Temporary DISABLE google login!
      // return;

      //------------------------
      if (data.error) {
        console.log("Google login error : ", data.error);
      } else {
        // Note: data has token & user info

        // Save user token to Cookie
        // Save user info to localstorage
        // Authenticate the user
        authenticate(data, () => {
          if (isAuth() && isAuth().role === 1) {
            Router.push(`/admin`); // role = 1
          } else {
            Router.push(`/user`); // role = 0 (Default)
          }
        });

      }
    })
      .catch(err => {
        console.log("GLogin Catch Error --> ", err);
      });

  };


  // ---------------- render Google Login interface ----------------
  return (

    <div className="pb-3">

      <GoogleLogin
        clientId={`${GOOGLE_CLIENT_ID}`}
        // render={renderProps => (<button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>)} //Google button without styling or custom button
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      // isSignedIn={true}
      // uxMode="redirect" // popup (default) or redirect
      // theme="dark"
      // cookiePolicy={'single_host_origin'}
      />

    </div>

  );
};


export default LoginGoogle;