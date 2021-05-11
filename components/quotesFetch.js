// Random Quote of the Day generator

import React, { useState, useEffect } from "react";


// ----------------------------------------------
function FetchQuote() {
  const [quote, setQuote] = useState('');
  // const [loading, setLoading] = useState(true);
  const [author, setAuthor] = useState('');
  // const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    getQuote();
    const intervalID = setInterval(() => {
      getQuote();
    }, 24 * 60 * 60 * 1000);

    return () => {
      clearInterval(intervalID);
    };
  }, []);

  // https://zenquotes.io/api/random

  function getQuote() {
    try {
      fetch('https://quotes.rest/qod.json?category=inspire')
        .then(res => res.json())
        .then(data => {
          // console.log(data);

          if (data.error) {
            console.log("Quote Fetch Error", data.error);
            setQuote("If you love it, you'll teach yourself. If you don't love it, others teach you.");
            setAuthor("Anonymous");
            // setImgSrc("https://images.pexels.com/photos/1040499/pexels-photo-1040499.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
            // setImgSrc("https://images.pexels.com/photos/3068707/pexels-photo-3068707.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
          }
          else {
            setQuote(data.contents.quotes[0].quote);
            setAuthor(data.contents.quotes[0].author);
            // setImgSrc(data.contents.quotes[0].background);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
    catch (errors) {
      console.log(errors);
    }
  }

  return (
    <div className="quoteOfTheDay" style={{
      position: "relative",
      textAlign: "center",
      //  maxHeight: "400px",
      alignItems: "center",
      display: "flex"
    }}>

      {/* <img src={imgSrc} alt="" style={{
        position: "relative",
        display: "block",
        objectFit: "cover",
        overflow: "hidden",
        // maxWidth: "100%",
        maxHeight: "400px",
        width: "100vw",
        height: "auto",
      }} /> */}

      <div className="quoteOfTheDayText" style={{
        position: "absolute",
        justifyContent: "center",
        overflow: "hidden",
        wordWrap: "break-word",

        // position: "center",
        textAlign: "center",
        textSizeAdjust: "inherit",
        // backgroundColor: "black",
        // color: "white",
        paddingLeft: "10px",
        paddingRight: "10px",
        width: "100%",
        // transform: "translate(-50%, -50%)",
      }}>
        <blockquote className="blockquote text-center">
          <p className="lead" style={{ fontSize: "1rem" }}>{quote}</p>
          <footer className="blockquote-footer" style={{ color: "dark grey" }}>{author}<cite title="Source Title"></cite></footer>
        </blockquote>

      </div>

    </div>
  );
}
export default FetchQuote;