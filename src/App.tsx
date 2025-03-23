import './App.css';
import styled from 'styled-components';
import SplashPage from './components/Splash/SplashPage';
import LoginPage from './components/Login/LoginPage';


import { ScreenVisibilityProvider } from './components/ScreenVisibilityContext';
import { useScreenVisibility } from './components/ScreenVisibilityContext';
import SignUpPage from './components/Login/SignUpPage';
import Dashboard from './components/Dashboard/Dashboard';

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
