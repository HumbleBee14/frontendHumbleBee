import Layout from '../../components/Layout';
import Private from '../../components/authComp/Private';
import Link from 'next/link';

const UserIndex = () => {
  // console.log('This is Index Page !');
  return (
    <Layout>

      <Private>


        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>User Dashboard 👨‍🚀</h2>
            </div>

            <div className="col-md-4">
              {/* LEFT SIDE LIST*/}
              <ul className="list-group">

                {/* <li className="list-group-item">
                  <a href="/admin/crud/category-tag">Create Category</a>
                </li>
// Disabled these because only Admin is allowed to create categories and tags
                <li className="list-group-item">
                  <Link href="/admin/crud/category-tag" passHref>
                    <a>Create Tag</a>
                  </Link>
                </li> */}


                <li className="list-group-item">
                  <Link href="/user/crud/blog" passHref>
                    <a>Create New Blog</a>
                  </Link>
                </li>


                <li className="list-group-item">
                  <Link href="/user/crud/blogs" passHref>
                    <a>Update/Delete Blog</a>
                  </Link>
                </li>

                <li className="list-group-item">
                  <Link href="/user/update" passHref>
                    <a>Update Profile</a>
                  </Link>
                </li>


                <li className="list-group-item">
                  <Link href={`/`} passHref>
                    <a>Your Public Profile</a >
                  </Link>
                </li>


              </ul>

            </div>

            <div className="col-md-4">

              {/* RIGHT SIDE LIST */}

            </div>

          </div>
        </div>

      </Private>

    </Layout>
  );
};

export default UserIndex;