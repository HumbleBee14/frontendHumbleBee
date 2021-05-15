import React from 'react';

import Header from './Header';

import PageFooter from './footer/Footer';

// import CookieConsent from "react-cookie-consent";

const Layout = ({ children }) => {
  // Use either <div> or <React.Fragment> to contain more than one element
  return (
    <React.Fragment>
      {<Header />}

      {/*
       <CookieConsent
        // debug={true}
        location="bottom"
        style={{ background: '#000', textAlign: "left" }}
        buttonStyle={{ color: '#000', background: "#fff", fontSize: "14px" }}
        buttonText="Ok Great!"
        expires={365}>
        This site uses cookies.</CookieConsent>
         */}


      {children}

      <hr />

      {<PageFooter />}


      <div className="mountains">

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#000b86" fillOpacity="1" d="M0,160L26.7,160C53.3,160,107,160,160,176C213.3,192,267,224,320,202.7C373.3,181,427,107,480,117.3C533.3,128,587,224,640,261.3C693.3,299,747,277,800,234.7C853.3,192,907,128,960,128C1013.3,128,1067,192,1120,197.3C1173.3,203,1227,149,1280,122.7C1333.3,96,1387,96,1413,96L1440,96L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"></path></svg>

      </div>

    </React.Fragment>
  );
};

export default Layout;

// Note: 'children' could be any page/ content here that's passed to it from index.js