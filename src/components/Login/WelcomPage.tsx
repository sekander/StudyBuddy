import React from 'react'
import styled from "styled-components";

const StyledStudyBuddy = styled.span`
  color: black;
  font-size: 48px;
  font-family: Arial, sans-serif;
  font-weight: 700;
  line-height: 47.29px;
  word-wrap: break-word;
`;


const StyledEllipse2 = styled.div`
  width: 824.73px;
  height: 823.96px;
  left: -168.04px;
  top: -505.56px;
  position: absolute;
  transform: rotate(28deg);
  transform-origin: top left;
  background: linear-gradient(139deg, rgba(0, 0, 0, 0) 0%, #C2C3C7 100%);
  border-radius: 9999px;
`;

const StyledEllipse3 = styled.div`
  width: 824.73px;
  height: 823.96px;
  left: -48.97px;
  top: -574.80px;
  position: absolute;
  transform: rotate(28deg);
  transform-origin: top left;
  background: linear-gradient(232deg, black 0%, rgba(255, 255, 255, 0.53) 100%);
  border-radius: 9999px;
`;

const StyledEllipse1 = styled.div`
  width: 824.73px;
  height: 823.96px;
  left: -201.40px;
  top: -597.53px;
  position: absolute;
  transform: rotate(28deg);
  transform-origin: top left;
  background: radial-gradient(ellipse 66.71% 66.71% at 42.05% 39.42%, white 0%, #222626 100%);
  border-radius: 9999px;
`;

const StyledWelcometostudybuddyspan01 = styled.span`
  color: white;
  font-size: 28px;
  font-family: Poppins;
  font-weight: 400;
  word-wrap: break-word;
`;

const StyledWelcometostudybuddyspan02 = styled.span`
  color: white;
  font-size: 28px;
  font-family: Poppins;
  font-weight: 700;
  word-wrap: break-word;
`;

const StyledHomeIndicator = styled.div`
  width: 134px;
  height: 5px;
  left: 121px;
  top: 799px;
  position: absolute;
  background: black;
`;

const StyledNext01span = styled.span`
  color: white;
  font-size: 20px;
  font-family: Poppins;
  font-weight: 400;
  word-wrap: break-word;
`;

const StyledVector = styled.div`
  width: 19px;
  height: 15px;
  left: 0px;
  top: 0px;
  position: absolute;
  background: black;
`;

const StyledVector01 = styled.div`
  width: 18.13px;
  height: 14.24px;
  left: 0.49px;
  top: 0.59px;
  position: absolute;
  background: white;
`;

const StyledNext03span = styled.span`
  color: black;
  font-size: 20px;
  font-family: Poppins;
  font-weight: 400;
  word-wrap: break-word;
`;

const StyledVector02 = styled.div`
  width: 19px;
  height: 15px;
  left: 0px;
  top: 0px;
  position: absolute;
  background: black;
`;

const StyledVector03 = styled.div`
  width: 18.13px;
  height: 14.24px;
  left: 0.49px;
  top: 0.59px;
  position: absolute;
  background: black;
`;

const StyledRightArrow1 = styled.div`
  width: 19px;
  height: 15px;
  position: relative;
  overflow: hidden;
`;

const StyledRightArrow101 = styled.div`
  width: 19px;
  height: 15px;
  position: relative;
  overflow: hidden;
`;

const StyledNext = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  left: 25.50px;
  top: 543px;
  position: absolute;
  background: black;
  border-radius: 8px;
  justify-content: flex-start;
  align-items: center;
  gap: 195px;
  display: inline-flex;
`;

const StyledNext02 = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  left: 25px;
  top: 621px;
  position: absolute;
  border-radius: 8px;
  outline: 1px black solid;
  outline-offset: -1px;
  justify-content: flex-start;
  align-items: center;
  gap: 185px;
  display: inline-flex;
`;

const StyledWelcome = styled.div`
  width: 375px;
  height: 812px;
  position: relative;
  background: white;
  overflow: hidden;
`;

// export default function LoginPage() {
export default function WelcomePage() {
  return (
    // <div style={{dVisplay: 'flex', flexDirection: 'column'}}>
    //   <StyledStudyBuddy>Login<br /></StyledStudyBuddy> 
    // </div>
    <StyledWelcome>
    <StyledEllipse2 />
    <StyledEllipse3 />
    <StyledEllipse1 />
    <StyledWelcometostudybuddyspan01><StyledWelcometostudybuddyspan01>Welcome to  </StyledWelcometostudybuddyspan01><StyledWelcometostudybuddyspan02>Study<br/>Buddy</StyledWelcometostudybuddyspan02></StyledWelcometostudybuddyspan01>
    <StyledHomeIndicator />
    <StyledNext>
      <StyledNext01span>Log in</StyledNext01span>
      <StyledRightArrow1>
        <StyledVector />
        <StyledVector01 />
      </StyledRightArrow1>
    </StyledNext>
    <StyledNext02>
      <StyledNext03span>Sign up</StyledNext03span>
      <StyledRightArrow101>
        <StyledVector02 />
        <StyledVector03 />
      </StyledRightArrow101>
    </StyledNext02>
  </StyledWelcome>
  )
}
