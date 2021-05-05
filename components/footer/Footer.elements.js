import styled from "styled-components";
// import { FaMagento } from "react-icons/fa";
import { CgBee } from "react-icons/cg"; // Refer: https://react-icons.github.io/react-icons/


// ------------------------------------------------

export const HorizontalLine = styled.hr`
  justify-content: center;
  width: 75%;
  border-color: purple;
`;

export const FooterContainer = styled.div`
  background-color: ___CSS_0___;
  padding: 4rem 0 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FooterSubscription = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 24px;
  padding: 24px;
  color: ___CSS_0___;
`;

export const FooterSubHeading = styled.p`
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  margin-bottom: 24px;
  font-size: 24px;
`;

export const FooterSubText = styled.p`
  margin-bottom: 24px;
  font-size: 20px;
`;

export const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 820px) {
    flex-direction: column;
    width: 80%;
  }
`;

export const FormInput = styled.input`
  padding: 10px 20px;
  border-radius: 10px;
  margin-right: 10px;
  outline: none;
  // border: none;
  border: 1px solid;
  box-shadow: 2px 5px 10px #888888;
  font-size: 16px;
  border: 1px solid ___CSS_0___;
  &::placeholder {
    color: ___CSS_1___;
  }
  @media screen and (max-width: 820px) {
    width: 100%;
    margin: 0 0 16px 0;
  }
`;

export const FooterLinksContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 820px) {
    padding-top: 32px;
  }
`;

export const FooterLinksWrapper = styled.div`
  display: flex;
  @media screen and (max-width: 820px) {
    flex-direction: column;
  }
`;

export const FooterLinkItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 16px;
  text-align: left;
  width: 160px;
  box-sizing: border-box;
  color: ___CSS_0___;
  @media screen and (max-width: 420px) {
    margin: 0;
    padding: 10px;
    width: 100%;
  }
`;

export const FooterLinkTitle = styled.h2`
  margin-bottom: 16px;
`;

export const FooterLink = styled.a`
  color: ___CSS_0___;
  text-decoration: none;
  margin-bottom: 0.5rem;
  &:hover {
    color: ___CSS_1___;
    transition: 0.3s ease-out;
  }
`;

export const SocialMedia = styled.section`
  max-width: 1000px;
  width: 100%;
`;

export const SocialMediaWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  max-width: 1000px;
  margin: 40px auto 0 auto;
  @media screen and (max-width: 820px) {
    flex-direction: column;
  }
`;

export const SocialLogo = styled.a`
  color: ___CSS_0___;
  justify-self: start;
  cursor: pointer;
  text-decoration: none;
  font-size: 2rem;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  text-shadow: 2px -2px 3px #000000;

`;

// Website Logo Icon

// export const SocialIcon = styled(FaMagento)`
export const SocialIcon = styled(CgBee)`
  margin-right: 10px;
`;

export const WebsiteRights = styled.small`
  color: ___CSS_0___;
  margin-bottom: 16px;
`;

export const SocialIcons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 240px;

`;

export const SocialIconLink = styled.a`
  color: ___CSS_0___;
  font-size: 24px;  
`;


// ---------------------------------------------------------------