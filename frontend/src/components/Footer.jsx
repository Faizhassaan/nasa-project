// src/components/Footer.jsx
import React from "react";
import styled from "@emotion/styled";
import Centered from "./Centered";
import { theme } from "../settings";

/**
 * Outer footer wrapper
 */
const FooterWrapper = styled.footer`
  position: absolute;
  bottom: 0%;
  width: 100%;
  padding: ${theme.padding}px 0;
  background: #000; /* or whatever background you prefer */
`;

/**
 * Styled paragraph text
 */
const FooterText = styled.p`
  font-size: 14px;
  margin: 10px 0;
  color: ${theme.color.content};
  text-align: center;
`;

const Footer = () => (
  <FooterWrapper>
    <Centered>
      <FooterText>
        This is not an official site and is not affiliated with NASA or SpaceX
        in any way. For educational purposes only.
      </FooterText>
    </Centered>
  </FooterWrapper>
);

export default Footer;
