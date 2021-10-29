import React from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CopyToClipboard from "react-copy-to-clipboard";

const ParticipantsModal = ({
  show,
  close,
  id,
  receivingCall,
  callAccepted,
  answerCall,
  username,
}) => {
  console.log("ran");
  return (
    <Container show={show}>
      <Modal>
        <Header>
          <span>Participants(1)</span>
          <Close onClick={close} />
        </Header>
        <Participants>
          {receivingCall && !callAccepted && (
            <User>
              <span>{username}</span>
              <Button onClick={answerCall}>Accept</Button>
            </User>
          )}
        </Participants>
        <Footer>
          <span>Room ID: {id}</span>
          <CopyToClipboard text={id}>
            <ContentCopy />
          </CopyToClipboard>
        </Footer>
      </Modal>
    </Container>
  );
};

export default ParticipantsModal;

const Container = styled.div`
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

const Modal = styled.div`
  background-color: #1d1d1d;
  border: 1px solid gray;
  border-radius: 0.5rem;
  min-width: 25rem;
  padding: 1rem;
  text-align: left;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #d2d2d2;
  padding-bottom: 1rem;
  border-bottom: 1px solid gray;
`;
const Close = styled(CloseIcon)`
  cursor: pointer;
`;
const ContentCopy = styled(ContentCopyIcon)`
  cursor: pointer;
`;

const Participants = styled.div`
  display: flex;
  flex-direction: column;
  color: #d2d2d2;
  min-height: 10rem;
`;
const User = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;
const Button = styled.button`
  padding: 0.2rem;
  border-radius: 0.5rem;
  color: #d2d2d2;
  border: 1px solid #0172e4;
  background-color: #0163e4;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #d2d2d2;
  padding-top: 1rem;
  border-top: 1px solid gray;
`;
