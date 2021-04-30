import Link from 'next/link';
import { useState, useEffect } from 'react';
// import Router from 'next/router';
import dynamic from 'next/dynamic';
/* We are using this because we'll be using 'react-quill' as rich text editor for blog section. 
And 'react-quill' only runs on the Client Side !!
So to make sure this component does not run on Server side, we need to import it Dynamically , so that SSR is False ! hence we'll load this component dynamically load it only on client side.
*/
import { withRouter } from 'next/router'; // This will allow us to use "router" - router props - to grab any router parameters. READ MORE ABOUT IT !!

import { getCookie, isAuth } from '../../actions/authAction'; // getCookie to get the "token"

import { getCategories } from '../../actions/categoryAction'; // to Load all the Categories for user to select for their Blog
import { getTags } from '../../actions/tagAction'; // to Load all the Tags available, for user to select for their current Blog
import { createBlogAction } from '../../actions/blogAction'; // create Blog action, that'll be used to pass the blog created in this frontend component (on client side) to backend (server-side) to save it in Database.


// ------------------------------------------------------------------------------------------------------------------
/*

// Importing react-quill Dynamically in the frontend client side (So that it doesn't run on server side), therefore we have set SSR (Server side rendering) to false

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

import '../../node_modules/react-quill/dist/quill.snow.css';  

// Note: we are able to import CSS file manually like this because of package - @zeit/next-css. But in new version of nextjs, we can do it I think. Check it out :) 
// CDN url: https://cdnjs.cloudflare.com/ajax/libs/react-quill/0.4.1/quill.snow.css

import { QuillModules, QuillFormats } from '../../helpers/quill'; // for making rich text editor has more advanced featured 

*/
// ------------------------------------------------------------------------------------------------------------------

// -============================================================================
/*

// Dynamically Importing CKEDITOR Rich Text Editor  (to load only on client side)

// import { CKEditor } from '@ckeditor/ckeditor5-react';

const CKEditor = dynamic(() => import('@ckeditor/ckeditor5-react'), { ssr: false });

import InlineEditor from '@ckeditor/ckeditor5-editor-inline';


// const CustomEditor = dynamic(() => import('../../public/static/ckeditor5-custom-build/build/ckeditor'), { ssr: false });

*/
// import { CKEditor } from '@ckeditor/ckeditor5-react';

// const InlineEditor = dynamic(() => import('@ckeditor/ckeditor5-build-inline'), { ssr: false });

// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import CustomEditor from '../../public/static/ckeditor5-custom-build/build/ckeditor'; // Designed using ckeditor online builder

import TextEditor from './Editor'; // CKEDITOR Rich Text Editor Component

// -============================================================================

//-----------------------------------------------------------------------------------

