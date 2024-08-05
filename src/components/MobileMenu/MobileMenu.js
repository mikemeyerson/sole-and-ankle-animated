/* eslint-disable no-unused-vars */
import React from "react";
import styled, { keyframes } from "styled-components/macro";
import { DialogOverlay, DialogContent } from "@reach/dialog";

import { WEIGHTS } from "../../constants";

import UnstyledButton from "../UnstyledButton";
import Icon from "../Icon";
import VisuallyHidden from "../VisuallyHidden";

// TODO: reduce-motion media queries
const MobileMenu = ({ isOpen, onDismiss }) => {
  return (
    <Overlay isOpen={isOpen} onDismiss={onDismiss}>
      <Content aria-label="Menu">
        <CloseButton onClick={onDismiss}>
          <Icon id="close" />
          <VisuallyHidden>Dismiss menu</VisuallyHidden>
        </CloseButton>
        <Filler />
        <Nav>
          <NavLink style={{ "--n": 1 }} href="/sale">
            Sale
          </NavLink>
          <NavLink style={{ "--n": 2 }} href="/new">
            New&nbsp;Releases
          </NavLink>
          <NavLink style={{ "--n": 3 }} href="/men">
            Men
          </NavLink>
          <NavLink style={{ "--n": 4 }} href="/women">
            Women
          </NavLink>
          <NavLink style={{ "--n": 5 }} href="/kids">
            Kids
          </NavLink>
          <NavLink style={{ "--n": 6 }} href="/collections">
            Collections
          </NavLink>
        </Nav>
        <Footer>
          <SubLink href="/terms">Terms and Conditions</SubLink>
          <SubLink href="/privacy">Privacy Policy</SubLink>
          <SubLink href="/contact">Contact Us</SubLink>
        </Footer>
      </Content>
    </Overlay>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const Overlay = styled(DialogOverlay)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--color-backdrop);
  display: flex;
  justify-content: flex-end;

  animation: ${fadeIn} 300ms;
  animation-fill-mode: both;

  @media (prefers-reduced-motion: no-preference) {
    perspective: 2000px;
  }
`;

const closeDoor = keyframes`
from {
    transform-origin: 100% 50%;
    transform: rotate3d(0, -1, 0, 90deg);
  }

  to {
    transform-origin: 100% 50%;
    transform: rotate3d(0, 1, 0, 0deg);
  }
`;

/*
const slideLeft = keyframes`
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0);
  }
`;
*/

const Content = styled(DialogContent)`
  background: white;
  width: 300px;
  height: 100%;
  padding: 24px 32px;
  display: flex;
  flex-direction: column;

  animation: ${fadeIn} 200ms;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${closeDoor} 300ms ease-out;
    animation-delay: 50ms;
    animation-fill-mode: both;
  }
`;

const CloseButton = styled(UnstyledButton)`
  position: absolute;
  top: 10px;
  right: 0;
  padding: 16px;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const NavLink = styled.a`
  color: var(--color-gray-900);
  font-weight: ${WEIGHTS.medium};
  text-decoration: none;
  font-size: 1.125rem;
  text-transform: uppercase;

  &:first-of-type {
    color: var(--color-secondary);
  }

  animation: ${fadeIn};
  animation-duration: 500ms;
  animation-fill-mode: both;

  @media (prefers-reduced-motion: no-preference) {
    animation-delay: calc(200ms + var(--n) * 50ms);
  }
`;

const Filler = styled.div`
  flex: 1;
`;
const Footer = styled.footer`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
  justify-content: flex-end;
`;

const SubLink = styled.a`
  color: var(--color-gray-700);
  font-size: 0.875rem;
  text-decoration: none;
`;

export default MobileMenu;
