// Contact us Form Page

import Layout from '../components/Layout';
import Link from 'next/link';
import ContactForm from '../components/form/ContactFormComponent'; // Contact Form Component

const Contact = () => {
  // console.log('This is Index Page !');
  return (
    <Layout>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8 offset-md-2">

            <h2>
              Contact Form
            </h2>

            <hr />

            <ContactForm />

          </div>
        </div>
      </div>

    </Layout>
  );
};

export default Contact;