const CreateBlog = ({ router }) => {

  // to grab Blog from localstorage (that we can use to fill form data back in case of page refresh/reload)
  const blogFromLS = () => {
    if (typeof window === 'undefined') {
      return false;
    }

    if (localStorage.getItem('blog')) {

      console.log("LocalStorage Saved Data---->", JSON.parse(localStorage.getItem('blog')));

      return JSON.parse(localStorage.getItem('blog')); // to return previously saved blog 'body' (if not published and present in user's local storage) which is stored in localstorage to 'body' state variable
    } else {
      return false;
      // return "";
    }
  };

  // Creating state variables for different elements of Blogs

  // const [data, setData] = useState(""); // Using this or body state for Blog Editor Data

  // Blog body data (blog content)
  const [body, setBody] = useState(blogFromLS());
  // Note: here blogFromLS() function is used to pull localstorage FORM data to populate in case of any page reload/refresh to prevent data loss efforts
  // 'body' by default will have values that is in localstorage, and anytime we make any change it'll update as it'll be always synced
  // this will update the localstorage -> then state -> then formdata - everything will be updated -it'll keep it in sync


  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  // Creating states for checked categories & tags - to submit that while creating new blogs
  const [checkedCat, setCheckedCat] = useState([]); // categories
  const [checkedTags, setCheckedTags] = useState([]); // tags


  const [values, setValues] = useState({
    error: '', // // this will be used later for activating Error component -showError()
    sizeError: '',
    success: '', // this will be used later for activating Alerts component -showSuccess()
    formData: '',
    loading: false,
    title: '',
    hidePublishButton: false
  });

  // Destructure values to use below
  const { error, sizeError, success, formData, loading, title, hidePublishButton } = values;

  const token = getCookie('token');

  // To instanciate new FormData 
  // FormData() is a Web API - https://javascript.info/formdata
  useEffect(() => {
    // console.log("_______________________ USE EFFECT JUST RAN __________________________");

    setValues({ ...values, formData: new FormData() });

    // console.log("___________values___________ ", { ...values });
    // console.log("___________FormData___________ ", { formData });

    initCategories();
    initTags();
  }, [router]);
  // using 'router' instance- so anytime "router" change - eg. page change like forward, backward, reload anything happens than useEffect() function will run
  // So this way, when the component Mounts, we will have FORM data ready to use


  //-------------------------------------
  // to Load Categories & Tags on page load, we have called them in useEffect. So we'll get them from backend and update in state variable
  const initCategories = () => {
    getCategories().then(data => {

      if (data.error) {
        setValues({ ...values, error: data.error });
      }
      else {
        setCategories(data);
      }
    })
      .catch(err => {
        console.log("Error getting Categories from Backend -->", err);
        setCategories([]);
      });
  };

  //-------------------------------------
  // Loading Tags from backend, & set them in useEffect for frontend to use
  const initTags = () => {
    getTags().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      }
      else {
        setTags(data);
      }
    })
      .catch(err => {
        console.log("Error getting Tags from Backend -->", err);
        setTags([]);
      });
  };

  //--------------------------------------------------------------------
  // Publish Blog Function to Submit the Blog (sending the blog to backend DB)

  const publishBlog = (e) => {
    setValues({ ...values, loading: true });

    e.preventDefault(); // So that browser does not Reload Page (prevent Default Action) on clicking Submit/Publish button of form

    /*
    // APPEND TO FORMDATA BEFORE SENDING TO BACKEND
    let myFormData = new FormData()
    myFormData.append("title", values.title);
    myFormData.append("body", values.body)
    // MAKE SURE FORMDATA IS SET BEFORE SENDING TO BACKEND
    console.log(...myFormData)
    */

    // console.log('Ready to publish Blog');
    // console.log("___________ About to Publish FormData___________ ", { formData });

    //--------------------------------------------------------

    // Sending data to Backend (to save in Database)
    createBlogAction(formData, token).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      }
      else {
        // On successful submission, emptying fields, clearing out everything
        setValues({ ...values, loading: false, title: '', error: '', success: `A new Blog titled "${data.title}" is created.` });

        // reloading the Categories & tags list from backend
        // window.location.reload()
        initCategories();
        initTags();

        // Clearing/reset all fields
        setBody(''); // Note: Updating anything in STATE also gets updated in localStorage , therefore clear on successful submission
        setCategories([]); // clearing selected categories
        setTags([]); // clearing selected tags
      }
    });
  };
  //-----------------------------------------------------

  // to get the Photo or Title (based on what is changed, where it's called) and save it in formData object
  const handleChange = name => e => {
    // console.log(e.target.value); // e = event
    //  e.target.files[0] =>>>> grabbing First [0] image file (first property is binary image data, second property is - contentType)
    // if name ='photo', then grab the image, else it's the title & then it'll grab the e.target.value = title
    const value = name === 'photo' ? e.target.files[0] : e.target.value;

    formData.set(name, value); // saving photo binary data (or title) in form object, for sending data to backend (Appending all the data to formData object, that createBlogAction() function will send at once) 
    setValues({ ...values, [name]: value, formData, error: "" });

  };

  //-----------------------------------------------------
  // Anytime user starts typing in the React Quill rich text editor, following below things will happen

  // Blog Body Event handler (for React QUILL)
  /*
  const handleBody = e => {
    // console.log(e); // e = event
    setBody(e);

    formData.set('body', e); // this will be used to save data in formData that will be used to send data to Backend

    // To save content in localstorage to prevent data loss on page refresh
    if (typeof window !== 'undefined') {
      localStorage.setItem('blog', JSON.stringify(e));
    }
    // typeof window !== 'undefined' =====>>>> This checks if browser window is available, i.e. not closed 
  };
  */

  // -----------------------------------------------------

  // Blog Body Event handler (for CKEDITOR Rich Text Editor)

  const handleBody = bdata => {
    console.log("Return value from Editor Component---->", typeof bdata, bdata);

    setBody(bdata);

    // console.log("Updated 'body'--->", body); // Updated body state

    formData.set('body', bdata); // this will be used to save data in formData that will be used to send data to Backend

    // To save content in localstorage to prevent data loss on page refresh/reload
    if (typeof window !== 'undefined') {
      localStorage.setItem('blog', JSON.stringify(bdata));
    };
    // typeof window !== 'undefined' =====>>>> This checks if browser window is available, i.e. not closed 
  };


  //-----------------------------------------------------

  const handleCategoryToggle = (c_id) => () => {
    setValues({ ...values, error: '' }); // clear out any error first

    // Now check the category state if this c_id - category ID is already in the state or not. Then when toggle happens then we will either push (add - CHECK) to OR pull(remove already selected - UNCHECK) from the state 

    // Find out using indexOf Method which will return the first index (position) or -1 if not found in the state
    const clickedCategory = checkedCat.indexOf(c_id);
    const all = [...checkedCat]; //'all' will have all the checked categories values from the curent state

    // If we are adding a new Category (i.e. Checking Box or selecting new category) then we'll PUSH new one to the temp category array - all 

    // On CHECKING box
    if (clickedCategory === -1) {
      all.push(c_id);
    }

    // On Unchecking Box 
    else {
      all.splice(clickedCategory, 1); // removing previosuly selected category from the checkedCategory array
    }
    console.log(all);

    setCheckedCat(all);

    formData.set('categories', all); // saving selected categories in Form for sending data to backend
  };

  //-----------------------------------------------------
  const handleTagsToggle = (t_id) => () => {
    setValues({ ...values, error: '' });

    // return the first index (position)  (if found) or -1 (if not found- i.e. when new category is checked or selected)
    const clickedTag = checkedTags.indexOf(t_id); // Note; this is just to check if we had already selected this new tag or it's already in the current state variable 'checkedTags'. If it's there, it'll find its positon/index and return that, else if not found it'll return -1 and then we'll add that to our formData

    const all = [...checkedTags]; // 'all' will have all the checked tags values from the curent state (if there's any already selected earlier, not current one selected now)

    // On CHECKING - selecting new tag
    if (clickedTag === -1) {
      all.push(t_id); // Adding new Tag selected to state

    }
    // On UNCHECKING (i.e removing previously selected tag)
    else {
      all.splice(clickedTag, 1); // Removing the uncheked tag from checked Tags state
    }
    console.log(all);

    setCheckedTags(all); // setting the updated CheckedTag state variable 

    formData.set('tags', all); // Saving selected tags list in the formdata through which it'll send all the data to backend
  };

  //-----------------------------------------------------

  // Sort function
  const sortByStringFunction = (a, b) => {
    let fa = a.name.toLowerCase(),
      fb = b.name.toLowerCase();

    if (fa < fb) { return -1; }
    if (fa > fb) { return 1; }
    return 0;
  };


  const showCategories = () => {

    if (!categories.length) {
      return <p className="alert alert-danger">ERROR FETCHING DATA</p>;
    }

    const sortedCategories = categories.slice().sort(sortByStringFunction);

    return (
      // categories && categories.map((c, i) => (
      categories && sortedCategories.map((c, i) => (
        <li key={i} className="list-unstyled">
          <input onChange={handleCategoryToggle(c._id)} type="checkbox" className="mr-2" />
          <label className="form-check-label">{c.name}</label>
        </li>
      ))
    );
  };


  const showTags = () => {

    if (!categories.length) {
      return <p className="alert alert-danger">ERROR FETCHING DATA</p>;
    }

    const sortedTags = tags.slice().sort(sortByStringFunction);

    return (

      // tags && tags.map((t, i) => (
      tags && sortedTags.map((t, i) => (
        <li key={i} className="list-unstyled">
          <input onChange={handleTagsToggle(t._id)} type="checkbox" className="mr-2" />
          {/* On Clicking/toggle any tag, 'onChange' event gets triggered that calls - handleTagsToggle(t._id)} and passes that selected Tag ID as paramater to that function and that function sets that selected Tags in the state variable that will be send to the backend through formadata  */}
          <label className="form-check-label">{t.name}</label>
        </li>
      ))
    );
  };

  //-----------------------------------------------------

  // Warning/Alerts functions

  const showError = () => (
    <div className="alert alert-danger alert-dismissible fade show" style={{ display: error ? '' : 'none' }}>
      {error}
    </div>
    // If there's no error, then display will be hidden - 'none'
  );

  const showSuccess = () => {
    return (
      <div className="alert alert-success alert-dismissible fade show" style={{ display: success ? '' : 'none' }}>
        {success}
      </div>
    );
  };


  const showLoading = () => (
    <div className="alert alert-info alert-dismissible fade show" style={{ display: loading ? '' : 'none' }}>
      Loading...
    </div>
  );

  //-----------------------------------------------------


  // ----------------------- BLOG FORM Section -----------------------

  const createBlogForm = () => {
    return (
      <form onSubmit={publishBlog}>

        <div className="form-group">
          <label className="text-muted">Title</label>
          <input type="text" className="form-control" value={title} onChange={handleChange('title')} />
        </div>

        {/* // -------------------------------------------------------------------- */}

        {/* // Text Area (Blog Body) - Using react-quill. Note: To add more advanced text options, we have added modules and formats below*/}
        {/* <div className="form-group">
          <ReactQuill
            // modules={CreateBlog.modules}
            modules={QuillModules}
            // formats={CreateBlog.formats}
            formats={QuillFormats}
            value={body}
            placeholder="Write something amazing ..."
            onChange={handleBody}
          />
        </div> */}

        {/* // ---------------------------------------------------------------------- */}



        {/* // ---------------------------------------------------------------------- */}
        {/* CKEDITOR Rich Text Editor */}



        <div className="form-group">


          <div className='custom-ckeditor-editable'>

            {console.log("Body Data --->", typeof body, body)}

            <TextEditor text={body} onChangeProp={handleBody} />

            {/*
          Question: How to pass the Data back from Child Component to it's calling Parent Component ?  

            // In Parent Component:
            <ChildComponent toChild={isParentData} sendToParent={setIsParentData} />
            
            In Child Component:
            return (
            <button onClick={() => {props.sendToParent(False)}}>Update</button>
            )

            // Note: We have just used the above in our <TextEditor> component by passing CALLBACK FUNCTIOn through props - 'onChangeProp' and getting response back from child component to here
            */}

          </div>


        </div>



        {/* 
Note that CKEditor uses the window object of the browser and
therefore cannot be rendered on the server (on the server side of NextJS).
So make sure that the 'WYSIWYGCKEditor' is imported (dynamically)
and used only in the browser of your NextJS application.
    */}


        {/* // ---------------------------------------------------------------------- */}



        <div>
          <button type="submit" className="btn btn-primary">
            Publish
          </button>
          {/* On clicking 'Publish' / Submit button - onSubmit event is triggered on this form that calls 'publishBlog' function for sending data to backend */}
        </div>

      </form>
    );

  };





  //-------------------------------------------------
  return (
    <div className="container-fluid pb-5">

      {/* <h2> Create Blog Form </h2> */}

      {/* Check below output (router object) to understand why we are using withRouter to catch router details - pathname, actual route, any queries passed, etc . Note: We'll use these details to store blog content in localstorage to prevent data loss on page refresh by storing it in localstorage.*/}
      {/* {JSON.stringify(router)} */}

      <div className="row">

        <div className="col-md-8">

          {createBlogForm()}

          <hr />

          <div className="pt-3">

            {/* NOTE: the below 'showError' & 'showSuccess' functional components will be ACTIVATED only when the variable 'error' or 'success' in the state variables is updated to something!! then only it'll become true and they will show alerts. Else if there's no error or scuccess message, then these will be hidden (display: none) */}
            {showError()}
            {showSuccess()}
            {showLoading()}

          </div>

          {/* {JSON.stringify(title)} */}

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
            {/* <input onChange={handleChange('photo')} type="file" accept="image/*" /> */}
                <input onChange={handleChange('photo')} type="file" accept="image/*" hidden />
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

        </div>

      </div>

    </div>
  );
};

