import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { isAuth, getCookie } from '../../actions/authAction';
import { create, getCategories, removeCategory } from "../../actions/categoryAction";
// import { remove } from 'nprogress';

const Category = () => {
  const [values, setValues] = useState({
    name: '',
    error: false,
    success: false,
    categories: [],
    removed: false,
    reload: false
  });


  const { name, error, success, categories, removed, reload } = values;

  // Note: We are saving token for current session on the client, that we'll use in several calls as part of authenticating requests
  const token = getCookie('token');


  useEffect(() => {
    loadCategories();
  }, [reload]);
  // }, [success, reload])

  // Note: we have used "reload" property to get the newly created categories updated on the page. 
  // - Use "reload" to control the behaviour of useEffect()
  //- Don't use "success" here, it'll cause infinte network request



  const loadCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      }
      else {
        setValues({ ...values, categories: data });
      }
    });
  };


  // Fucntion to look through all the categories  (c = category, i = index)
  const showCategories = () => {
    return categories.map((c, i) => {
      return (
        <button onDoubleClick={() => deleteConfirm(c.slug)} title="Double Click to Delete" key={i} className="btn btn-outline-primary mr-1 ml-1 mt-3">
          {c.name}
        </button>
      );
    });
  };



  // Category Delete Confirmation Function
  const deleteConfirm = slug => {
    let answer = window.confirm("Are you sure yu want to delete this category?");
    if (answer) {
      deleteCategory(slug);
    }
  };

  // Category Delete  Function
  const deleteCategory = slug => {
    // console.log('delete', slug);

    // Now sending Delete request to Backend using 'removeCategory' action that we created and after getting response from there, we'll update on the Frontend using setValues.
    removeCategory(slug, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, error: false, success: false, name: '', removed: !removed, reload: !reload });
      }
    });
  };






  const clickSubmit = (e) => {
    e.preventDefault();  // Page doesn't reload
    // console.log('Create Category ', name);
    create({ name }, token).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {

        // setValues({ ...values, error: false, success: true, name: '', removed: !removed, reload: !reload });
        setValues({ ...values, error: false, success: true, name: '', removed: '', reload: !reload });
      }
    });
  };



  const handleChange = (e) => {
    setValues({ ...values, name: e.target.value, error: false, success: false, removed: '' });
  };


  const showSuccess = () => {
    if (success) {
      return <p className="text-success">Category is created</p>;
    }
  };

  const showError = () => {
    if (error) {
      return <p className="text-danger">Category already exists</p>;
    }
  };

  const showRemoved = () => {
    if (removed) {
      return <p className="text-danger">Category is removed !</p>;
    }
  };

  // Mouse Event Handler function to remove Alerts from page on moving mouse. This function will set parameters passed to the alerts components as false, so those compoennts will not be shown
  const mouseMoveHandler = e => {
    setValues({ ...values, error: false, success: false, removed: '' });
  };




  const newCategoryForm = () => (
    <form onSubmit={clickSubmit}>

      <div className="form-group">
        <label className="text-muted"><em><b> CATEGORIES </b></em></label>

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
        {newCategoryForm()}

        {showCategories()}
      </div>

    </React.Fragment>
  );
};

export default Category;