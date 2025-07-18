// src/components/Header.jsx
import React from "react";
import { Link } from "react-router";
import styled from "@emotion/styled";
import Centered from "./Centered";
import Clickable from "./Clickable";
import { theme } from "../settings";

/** Outer header container */
const HeaderWrapper = styled.header`
  background: #000; /* or your bg color */
  padding: ${theme.padding}px 0;
`;

/** Flex row for everything */
const Flex = styled.div`
  display: flex;
  align-items: center;
  line-height: 80px;
`;

/** Logo image */
const Favicon = styled.img`
  margin: 15px 10px 15px 0;
  height: 50px;
  width: auto;

  @media (max-width: ${theme.responsive.medium}px) {
    display: none;
  }
`;

/** “NASA Mission Control” text */
const Title = styled.h1`
  color: ${theme.color.content};
  font-family: ${theme.typography.headerFontFamily};
  font-weight: bold;
  margin: 0 15px 0 10px;
  font-size: 28px;
  display: flex;
  min-width: 300px;

  @media (max-width: ${theme.responsive.medium}px) {
    display: none;
  }
`;

/** Navigation container */
const Nav = styled.nav`
  margin-left: auto;
  display: flex;
  gap: ${theme.padding}px;

  @media (max-width: ${theme.responsive.medium}px) {
    gap: 8px;
  }
`;

/** Each nav item wrapper */
const NavItem = styled.div`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  font-size: 21px;

  i {
    margin-right: ${theme.padding / 2}px;
    font-size: 24px;
  }

  @media (max-width: ${theme.responsive.medium}px) {
    font-size: 16px;

    i {
      margin-right: 8px;
    }
  }
`;

/** Styled React-Router Link */
const StyledLink = styled(Link)`
  color: ${theme.color.content};
  text-decoration: none;
  display: inline-flex;
  align-items: center;
`;

/**
 * Header component
 */
const Header = ({ onNav }) => (
  <HeaderWrapper>
    <Centered>
      <Flex>
        <Favicon src="/favicon.png" alt="Logo" />
        {/* If you have a custom SVG logo component, drop it in here */}
        <Title>NASA Mission Control</Title>

        <Nav>
          {[
            { to: "/launch", icon: "check_circle_outline", label: "Launch" },
            { to: "/upcoming", icon: "update", label: "Upcoming" },
            { to: "/history", icon: "history", label: "History" },
          ].map((item) => (
            <Clickable key={item.to} onClick={onNav}>
              <NavItem>
                <StyledLink to={item.to}>
                  <i className="material-icons">{item.icon}</i>
                  {item.label}
                </StyledLink>
              </NavItem>
            </Clickable>
          ))}
        </Nav>
      </Flex>
    </Centered>
  </HeaderWrapper>
);

export default Header;
