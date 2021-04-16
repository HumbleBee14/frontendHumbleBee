import Layout from '../../../components/Layout';
import Private from '../../../components/authComp/Private';
import BlogRead from '../../../components/crud/BlogReadComponent';
// import Link from 'next/link';
import { isAuth } from '../../../actions/authAction';

const Blog = () => {

  // We get the username from the localStorage using isAuth 
  const username = isAuth() && isAuth().username; // grabbing the curently logged in user's username from Localstorage


  // -------------------------------------------------------

  return (
    <Layout>

      <Private>

        <div className="container">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Manage Blogs 👩‍🏫</h2>
            </div>

            <div className="col-md-12">

              {/* <BlogRead />  <-- This will show All the Blogs on website, but we want to show blogs only by the currently logged in user. SO grab that User ID from the localstorage and pass it as props to this component */}

              <BlogRead username={username} />

            </div>

          </div>
        </div>

      </Private>

    </Layout>
  );
};

export default Blog;