// Refer: https://mariestarck.com/add-google-analytics-to-your-next-js-application-in-5-easy-steps/

//  Initialize '<YOUR_GA_TRACKING_ID>';

// export const GA_TRACKING_ID = '<YOUR_GA_TRACKING_ID>;
// export const GA_TRACKING_ID = 'G-9SY4WS47N6';
export const GA_TRACKING_ID = 'G-J90HJ2ZBNW';


// . In order to correctly track your user's behaviours, you will need to log page views and optionally, specific events triggered in your application.


// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
// Function to send data to GA - // log the pageview with their URL
export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
//Function to send Custom events to GA - // log specific events happening
export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};