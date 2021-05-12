import React, { useState, useEffect } from 'react';
import { APP_NAME } from '../config';
import Link from 'next/link';
import Router from 'next/router';

import dynamic from 'next/dynamic';
// import useKeypress from '../hooks/useKeypress';

const Search = dynamic(() => import('./SearchComponent'), { ssr: false });
// Dynamically importing Search Component in the frontend client side (So that it doesn't run on server side), therefore we have set SSR (Server side rendering) to false

// import Search from './blog/SearchComponent';

import { signout, isAuth } from '../actions/authAction';

import NProgress from 'nprogress';
import '.././node_modules/nprogress/nprogress.css';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  // UncontrolledDropdown,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem,
  // NavbarText
} from 'reactstrap';




// -------------------------------------------------------------------

// https://nextjs.org/docs/api-reference/next/router#routerevents

Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();



const Header = () => {

  const [isOpen, setIsOpen] = useState(false); //  toggle Button state - Menu open / closed State (on small screens)

  const [authenticated, setAuthenticated] = useState(false); // User Authentication state

  const toggle = () => { setIsOpen(!isOpen); };


  // -----------------------------------
  // Key Press HOOK (to close Menu on Escape Key press)

  // function -> useKeypress(key, action)

  // useKeypress(
  //   'Escape', toggle
  //   // () => { alert('you pressed escape!'); }
  // );

  // ------------------------------------



  useEffect(() => {
    if (!process.browser) return; // if not running on browser/client - i.e. running on server, return nothing, else run below code if on browser
    const user = isAuth();
    setAuthenticated(user);
  }, []);



  // ---------------------------------------------------------------

  // return process.browser && (
  return (
    <React.Fragment>


      {/* // ================== ----------------- HEADER TOP NAVIGATION BAR ------------------ ================== */}

      {/* <Navbar color="light" light expand="md"> */}
      <Navbar color="dark" dark expand="md" className="header-sticky">

        <Link href="/" passHref>
          <div>
            <NavbarBrand
              className="font-weight-bold"
              style={{ cursor: 'pointer' }}>
              {APP_NAME}
            </NavbarBrand>
          </div>
        </Link>
        {/* Website Logo / Website Name */}
        {/* <NavLink className="font-weight-bold" style={{ cursor: 'pointer' }}>{APP_NAME}</NavLink> */}


        {/* // ---------------------------------------------- */}

        <NavbarToggler onClick={toggle} />

        {/* // ----------------- Collapsable ---------------- */}
        <Collapse isOpen={isOpen} navbar>

          <Nav className="ml-auto" navbar >


            <React.Fragment>
              <NavItem>
                <Link href="/blogs" passHref>
                  <NavLink style={{ cursor: 'pointer' }}>Blogs</NavLink>
                </Link>
              </NavItem>
            </React.Fragment>



            <React.Fragment>
              <NavItem>
                <Link href="/contact" passHref>
                  <NavLink style={{ cursor: 'pointer' }}>Contact</NavLink>
                </Link>
              </NavItem>
            </React.Fragment>



            {process.browser && isAuth() && isAuth().role === 0 &&
              (
                <NavItem>
                  <Link href="/user">
                    <NavLink style={{ cursor: 'pointer' }}>{`${isAuth().name.split(" ")[0]}'s Dashboard (U)`}</NavLink>
                  </Link>
                </NavItem>
              )
            }

            {process.browser && isAuth() && isAuth().role === 1 &&
              (
                <NavItem>
                  <Link href="/admin">
                    <NavLink style={{ cursor: 'pointer' }}>{`${isAuth().name.split(" ")[0]}'s Dashboard (A)`}</NavLink>
                  </Link>
                </NavItem>
              )
            }


            {/* If not authenticated (not logged in), then only we'll see SIGNIN & SIGNUP, else not (only signout) */}

            {/* //-----------------------------------------------------------
            // option 1 (without state 'authenticated') */}

            {process.browser && !isAuth() && (
              <React.Fragment>

                <NavItem>
                  <Link href="/signin">
                    <NavLink style={{ cursor: 'pointer' }}>Signin</NavLink>
                  </Link>
                </NavItem>

                <NavItem>
                  <Link href="/signup">
                    <NavLink style={{ cursor: 'pointer' }}>Signup</NavLink>
                  </Link>
                </NavItem>

              </React.Fragment>
            )}



            {process.browser && isAuth() &&
              (
                <NavItem>

                  <NavLink style={{ cursor: 'pointer' }} onClick={() => signout(() => Router.replace(`/signin`))}>
                    Signout
                  </NavLink>

                </NavItem>
              )
            }



            {/* Note: This Function 'Router.replace' is next() call back function called inside signout() function */}

            {/* Signout button will be showed only when the user is logged in.
               We are redirecting user to SIGNIN page (login page) */}

            {/* // ---------------------------------------------- */}

            {/* // option 2: Using state - 'authenticated' */}

            {/* {
              authenticated ?

                (
                  <NavItem>
                    <NavLink onClick={() => signout(() => Router.replace(`/signin`))} style={{ cursor: 'pointer' }}>
                      Signout
                      </NavLink>
                  </NavItem>
                ) :
                (
                  <>
                    <NavItem>
                      <Link href="/signin" passHref>
                        <NavLink>Signin</NavLink>
                      </Link>
                    </NavItem>

                    <NavItem>
                      <Link href={"/signup"} passHref>
                        <NavLink>Signup</NavLink>
                      </Link>
                    </NavItem>
                  </>
                )
            } */}


            {/* <NavItem>
              <a href="/user/crud/blog" className="btn btn-primary text-light">
                Write a Blog
              </a>
            </NavItem> */}


            {process.browser &&
              (<NavItem>
                <Link href="/user/crud/blog">
                  <NavLink style={{ cursor: 'pointer' }} className="btn btn-primary text-light">Write a blog</NavLink>
                </Link>
              </NavItem>)
            }



          </Nav>

        </Collapse>

        {/* // ----------------- Collapsable ---------------- */}


      </Navbar>


      {/* // ================== ----------------- HEADER TOP NAVIGATION BAR ------------------ ================== */}


      {/* // ----------------- SEARCH ----------------- */}


      <Search />


      {/* // ----------------- SEARCH ----------------- */}


    </React.Fragment >
  );
};

export default Header;