
import React, {useEffect} from 'react'
import styled from "styled-components";
import { useScreenVisibility } from '../ScreenVisibilityContext';
import Cookies from 'js-cookie';  // Import js-cookie to check cookies


const StyledStudyBuddy = styled.span`
  color: black;
  font-size: 48px;
  font-family: Arial, sans-serif;
  font-weight: 700;
  line-height: 47.29px;
  word-wrap: break-word;
`;

const StyledTrackPlanandSucceed = styled.span`
  color: #3D38F5;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  word-wrap: break-word;
`;

export default function LoginPage() {
  const { screenVisibility , handleScreen } = useScreenVisibility();

  // Check if a cookie (JWT or username) exists when the component mounts
  useEffect(() => {
    const token = Cookies.get('jwt');  // Check if JWT cookie exists
    // Set a delay before checking the cookie and navigating
    const timer = setTimeout(() => {

      if (token) {
        // If token exists, automatically navigate to dashboard
        handleScreen('dashboard');
      }
    }, 2000); // 2000ms = 2 seconds delay

    // Cleanup function to clear the timer when the component unmounts
    return () => clearTimeout(timer);

  }, [handleScreen]);  // Dependency array ensures the effect runs only once when component mounts



  return (
    <div style={{display: 'flex', flexDirection: 'column'}} onClick={() => handleScreen('login')}>
      <StyledStudyBuddy>Study<br />Buddy</StyledStudyBuddy> 
      <StyledTrackPlanandSucceed>“Track, Plan and Succeed!”</StyledTrackPlanandSucceed>
        <h2>Current Visible Screen: {Object.keys(screenVisibility).find(screen => screenVisibility[screen])}</h2>
    </div>
  )
}
