import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import MicIcon from "@mui/icons-material/Mic";
import VideocamIcon from "@mui/icons-material/Videocam";
import SecurityIcon from "@mui/icons-material/Security";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

const ChatRoom = () => {
  // const myVideo = useRef();
  // useEffect(() => {
  //   navigator.mediaDevices
  //     .getUserMedia({ video: true, audio: true })
  //     .then((currentStream) => {
  //       myVideo.current.srcObject = currentStream;
  //     });
  // }, []);

  return (
    // <VideoContainer>
    //   <video playsInline ref={myVideo} muted autoPlay />
    // </VideoContainer>
    <Container>
      <MainContainer>
        <VideoContainer></VideoContainer>
        <VideoFooter>
          <ControlsLeft>
            <Button>
              <MicIcon />
              <span>Mute</span>
            </Button>
            <Button>
              <VideocamIcon />
              <span>Stop Video</span>
            </Button>
          </ControlsLeft>
          <ControlsCenter>
            <Button>
              <SecurityIcon />
              <span>Security</span>
            </Button>
            <Button>
              <SupervisorAccountIcon />
              <span>Participants</span>
            </Button>
            <Button>
              <ChatBubbleIcon />
              <span>Chat</span>
            </Button>
          </ControlsCenter>
          <ControlsRight>
            <span>Leave Meeting</span>
          </ControlsRight>
        </VideoFooter>
      </MainContainer>
      <ChatContainer>
        <h5>Chats</h5>
        <Chat></Chat>
        <InputContainer>
          <input type="text" placeholder="Type message here..." />
        </InputContainer>
      </ChatContainer>
    </Container>
  );
};

export default ChatRoom;

const Container = styled.div`
  display: flex;
  height: 100vh;
`;
const MainContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const VideoContainer = styled.div`
  flex-grow: 1;
  background-color: black;
`;
const VideoFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: center;
  position: sticky;
  bottom: 0;
  width: 100%;
  z-index: 999;
  background-color: #1d1d1d;
  color: #d2d2d2;
  padding: 0.2rem;
`;
const ControlsLeft = styled.div`
  display: flex;
`;
const ControlsCenter = styled.div`
  display: flex;
`;
const ControlsRight = styled.div`
  display: flex;
  align-items: center;
  color: #d40303;
  cursor: pointer;
  margin-right: 1.2rem;
`;

const Button = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-width: 6rem;
  padding: 0.5rem;
  cursor: pointer;

  > span {
    margin-top: 0.2rem;
  }

  :hover {
    background-color: #3d3d3d;
    border-radius: 0.5rem;
  }
`;

const ChatContainer = styled.div`
  flex: 0.25;
  background-color: #2c2c2c;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-left: 1px solid #3d3d3d;

  > h5 {
    color: #d2d2d2;
    padding: 1rem;
  }
`;
const Chat = styled.div`
  flex-grow: 1;
`;
const InputContainer = styled.div`
  padding: 1.5rem 1rem;
  width: 100%;
  background-color: #1d1d1d;

  > input {
    border: 0px;
    background: transparent;
    outline: none;
    font-size: 0.95rem;
    color: whitesmoke;
    width: 100%;
  }
`;
