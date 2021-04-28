import styled from "styled-components";

export const Button = styled.button`
  border-radius: 4px;
  background: ___CSS_0___;
  white-space: nowrap;
  padding: ___CSS_1___;
  // color: #fff;
  color: #925;
  font-size: ___CSS_2___;
  outline: none;
  border: none;
  cursor: pointer;

  &:hover {
    transition: all 0.3s easy-out;
    background: #fff;
    // background: #925;
    background: ___CSS_3___;
  }

  @media screen and (max-width: 960px) {
    width: 100%;
  }
`;