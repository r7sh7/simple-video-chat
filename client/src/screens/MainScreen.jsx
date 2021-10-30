import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import ChatRoom from "./ChatRoom";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");
const MainScreen = () => {
  const [chatRoom, setChatRoom] = useState("");
  const [me, setMe] = useState("");
  useEffect(() => {
    socket.on("me", (id) => {
      setMe(id);
      console.log("socket.on(me) ran");
    });
  }, []);

  return chatRoom !== "" ? (
    <ChatRoom chatRoom={chatRoom} me={me} socket={socket} />
  ) : (
    <Container>
      <ContentContainer>
        <h1>Simple Video Chat</h1>
        <ButtonContainer>
          <Button primary onClick={() => setChatRoom("host")}>
            Create a Room
          </Button>
          <Button onClick={() => setChatRoom("guest")}>Join a Room</Button>
        </ButtonContainer>
      </ContentContainer>
    </Container>
  );
};

export default MainScreen;

const Container = styled.div`
  height: 100vh;
  display: grid;
  place-items: center;
  background-color: #0c0b0b;
`;

const ContentContainer = styled.div`
  background-color: #1d1d1d;
  border: 1px solid gray;
  border-radius: 0.5rem;
  padding: 5rem 10rem;
  text-align: center;

  > h1 {
    color: #1e92ff;
    font-size: 2.5rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 7rem 0;
  min-width: 15rem;
`;

const Button = styled.button`
  background: transparent;
  border-radius: 0.5rem;
  border: 1px solid gray;
  color: white;
  margin: 0.75rem 1rem;
  padding: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  width: 100%;

  :hover {
    background-color: #535353c3;
  }

  ${(props) =>
    props.primary &&
    css`
      border: 1px solid #0172e4;
      background-color: #0172e4;

      :hover {
        background-color: #0163e4;
      }

      :disabled {
        background-color: #2e2e2e;
        border: 1px solid #2e2e2e;
        color: gray;
      }
    `}
`;
