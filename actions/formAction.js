import fetch from 'isomorphic-fetch';
import { API } from '../config';



// ------------------------------------------------------------
// Contact Form for sending email to Admin / Blog Author

// API for Admin Email : ${API}/contact
// API for Blog Author Email: ${API}/contact-blog-author

export const emailContactForm = (data) => {

  // Based on if email is written for ADMIN or Blog Author

  let emailEndPoint;

  if (data.authorEmail)  // if the data has Author Email, send to Author email API
  { emailEndPoint = `${API}/contact-blog-author`; }
  // if there's no author email property, send to ADMIN only
  else { emailEndPoint = `${API}/contact`; }


  return fetch(`${emailEndPoint}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      // Authorization // Not needed here for sending email because anyone can email
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      // console.log("Response from backend : ", response.clone().json()); // Note: You can not use response.json() more than once, therefore cloning it to read
      return response.json();
    })
    .catch(err => console.log("Form Error : ", err));
};