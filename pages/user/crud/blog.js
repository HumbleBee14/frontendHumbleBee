import Layout from '../../../components/Layout';
import Private from '../../../components/authComp/Private';
import BlogCreate from '../../../components/crud/BlogCreateComponent';
// import Link from 'next/link';

const CreateBlog = () => {

  return (
    <Layout>

      <Private>

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-2 pb-3">
              <h2 style={{ textAlign: "" }}>Create a new Blog 👩‍🏫</h2>
            </div>

            <div className="col-md-12">

              <BlogCreate />

            </div>

          </div>
        </div>

      </Private>

    </Layout>
  );
};

export default CreateBlog;