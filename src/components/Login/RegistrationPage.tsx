import React from 'react'
import styled from 'styled-components';

const StyledStudyBuddy = styled.span`
  color: black;
  font-size: 48px;
  font-family: Arial, sans-serif;
  font-weight: 700;
  line-height: 47.29px;
  word-wrap: break-word;
`;
export default function RegistrationPage() {
  return (
    // <div>RegistrationPage</div>
    <div style={{display: 'flex', flexDirection: 'column'}}>
    
      <StyledStudyBuddy>Registration<br /></StyledStudyBuddy> 
    </div>
  )
}
