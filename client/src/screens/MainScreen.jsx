import React, { useState } from "react";
import styled, { css } from "styled-components";
import ChatRoom from "./ChatRoom";

const MainScreen = () => {
  const [joinModal, setJoinModal] = useState(false);
  const [roomID, setRoomID] = useState("");
  const [name, setName] = useState("");
  const [chatRoom, setChatRoom] = useState(false);

  const reset = () => {
    setRoomID("");
    setName("");
  };
  const handleClick = () => {
    setJoinModal(false);
    reset();
  };

  return chatRoom ? (
    <ChatRoom roomID={roomID} username={name} />
  ) : (
    <Container>
      <ContentContainer>
        <h1>Simple Video Chat</h1>
        <ButtonContainer>
          <Button primary onClick={() => setChatRoom(true)}>
            Create a Room
          </Button>
          <Button onClick={() => setJoinModal(true)}>Join a Room</Button>
        </ButtonContainer>
        <JoinModal show={joinModal}>
          <FormContainer>
            <h2>Join Room</h2>
            <Form>
              <Input
                placeholder="Room ID"
                value={roomID}
                onChange={(e) => setRoomID(e.target.value)}
              />
              <Input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form>
            <FormButtons>
              <Button type="submit" onClick={handleClick}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!(roomID && name) ? true : false}
                primary
                onClick={() => setChatRoom(true)}
              >
                Join
              </Button>
            </FormButtons>
          </FormContainer>
        </JoinModal>
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

const JoinModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 99999;
  background-color: rgba(0, 0, 0, 0.6);
  display: ${(props) => (props.show ? "grid" : "none")};
  place-items: center;
`;

const FormContainer = styled.div`
  background-color: #1d1d1d;
  border: 1px solid gray;
  border-radius: 0.5rem;
  padding: 2.1rem;
  max-width: 25rem;
  text-align: left;

  > h2 {
    color: white;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
  margin-bottom: 4rem;
  min-width: 20rem;
`;

const Input = styled.input`
  background: transparent;
  padding: 0.7rem;
  border: 1px solid gray;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  color: white;
  font-size: 1rem;
  font-weight: 500;

  :focus {
    outline: none;
    border: 0.1px solid rgb(28, 107, 226);
  }
`;

const FormButtons = styled.div`
  display: flex;
`;
