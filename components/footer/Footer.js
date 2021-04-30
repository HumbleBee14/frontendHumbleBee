// import * as React from "react";

import React from 'react';


import { ThemeProvider } from "styled-components";


import { Button } from "./Button/index";


import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaMedium,
  FaStackOverflow,
  FaReddit
} from "react-icons/fa";

import {
  HorizontalLine,
  FooterContainer,
  FooterSubscription,
  FooterSubHeading,
  FooterSubText,
  Form,
  FormInput,
  FooterLink,
  FooterLinkItems,
  FooterLinksContainer,
  FooterLinksWrapper,
  FooterLinkTitle,
  SocialMedia,
  SocialMediaWrap,
  SocialLogo,
  SocialIcon,
  WebsiteRights,
  SocialIcons,
  SocialIconLink
} from "./Footer.elements";


import dynamic from 'next/dynamic';


// --------------------------------------------------------------------


const PageFooter = () => {

  const theme = {
    colors: {
      primary: "#4B59F7",
      primaryDark: "#0467FB",
      white: "#fff",
      main: "#101522",
      grayDark: "#242424",
      grayOne: "#1c2237",
      grayLight: "#a9b3c1",
      grayLighter: "#f7f8fa"
    }
  };
  // With theme


  // --------------------------------------

  const Footer = () => {
    return (

      <FooterContainer>

        <FooterSubscription>

          <FooterSubHeading>
            {/* <p className="pl-5 pr-5">Join our exclusive HumbleBee group to share your blogs with, the world? Nope! only Me 🤖</p> */}
            Join our exclusive HumbleBee group to share your blogs with, the world? Nope! only Me 🤖
          </FooterSubHeading>
          {/* <FooterSubText>You can unsubscribe at any time</FooterSubText> */}
          <FooterSubText> &lt; Under 👨‍💻 Development &gt; </FooterSubText>
          <Form>
            <FormInput name="email" type="email" placeholder="Your Email" />
            {/* <Button fontBig>Subscribe</Button> */}
            <Button fontBig>Join</Button>
          </Form>

        </FooterSubscription>

        <HorizontalLine />

        {/* // -------------------------------------------------- // */}

        {/*
 
        <FooterLinksContainer>

          <FooterLinksWrapper>

            <FooterLinkItems>
              <FooterLinkTitle>About Us</FooterLinkTitle>
              <FooterLink href="/sign-up">How it works</FooterLink>
              <FooterLink href="/">Testimonials</FooterLink>
              <FooterLink href="/">Careers</FooterLink>
              <FooterLink href="/">Investors</FooterLink>
              <FooterLink href="/">Terms of Service</FooterLink>
            </FooterLinkItems>
            <FooterLinkItems>
              <FooterLinkTitle>Contact Us</FooterLinkTitle>
              <FooterLink href="/">Contact</FooterLink>
              <FooterLink href="/">Support</FooterLink>
              <FooterLink href="/">Destinations</FooterLink>
              <FooterLink href="/">Sponsorships</FooterLink>
            </FooterLinkItems>

          </FooterLinksWrapper>

          <FooterLinksWrapper>

            <FooterLinkItems>
              <FooterLinkTitle>Videos</FooterLinkTitle>
              <FooterLink href="/">Submit Video</FooterLink>
              <FooterLink href="/">Ambassadors</FooterLink>
              <FooterLink href="/">Agency</FooterLink>
              <FooterLink href="/">Influencer</FooterLink>
            </FooterLinkItems>


            <FooterLinkItems>
              <FooterLinkTitle>Social Media</FooterLinkTitle>
              <FooterLink href="/">Instagram</FooterLink>
              <FooterLink href="/">Facebook</FooterLink>
              <FooterLink href="/">Youtube</FooterLink>
              <FooterLink href="/">Twitter</FooterLink>
            </FooterLinkItems>

          </FooterLinksWrapper>

        </FooterLinksContainer>
 */}


        {/* // -------------------------------------------------- // */}

        <SocialMedia>

          <SocialMediaWrap>

            <SocialLogo href="/">
              <SocialIcon />
            HUMBLEBEE
            </SocialLogo>

            <WebsiteRights>HumbleBee © 2021</WebsiteRights>

            <SocialIcons>

              {/* <SocialIconLink href="/" target="_blank" aria-label="Facebook">
                <FaFacebook />
              </SocialIconLink>
              <SocialIconLink href="/" target="_blank" aria-label="Instagram">
                <FaInstagram />
              </SocialIconLink>
              <SocialIconLink href="/" target="_blank" aria-label="Twitter">
                <FaTwitter />
              </SocialIconLink> */}




              <SocialIconLink href="//www.github.com/HumbleBee14" target="_blank" aria-label="Github">
                <FaGithub />
              </SocialIconLink>

              <SocialIconLink
                href={"//www.youtube.com/channel/humblebee"}
                rel="noopener noreferrer"
                target="_blank"
                aria-label="Youtube"
              >
                <FaYoutube />
              </SocialIconLink>

              <SocialIconLink href="//medium.com/@humble_bee" target="_blank" aria-label="Medium">
                <FaMedium />
              </SocialIconLink>

              <SocialIconLink href="https://www.linkedin.com/in/dineshyd"
                target="_blank" aria-label="LinkedIn">
                <FaLinkedin />
              </SocialIconLink>

              <SocialIconLink href="/" target="_blank" aria-label="StackOverflow">
                <FaStackOverflow />
              </SocialIconLink>

              <SocialIconLink href="/" target="_blank" aria-label="Reddit">
                <FaReddit />
              </SocialIconLink>

            </SocialIcons>

          </SocialMediaWrap>

        </SocialMedia>


      </FooterContainer >
    );
  };

  // ----------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------

  return (
    <React.Fragment>

      <div>
        <ThemeProvider style={{ paddingTop: '30px !important' }} theme={theme}>

          {Footer()}

        </ThemeProvider>
      </div>

    </React.Fragment>
  );

};

export default PageFooter;
