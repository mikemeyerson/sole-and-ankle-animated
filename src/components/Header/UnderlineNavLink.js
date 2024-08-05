import styled from "styled-components";
import { WEIGHTS } from "../../constants";

const NavLink = ({ children, ...delegated }) => {
  return (
    <Link {...delegated}>
      {children}
      <Underline />
    </Link>
  );
};

const Link = styled.a`
  position: relative;
  font-size: 1.125rem;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--color-gray-900);
  font-weight: ${WEIGHTS.medium};

  &:first-of-type {
    color: var(--color-secondary);
  }
`;

const Underline = styled.span`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background-color: currentcolor;
  transition-property: transform, opacity;
  transition-duration: 250ms;
  transition-timing-function: ease-in-out;
  transform: translateY(-5px) scale(1);
  opacity: 0;

  ${Link}:hover & {
    transform: translateY(0) scale(1, 3);
    opacity: 1;
  }
`;

export default NavLink;
