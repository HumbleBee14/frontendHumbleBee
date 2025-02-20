import React, { useState, useEffect } from 'react';
import { APP_NAME } from '../config';
import Link from 'next/link';
import Router from 'next/router';

import dynamic from 'next/dynamic';
// import useKeypress from '../hooks/useKeypress';

const Search = dynamic(() => import('./SearchComponent'), { ssr: false });
// Dynamically importing Search Component in the frontend client side (So that it doesn't run on server side), therefore we have set SSR (Server side rendering) to false

// import Search from './blog/SearchComponent';

import { isAuth, signout } from "../actions/authAction";

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

  const [authenticated, setAuthenticated] = useState(null); // User Authentication state

  const toggle = () => { setIsOpen(!isOpen); };


  // -----------------------------------
  // Key Press HOOK (to close Menu on Escape Key press)

  // function -> useKeypress(key, action)

  // useKeypress(
  //   'Escape', toggle
  //   // () => { alert('you pressed escape!'); }
  // );

  // ------------------------------------



  // useEffect(() => {
  //   if (!process.browser) return; // if not running on browser/client - i.e. running on server, return nothing, else run below code if on browser
  //   const user = isAuth();
  //   setAuthenticated(user);
  // }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAuthenticated(isAuth()); // Only runs on client
    }
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
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link href="/blogs" passHref>
                <NavLink>Blogs</NavLink>
              </Link>
            </NavItem>

            <NavItem>
              <Link href="/contact" passHref>
                <NavLink>Contact</NavLink>
              </Link>
            </NavItem>

            {/* AUTH SECTION - Render only on Client Side */}
            {authenticated !== null && (
              <>
                {authenticated ? (
                  <>
                    <NavItem>
                      <Link href={authenticated.role === 1 ? "/admin" : "/user"} passHref>
                        <NavLink>{`${authenticated.name.split(" ")[0]}'s Dashboard`}</NavLink>
                      </Link>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        onClick={() => signout(() => router.push("/signin"))}
                      >
                        Signout
                      </NavLink>
                    </NavItem>
                  </>
                ) : (
                  <>
                    <NavItem>
                      <Link href="/signin" passHref>
                        <NavLink>Signin</NavLink>
                      </Link>
                    </NavItem>

                    <NavItem>
                      <Link href="/signup" passHref>
                        <NavLink>Signup</NavLink>
                      </Link>
                    </NavItem>
                  </>
                )}
              </>
            )}

            {/* Write Blog Button */}
            {/* {authenticated && ( */}
              <NavItem>
                <Link href="/user/crud/blog" passHref>
                  <NavLink className="btn btn-primary text-light">Write a blog</NavLink>
                </Link>
              </NavItem>
            {/* )} */}
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