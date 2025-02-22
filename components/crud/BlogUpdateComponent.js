// import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
// import { DOMAIN } from '../../config';

import dynamic from 'next/dynamic';

/* We are using this because we'll be using 'react-quill' as rich text editor for blog section. 
And 'react-quill' only runs on the Client Side !!
So to make sure this component does not run on Server side, we need to import it Dynamically , so that SSR is False ! hence we'll load this component dynamically load it only on client side.
*/
import { withRouter } from 'next/router'; // This will allow us to use "router" - router props - to grab any router parameters. READ MORE ABOUT IT !!

import { getCookie, isAuth } from '../../actions/authAction'; // getCookie to get the "token"

import { getCategories } from '../../actions/categoryAction'; // to Load all the Categories for user to select for their Blog
import { getTags } from '../../actions/tagAction'; // to Load all the Tags available, for user to select for their current Blog
import { getSingleBlog, updateBlog } from '../../actions/blogAction'; // update Blog action, that'll be used to pass the blog created/updated in this frontend component (on client side) to backend (server-side) to save it in Database.


/* ----------------------------------------------------------------------------
// Importing react-quill Dynamically in the frontend client side (So that it doesn't run on server side), thereofre we have set SSR (SErver side rendering) to false

// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

// import '../../node_modules/react-quill/dist/quill.snow.css';  // Note: we are able to import CSS file manually like this because of package - @zeit/next-css. But in new version of nextjs, we can do it I think. Check it out :) 
// CDN url: https://cdnjs.cloudflare.com/ajax/libs/react-quill/0.4.1/quill.snow.css

// import { QuillModules, QuillFormats } from '../../helpers/quill'; // for making rich text editor has more advanced featured 

*/


// import TextEditor from './Editor'; // CKEDITOR Rich Text Editor Component

// import TextEditor from './EditorTinyMCE'; // TinyMCE Rich Text Editor Component

const TextEditor = dynamic(() => import('./EditorTinyMCE'), { ssr: false });

import { API } from '../../config';

// import FormData from 'form-data'; // not needed separetly, as we get access to FormData web API through Browser itself





// ------------------------------------------------------------------

