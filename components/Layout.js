import React from 'react';

import Header from './Header';

const Layout = ({ children }) => {
  // Use either <div> or <React.Fragment> to contain more than one element
  return (
    <React.Fragment>
      {<Header />}

      {children}

      <hr />
      {/* <p>___________ FOOTER ___________</p> */}
    </React.Fragment>
  );
};

export default Layout;

// Note: 'children' could be any page/ content here that's passed to it from index.js