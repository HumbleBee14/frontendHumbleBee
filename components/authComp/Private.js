// Implementing Private ' Protected Routes' (User) Route protection

import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { isAuth } from '../../actions/authAction';

import { SyncOutlined } from "@ant-design/icons"; // ANT Design Icons - to Show animated LOADING ICON

const Private = ({ children }) => {

  // state
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // If the user isn't authenticated in localStorage, will be redirected to signin page
    if (!isAuth()) {
      setLoading(true); // Keep Showing Loading
      Router.push(`/signin`);
      // Router.replace(`/signin`);
    }
    else {
      setLoading(false); // Stop Loading and show the page component (bcoz the user is authenticated)
    }

  }, []);

  return (
    <>
      {loading ? (
        <SyncOutlined
          spin
          className="d-flex justify-content-center display-1 text-primary p-5"
        />
      ) : (<React.Fragment>{children}</React.Fragment>)
      }
    </>
  );

};

export default Private;


  // WARNING !!!! -> The child {Children} component will render anyway First because the useEffect lifecycle method runs after the render (return) to prevent any side-effects.
  // Solution? Try showing something like Loading on child component OR Google it !!

  // Solution: Before even showing the component, Show the LOADING ICON/LOADING... and in the background check the state of the page or wahtever logic you want. So the page will not be shown untill that state does not become true :)