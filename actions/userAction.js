import fetch from 'isomorphic-fetch';
// fetch is used (as http client) to send data from frontend (client) to backend (server)

import { API } from '../config';
import { handleResponse } from './authAction';




// --------------------------------------------------
// User's Public Profile (visible to all)

export const userPublicProfile = (username) => {
  // Backend API Route (where we'll send/get the data)
  return fetch(`${API}/user/${username}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
    .then(response => {
      // console.log("Response Status Code : ", response.status);

      // If Status code= 400 => User not found!  (Handle this error on page where requested) 
      return response.json();
    })
    .catch(err => {
      if (err.code === 'ECONNREFUSED') {
        console.log(" ________ Network Connection Error :  Unable to reach Backend ________");
        console.log(err);

      }
      else {
        console.log("Something is wrong ! Error Occured -------->", err);
      }
    });
};

// --------------------------------------------
// Get the user Private Profile  (visible only to the user) 

export const getProfile = (token) => {

  return fetch(`${API}/user/profile`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`   // Sending the 'token' through the header (for getting the current user's profile - Note: We will get the current user details through the 'user' property available through this middleware ('requireSignin') response. )
    },
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};


// Update the Public Profile  ------------------------------

export const updateProfile = (token, user) => {

  return fetch(`${API}/user/update`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: user // sending formdata in the body
  })
    .then(response => {
      handleResponse(response); // (to handle session expiry & prevent error)

      return response.json();
    })
    .catch(err => console.log(err));
};

// --------------------------------------------------------

// Note: Why does Fetch doesn't catch the 400 errors in the .catch block ?
/*
Fetch promises only reject with a TypeError when a network error occurs.
Since 4xx and 5xx responses aren't network errors, there's nothing to catch.
 You'll need to throw an error yourself to use Promise#catch.
*/