import Layout from '../components/Layout';

import SignupComponent from '../components/authComp/SignupComponent';
import Link from 'next/link';

const Signup = () => {
  // console.log('This is Signup Page !');
  return (
    <Layout>
      <h2 className="text-center pt-4 pv-4">Signup :D</h2>
      {/* <Link href="/" passHref><a>Home</a></Link> */}
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <SignupComponent />
        </div>
      </div>
    </Layout>
  );
};

export default Signup;