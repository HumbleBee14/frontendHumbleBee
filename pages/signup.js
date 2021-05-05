import Layout from '../components/Layout';

import SignupComponent from '../components/authComp/SignupComponent';
// import Link from 'next/link';

const Signup = () => {
  // console.log('This is Signup Page !');
  return (
    <Layout>
      <div className="container-fluid">
        <br />
        <h2 className="text-center pt-5 pv-4" style={{ fontWeight: "bold" }}>Signup</h2>
        <p className="text-center pt-4 pv-4">Let's begin your onboarding process 👩‍🚀</p>
        <br />
        {/* <Link href="/" passHref><a>Home</a></Link> */}
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <SignupComponent />
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default Signup;