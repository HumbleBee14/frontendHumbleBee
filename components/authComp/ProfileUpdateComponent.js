// import Link from "next/link";
import React, { useState, useEffect } from "react";
// import Router from "next/router";
import { getCookie, isAuth, updateUser } from "../../actions/authAction"; // updateUser - to update localStorage (of browser) when there's update in profile data
import { getProfile, updateProfile } from "../../actions/userAction";
import { API, DOMAIN } from '../../config';

const ProfileUpdate = () => {
  const [values, setValues] = useState({
    username: "",
    name: "",
    email: "",
    about: "",
    password: "",
    error: false,
    success: false,
    loading: false,
    photo: "",
    usernameImgSrc: "", // username_for_photo
    userData: process.browser && new FormData() // used a check if we are in client/browser mode. Because Next.js runs in both server and browser mode.
  });

  const token = getCookie('token');

  const { username, name, email, about, password, error, success, loading, photo, userData, usernameImgSrc } = values;

  // Make request to backend and get user information (make it available in state)

  const init = () => {
    getProfile(token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          username: data.username,
          usernameImgSrc: data.username, // using this for user photo (for Image address/API parameter). (Don't update it with event change based on new value in form (untill it is saved), as that may cause issue with actual image address in DB, as the username is passed in the API call for fetching the photo)
          name: data.name,
          email: data.email,
          about: data.about
        });
      }
    });
  };

  // ---------------------

  useEffect(() => {
    init(); // To  get user information from backend and make it available in state variable for frontend to use
    setValues({ ...values, userData: new FormData() }); // FormData is web API
  }, []);

  // -------------------------------------
  // Change Handler

  const handleChange = (name) => (e) => {
    // console.log(`Property --> ${name} : `, e.target.value);

    const value = name === "photo" ? e.target.files[0] : e.target.value;

    userData.set(name, value); // save/set/append the form values in the formdata object

    // console.log(...userData); // SEE THE FORMDATA IN CONSOLE

    setValues({
      ...values,
      [name]: value,
      userData: userData,
      error: false,
      success: false,
    });

    /*    userData.forEach((value, key) => {
          console.log(key + " " + value);
        });
        console.log(userData.get('name'));
        console.log(userData.get('username'));
    */
  };

  // Form Submit Handler ------------------------
  const handleSubmit = (e) => {
    // This will grab the event from the form (onSubmit handler) and will be used to send the formdata to backend
    e.preventDefault();

    setValues({ ...values, loading: true });

    userData.append("profile", `${DOMAIN}/profile/${username}`); // Updating 'PROFILE' URL (in DB) based on New username


    // Sending data to backend (through Actions)
    updateProfile(token, userData).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false, loading: false }); // to catch any errors while submitting data to backend (lile validation errors)
      } else {
        updateUser(data, () => { // with this we should be able to update user profile in localStorage also

          //  show updated information (retrieved from backend (response) after submission)
          setValues({
            ...values,
            username: data.username,
            name: data.name,
            email: data.email,
            about: data.about,
            password: '',
            success: true,
            loading: false
          });

          // To fetch updated photo without refreshing the page, this will reload (which will make init() run)
          // setTimeout(() => {
          //   Router.reload();
          // }, 1000);

        });
      }
    });
  };

  // --------------------------------------

  // Create a form for showing user information
  const profileUpdateForm = () => (

    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label className='btn btn-outline-info'>
          Profile Photo
          <input
            onChange={handleChange("photo")}
            type='file'
            accept='image/*'
            hidden
          />
        </label>
        {/* <label className="text-muted">Profile Photo</label>
                    <input onChange={handleChange('photo')} type="file" accept="image/*" className="form-control" /> */}
      </div>

      <div className='form-group'>
        <label className='text-muted'>Username</label>
        <input
          onChange={handleChange("username")}
          type='text'
          value={username}
          className='form-control'
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          onChange={handleChange("name")}
          type='text'
          value={name}
          className='form-control'
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input
          onChange={handleChange("email")}
          type='text'
          value={email}
          className='form-control'
          readOnly
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>About</label>
        <textarea
          onChange={handleChange("about")}
          type='text'
          value={about}
          className='form-control'
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Password</label>
        <input
          onChange={handleChange("password")}
          // type='text'
          type='password'
          // autocomplete="false"
          autoComplete="off"
          value={password}
          className='form-control'
        />
      </div>

      <div>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </div>
    </form>
  );



  // -----------------------------------------------
  // Alerts

  const showError = () => (
    <div className="alert alert-danger alert-dismissible fade show" style={{ display: error ? '' : 'none' }}>
      {error}
    </div>
  );

  const showSuccess = () => (
    <div className="alert alert-success alert-dismissible fade show" style={{ display: success ? '' : 'none' }}>
      Profile Updated
    </div>
  );

  const showLoading = () => (
    <div className="alert alert-info" style={{ display: loading ? '' : 'none' }}>
      Loading...
    </div>
  );




  // =======================================================

  return (
    <React.Fragment>
      <div className='container'>
        <div className='row'>
          <div className='col-md-4'>

          <img
            onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
            src={usernameImgSrc ? `${API}/user/photo/${usernameImgSrc}` : "https://via.placeholder.com/150"}
            className="img img-fluid img-thumbnail mb-3"
            style={{ maxHeight: "auto", maxWidth: "100%" }}
            alt="User Profile Photo"
          />


          </div>

          <div className='col-md-8 mb-5'>
            {/* {JSON.stringify({ username, email, name })} */}

            {showSuccess()}
            {showError()}
            {showLoading()}

            {profileUpdateForm()}

          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProfileUpdate;





// =================== =========== =====================
// Lodash extend will apply the changes if any... to the original object
// user = _.extend(original_object, object_with_changes)

// Alternative 
/*
Per MongoDB documentation is better to use the patch method instead of push.
 With 'patch' only fields with new data will be updated and no need for the underscore library.
*/