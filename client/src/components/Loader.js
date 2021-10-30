import React from "react";
import { Circle } from "better-react-spinkit";
import styled from "styled-components";

const Loader = () => {
  return (
    <Container>
      <h3>Waiting for host to accept your call</h3>
      <Circle color="#d2d2d2" size={60} />
    </Container>
  );
};

export default Loader;

const Container = styled.div`
  display: grid;
  height: 30vh;
  place-items: center;
  color: #d2d2d2;
`;
