import fetch from 'isomorphic-fetch';
// fetch is used (as http client) to send data from frontend (client) to backend (server)

import { API } from '../config';
import { handleResponse } from './authAction';


// ----------------------------------------------

// Create Category action
export const create = (category, token) => {
  // Backend API Route (where we'll send the data)
  return fetch(`${API}/category`, {
    method: 'POST',
    headers: {
      "Accept": 'application/json',
      "Content-Type": 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(category)
  })
    .then(response => {
      // response handler (Check - in case user session(token) is expired, so that it redirects to signin, instead of throwing error)
      handleResponse(response);

      return response.json();
    })
    .catch(err => console.log(err));
};



// Get/list all Categories
export const getCategories = () => {
  // Backend API Route (where we'll send the data)
  return fetch(`${API}/categories`, {
    method: 'GET'
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};


// Get Single Category
export const singleCategory = (slug) => {
  // Backend API Route (where we'll send the data)
  return fetch(`${API}/category/${slug}`, {
    method: 'GET'
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};


// Remove / delete Category
export const removeCategory = (slug, token) => {
  // Backend API Route (where we'll send the data)
  return fetch(`${API}/category/${slug}`, {
    method: 'DELETE',
    headers: {
      "Accept": 'application/json',
      "Content-Type": 'application/json',
      Authorization: `Bearer ${token}`
    }

  })
    .then(response => {
      handleResponse(response); // (to handle session expiry & prevent error)

      return response.json();
    })
    .catch(err => console.log(err));
};