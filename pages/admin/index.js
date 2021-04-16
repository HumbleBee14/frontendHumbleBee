import Layout from '../../components/Layout';
import Admin from '../../components/authComp/Admin';
import Link from 'next/link';

const AdminIndex = () => {
  // console.log('This is Index Page !');
  return (
    <Layout>

      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2> ADMIN Dashboard 🕵️‍♀️ </h2>
            </div>

            <div className="col-md-4">
              {/* LEFT SIDE LIST*/}
              <ul className="list-group">

                <li className="list-group-item">
                  {/* <Link href="/admin/crud/category-tag" passHref> */}
                  <a href="/admin/crud/category-tag">Create Category</a>
                  {/* // Forcing Page Reload/Refresh on clicking Create Category (by using <a> tag and Not using <Link>) above so that all the scripts & css gets properly loaded (for text editor-quill) */}
                </li>


                <li className="list-group-item">
                  <Link href="/admin/crud/category-tag" passHref>
                    <a>Create Tag</a>
                  </Link>
                </li>


                <li className="list-group-item">
                  <Link href="/admin/crud/blog" passHref>
                    <a>Create New Blog</a>
                  </Link>
                </li>


                <li className="list-group-item">
                  <Link href="/admin/crud/blogs" passHref>
                    <a>Update/Delete Blog</a>
                  </Link>
                </li>


                <li className="list-group-item">
                  <Link href="/user/update" passHref>
                    <a>Update Profile</a>
                  </Link>
                </li>

              </ul>

            </div>

            <div className="col-md-4">

              RIGHT SIDE LIST

            </div>

          </div>
        </div>
      </Admin>

    </Layout>
  );
};

export default AdminIndex;