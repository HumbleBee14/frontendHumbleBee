//////////////////////////////////////////////////////////////////////////////////
//  Blog Read Component: Used to Read & show the Blogs for the BLOG MANAGE Page.
//    -> If Props passed (username), then it'll show all the Blogs for that specific user
//    -> If there's no prop passed to this component, then it'll list/show all the blogs (of every user) in the Blogs Manage page
//////////////////////////////////////////////////////////////////////////////////

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
// import Router from 'next/router';
import { getCookie, isAuth } from '../../actions/authAction'; // getCookie to get the "token"
import { list, removeBlog } from '../../actions/blogAction';
import moment from 'moment';



const BlogRead = ({ username }) => {

  // create state for different values

  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState([]); // to show message - successfully deleted/updated

  const token = getCookie('token');

  // on UseEffect ==> when the component mounts (we'll request to load all the blogs)
  useEffect(() => {
    loadBlogs();
  }, []);


  // Load Blogs
  const loadBlogs = () => {

    list(username).then(data => { // username passed as Prop to this component. Passing the prop to the actions module to grab blogs for that username only

      if (data.error) {
        console.log(data.error);
      } else {
        setBlogs(data); // make list of blogs available in the state variable -'blogs' so that we can use that in the return html code below 
      }
    });
  };

  // Delete Blog 
  const deleteBlog = (slug) => {
    removeBlog(slug, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setMessage(data.message); // Make sure to send the message from Backend API response
        loadBlogs(); // refresh the list of blogs on page after deleting any blog
      }
    });
  };


  // Delete Confirmation
  const deleteConfirm = (slug) => {
    let answer = window.confirm('Are you sure you want to delete your blog?');
    if (answer) {
      deleteBlog(slug);
    }
  };


  // Blog Update Button component
  const showUpdateButton = (blog) => {
    if (isAuth() && isAuth().role === 0) // Regular User (not admin)
    {
      return (
        <Link href={`/user/crud/${blog.slug}`} passHref>
          <a className="ml-3 btn btn-sm btn-warning">Update</a>
        </Link>
      );
    }
    else if (isAuth() && isAuth().role === 1) // Admin user
    {
      return (
        <Link href={`/admin/crud/${blog.slug}`} passHref>
          <a className="ml-3 btn btn-sm btn-warning">Update</a>
        </Link>
      );
    }

  };


  // list / show all the blogs

  const showAllBlogs = () => {
    return blogs.map((blog, i) => {
      return (
        <div key={i} className="pb-5">

          <h3>{blog.title}</h3>
          <p className="mark">
            Written by{' '}
            {(blog.postedBy) ?
              (
                <Link href={`/profile/${blog.postedBy.username}`} passHref>
                  <a>{blog.postedBy.username}</a>
                </Link>
              ) : (
                <a className="text-muted">&lt; User Removed &gt;</a>
              )
            }{' '}| Published {moment(blog.updatedAt).fromNow()}
          </p>

          <button className="btn btn-danger btn-sm" onClick={() => deleteConfirm(blog.slug)}>
            Delete
          </button>

          {showUpdateButton(blog)}

        </div>
      );
    });
  };





  // -----------------------------------------------
  return (
    <React.Fragment>
      {/* <p>Update/Delete Blogs</p> */}
      <div className="container">
        <div className="row">
          <div className="col-md-12">

            {message && <div className="alert alert-warning">{message}</div>}

            {showAllBlogs()}

          </div>
        </div>
      </div>

    </React.Fragment>
  );
};


export default BlogRead;