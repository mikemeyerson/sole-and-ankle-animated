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

const Text = styled.span`
  transition: var(--text-transition);
  transform: translateY(var(--translate-from));

  ${Link}:hover & {
    text-decoration: underline;

    @media (prefers-reduced-motion: no-preference) {
      text-decoration: none;
      transform: translateY(var(--translate-to));
    }
  }
`;

const DefaultText = styled(Text)`
  display: inline-block;
  --translate-from: 0;
  --translate-to: -100%;
`;

const HoverText = styled(Text)`
  display: none;
  font-weight: ${WEIGHTS.bold};
  inset: 0;
  position: absolute;
  --translate-from: 100%;
  --translate-to: 0;

  @media (prefers-reduced-motion: no-preference) {
    display: unset;
  }
`;

export default NavLink;
