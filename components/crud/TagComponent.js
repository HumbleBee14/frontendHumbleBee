import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { getCookie } from '../../actions/authAction';
import { create, getTags, removeTag } from "../../actions/tagAction";
// import { remove } from 'nprogress';

const Tag = () => {
  const [values, setValues] = useState({
    name: '',
    error: false,
    success: false,
    tags: [],
    removed: false,
    reload: false
  });


  const { name, error, success, tags, removed, reload } = values;

  // Note: We are saving token for current session on the client, that we'll use in several calls as part of authenticating requests
  const token = getCookie('token');


  useEffect(() => {
    loadTags();
  }, [reload]);
  // }, [success, reload])

  // Note: we have used "reload" property to get the newly created tags updated on the page. 
  // - Use "reload" to control the behaviour of useEffect()
  //- Don't use "success" here, it'll cause infinte network request



  const loadTags = () => {
    getTags().then(data => {
      if (data.error) {
        console.log(data.error);
      }
      else {
        setValues({ ...values, tags: data });
      }
    });
  };


  // Fucntion to look through all the tags  (t = tag, i = index)
  const showTags = () => {
    return tags.map((t, i) => {
      return (
        <button onDoubleClick={() => deleteConfirm(t.slug)} title="Double Click to Delete" key={i} className="btn btn-outline-primary mr-1 ml-1 mt-3">
          {t.name}
        </button>
      );
    });
  };



  // Tag Delete Confirmation Function
  const deleteConfirm = slug => {
    let answer = window.confirm("Are you sure yu want to delete this Tag?");
    if (answer) {
      deleteTag(slug);
    }
  };

  // Tag Delete  Function
  const deleteTag = slug => {
    // console.log('delete', slug);

    // Now sending Delete request to Backend using 'removeTag' action that we created and after getting response from there, we'll update on the Frontend using setValues.
    removeTag(slug, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, error: false, success: false, name: '', removed: !removed, reload: !reload });
      }
    });
  };






  const clickSubmit = (e) => {
    e.preventDefault();  // Page doesn't reload
    // console.log('Create Tag ', name);
    create({ name }, token).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({ ...values, error: false, success: true, name: '', removed: '', reload: !reload });
      }
    });
  };



  const handleChange = (e) => {
    setValues({ ...values, name: e.target.value, error: false, success: false, removed: '' });
  };


  const showSuccess = () => {
    if (success) {
      return <p className="text-success">Tag is created</p>;
    }
  };

  const showError = () => {
    if (error) {
      return <p className="text-danger">Tag already exists</p>;
    }
  };

  const showRemoved = () => {
    if (removed) {
      return <p className="text-danger">Tag is removed !</p>;
    }
  };

  // Mouse Event Handler function to remove Alerts from page on moving mouse. This function will set parameters passed to the alerts components as false, so those compoennts will not be shown
  const mouseMoveHandler = e => {
    setValues({ ...values, error: false, success: false, removed: '' });
  };




  const newTagForm = () => (
    <form onSubmit={clickSubmit}>

      <div className="form-group">
        <label className="text-muted"><em><b> TAGS </b></em></label>

        <input type="text" className="form-control" onChange={handleChange} value={name} required />

      </div>

      <div>
        <button type="Submit" className="btn btn-primary">
          Create
        </button>
      </div>

    </form>
  );



  return (
    <React.Fragment>
      {/* // Alerts */}
      {showSuccess()}
      {showError()}
      {showRemoved()}


      <div onMouseMove={mouseMoveHandler}>

        {newTagForm()}

        {showTags()}

      </div>

    </React.Fragment>
  );
};

export default Tag;