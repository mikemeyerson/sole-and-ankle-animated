import styled from "styled-components";
import { WEIGHTS } from "../../constants";

const NavLink = ({ children, ...delegated }) => {
  return (
    <Link {...delegated}>
      <DefaultText>{children}</DefaultText>
      <HoverText aria-hidden>{children}</HoverText>
    </Link>
  );
};

const Link = styled.a`
  --text-transition: transform 150ms ease-in;
  position: relative;
  font-size: 1.125rem;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--color-gray-900);
  font-weight: ${WEIGHTS.medium};
  overflow: hidden;

  &:first-of-type {
    color: var(--color-secondary);
  }

  &:hover {
    --text-transition: transform 150ms ease-out;
  }
`;

const DefaultText = styled.span`
  display: inline-block;
  transition: var(--text-transition);
  transform: translateY(0);

  ${Link}:hover & {
    text-decoration: underline;

    @media (prefers-reduced-motion: no-preference) {
      text-decoration: none;
      transform: translateY(-100%);
    }
  }
`;

const HoverText = styled.span`
  display: none;
  font-weight: ${WEIGHTS.bold};
  inset: 0;
  position: absolute;
  transform: translateY(100%);
  transition: var(--text-transition);

  ${Link}:hover & {
    transform: translateY(0);
  }

  @media (prefers-reduced-motion: no-preference) {
    display: unset;
  }
`;

export default NavLink;
