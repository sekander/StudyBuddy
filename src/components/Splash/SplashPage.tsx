
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

const StyledTrackPlanandSucceed = styled.span`
  color: #3D38F5;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  word-wrap: break-word;
`;

export default function LoginPage() {
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>

      <StyledStudyBuddy>Study<br />Buddy</StyledStudyBuddy> 
      <StyledTrackPlanandSucceed>“Track, Plan and Succeed!”</StyledTrackPlanandSucceed>
    </div>
  )
}
