import * as React from "react";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import pic from "../../assets/logo.png";
import Box from "@mui/material/Box";
import { dummyData } from "../../dummyData";
import { useNavigate } from "react-router-dom";
const DarkDiv = styled.div`
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  align-items: center;
  position: relative;
`;
const ChatCard = styled.div`
  background: #dadada;
  height: 80px;
  margin: 0.5rem 0;
  border-radius: 0.4rem;
  color: #000;
  font-size: 22px;
  display: flex;
  align-items: center;
  padding: 1rem;
  width: 70%;
  @media (min-width: 500px) {
    width: 350px;
    font-size: 12px;
  }
  &:hover {
    cursor: pointer;
  }
`;
const Title = styled.div`
  width: 100%;
  position: fixed;
  background-color: black;
  z-index: 99;
  left: 0;
  right: 0;
  top: 60px;

  @media (max-width: 600px) {
    top: 40px;
  }
`;
const Logo = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 0.2rem;
`;
const Join = styled.button`
  border-radius: 0.2rem;
  background-color: #dadada;
  color: black;
  width: 70px;
  height: 60px;
  border-radius: 0.3rem;
  margin-left: 1rem;
  font-weight: 600;
  clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);
  &:hover {
    cursor: pointer;
  }
`;
export default function FixedContainer(props) {
  const navigate = useNavigate();
  const handleJoin = (chatInfo) => {
    console.log(chatInfo);
    navigate("/chats", { state: { chatData: chatInfo } });
  };
  return (
    <React.Fragment>
      <DarkDiv>
        <Title>
          <Typography variant="h6" align="center">
            Available Rooms
          </Typography>
        </Title>
        {dummyData &&
          dummyData.map((data) => (
            <Box key={data.id} sx={{ display: "flex", alignItems: "center" }}>
              <ChatCard>
                <Logo src={pic} />
                <Typography
                  sx={{
                    textTransform: "capitalize",
                    marginLeft: "2rem",
                  }}
                  variant="subtitle1"
                >
                  {data.title}
                </Typography>
              </ChatCard>
              <Join
                onClick={() => {
                  handleJoin(data);
                }}
              >
                <Typography variant="h6" align="center">
                  Join
                </Typography>
              </Join>
            </Box>
          ))}
        <></>
      </DarkDiv>
    </React.Fragment>
  );
}
