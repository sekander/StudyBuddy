/*
import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import WelcomePage from './components/Login/WelcomPage';
import styled from 'styled-components';
import SplashPage from './components/Splash/SplashPage';
import RegistrationPage from './components/Login/RegistrationPage';
import LoginPage from './components/Login/LoginPage';



import { ScreenVisibilityProvider } from '../src/components/ScreenVisibilityContext';
import { useScreenVisibility } from '../src/components/ScreenVisibilityContext';

const StyledFrame = styled.div`
  width: 400px;
  height: 800px;
  display: flex;               
  flex-direction: column;
  justify-content: center;     
  align-items: center;         
  border: 2px solid black;
`;

function App() {

   // Define the screen visibility state with dynamic keys
  const [screenVisibility, setScreenVisibility] = useState<{ [key: string]: boolean }>({
    splash: true,  // SplashPage is visible by default
    login: false,  // LoginPage is not visible by default
    registration: false,
    // Add other screens as needed...
  });

  // Function to handle the screen change when a button is clicked
  const handleScreen = (screen: string) => {
    // Set visibility to show only the passed screen and hide others
    setScreenVisibility((prevState) => {
      const updatedVisibility: { [key: string]: boolean } = {};
      // Iterate over all keys in the current state and set them to false (hide them)
      for (const key in prevState) {
        updatedVisibility[key] = false;
      }
      // Set the selected screen to true (show it)
      updatedVisibility[screen] = true;
      return updatedVisibility;
    });
  };


  return (
    <div className="App">
      <header className="App-header"></header>


      <StyledFrame
        onClick={() => handleScreen('login')}  // Wrap the function call inside an anonymous function
        onTouchStart={() => handleScreen('login')}  // Same here for touch event
      >
        {screenVisibility.splash && <SplashPage />}

        {screenVisibility.login && <LoginPage/>}
        {screenVisibility.registration && <RegistrationPage/>}


      </StyledFrame>
    </div>
  );
}

export default App;

*/

import React from 'react';
import logo from './logo.svg';
import './App.css';
import WelcomePage from './components/Login/WelcomPage';
import styled from 'styled-components';
import SplashPage from './components/Splash/SplashPage';
import RegistrationPage from './components/Login/RegistrationPage';
import LoginPage from './components/Login/LoginPage';

import { ScreenVisibilityProvider } from './components/ScreenVisibilityContext';
import { useScreenVisibility } from './components/ScreenVisibilityContext';

const StyledFrame = styled.div`
  width: 400px;
  height: 800px;
  display: flex;               /* Enables Flexbox */
  flex-direction: column;
  justify-content: center;     /* Centers horizontally */
  align-items: center;         /* Centers vertically */
  border: 2px solid black;
`;

function App() {
  const { screenVisibility, handleScreen } = useScreenVisibility();  // Get visibility state and handler from context

  return (
    <div className="App">
      <header className="App-header"></header>

      <StyledFrame
        onClick={() => handleScreen('login')}  // Trigger visibility change for login
        onTouchStart={() => handleScreen('login')}  // Same for touch events
      >
        {/* Render the Splash page when it's visible */}
        {screenVisibility.splash && <SplashPage />}

        {/* Render LoginPage based on visibility */}
        {screenVisibility.login && <LoginPage />}

      </StyledFrame>
    </div>
  );
}

// Wrap the App component with the ScreenVisibilityProvider to enable context usage
const AppWithProvider = () => (
  <ScreenVisibilityProvider>
    <App />
  </ScreenVisibilityProvider>
);

export default AppWithProvider;
