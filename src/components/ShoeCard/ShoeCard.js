import React from "react";
import styled from "styled-components/macro";

import { WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <ImageInnerWrapper>
            <Image alt="" src={imageSrc} />
          </ImageInnerWrapper>
          {variant === "on-sale" && <SaleFlag>Sale</SaleFlag>}
          {variant === "new-release" && <NewFlag>Just released!</NewFlag>}
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price
            style={{
              "--color":
                variant === "on-sale" ? "var(--color-gray-700)" : undefined,
              "--text-decoration":
                variant === "on-sale" ? "line-through" : undefined,
            }}
          >
            {formatPrice(price)}
          </Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          {variant === "on-sale" ? (
            <SalePrice>{formatPrice(salePrice)}</SalePrice>
          ) : undefined}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article``;

const ImageWrapper = styled.div`
  position: relative;

  --hover-entrance-animation-duration: 100ms;
  --hover-exit-animation-duration: 300ms;
`;

const ImageInnerWrapper = styled.div`
  border-radius: 16px 16px 4px 4px;
  /* keep scaled img within bounds */
  overflow: hidden;
`;

const Image = styled.img`
  display: block;
  width: 100%;
  transition-duration: var(--hover-exit-animation-duration);
  transform-origin: 50% 75%;
  transition-property: filter, transform;
  transition-timing-function: ease-in;

  ${ImageWrapper}:hover & {
    transition: filter var(--hover-entrance-animation-duration) ease-out;
    filter: brightness(0.9);
  }

  @media (prefers-reduced-motion: no-preference) {
    ${ImageWrapper}:hover & {
      filter: none;
      transition: transform var(--hover-entrance-animation-duration) ease-out;
      transform: scale(1.1);
    }
  }
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: var(--color-gray-900);
`;

const Price = styled.span`
  color: var(--color);
  text-decoration: var(--text-decoration);
`;

const ColorInfo = styled.p`
  color: var(--color-gray-700);
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: var(--color-primary);
`;

const Flag = styled.div`
  position: absolute;
  top: 12px;
  right: -4px;
  background: red;
  height: 32px;
  line-height: 32px;
  padding: 0 10px;
  font-size: ${14 / 18}rem;
  font-weight: ${WEIGHTS.bold};
  color: var(--color-white);
  border-radius: 2px;

  transition-property: filter, box-shadow;
  transition-duration: var(--hover-exit-animation-duration);
  transition-timing-function: ease-in;

  ${ImageWrapper}:hover & {
    box-shadow: -4px 4px 4px rgba(0, 0, 0, 0.1);
    filter: brightness(1.15);
    transition-duration: var(--hover-entrance-animation-duration);
    transition-timing-function: ease-out;
  }
`;

const SaleFlag = styled(Flag)`
  background-color: var(--color-primary);
`;
const NewFlag = styled(Flag)`
  background-color: var(--color-secondary);
`;

export default ShoeCard;
