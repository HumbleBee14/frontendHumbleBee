import fetch from 'isomorphic-fetch';
// fetch is used (as http client) to send data from frontend (client) to backend (server)

import { API } from '../config';
import Router from 'next/router';

import Cookies from 'js-cookie';



//-----------------------------------------------------------
// =======================================================================================

// -------------------------------------------------------------

// Pre Signup action ----------------------------------------------
// (presignup only sends the Account Activation Email, DO NOT CREATE Account in DB)
export const preSignup = (user) => {
  // Backend API Route (where we'll send the data)
  return fetch(`${API}/preSignup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // update with your user-agent
      'User-Agent':
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

// Difference between PreSignup and Signup is that the pre signup will not create the actual user in the DB, instead it'll initiate a request to validate the user email first and once that is done, then signup will be used to actualy create the user in the DB

// ----------------------------------------------------------




// Signup action  -------------------------------------------------

export const signup = (user) => {

  // Backend API Route endpoint (where we'll send the user data)
  return fetch(`${API}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // update with your user-agent
      'User-Agent':
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};


// We are giving/passing the .then (response - that we get back from backend) to our component SignupComponent.js


// Signin Action  -----------------------------------------------
export const signin = (user) => {
  // Backend API Route (where we will send the data)
  return fetch(`${API}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // update with your user-agent
      'User-Agent':
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
      // Note: We are passing 'response' that we get back from Backend servers (token & user info) to the Signincomponent.js to use
    })
    .catch(err => console.log(err));
};


// Signout action  ----------------------------------------------

export const signout = (next) => {
  // This happens in Browser - Removing all the info from Client Side Browser storage
  removeCookie('token'); // remove 'token' from cookie in Browser 
  removeLocalStorage('user'); // remove 'user' info from localstorage
  next();

  // Now we are sending 'signout' Request to Backend Server to Logout
  return fetch(`${API}/signout`, {
    method: 'GET'
  })
    .then(Response => {
      console.log('Signout Success');
    })
    .catch(err => console.log(err));

};


//--------------------------------------------------------
// Saving user & token in cookie and Localstorage (that we received from Backend)

// ------------- set cookie ----------------
// (pass the token in the cookie, so that we can save it for usage )

// Setting Cookie
export const setCookie = (key, value) => {
  // Checking if Process is BROWSER (client side)- bcoz Nextjs runs both on client side & server side
  if (typeof window !== 'undefined') {
    Cookies.set(key, value, {
      expires: 1
    });
  }
};

// Removing Cookie
export const removeCookie = (key) => {
  if (typeof window !== 'undefined') {
    Cookies.remove(key, {
      expires: 1
    });
  }
};

// -------- get cookie -----------
// ( get that cookie so that we can validate & authenticate the USER )
export const getCookie = (key, value) => {
  if (typeof window !== 'undefined') {
    return Cookies.get(key);
  }
};

// -------- localstorage -----------
// ( functions that'll allow us to get the information from the local storage )

export const setLocalStorage = (key, value) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// remove local Storage
export const removeLocalStorage = (key) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
};

// ------- AUTHENTICATE user by passing data[token & user data] (whenever user signin) to cookie and localstorage ---------

export const authenticate = (data, next) => {
  setCookie('token', data.token);  // Save user token to Cookie

  setLocalStorage('user', data.user);   // Save user info to localstorage

  next(); // Callback - Router.push('/') redirect mentioned in SigninComponent
};


//-------this will give us Currently logged in USER's info that is stored in localstorage if it exists -- authenticated user's info from localstorage so that we can use that info anywhere in app ------
export const isAuth = () => {
  if (typeof window !== 'undefined') {
    const cookieChecked = getCookie('token');

    if (cookieChecked) {
      if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user'));
      } else {
        return false;
      }
    }
  }
};


// -----------------------------------------------
// Update user profile info (useful for localstorage update in case of user name updates)
export const updateUser = (user, next) => { // next => callback function
  // 1) Update the locastorage
  // 2) Clear the state in Update Component

  // Check if you are at the client side (bcoz Nextjs runs on both client & server side)
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('user')) {
      let auth = JSON.parse(localStorage.getItem('user')); // Old user info
      auth = user; // now Updated info added in auth variable (from 'user' parameter)

      localStorage.setItem('user', JSON.stringify(auth)); // Updating the browser's localStorage info ('user') data

      next();
    }
  }
};


// --------------------------------------------------------------------

// Forgot Password request action -------------------------------------------------

export const forgotPassword = email => {
  // Backend API Route (where we will send the data)
  return fetch(`${API}/forgot-password`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // update with your user-agent
      'User-Agent':
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
    },
    body: JSON.stringify(email) // Note: We have to send 'email' as an json object like {email: 'xxxxxx@email.com'}
  })
    .then(response => {

      return response.json();
      // Note: We are returning 'response' that we got back from Backend servers (Response: Success (Password Reset Email link sent to user) / Error (Email not sent, due to some error at backend) response only)
    })
    .catch(err => console.log(err));
};



// Reset Password request action ----------------------------------------------------
// Note: To Reset Password, we would have to send reset Token 'resetToken' (that the User got from the link sent to his Email for password  reset/change) and the New Password 'newPassword' that the user will enter on the frontend password reset page. We are getting both these info combined in a single object 'resetInfo'

export const resetPassword = resetInfo => {
  // Backend API Route (where we will send the data)
  return fetch(`${API}/reset-password`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // update with your user-agent
      'User-Agent':
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
    },
    body: JSON.stringify(resetInfo)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};


// -------------------------------------------------------------------------------------
// Google Login 

export const loginWithGoogle = user => {
  // Backend API Endpoint Route (where we will send the data)
  return fetch(`${API}/google-login`, {
    method: 'POST',
    headers: {
      Accept: "application/json; charset=UTF-8",
      'Content-Type': 'application/json',
      // update with your user-agent
      'User-Agent':
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      // console.log();

      return response.json();
    })
    .catch(err => {
      console.log("GLogin Catch Action Error --> ", err);
    });
};


//=============================================================================;
// helper method - to handle response from backend [when you signup, signin] (useful in case of token expiry)

export const handleResponse = response => {
  if (response.status === 401) // UnauthorizedError: jwt expired
  {

    // SIGNOUT
    signout(() => {
      Router.push({
        pathname: '/signin',
        query: {
          message: 'Your session is expired. Please signin' // Note: this message will be shown in the URL as query. You can grab this query and show as popup alert with this message
        }
      });
    } // Note: We have passed the redirect function inside signout as Callback function
    );
  }
  else {
    return;
  }
};

/* If the Token is expired and we get response - 'UnauthorizedError: jwt expired', then we can perform these tasks
Status Code = 401

-> remove the user from the LocalStorage
-> remove the token from cookie
-> redirect them to sign in page
OR
just -> Signout  (call signout function directly and pass callback function to redirect to signin)
*/
// =============================================================================








// -----------------------------------------------------------


// ###############################################################################

/*
( process.browser ) = true   if the code is running on BROWSER (client side) and = false if running on server side (nodejs) backend.

//------------------------------------------------------------------------------------------------
// Difference between LOCAL STORAGE & COOKIES

Q => What is the difference between local storage vs cookies?

Ans => On client and server, the following storages are available: local storage, session storage, and cookies.

The Local Storage is designed for storage that spans multiple windows and lasts beyond the current session.
 In particular, Web applications may wish to store megabytes of user data, such as entire user-authored documents
 or a user's mailbox, on the client side for performance reasons.
 ``` Cookies do not handle this case well because they are transmitted with every request.```

Local Storage is available for every page and remains even when the web browser is closed,
 but you cannot read it on the server, only available/saved on client side browser.

The stored data has no expiration date in local storage. With cookies, you can set the expiration duration.

If you want to clear local storage, then do it by clearing the browser cache.
You can also use JavaScript for this. Local Storage is for client side,
 whereas cookies are for the client as well as server side.

------------------------------
 -> Cookies are primarily for reading server-side,
 -> local storage can only be read by the client-side.
 So the question is, in your app, who needs this data — the client or the server?

 As per the technical difference, and also my understanding:

1) Apart from being an old way of saving data, Cookies give you a limit of 4096 bytes (4095, actually) — it's per cookie. Local Storage is as big as 5MB per domain

2) 'localStorage' is an implementation of the Storage Interface. It stores data with no expiration date, and gets cleared only through JavaScript, or clearing the Browser Cache / Locally Stored Data — unlike cookie expiry.

//------------------------------------------------------------------------------------------------


*/

