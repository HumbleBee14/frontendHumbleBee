import React from 'react';

import Header from './Header';

import PageFooter from './footer/Footer';

const Layout = ({ children }) => {
  // Use either <div> or <React.Fragment> to contain more than one element
  return (
    <React.Fragment>
      {<Header />}

      {children}

      <hr />

      {<PageFooter />}

    </React.Fragment>
  );
};

export default Layout;

// Note: 'children' could be any page/ content here that's passed to it from index.js