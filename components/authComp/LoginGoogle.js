// Google Login Component

// import Link from "next/link";
import React, { useState, useEffect } from "react";
import Router from "next/router";
import { loginWithGoogle, authenticate, isAuth } from "../../actions/authAction";
import { GOOGLE_CLIENT_ID } from '../../config';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';



// --------------------------------------------------------------

const LoginGoogle = () => {

  const handleGoogleLoginSuccess = (credentialResponse) => {
    // credentialResponse contains the credential (JWT)
    const tokenId = credentialResponse.credential;
    const user = { tokenId };

    loginWithGoogle(user).then(data => {
      if (data === undefined) return;
      if (data.error) {
        console.log("Google login error : ", data.error);
      } else {
        authenticate(data, () => {
          if (isAuth() && isAuth().role === 1) {
            Router.push(`/admin`);
          } else {
            Router.push(`/user`);
          }
        });
      }
    }).catch(err => {
      console.log("GLogin Catch Error --> ", err);
    });
  };


  // ---------------- render Google Login interface ----------------
  return (
    <div className="pb-3">
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={() => console.log('Google Login Failed')}
          width="100%"
        />
      </GoogleOAuthProvider>
    </div>
  );
};


export default LoginGoogle;