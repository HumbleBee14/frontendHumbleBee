// Forgot Password Page Component

import { useState } from 'react';
import Layout from '../../../components/Layout';
import { forgotPassword } from '../../../actions/authAction';



// ------------------------------------------------------------

const ForgotPassword = () => {

  const [values, setValues] = useState({
    email: '',
    message: '',
    error: '',
    showForm: true // show email input form, once submited, hide the form
  });

  const { email, message, error, showForm } = values;

  // handle change
  const handleChange = variable => e => {
    setValues({ ...values, message: '', error: '', [variable]: e.target.value });
  };


  // handle submit
  const handleSubmit = e => {
    e.preventDefault();

    setValues({ ...values, message: '', error: '' });

    // call forgot password action (which will call backend API to generate and send email for password reset)
    forgotPassword({ email }).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      }
      else {
        setValues({ ...values, error: '', message: data.message, email: '', showForm: false });
      }
    });
  };



  // ------------- show Error ---------------------------
  const showError = () => (error ? <div className="alert alert-danger alert-dismissible fade show">{error}</div> : '');

  // ------------- show Message  ------------------------
  const showMessage = () => (message ? <div className="alert alert-success alert-dismissible fade show">{message}. Please follow the instructions to reset your password. <strong>Link expires in 10 min</strong></div> : '');


  // --------------------- SHOW FORM --------------------

  const passwordForgotForm = () => (

    <div className="container" >
      <form onSubmit={handleSubmit}>
        <div className="form-group pt-5">
          <input
            type="email"
            onChange={handleChange('email')}
            className="form-control"
            value={email}
            placeholder="Type your email"
            required
          />
        </div>

        <div>
          <button className="btn btn-primary">
            Send password reset link
          </button>
        </div>

      </form>
    </div>
  );


  // =============================================================
  // render the page 

  return (

    <Layout>

      <div className="container">
        <h2>Forgot password</h2>
        <hr />

        {showError()}
        {showMessage()}

        {/* this form below will be displayed only if showform state is true */}
        {showForm && passwordForgotForm()}

      </div>

    </Layout>

  );

};



export default ForgotPassword;