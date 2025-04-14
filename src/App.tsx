import './App.css';
import styled from 'styled-components';

import SplashPage from './components/Screens/Splash/SplashPage'
import LoginPage from './components/Screens/Login/LoginPage';
import SignUpPage from './components/Screens/Login/SignUpPage';
import Dashboard from './components/Screens/Dashboard/Dashboard';
import CategoryManager from './components/Screens/Dashboard/CategoryManager';
import TaskManager from './components/Screens/Dashboard/TaskManager';


import { ScreenVisibilityProvider } from './components/Data/Context/ScreenVisibilityContext';
import { useScreenVisibility } from './components/Data/Context/ScreenVisibilityContext';
import React from 'react';



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

      <StyledFrame>
        {/* Render the Splash page when it's visible */}
        {screenVisibility.splash && <SplashPage />}
        {/* Render LoginPage based on visibility */}
        {screenVisibility.login && <LoginPage />}
        {screenVisibility.signup && <SignUpPage />}
        {screenVisibility.dashboard && <Dashboard />}
        {screenVisibility.categoryManager && <CategoryManager />}
        {screenVisibility.taskManager && <TaskManager />}
          {/* Only show TaskManager when category is selected */}
          {/* {screenVisibility.taskManager && selectedCategory && (
          <TaskManager category={selectedCategory} />
        )} */}

        {/* {screenVisibility.addcategory && <AddCategory/>} */}
        {/* {screenVisibility.allategories && <AllCategories/>} */}
        {/* <SplashPage /> */}
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
