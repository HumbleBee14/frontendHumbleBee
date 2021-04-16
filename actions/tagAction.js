import fetch from 'isomorphic-fetch';
// fetch is used (as http client) to send data from frontend (client) to backend (server)

import { API } from '../config';
import { handleResponse } from './authAction';

// ------------------------------------------------

// Create Tag action
export const create = (tag, token) => {
  // Backend API Route (where we'll send the data)
  return fetch(`${API}/tag`, {
    method: 'POST',
    headers: {
      "Accept": 'application/json',
      "Content-Type": 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(tag)
  })
    .then(response => {
      handleResponse(response); // (to handle session expiry & prevent error)

      return response.json();
    })
    .catch(err => console.log(err));
};



// Get/list all Tags
export const getTags = () => {
  // Backend API Route (where we'll send the data)
  return fetch(`${API}/tags`, {
    method: 'GET'
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};


// Get Single Tag
export const singleTag = (slug) => {
  // Backend API Route (where we'll send the data)
  return fetch(`${API}/tag/${slug}`, {
    method: 'GET'
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};


// Remove / delete Tag
export const removeTag = (slug, token) => {
  // Backend API Route (where we'll send the data)
  return fetch(`${API}/tag/${slug}`, {
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