// Fun Face Page

import Layout from '../../../components/Layout';
import React, { useRef } from "react";

const FunFace = () => {

  const eye1 = document.querySelector('.eye-left');
  const eye2 = document.querySelector('.eye-right');
  window.addEventListener('mousemove', (evt) => {
    const x = -(window.innerWidth / 2 - evt.pageX) / 160;
    const y = -(window.innerHeight / 2 - evt.pageY) / 160;
    eye1.style.transform = `translateY(${y}px) translateX(${x}px)`;
    eye2.style.transform = `translateY(${y}px) translateX(${x}px)`;
  });

  // ------------------------------------------------------------
  return (
    <Layout>

      <div className="container-fluid">


        {/* <h2>
          eSmile Please 😃
        </h2> */}

        <br />
        <br />

        <div className="funfacebody">

          <div className="face">
            <div className="eye-outer">
              <div className="left-eye">
                <svg viewBox="0 0 21 21">
                  <circle className="eye eye-left" cx="10.5" cy="10.5" r="2.25"></circle>
                  <path className="top" d="M2 10.5C2 10.5 6.43686 5.5 10.5 5.5C14.5631 5.5 19 10.5 19 10.5"></path>
                  <path className="bottom" d="M2 10.5C2 10.5 6.43686 15.5 10.5 15.5C14.5631 15.5 19 10.5 19 10.5"></path>
                </svg>
              </div>
              <div className="right-eye">
                <svg viewBox="0 0 21 21">
                  <circle className="eye eye-right" cx="10.5" cy="10.5" r="2.25"></circle>
                  <path className="top" d="M2 10.5C2 10.5 6.43686 5.5 10.5 5.5C14.5631 5.5 19 10.5 19 10.5"></path>
                  <path className="bottom" d="M2 10.5C2 10.5 6.43686 15.5 10.5 15.5C14.5631 15.5 19 10.5 19 10.5"></path>
                </svg>
              </div>
            </div>
            <div className="mouth-outer">
              <svg viewBox="0 0 21 21">
                <path className="top" d="M2 10.5C2 10.5 6.43686 5.5 10.5 5.5C14.5631 5.5 19 10.5 19 10.5"></path>
                <path className="bottom" d="M2 10.5C2 10.5 6.43686 15.5 10.5 15.5C14.5631 15.5 19 10.5 19 10.5"></path>
              </svg>
            </div>
          </div>

        </div>



      </div>

    </Layout>
  );
};

export default FunFace;