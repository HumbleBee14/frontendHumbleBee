import fetch from 'isomorphic-fetch';
// fetch is used (as http client) to send data from frontend (client) to backend (server)

import { API } from '../config';
import queryString from 'query-string'; // to parse the Search URLs/ ==>  Parse and stringify URL query strings
import { isAuth, handleResponse } from './authAction'; // with this we can check the User Role (Regular or Admin) because that info is saved in the localstorage & handleResponse is used t check sesion/token expiry



// ------------------------------------------------------------

// Create Blog action (to send new blog data to backend)
export const createBlogAction = (blog, token) => {
  // createBlogEndPoint = Backend API Route (where we'll send the data)


  // Based on if User is Regular User or ADMIN

  let createBlogEndPoint; // Blog Create Endpoint based on User Role

  if (isAuth() && isAuth().role === 1)  // Admin user
  { createBlogEndPoint = `${API}/blog`; }

  else if (isAuth() && isAuth().role === 0) // Regular Authenticated User
  { createBlogEndPoint = `${API}/user/blog`; }


  return fetch(`${createBlogEndPoint}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
      // "Content-Type": 'application/json', // Not needed because we are sending FORM data(blog, iamges,etc), not json 
    },
    // body: JSON.stringify(blog) // Not sending json data here
    body: blog
  })
    .then(response => {
      // response handler (Check - in case user session(token) is expired, so that it redirects to signin, instead of throwing error)
      handleResponse(response);

      return response.json();
    })
    .catch(err => console.log(err));
};

// -------------------------------------------------------------

// End Point to get all the blogs alongwith all the Categories & tags (SEO optimized)
export const listBlogsWithCategoriesAndTags = (skip, limit) => {

  const data = {
    limit, skip
  };


  // Backend API Route (where we'll send the POST request and get back the response (with blogs with categories and tags))
  return fetch(`${API}/blogs-categories-tags`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)  // for sending list/number of blogs to fetch using limit & skip value (pagination)

  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};


// -----------------------------------------------------------

// Single Blog Fetch (based on slug)

export const getSingleBlog = (slug = undefined) => {
  return fetch(`${API}/blog/${slug}`, {
    method: 'GET'
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

// ------------------------------------------------------------

// get related blogs based on similar category
// export const listRelated = (blog, limit) =>  // Ignoring limit because we'll get only the 3 related blogs
export const listRelated = (blog) => {


  // Backend API Route (where we'll send the POST request and get back the response (blogs with common categories)
  return fetch(`${API}/blogs/related`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(blog) // sending current blog (which will be compared at backend with similar category blogs, that will be returned back in this API call response)

  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

// -------------------------------------------------------


// List / get all the blogs (of the selected User based on username [passed through Props from component - BlogReadComponent])

export const list = (username) => {

  // Note: if there's 'username' available (passed through component), then show the blogs only by that user, else show all the blogs

  let listBlogsEndPoint; // Blogs Endpoint (it can be either point to all the Blogs) else (Blogs only by that specifc user based on username)

  if (username) { // If Username is present (from Dashboard page)
    listBlogsEndPoint = `${API}/${username}/blogs`; // This endpoint gives only those Blogs written by this user 
  }
  else { // Else if there's no username (on Header -> 'Blogs' link) -> then show all the Blogs by every author/user
    listBlogsEndPoint = `${API}/blogs`; // This endpoint gives all the blogs on the website (of every author/user)
  }

  // ----------------
  return fetch(`${listBlogsEndPoint}`, {
    method: 'GET'
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

// ---------------------------------------------------------
//  Remove / Delete the Blog
export const removeBlog = (slug, token) => {

  // Based on if User is Regular User or ADMIN
  let deleteBlogEndPoint; // Blog Delete Endpoint based on User Role

  if (isAuth() && isAuth().role === 1)  // Admin user
  { deleteBlogEndPoint = `${API}/blog/${slug}`; }

  else if (isAuth() && isAuth().role === 0) // Regular Authenticated User
  { deleteBlogEndPoint = `${API}/user/blog/${slug}`; }



  // Backend API Route (where we'll send the Delete request)
  // return fetch(`${API}/blog/${slug}`, {
  return fetch(`${deleteBlogEndPoint}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Contetnt-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    // Not sending anything because it's a delete request
  })
    .then(response => {
      handleResponse(response); // (to handle session expiry & prevent error)

      return response.json();
    })
    .catch(err => console.log(err));
};

// ----------------------------------------------------------
// Update Blog action
export const updateBlog = (blog, token, slug) => {

  // Based on if User is Regular User or ADMIN
  let updateBlogEndPoint; // Blog Update Endpoint based on User Role

  if (isAuth() && isAuth().role === 1)  // Admin user
  { updateBlogEndPoint = `${API}/blog/${slug}`; }

  else if (isAuth() && isAuth().role === 0) // Regular Authenticated User
  { updateBlogEndPoint = `${API}/user/blog/${slug}`; }


  // Backend API Route (where we'll send the updated data)
  // return fetch(`${API}/blog/${slug}`, {
  return fetch(`${updateBlogEndPoint}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },

    body: blog // formData
  })
    .then(response => {
      handleResponse(response); // (to handle session expiry)

      return response.json();
    })
    .catch(err => console.log(err));
};


// ---------------------------------------------------------

// list Search blogs;

export const listSearch = (params) => { // params (SEARCH TERM) will come from Search component
  // console.log('Search params (Before Parsing): ', params); // beofre the url parsing - {search='node'}

  // 'queryString' -->  Parses and stringify URL query strings (creates query URL)
  // A Query string is a part of a URL that assigns values to specified parameters.
  let query = queryString.stringify(params); // ?limit=100&pagination=10  (Note: ? question mark is used as a separator)

  // console.log('Query params (After Parsing/Stringifying - creating query URL) which will be sent to the backend : ', query); // After URL parsed/stringified

  return fetch(`${API}/blogs/search?${query}`, {
    method: 'GET'
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};


// ------------------------------------------------------------