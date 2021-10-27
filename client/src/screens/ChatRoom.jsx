import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const ChatRoom = () => {
  const myVideo = useRef();
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        myVideo.current.srcObject = currentStream;
      });
  }, []);

  return (
    <VideoContainer>
      <video playsInline ref={myVideo} muted autoPlay />
    </VideoContainer>
  );
};

export default ChatRoom;

const VideoContainer = styled.div`
  display: flex;
  justify-content: center;

  > video {
    height: 20rem;
    width: 25rem;
  }
`;
