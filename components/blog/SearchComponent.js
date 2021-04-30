import Link from 'next/link';
import renderHTML from 'react-render-html'; // to render html for excerpts for each blog
import { useState, useEffect, Fragment } from 'react';
// import React, {useState, useEffect, Fragment} from 'react';
import { FormGroup, Input, Button, Row, Col, Form } from "reactstrap";

import { listSearch } from '../../actions/blogAction'; // Search Action (which will send search query request to backend)


const Search = () => {

  const [values, setValues] = useState({
    search: undefined,
    results: [],
    searched: false, // to determine if the user has submitted the search form, if yes, we will clear the search form & existed results, else not
    message: ''
  });


  const { search, results, searched, message } = values;


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


      // -------------------------------- On Finding Blog
      setValues({ ...values, results: data, searched: true, message: `${data.length} Blogs found` });
    });
  };


  // Change Handler (grabbing search Term)
  const handleChange = e => {
    // console.log(e.target.value);
    setValues({ ...values, search: e.target.value, searched: false, results: [] }); // searched =  false because the user hasn't submitted the Search button yet, still Typing in the Search Query box. When we get the result, it'll be TRUE. (but If user again starts typing in the search box, it'll again change to false, bcoz the user wants to perform a New Query)
    // So anytime if there's a change, we set it (searched) to False, so that it's not searched anylonger, it's a new search request
    // results=[] Empty array implies => As soon as the user starts typing, we clear out Old results because user is searching new query

    // Updated the search term in the 'search' state variable, which will be send to backend after submit click (searchSubmit)
  };

  // Search result output
  const searchedBlogs = (results = []) => {
    return (
      <div className="jumbotron bg-white">

        {message && <p className="pt-4 text-muted font-italic">{message}</p>}
        {/* X number of Blogs found */}

        {/* Show list of blogs - Search Results */}

        {results.map((blog, i) => {
          return (

            <div key={i}>

              <Link href={`/blogs/${blog.slug}`} passHref>
                <a className="text-primary">{blog.title}</a>
              </Link>

            </div>
          );
        })}

      </div>
    );
  };




  // --------------------------------------------------------
  // Note: Search form will be 'inline' horiztonal block having Unput field + button


  const searchForm = () => (

    <form onSubmit={searchSubmit}>
      <div className="row">

        <div className="col-md-8">
          <input type="search" className="form-control" placeholder="Search Blogs.." onChange={handleChange} />
        </div>

        <div className="col-md-4">
          <button className="btn btn-block btn-outline-primary" type="submit">Search</button>
        </div>

      </div>
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
    <div className="container-fluid">

      <div className="pt-3 pb-3">
        {searchForm()}
      </div>

      {/* Search Result (if 'searched' = true) */}
      {searched &&
        <div style={{ marginTop: '-120px', marginBottom: '-80px' }}>
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