// Router props - to grab the slug
const BlogUpdate = ({ router }) => {

  // First initialize this component with the blog we want to update (put values in state)
  // const [blog, setBlog] = useState({});
  // const [title, setTitle] = useState(''); // Not needed, it's simple, updating it through values state

  const [body, setBody] = useState(''); // Whenever user starts typing the rich text editor save that data state in the body state


  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  // Creating state variables for checked categories & tags - to submit that while creating new blogs
  const [checkedCat, setCheckedCat] = useState([]); // categories
  const [checkedTags, setCheckedTags] = useState([]); // tags



  const [values, setValues] = useState({
    error: '', // // this will be used later for activating Error component -showError()
    success: '', // this will be used later for activating Alerts component -showSuccess()
    formData: '',  // formData: new FormData(), // initialize the formData Object as default value 
    loading: false,
    title: '',
    body: '',
    newFeaturedImage: false,
    newFeaturedImageSrc: ''
  });

  // Destructure values to use below
  const { error, success, formData, loading, title, newFeaturedImage, newFeaturedImageSrc } = values;


  const token = getCookie('token');



  // when the component mounts (useEffect) -> make request to backend to get blog
  useEffect(() => {
    // console.log("______________ USE EFFECT STARTED _______________");

    setValues({ ...values });
    // setValues({ ...values, title: "", formData: new FormData() });
    // Note: this 'new FormData()' is not initialized on first page load sadly(bcoz setValues doesn't run on server side SSR), which is creating errors - [formdata.set is not a function], bcoz it's object is not initlaized.
    // setValues({ ...values, formData: new FormData() }); //Don't know why this isn't working!!  Seems like setValues/state doesn't run on first page load !!

    // REASON FOUND !!! Why this doesn't run on Server Side ?
    // Because -> ' useEffect ' runs on client side on First Page Render!! which will run once it gets loaded / mounted on browser

    // FormData() is a browser API to create new Formdata

    initBlog(); // to make request to backend to get/load the blog i.e.page load / reload / refresh, we will run this
    initCategories(); // to get list of all Categories from backend and save in state variable for frontend to show
    initTags();  // to get list of all Tags from backend

  }, [router]); // whenever router changes


  // ----------------------------------------------------------
  //It gets the blog data from backend in the current state Variables, which we can now use to Populate it in the formData to show on client side;

  const initBlog = () => {
    // InitiBlog will load / 
    if (router.query.slug) { // Note: We will have access to Router only when the component Mounts (because 'router' is available on client side only), else not
      getSingleBlog(router.query.slug).then(data => {
        if (data.error) {
          console.log(data.error); // useful for developers only, not user
        } else {
          setValues({ ...values, title: data.title, formData: new FormData() });    // FormData() is a browser API to create new Formdata
          // console.log({ ...values });

          setBody(data.body);  // state [body = data.body] this 'body' data we will Populate in the Rich text editor= update/add the blog details in the page on component load (useEffect will runt this and this will set the state variables with blog data that we can populate in the form on page)

          // console.log("----------BLOG State body updated --------> ", body.length);

          // set checked categories and checked tags of this blog
          setCategoriesArray(data.categories);
          setTagsArray(data.tags);

        }
      });
    }
  };

  // -----------------------------------------------------------
  // Updating frontend (updating state) with already checked categories of the blog which is selected for update
  const setCategoriesArray = blogCategories => {
    let ca = []; // Array of categories (which will keep list of already selected categories in the current blog and wil be used to update on frontend through its set state variable)
    blogCategories.map((c, i) => {
      ca.push(c._id);
    });

    setCheckedCat(ca); // setting category state variable for already selected/checked categories of the blog
  };

  // ----------------------------------------------------
  // Updating frontend (updating state) with already checked tags of the blog selected for update
  const setTagsArray = blogTags => {
    let ta = []; // Array of tags 
    blogTags.map((t, i) => {
      ta.push(t._id); // ADDING TAG id OF TAGS WHICH ARE PART OF THE SELECTED BLOG
    });

    setCheckedTags(ta); // setting tags state variable for already selected/checked tags of the blog
  };


  //----------------------------------------------------
  // Categories Toggle Handler

  const handleCategoryToggle = (c_id) => () => {
    const updatedCategories = checkedCat.includes(c_id)
        ? checkedCat.filter((id) => id !== c_id) // Remove if exists
        : [...checkedCat, c_id]; // Add if not exists

    setCheckedCat(updatedCategories);

    // Ensure formData is updated immediately
    formData.set('categories', JSON.stringify(updatedCategories));
};


  //------------------------------------------------
  // Tags Toggle Handler

  const handleTagsToggle = (t_id) => () => {
    const updatedTags = checkedTags.includes(t_id)
        ? checkedTags.filter((id) => id !== t_id) // Remove if exists
        : [...checkedTags, t_id]; // Add if not exists

    setCheckedTags(updatedTags);

    // Ensure formData is updated immediately
    formData.set('tags', JSON.stringify(updatedTags));
  };


  //----------------------------------------------

  // to Load Categories & Tags on page load, we have called them in useEffect. So we'll get them from backend and update in state variable
  const initCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      }
      else {
        setCategories(data);
      }
    });
  };

  //------------------------------------
  // Loading Tags from backend, & set them in useEffect for frontend to use
  const initTags = () => {
    getTags().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      }
      else {
        setTags(data);
      }
    });
  };

  //----------------------------------------------------------
  // To checked if this Category is checked or not (in the checkedCategories state)

  const findOutCheckedCategories = c => {
    const result = checkedCat.indexOf(c);  // Checking if the selected category 'c' is present or not in the Checked Catgories state variable (which we had updated in setCategoriesArray() function )
    // if we find current category in the state (cheked categories state variable), then it'll return non-zero value, else if not found, it'll return -1

    if (result !== -1) {
      return true;
    } else {
      return false;
    }
  };

  //-----------------------------------------------
  // To checked if this Tag is checked or not (in the checkedTags state)
  const findOutCheckedTags = t => {
    const result = checkedTags.indexOf(t);  // Checking if the selected tag 't' is present or not in the Checked Tags state variable 'checkedTags' (which we had updated in setTagsArray() function )
    // if we find current tag in the state (cheked tags state variable), then it'll return non-zero value, else if not found, it'll return -1

    if (result !== -1) {
      return true;
    } else {
      return false;
    }
  };


  // --------------------------------------------------------------

  // Sort function
  const sortByStringFunction = (a, b) => {
    let fa = a.name.toLowerCase(),
      fb = b.name.toLowerCase();

    if (fa < fb) { return -1; }
    if (fa > fb) { return 1; }
    return 0;
  };

  //------------------------------------
  const showCategories = () => {

    const sortedCategories = categories.slice().sort(sortByStringFunction);

    return (
      // categories && categories.map((c, i) => (
      categories && sortedCategories.map((c, i) => (
        <li key={i} className="list-unstyled">
          <input
            onChange={handleCategoryToggle(c._id)}
            checked={findOutCheckedCategories(c._id)}
            type="checkbox"
            className="mr-2"
          />
          <label className="form-check-label">{c.name}</label>
        </li>
      ))
    );
  };

  //------------------------------------

  const showTags = () => {

    const sortedTags = tags.slice().sort(sortByStringFunction);

    return (

      // tags && tags.map((t, i) => (
      tags && sortedTags.map((t, i) => (
        <li key={i} className="list-unstyled">
          <input
            onChange={handleTagsToggle(t._id)}
            checked={findOutCheckedTags(t._id)}
            type="checkbox"
            className="mr-2"
          />
          {/* On Clicking/toggle any tag, 'onChange' event gets triggered that calls - handleTagsToggle(t._id)} and passes that selected Tag ID as paramater to that function and that function sets that selected Tags in the state variable that will be send to the backend through formadata  */}
          <label className="form-check-label">{t.name}</label>
        </li>
      ))
    );
  };

  // ------------------------------------------------------------------------

  // Change Handler for Photo & Title - can be used for both title and photo based on what 'name' is passed to parameter
  const handleChange = name => e => {
    // console.log(e.target.value)
    // console.log("handleChange ---------- for -----> : ", name);

    // if name ='photo', then grab the image, else it's the 'title' & then it'll grab the e.target.value = title
    const value = name === 'photo' ? e.target.files[0] : e.target.value;

    formData.set(name, value);

    setValues({ ...values, [name]: value, formData, error: "" }); // wouldn't this would throw error because we don't have any 'photo' state variable ?

    // In case it's an Image, show Image Preview
    if (name === 'photo') {
      let filePath = URL.createObjectURL(e.target.files[0]);
      // console.log(filePath);
      setValues({ ...values, newFeaturedImage: true, newFeaturedImageSrc: filePath, error: "" });
    }
  };

  // New Uploaded Image Preview (Check just Above!)

  // const previewImage = () => {
  //   // const newImage = e.target.files[0];
  //   return (
  //     <img onError={(image) => image.target.setAttribute("src", "https://via.placeholder.com/150")} src={formData.get('photo')} alt={title} style={{ width: '100%' }} />
  //   );
  // };

  // --------------------------------------------------------------

  // Body Event Handler 
  const handleBody = e => {
    // console.log("__________EVENT e : __________", e);
    setBody(e); // whenever user make any change in the rich text editor (event data), we want to set 'body' - i.e. Update the state

    formData.set('body', e); // whenever user make any change in the rich text editor (event data),that will be updated in the formdata with name 'body', which will eventually be send to backend. (We send formdata to send blog data to backend, state variables are used  for client side changes)


  };



  // -----------------------------------------------------------------------
  // Function to submit the edited -updated blog form & send it to backend

  const editBlog = (e) => {
    e.preventDefault(); // Prevent page reload

    setValues({ ...values, loading: true });

    // Convert categories & tags to JSON string
    formData.set("categories", JSON.stringify(checkedCat));
    formData.set("tags", JSON.stringify(checkedTags));
    formData.set("body", body);

    console.log("Updated formData before sending:", Object.fromEntries(formData.entries())); // Debugging

    // Sending updated Blog data to the backend
    updateBlog(formData, token, router.query.slug).then((data) => {
        if (data.error) {
            setValues({ ...values, error: data.error, loading: false });
        } else {
            setValues({
                ...values,
                loading: false,
                title: "",
                error: "",
                success: `Blog titled "${data.title}" is successfully updated`,
            });

            console.log(`Blog titled "${data.title}" is successfully updated`);

            // Redirect based on user role
            if (isAuth() && isAuth().role === 1) {
                Router.replace(`/blogs/${router.query.slug}`); // Redirect to updated blog
            } else {
                Router.replace('/user'); // Redirect to user dashboard
            }
        }
    });
  };



  /*
  // Facing issue with Above code, trying other alternative

  const editBlog = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("title", values.title);
    formData.append("body", body);
    formData.append("categories", checkedCat);
    formData.append("tags", checkedTags);
    await updateBlog(formData, token, router.query.slug).then((data) => {
      if (data.error) {
        setValues({ ...values, ...formData, error: data.error });
      } else {
        setValues({
          ...values,
          ...formData,
          title: "",
          success: `Blog entitled "${data.title}" is successfully updated`,
        });

        if (isAuth() && isAuth().role === 1) {
          Router.replace(`/admin/crud/${router.query.slug}`);
          // Router.replace(`/admin`);
        } else if (isAuth() && isAuth().role === 0) {
          Router.replace(`/user/crud/${router.query.slug}`);
          // Router.replace(`/user`);
        }
      }
    });
  };

*/

  //------------------------------------------------------------

  // Warnings / Error Alert functions

  const showError = () => (
    <div className="alert alert-danger alert-dismissible fade show" style={{ display: error ? '' : 'none' }}>
      {error}
    </div>
    // If there's no error, then display will be hidden - 'none'
  );

  const showSuccess = () => (
    <div className="alert alert-success alert-dismissible fade show" style={{ display: success ? '' : 'none' }}>
      {success}
    </div>
  );




  //------------------------ UPDATE BLOG FORM Section ----------------------

  const updateBlogForm = () => {

    return (
      <form onSubmit={editBlog}>

        <div className="form-group">
          <label className="text-muted">Title</label>
          <input type="text" className="form-control" value={title} onChange={handleChange('title')} />
        </div>

        {/* --------------------------------------------------------- */}
        {/* // Text Editor Area (Blog Body) - using React - Quill*/}

        {/*
         
        <div className="form-group">
          <ReactQuill
            // modules={CreateBlog.modules}
            modules={QuillModules}
            // formats={CreateBlog.formats}
            formats={QuillFormats}
            value={body}
            placeholder="Write something amazing ..."
            onChange={handleBody}
          />
        </div>
 */}

        {/* --------------------------------------------------------- */}

        {/* CKEDITOR Rich Text Editor */}

        <div className="form-group">
          <div>

            {/* {console.log("Blog Update Body Data --->", typeof body, body)} */}

            <TextEditor text={body} onChangeProp={handleBody} />

          </div>
        </div>

        {/* // Note: We have used callback function ('handleBody') by passing function through props ('onChangeProp') of the <TextEditor> component and getting response back from child component to here */}

        {/* ------------------------------------------------------------------- */}

        <div>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
          {/* On clicking 'Publish' / Submit button - onSubmit event is triggered on this form that calls 'editBlog' function for sending data to backend */}
        </div>

      </form>
    );

  };




  // ---------------------------------------------

  return (
    <div className="container-fluid pb-5">


      <div className="row">

        <div className="col-md-8">

          {/* <p>Create Blog Form</p> */}

          {updateBlogForm()}

          <hr />

          <div className="pt-3">

            {/* NOTE: the below 'showError' & 'showSuccess' functional components will be ACTIVATED only when the variable 'error' or 'success' in the state variables is updated to something!! then only it'll become true and they will show alerts. Else if there's no error or scuccess message, then these will be hidden (display: none) */}

            {showError()}

            {showSuccess()}


          </div>

          {/* // Show current Featured Image */}
          {body && (
            <img
              onError={(e) => (e.target.src = "/static/images/defaultImagePlaceholder.png")}
              src={router?.query?.slug ? `${API}/blog/photo/${router.query.slug}` : "/static/images/defaultImagePlaceholder.png"}
              alt={title || "Blog Image"}
              style={{ maxWidth: "100%", height: "auto" }} 
            />
          )}

        </div>


        {/* Sidebar for listing categories & tags  */}
        <div className="col-md-4">

          <div>
            <div className="form-group pb-2">
              <h5>Featured Image</h5>
              <hr />

              <div>
                <small className="text-muted">Max size: 1 MB</small>
              </div>

              <label className="btn btn-outline-info">
                Upload featured image
              <input onChange={handleChange('photo')} type="file" accept="image/*" hidden />
                {/* <input onChange={handleChange('photo')} type="file" accept="image/*" /> */}
              </label>
            </div>
          </div>


          <div>
            <h5>Categories</h5>
            <hr />

            <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>{showCategories()}</ul>
          </div>

          <div>
            <h5>Tags</h5>
            <hr />

            <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>{showTags()}</ul>
          </div>

          <div>
            <br />
            <hr />
            <h5>New Uploaded Image</h5>

            {/* // to Show Newly updated Image */}
            {newFeaturedImage && (
              <img
                onError={(e) => (e.target.src = "/static/images/defaultImagePlaceholder.png")}
                src={newFeaturedImageSrc || "https://via.placeholder.com/150"}
                style={{ width: "100%" }}
              />
            )}

          </div>


        </div>

      </div>
    </div>
  );
};



export default withRouter(BlogUpdate); // closing it withRouter to grab the slug details from router props