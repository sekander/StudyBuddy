
// import React from "react";
import styled from "styled-components";
import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making API requests
import { AxiosError } from 'axios';  // Import AxiosError type

import { useScreenVisibility } from '../ScreenVisibilityContext';
    
const SignUpPageLayout = styled.div`
    display: flex;
    flex-direction: column;
    width: 390px;
    height: 844px;
    padding: 5%;
    text-align: left;
    position: relative;
    background: white;
    overflow: hidden;
`;
// Ellipses with better positioning and some transformations
const StyledEllipse2 = styled.div`
  width: 354.73px;
  height: 354.40px;
  position: absolute;
  left: -100px;
  top: -135px;
  transform: rotate(1deg);
  transform-origin: top left;
  background: linear-gradient(139deg, rgba(0, 0, 0, 0) 0%, #C2C3C7 100%);
  border-radius: 50%;
  z-index: 1;
`;
const StyledEllipse3 = styled.div`
  width: 354.73px;
  height: 354.40px;
  position: absolute;
  left: -68px;
  top: -185px;
  transform: rotate(1deg);
  transform-origin: top left;
  background: linear-gradient(232deg, black 0%, rgba(255, 255, 255, 0.53) 100%);
  border-radius: 50%;
  z-index: 2;
`;
const StyledEllipse1 = styled.div`
  width: 354.73px;
  height: 354.40px;
  position: absolute;
  left: -131px;
  top: -163px;
  transform: rotate(1deg);
  transform-origin: top left;
  background: radial-gradient(ellipse 66.71% 66.71% at 42.05% 39.42%, white 0%, #222626 100%);
  border-radius: 50%;
  z-index: 3;
`;
const AppLogoLayout = styled.div`

  z-index: 4;
`;
const LoginLogoLayout = styled.div`
    
`;
const UserNameLayout = styled.div`
    
`;
const InputLayout = styled.div`
    display: flex;
    flex-direction: column;
    
`;
const StyledInfo = styled.span`
  color: #B9B9B9;
  font-size: 14px;
  font-family: Poppins;
  font-weight: 400;
  word-wrap: break-word;
`;
const StyledLine1 = styled.div`
  width: 315px;
  height: 0px;
  outline: 1px #EAEAEA solid;
  outline-offset: -0.50px;
`;
const StyledForgotPassword = styled.span`
  color: black;
  font-size: 16px;
  font-family: Poppins;
  font-weight: 400;
  word-wrap: break-word;
`;
const StyledDefault = styled.div`
  width: 40px;
  height: 20px;
  left: 0px;
  top: 0px;
  position: absolute;
  background: #F2F2F2;
  border-radius: 36.50px;
  border: 0.50px #E5E5E5 solid;
`;
const RememberMeLayout = styled.div`
    display: flex;
    flex-direction: row;
`;
const StyledBGSwitcher = styled.div`
  width: 40px;
  height: 20px;
  position: relative;
`;
const StyledDescription = styled.span`
  color: #1A1A1A;
  font-size: 12px;
  font-family: SF Pro Display;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.30px;
  word-wrap: break-word;
`;
const StyledNext01 = styled.span`
  color: white;
  font-size: 20px;
  font-family: Poppins;
  font-weight: 400;
  word-wrap: break-word;
`;
const StyledVectorG = styled.div`
  width: 19px;
  height: 15px;
  left: 0px;
  top: 0px;
  position: absolute;
  background: black;
`;
const StyledVectorG01 = styled.div`
  width: 18.13px;
  height: 14.24px;
  left: 0.49px;
  top: 0.59px;
  position: absolute;
  background: white;
`;
const StyledRightArrow1 = styled.div`
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
  background: black;
  border-radius: 8px;
  justify-content: flex-start;
  align-items: center;
  gap: 195px;
  display: inline-flex;
`;
const StyledVector = styled.div`
  width: 9.67px;
  height: 9.39px;
  left: 10.20px;
  top: 8.19px;
  position: absolute;
  background: #4285F4;
`;
const StyledVector01 = styled.div`
  width: 15.67px;
  height: 8.09px;
  left: 1.20px;
  top: 11.91px;
  position: absolute;
  background: #34A853;
`;
const StyledVector02 = styled.div`
  width: 4.42px;
  height: 8.98px;
  left: 0.13px;
  top: 5.51px;
  position: absolute;
  background: #FBBC04;
`;
const StyledVector03 = styled.div`
  width: 15.73px;
  height: 8.09px;
  left: 1.20px;
  top: 0px;
  position: absolute;
  background: #EA4335;
`;
const StyledDis = styled.span`
  color: white;
  font-size: 12px;
  font-family: SF Pro Display;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.30px;
  word-wrap: break-word;
`;
const StyledOtherPayMethod = styled.div`
  width: 20px;
  height: 20px;
  position: relative;
`;
const StyledFrame61 = styled.div`
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  display: inline-flex;
`;
const StyledGoogleBigButton40px = styled.button`
  align-self: stretch;
  height: 48px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 10px;
  padding-bottom: 10px;
  background: #333333;
  border-radius: 6px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: inline-flex;
`;
const HaveAccount = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;
const StyledDescriptionspan = styled.span`
  color: #1A1A1A;
  font-size: 12px;
  font-family: Poppins;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.30px;
  word-wrap: break-word;
`;
const StyledDescriptionlink = styled.a`
  color: #007AFF;
  font-size: 12px;
  font-family: Poppins;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.30px;
  word-wrap: break-word;
`;



