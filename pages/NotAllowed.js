// # Custome 404 Page Not Found Error Page

import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function NotFound() {

  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/'); // Redirect to homepage
    }, 5000); // 5 seconds
  }, []);

  // ---------------------------------

  return (
    <div className="layout">
      <div className="window" >
        <h1>SORRY!</h1>
        <h2>You don't have permission to view this page :(</h2>
        <p>Redirecting to <Link href="/">Homepage</Link> 😊</p>

        <style> {`
 .layout {
          // border: 3px solid #73AD21;
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%); 
        }
.window {
        text-align:center;
        background: yellow;
        padding: 70px;
        // border: 10px solid ;
        box-shadow: 5px 10px 20px #888888;
        transform: rotateZ(-3deg);
}
h1 {
        font-size: 3em;
        font-weight: 800;
      }
h2 {
        font-weight: 500;
      }      
      `}</style>

      </div >
    </div >
  );
}