import styled from "styled-components";
import MicIcon from "@mui/icons-material/Mic";
import VideocamIcon from "@mui/icons-material/Videocam";
import SecurityIcon from "@mui/icons-material/Security";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import ParticipantsModal from "../components/ParticipantsModal";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const ChatRoom = ({ roomID, username }) => {
  const socket = io("http://localhost:5000");
  const [me, setMe] = useState("");
  const [stream, setStream] = useState(null);
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");

  const [chat, setChat] = useState(true);
  const [modal, setModal] = useState(true);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      });

    socket.on("me", (id) => {
      setMe(id);
      if (roomID) {
        setName(username);
      }
    });

    socket.on("calluser", ({ from, name, signal }) => {
      setReceivingCall(true);
      setCaller(from);
      setName(name);
      setCallerSignal(signal);
    });

    socket.on("callaccepted", ({ signal }) => {
      console.log(signal);
    });
  }, []);

  useEffect(() => {
    if (roomID && me !== "") {
      callUser(roomID);
    }
  }, [me, name, stream]);

  const callUser = (id) => {
    console.log("CALLUSER RAN");
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("calluser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
      });
      console.log("PEER SIGNAL CALLUSER EMIT");
    });

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
      console.log("PEER STREAM CALLUSER");
    });

    socket.on("callaccepted", ({ signal }) => {
      console.log(signal);
      peer.signal(signal);
      console.log("CALLUSER CALL ACCEPTED");
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    console.log("ANswerCAll Ran");
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("answercall", { signal: data, to: caller });
      console.log("PEER SIGNAL EMIT ANSWERCALL ");
    });

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
      console.log("PEER STREAM ANSWERCALL");
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  };

  return (
    <Container>
      <MainContainer>
        <ParticipantsModal
          show={modal}
          close={() => setModal(!modal)}
          id={me}
          receivingCall={receivingCall}
          callAccepted={callAccepted}
          answerCall={answerCall}
          name={name}
        />
        <VideoContainer>
          {stream && <video playsInline ref={myVideo} muted autoPlay />}
          {callAccepted && !callEnded && (
            <video playsInline ref={userVideo} autoPlay />
          )}
        </VideoContainer>
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
            <Button onClick={() => setModal(!modal)}>
              <SupervisorAccountIcon />
              <span>Participants</span>
            </Button>
            <Button onClick={() => setChat(!chat)}>
              <ChatBubbleIcon />
              <span>Chat</span>
            </Button>
          </ControlsCenter>
          <ControlsRight
            onClick={roomID ? leaveCall : () => window.location.reload()}
          >
            <span>{roomID ? "Leave Meeting" : "End Meeting"}</span>
          </ControlsRight>
        </VideoFooter>
      </MainContainer>
      <ChatContainer chat={chat}>
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
  border: 1px solid green;
  display: flex;
  justify-content: center;

  > video {
    max-width: 30rem;
    max-height: 22rem;
    border: 1px solid red;
  }
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
  display: ${({ chat }) => (chat ? "flex" : "none")};
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