//---------------------------------------------------------------
/*  $$$$$$$$$$$$_____ MOVING THE BELOW RICH TEXT MODULE to different file ____$$$$$$$$$$$$$$$
// To make Rich Text editor has more advanced options
CreateBlog.modules = {
          toolbar: [
    [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image', 'video'],
    ['clean'],
    ['code-block']
  ]
};
 
CreateBlog.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
  'image',
  'video',
  'code-block'
];
//-----------------------------------
*/
//=================================================
export default withRouter(CreateBlog); // Note that this is the defaut Export, so you can import it with any name without named import { }.




/*
"formData" is what you use when you are dealing with form data such as sending files/images to backend. Other times you use json data as usual.

"withRouter" makes router object available as props in your components. so that you can access router.params etc

Example:
const MyComponent = ({router}) => { ... }
*/


/*
// all idea of programming it's write DRY (Don't Repeat Yourself) code

const showCheckBoxesOfTagsOrCategories = name =>{
    return name && name.map(n=>{
        return (<li className="list-unstyled" key={n._id}>
            <input type="checkbox" className="mr-2"/>
            <label className="form-check-label">{n.name}</label>
        </li>)
    })
};

// than we call this function with tags or category parameter

{showCheckBoxesOfTagsOrCategories(categories)}

<h4>Tags</h4>

{showCheckBoxesOfTagsOrCategories(tags)}
*/

/*
formData vs useState / setStateVaraible

Note: We are always updating the form details here at two places:
1) setState i.e state varible
2) formData i.e Form object


```
-->> FormData object is always appended with different properties based on where it's set formData.set('property', property_Value).
And We'll at the End send this formData object to the backend when we Publish the blog```

But if we are gonna send formData at the end to backend that why we are saving in state variable also?

-->> We are setting state varibales also everytime because to retain the Current state on the Frontend !! and also save that state on localStorage also in some places (like in rich text editor for blog body) so that we retain that information on screen by retaining it's current state.

at the end, we pass on the current state of the page (form data) to the actual backend through formData.
*/