// export const LoginPage = () => {
export default function SignUpPage() {
  const { screenVisibility, handleScreen } = useScreenVisibility();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

// State to hold the input value
    // const [inputValue, setInputValue] = useState('');

    // Handler for when the input changes
    // const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    // setInputValue(event.target.value); // Update the state with the input value
    // };

      // Handle email input change
  const handleEmailChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setEmail(event.target.value);
  };

  // Handle password input change
  const handlePasswordChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setPassword(event.target.value);
  };
    // Handle sign-up form submission
  // const handleSignUpSubmit = async (e) => {
  const handleSignUpSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Create the data object to send to the backend
    const userData = {
      username: email, // Using email as the username for simplicity
      password: password
    };

    try {
      // const response = await axios.post('http://localhost:5000/signup', userData); // POST request to backend
      // const response = await axios.post('http://192.168.2.87:5010/signup', userData); // POST request to backend
      const response = await axios.post('https://nahid-sekander.duckdns.org/study-buddy/signup', userData); // POST request to backend
      alert(response.data.message); // Show success message
      handleScreen('login'); // Navigate to the login page after successful signup
    } catch (err: unknown) {
        // Assert the error as AxiosError type
        if (err instanceof AxiosError) {
          // Check if it's a 400 error and handle it
          if (err.response?.status === 400) {
            alert('Signup failed: ' + (err.response?.data?.message || 'Bad request. Please check your inputs.'));
          } else {
            alert('Signup failed: ' + err.message || 'An unexpected error occurred.');
          }
        } else {
          // In case it's not an AxiosError, handle it as a generic error
          alert('Signup failed: ' + (err instanceof Error ? err.message : 'An unexpected error occurred.'));
        }
      }
    };




  return (
    <SignUpPageLayout>
      <StyledEllipse2 />
      <StyledEllipse3 />
      <StyledEllipse1 />
        <AppLogoLayout> <h1>Study </h1> <h1> Buddy</h1> </AppLogoLayout>
        <LoginLogoLayout> <h2>Sign up</h2></LoginLogoLayout>
        <h2>Current Visible Screen: {Object.keys(screenVisibility).find(screen => screenVisibility[screen])}</h2>
            <form onSubmit={handleSignUpSubmit}>

      
        <InputLayout>
            <StyledInfo>Email Address</StyledInfo>
            <input
              type="text"
              // id="myInput"
              // value={inputValue}
              // onChange={handleInputChange} // Update state when input changes
              value={email}
              onChange={handleEmailChange} // Handle email input change
              placeholder="Enter your email"
              required

            />
            <StyledLine1></StyledLine1>
        </InputLayout>

        <InputLayout>
            <StyledInfo>Password</StyledInfo>
            <input
              // type="text"
              // id="myInput"
              // value={inputValue}
              // onChange={handleInputChange} // Update state when input changes
              type="password"
              value={password}
              onChange={handlePasswordChange} // Handle password input change
              placeholder="Enter your password"
              required
            />
            <StyledLine1></StyledLine1>
        </InputLayout>
        <RememberMeLayout>
        <StyledBGSwitcher>

            <StyledDefault />

        </StyledBGSwitcher>
            <StyledDescription>Remember me</StyledDescription>

        </RememberMeLayout>
        <StyledForgotPassword>Forgot Password ?</StyledForgotPassword>


        <StyledNext>
            {/* <StyledNext01><button onClick={() => handleScreen('login')}>   Log in  </button></StyledNext01> */}
            <StyledNext01>
                <button type="submit">Sign up</button>
            </StyledNext01>
            <StyledRightArrow1>
                <StyledVector />
                <StyledVector01 />
            </StyledRightArrow1>
        </StyledNext>


        <StyledGoogleBigButton40px>
            <StyledFrame61>
                <StyledOtherPayMethod>
                <StyledVector />
                <StyledVector01 />
                <StyledVector02 />
                <StyledVector03 />
                </StyledOtherPayMethod>
                <StyledDis>Or sign in with Google</StyledDis>
            </StyledFrame61>
        </StyledGoogleBigButton40px>

        <HaveAccount>
            <StyledDescriptionspan>Don't have an account? </StyledDescriptionspan>
            <StyledDescriptionlink>Sign up now</StyledDescriptionlink>

        </HaveAccount>
        </form>



    </SignUpPageLayout>
  );
};