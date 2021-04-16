import React, { useState } from 'react';
import Link from 'next/link';
import { emailContactForm } from '../../actions/formAction';




// ------------------------------------------------
// FORM Component (Note: prop -'authorEmail' is optional, send it only when contac form is used at Blog Author profile page)

const ContactForm = ({ authorEmail, authorName }) => {

  const [values, setValues] = useState({
    message: '',
    name: '',
    sub: '', // Email Subject
    email: '',
    sent: false,
    buttonText: 'Send Message', // to Dynamicaly show button message
    success: false,
    error: false
  });

  const { message, name, sub, email, sent, buttonText, success, error } = values;


  // handle the handlechange
  const handleChange = name => e => {
    // clearing out everything and setting state for whatever user is typing in
    setValues({ ...values, [name]: e.target.value, error: false, success: false, buttonText: 'Send Message' });
  };

  // Submit handler
  const clickSubmit = e => {
    e.preventDefault();
    // First Update the state after clicking button
    setValues({ ...values, buttonText: 'Sending...' });

    // SEND EMAIL 
    // send data to backend using this action for Sending EMAIL
    emailContactForm({ authorEmail, name, email, sub, message }).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      }
      else {
        setValues({
          ...values,
          sent: true,
          name: '',
          sub: '',
          email: '',
          message: '',
          buttonText: 'Sent',
          success: data.success // from backend
        });
      }
    });

  };



  // const showSuccessMessage = () => success && (<div className="alert alert-info">Thank you for contacting us 😀</div>);
  // Showing custom success message based on if this has been called on author page or contact us page

  const showSuccessMessage = () => success && (authorName ? (<div className="alert alert-info alert-dismissible fade show">Thanks for contacting {authorName}</div>) : (<div className="alert alert-info">Thank you for contacting us 😀</div>));


  const showErrorMessage = () => (
    <div className="alert alert-danger alert-dismissible fade show" style={{ display: error ? '' : 'none' }}>
      {error}
    </div>
  );



  // Contact Form --------------------------------------
  const contactForm = () => {

    return (

      <form onSubmit={clickSubmit} className="pb-5">

        <div className="form-group">

          <label className="lead">Message</label>

          <textarea
            onChange={handleChange('message')}
            type="text"
            rows="6" // Size of text area (number of rows)
            value={message}
            className="form-control"
            required>
          </textarea>

        </div>

        <div className="form-group">
          <label className="lead">Name</label>
          <input type="text" onChange={handleChange('name')} className="form-control" value={name} required />
        </div>

        <div className="form-group">
          <label className="lead">Subject</label>
          <input type="text" onChange={handleChange('sub')} className="form-control" value={sub} />
        </div>

        <div className="form-group">
          <label className="lead">Email</label>
          <input type="email" onChange={handleChange('email')} className="form-control" value={email} required />
        </div>


        <div>
          <button className="btn btn-primary">{buttonText}</button>
        </div>


      </form >
    );
  };






  // ------------------------
  return (
    <React.Fragment>

      {showSuccessMessage()}
      {showErrorMessage()}

      {/* <p>Show Contact Form</p> */}
      {contactForm()}

    </React.Fragment>
  );
};


export default ContactForm;