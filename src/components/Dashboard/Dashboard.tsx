import React, {useEffect, useState} from 'react'
import { useScreenVisibility } from '../ScreenVisibilityContext';

import Cookies from 'js-cookie'; // Import js-cookie
import axios from 'axios';

export default function Dashboard() {
  const { screenVisibility, handleScreen } = useScreenVisibility();

//   const [userInfo, setUserInfo] = useState(null);
  const [username, setUsername] = useState<string>('');


  const [userInfo, setUserInfo] = useState(null); // Store user information fetched from API
  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const [error, setError] = useState<string | null>(null); // Store error message




  // Function to fetch user data from the server
  const fetchUserInfo = async () => {
    const token = Cookies.get('jwt');  // Retrieve JWT token from cookies
    const storedUsername = Cookies.get('username') || ''; // Retrieve username from cookies

    setUsername(storedUsername);  // Set username to display

    if (token) {
      try {
        // Send the JWT token in the Authorization header
        // const response = await axios.get('http://localhost:5000/user-info', {
        // const response = await axios.get('http://192.168.2.87:5010/user-info', {
        const response = await axios.get('https://nahid-sekander.duckdns.org/study-buddy/user-info', {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true, // Ensure credentials (cookies) are sent with the request

        });
        // setUserInfo(response.data);
        // Set user info if the request is successful
        setUserInfo(response.data.user); // Assuming the response contains a 'user' field with user info
        // Print the response JSON to the console
        console.log('Response from server:', response.data.user);
      } catch (err) {
        console.error('Error fetching user info:', err);
                setError('Failed to fetch user information. Please try again later.');
      }
      finally {
        setLoading(false); // Stop loading once the API call is complete
      }
    } else {
      setError('No valid token found. Please log in again.');
      setLoading(false);
    }
  };


  // Function to handle logout
  const handleLogout = async () => {
      // Delete the cookies on the client-side
      Cookies.remove('jwt');  // Remove JWT token
      Cookies.remove('username');  // Remove the username cookie
    
      // Navigate to the login screen
      handleScreen('login');
  };



  useEffect(() => {
    fetchUserInfo();  // Fetch user info on component mount
  }, []);


  return (
    <div>Dashboard

        <h2>Current Visible Screen: {Object.keys(screenVisibility).find(screen => screenVisibility[screen])}</h2>

        {loading ? (
            <p>Loading user info...</p>
        ) : error ? (
            <p style={{ color: 'red' }}>{error}</p>
        ) : (
            <div>
              <p>Username from Cookie: {username}</p> {/* Display username from cookie */}
              <p>JWT Token from Cookie: {Cookies.get('jwt')}</p> {/* Display JWT from cookie */}

              {userInfo && (
                <div>
                  <h3>User Information:</h3>
                  <p>ID:  {userInfo['id']}</p>
                  <p>Username:  {userInfo['username']}</p>
                  <p>Pasword:  {userInfo['password']}</p>
                </div>
              )}
            </div>
        )}

      {/* Logout button */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
