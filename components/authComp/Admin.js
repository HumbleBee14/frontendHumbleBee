// Implementing Admin Route protection

import React, { useEffect } from 'react';
import Router from 'next/router';
import { isAuth } from '../../actions/authAction';

const Admin = ({ children }) => {
  useEffect(() => {
    // If the user isn't authenticated in localStorage, will be redirected to signin page
    if (!isAuth()) {
      Router.push(`/signin`);
    }
    // Checking if the user's role is ADMIN or not
    else if (isAuth().role !== 1) {
      Router.push(`/`);
    }

  }, []);

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  )
}

export default Admin;