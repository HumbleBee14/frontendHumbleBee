import Link from 'next/link';
// import renderHTML from 'react-render-html'; // to render html for excerpts for each blog
import { useState, useEffect } from 'react';

// import { FormGroup, Input, Button, Row, Col, Form } from "reactstrap";
// import { Button } from "reactstrap";

// import { Button } from 'antd';
// import 'antd/dist/antd.css'; // to get Font Styles for Ant-design buttons or other elements.
// Warning!! -> ants-  CSS files changes my websites design. Try not to use it !

import { listSearch } from '../actions/blogAction'; // Search Action (which will send search query request to backend API to return JSON list of blogs that match the search)

import { SearchOutlined, CloseCircleTwoTone } from "@ant-design/icons";

import useKeypress from '../hooks/useKeypress'; // for Closing Menus or some action on ESC key press



// -----------------------------------------------------------------

const Search = () => {

  const [values, setValues] = useState({
    search: undefined,
    results: [],
    searched: false, // to determine if the user has submitted the search form, if yes, we will clear the search form & existed results, else not
    message: ''
  });


  const { search, results, searched, message } = values;



  // ------------------------------------------------------
  // Search Submit handler
  const searchSubmit = e => {

    e.preventDefault();

    // console.log("Search Term send to from Frontend Component page to Actions: ", { search });

    // 'ListSearch' Action that further makes request to backend & fetch results and passes here (saves it in state variable- 'results')
    listSearch({ search }).then(data => {

      // Error handling
      if (typeof data === 'undefined') {
        console.log("Error fetching Data from Backend");

        setValues({ ...values, searched: true, message: "Error fetching Data" });

        return; // Show ERROR Popup here <pending>
      }

      if (!data.length) {
        // console.log("No Related Blog Found!");

        setValues({ ...values, searched: true, message: "No related Blog Found ! Try something else." });

        return; // Show WARNING Popup here <pending>
      }


      // -------------------------- On Finding Blogs
      setValues({ ...values, results: data, searched: true, message: `${data.length} Blogs found` });
      // Save blogs data (list of blogs) in the state variable - results 
    });
  };

  // --------------------------------------------------------
  // Change Handler (grabbing search Term)

  const handleChange = e => {
    // console.log(e.target.value); // to see search query input entered by user

    setValues({ ...values, search: e.target.value, searched: false, results: [] }); // searched =  false because the user hasn't submitted the Search button yet, still Typing in the Search Query box. When we get the result, it'll be TRUE. (but If user again starts typing in the search box, it'll again change to false, bcoz the user wants to perform a New Query)
    // So anytime if there's a change, we set it (searched) to False, so that it's not searched anylonger, it's a new search request
    // results=[] Empty array implies => As soon as the user starts typing, we clear out Old results because user is searching new query

    // Updated the search term in the 'search' state variable, which will be send to backend after submit click (searchSubmit)
  };
  //-------------------------------------------------------

  // Search Results output
  const searchedBlogs = (results = []) => {


    return (
      // <div className="jumbotron bg-white">
      <div style={{ width: "fit-content", maxWidth: "auto", backgroundColor: "white", }}>

        {/* {message && <p className="pt-5 text-muted font-italic">{message}</p>} */}
        {message && <p className="pt-1 pl-3 pr-3 text-muted font-italic">{message}</p>}
        {/* X number of Blogs found */}


        {/* Show list of blogs - Search Results */}

        <div className="pb-0 pl-2 pr-2">

          {results.map((blog, i) => {
            return (

              <div key={i}>

                <Link href={`/blogs/${blog.slug}`} passHref>

                  <p className="search-results"
                    style={{
                      display: "inline-block",
                      cursor: 'pointer',
                      // lineHeight: "2.0em",
                      // lineHeight: "26pt",
                      // fontFamily: "sans-serif",
                      // fontFamily: "Arial",
                      fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji','Segoe UI Emoji', 'Segoe UI Symbol'",
                      fontSize: "1.25rem",
                      fontStyle: "normal",
                      fontWeight: "500",
                      overflowWrap: "break-word",
                      color: "black !important",
                    }}>
                    &bull;  {blog.title}
                  </p>

                </Link>

              </div>
            );
          })}

        </div>

      </div >
    );
  };

  //---------------------------------------------------------
  // Search Animation script called using custom hook


  useEffect(() => {
    // Search Animation Script

    const searchBox = document.querySelector(".search-box");
    const searchBtn = document.querySelector(".search-icon");
    const cancelBtn = document.querySelector(".cancel-icon");
    const searchInput = document.querySelector("input");

    searchBtn.onclick = () => {
      searchBox.classList.add("active");
      searchBtn.classList.add("active");
      searchInput.classList.add("active");
      cancelBtn.classList.add("active");
      searchInput.focus();
    };
    // Search Submit Functionality is directly added in the Icon itself, not here through onClick

    cancelBtn.onclick = () => {
      searchBox.classList.remove("active");
      searchBtn.classList.remove("active");
      searchInput.classList.remove("active");
      cancelBtn.classList.remove("active");
      searchInput.value = "";
    };
    // Note: We have also added cancel / close option on Escape Key Press

  }, []);

  // Close Search Box on Key Press
  const closeSearchBox = () => {
    // console.log("Close Search Box Function Called");

    const searchBox = document.querySelector(".search-box");
    const searchBtn = document.querySelector(".search-icon");
    const cancelBtn = document.querySelector(".cancel-icon");
    const searchInput = document.querySelector("input");


    searchBox.classList.remove("active");
    searchBtn.classList.remove("active");
    searchInput.classList.remove("active");
    cancelBtn.classList.remove("active");
    searchInput.value = "";

  };


  // -----------------------------------
  // Key Press HOOK (to close search bar on Escape Key press)

  // function -> useKeypress(key, action)

  useKeypress(
    'Escape',
    closeSearchBox
    // () => { alert('you pressed escape!'); }
  );

  // ------------------------------------



  // -------------------------------------------------------------------------------
  // Note: Search form will be 'inline' horiztonal block having Input field + Button


  const searchForm = () => (

    <form onSubmit={searchSubmit} >

      <div className="search-box">

        <input type="search" className="form-control" placeholder="Type to search.." onChange={handleChange} />

        <div className="search-icon">
          <SearchOutlined onClick={searchSubmit} title="Search" style={{ verticalAlign: "0", fontSize: '30px' }} />
          {/* <Button shape="circle" type="link" block="true" onClick={searchSubmit} icon={<SearchOutlined style={{ verticalAlign: "0", fontSize: '30px' }} />} /> */}
        </div>

        <div className="cancel-icon" >
          <CloseCircleTwoTone style={{ verticalAlign: "middle" }} onClick={() => setValues({ ...values, search: undefined, searched: false, message: "" })} />
        </div>

      </div>

      {/* 
      <div className="row justify-content-right">
        <div className="col-md-5">
          <input type="search" className="form-control" placeholder="Search Blogs.." onChange={handleChange} />
        </div>
        <div className="col-md-2">
          <button className="btn btn-block btn-outline-primary" type="submit">Search</button>
        </div>
      </div>
       */}

    </form>
  );


  /*
   // Modified above using reactstrap
   
   const searchForm = () => (
     <Fragment>
        <Form onSubmit={searchSubmit}>
          <FormGroup>
            <Row>
              <Col md={8}>
                <Input type="search" placeholder="Search..." onChange={handleChange} />
              </Col>
              <Col md={4}>
                <Button type="submit" outline block color="primary">Search</Button>
              </Col>
            </Row>
          </FormGroup>
        </Form>
      </Fragment>
   );
  */

  // ==============================================

  return (
    // 'container-fluid' ==> Full Width
    <div className="container-fluid search-element" style={{ position: "fixed", display: "inline-block", zIndex: "1" }}>

      <div className="pt-3 pb-3">
        {searchForm()}
      </div>

      {/* Search Result (if 'searched' = true) */}
      {searched &&
        // <div style={{ marginTop: '-120px', marginBottom: '-80px' }}>
        <div style={{}}>
          {searchedBlogs(results)}
        </div>}

    </div>
  );

};



export default Search;







// ########################## NOTES ###########################
/*
Q- Why are we passing empty array to serch 'results' state ?
          const searchedBlogs = (results = [])

==> It is Default value  (Empty Array [ ])

1. so searchedBlogs function will need results array as an arguments

2. if results array is not passed/given, there will be an error

3. to avoid that, you can use default value of []

4. so when searchedBlogs function is used somewhere but results argument was not passed, no problem becuase by default its gonna be empty []
*/