import Layout from '../../../components/Layout';
import Admin from '../../../components/authComp/Admin';
import BlogRead from '../../../components/crud/BlogReadComponent';
// import Link from 'next/link';

const Blog = () => {

  return (
    <Layout>

      <Admin>
        <div className="container">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Manage Blogs 👩‍🏫</h2>
            </div>

            <div className="col-md-12">

              <BlogRead />

              {/* // Since there's no prop is passed in this component, then it'll list all the blogs by every user */}

            </div>

          </div>
        </div>
      </Admin>

    </Layout>
  );
};

export default Blog;