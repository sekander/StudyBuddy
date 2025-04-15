import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import { useScreenVisibility } from '../../Data/Context/ScreenVisibilityContext';
import Cookies from 'js-cookie'; // Import js-cookie
import axios from 'axios';
import { FaPlus,FaChevronDown, FaThLarge, FaCalendarAlt, FaUser } from 'react-icons/fa';



// Container
const Container = styled.div`
  width: 390px;
  height: 844px;
  background: white;
  font-family: 'Helvetica Neue', sans-serif;
  position: relative;
  margin: auto;
  overflow: hidden;
`;

// Top bar logout
const TopBar = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 16px;
`;

// Dashboard heading
const Heading = styled.h1`
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
`;

// Date display
const DateSection = styled.div`
  padding: 20px;
  text-align: left;
  h2 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 4px;
  }
  h3 {
    font-size: 14px;
    font-weight: 400;
    color: #555;
    margin-bottom: 10px;
  }
  span.dropdown {
    font-weight: 500;
    font-size: 14px;
    display: inline-block;
    margin-top: 10px;
  }
`;
const LogoutButton = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s;

  &:hover {
    background: #dc2626;
  }
`;


// Calendar strip

const CalendarToggle = styled.span`
  font-weight: 500;
  font-size: 14px;
  display: inline-block;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #333;
`;

const CalendarPopup = styled.div`
  position: absolute;
  top: 200px;
  left: 20px;
  right: 20px;
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  z-index: 100;
`;

const CalendarDay = styled.div`
  background: #f4f4f4;
  padding: 10px 0;
  text-align: center;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #4F46E5;
    color: white;
  }
`;


const CalendarRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  padding: 10px 0;
  color: #999;
  font-size: 14px;
  margin-bottom: 20px;

  span {
    padding: 8px;
    border-radius: 6px;
    transition: 0.2s ease;
    cursor: pointer;
  }

  .selected {
    background: #4F46E5;
    color: white;
  }

  span:hover {
    background: #e0e7ff;
  }
`;

// Center image + message
const IllustrationSection = styled.div`
  text-align: center;
  padding: 0 30px;
  margin-top: 20px;

  img {
    width: 100%;
    max-width: 250px;
    margin: 0 auto 20px;
    display: block;
  }

  h3 {
    font-size: 16px;
    font-weight: 400;
    margin: 12px 0 6px;
    color: #1f1f1f;
  }

  strong {
    font-weight: 700;
  }

  p {
    font-size: 14px;
    color: #555;
    line-height: 1.6;
    margin-bottom: 10px;
  }

  .empty-task-note {
    color: #999;
    font-size: 13px;
  }
`;


// Floating + button
const AddTaskButton = styled.button`
  position: absolute;
  right: 20px;
  bottom: 80px;
  background: #4F46E5;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 22px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  z-index: 10;
`;


// Bottom Nav
const BottomNav = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  background: #f3f4f6;
  border-top: 1px solid #e1e1e1;
  padding: 10px 0;

  button {
    background: none;
    border: none;
    color: #444;
    font-size: 13px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    cursor: pointer;
  }
`;

const NavItem = styled.button`
  background: none;
  border: none;
  color: #444;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  flex: 1;
  padding: 6px 0;

  &:hover {
    color: #4F46E5;
  }

  svg {
    font-size: 20px;
  }
`;



export default function Dashboard() {
  const { screenVisibility, handleScreen } = useScreenVisibility();
  const [username, setUsername] = useState<string>('');
  const [userInfo, setUserInfo] = useState(null); // Store user information fetched from API
  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const [error, setError] = useState<string | null>(null); // Store error message
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

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

  const handleTaskClick = () => {

    ///Cookies.set('selectedCategory', JSON.stringify( null));  // Store username in a cookie
    handleScreen('taskManager');
  };

  return (
    <Container>
      <TopBar>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </TopBar>

      <Heading>Dashboard</Heading>

      <DateSection>
      <h2>Today</h2>
      <h3>{selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</h3>

      <CalendarToggle
        onClick={(e) => {
          e.stopPropagation(); 
          setCalendarOpen((prev) => !prev);
        }}
      >
        {selectedDate.toLocaleString('default', { month: 'long' })} {selectedDate.getFullYear()}
        {FaChevronDown({
          style: {
            marginLeft: '6px',
            transition: '0.3s',
            transform: calendarOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }
        })}
      </CalendarToggle>


      </DateSection>

      <CalendarRow>
        {Array.from({ length: 7 }, (_, i) => {
          const date = new Date(selectedDate);
          const currentDay = selectedDate.getDay();
          const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
          const day = new Date(date.setDate(date.getDate() + mondayOffset + i));

          return (
            <span
              key={i}
              className={
                day.toDateString() === selectedDate.toDateString() ? 'selected' : ''
              }
              onClick={() => setSelectedDate(new Date(day))}
            >
              {day.toLocaleDateString('en-US', { weekday: 'short' })}
            </span>
          );
        })}
      </CalendarRow>


      <IllustrationSection>
        <img src="/dashboard.png" alt="Dashboard illustration" />
        <h3>Big deadlines? Small wins?<br /><strong>You decide!</strong></h3>
        <p>
          Prioritize what's important, and we'll turn it into a smart to-do list
        </p>
        <div className="empty-task-note">
          No task for the day. <br /> Click “+” to create your task
        </div>
      </IllustrationSection>

      {calendarOpen && (
      <CalendarPopup>
        {[...Array(31)].map((_, i) => {
          const day = i + 1;
          return (
            <CalendarDay
              key={day}
              onClick={() => {
                const newDate = new Date(selectedDate);
                newDate.setDate(day);
                setSelectedDate(newDate);
                setCalendarOpen(false);
              }}
              style={{
                background: selectedDate.getDate() === day ? '#4F46E5' : '',
                color: selectedDate.getDate() === day ? 'white' : '',
              }}
            >
              {day}
            </CalendarDay>

          );
        })}
      </CalendarPopup>
    )}


      <AddTaskButton onClick={handleTaskClick}>
        {FaPlus({})}
      </AddTaskButton>

      <BottomNav>
        <NavItem onClick={() => handleScreen('categoryManager')}>
          {FaThLarge({ size: 18 })}
          <span>Categories</span>
        </NavItem>

        <NavItem onClick={() => handleScreen('calendar')}>
          {FaCalendarAlt ({ size:18})}
          <span>Calendar</span>
        </NavItem>

        <NavItem onClick={() => handleScreen('profile')}>
          {FaUser ({ size: 18})}
          <span>Profile</span>
        </NavItem>
      </BottomNav>

    </Container>
 
  )
}
