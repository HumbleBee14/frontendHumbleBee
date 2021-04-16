// RESET Password Page Component

import { useState } from 'react';
import { withRouter } from 'next/router'; // to get router parameters (for grabbing token ID from the url )

import Layout from '../../../../components/Layout';
import { resetPassword } from '../../../../actions/authAction';




// ===========================================================

const ResetPassword = ({ router }) => {

  const [values, setValues] = useState({
    name: '',
    newPassword: '',
    error: '',
    message: '',
    showForm: true // By Default show New Password input form, but once entered new password and submitted, Hide the Form and show success message
  });


  const { showForm, name, newPassword, error, message } = values;


  const handleSubmit = e => {
    e.preventDefault();

    // call to Reset password action to make request to backend
    resetPassword({
      newPassword,
      resetPasswordLink: router.query.id // grabbing token id from router. 'id' => because page name is ID & therefore we are grabbing that using 'id'
    }).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, showForm: true, newPassword: '' });
      } else {
        setValues({ ...values, message: data.message, error: false, showForm: false, newPassword: '' });
      }
    });
  };

  // ------------- show Error ---------------------------
  const showError = () => (error ? <div className="alert alert-danger alert-dismissible fade show">{error}</div> : '');

  // ------------- show Message  ------------------------
  const showMessage = () => (message ? <div className="alert alert-success alert-dismissible fade show">{message}</div> : '');


  // --------------------- SHOW FORM --------------------

  const passwordResetForm = () => (

    <div className="container" >
      <form onSubmit={handleSubmit}>
        <div className="form-group pt-5">
          <input
            type="password"
            onChange={e => setValues({ ...values, newPassword: e.target.value })}
            className="form-control"
            value={newPassword}
            placeholder="Type new password"
            required
          />
        </div>

        <div>
          <button className="btn btn-primary">
            Change password
        </button>
        </div>

      </form>
    </div>
  );


  // =============================================================
  // ====================== RENDER PAGE ========================

  return (

    <Layout>

      <div className="container">
        <h2>Reset password</h2>
        <hr />

        {showError()}
        {showMessage()}

        {/* this form below will be displayed only if showform state is true */}
        {showForm && passwordResetForm()}

      </div>

    </Layout>

  );

};


export default withRouter(ResetPassword);
