// User Profile details Update page

import Layout from '../../components/Layout';
import Private from '../../components/authComp/Private';
import ProfileUpdate from '../../components/authComp/ProfileUpdateComponent';
// import Link from 'next/link';

const UserProfileUpdate = () => {

  return (
    <Layout>

      <Private>


        <div className="container-fluid">
          <div className="row">

            <ProfileUpdate />

          </div>
        </div>

      </Private>

    </Layout>
  );
};

export default UserProfileUpdate;