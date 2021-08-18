import React from 'react';
import styled from 'styled-components';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
const Stars = ({ stars, reviews }) => {
  console.log(stars, reviews);
  // <span>
  //   {stars >= 1 ? <BsStarFill /> : stars >= 0.5 ? <BsStarHalf /> : <BsStar />}
  // </span>; Ir repetindo mais 5x, acrescentando 2 e 1.5, 3 e 2.5, 4 e 3.5, 5 e 4.5
  return (
    <Wrapper>
      <div className="stars"></div>
      <p className="reviews">({reviews} customers reviews)</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`;
export default Stars;
