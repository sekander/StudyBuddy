import React from 'react';
import { CategoryProvider } from '../../Data/Context/CategoryContext';

import AddCategory from '../../Data/View/AddCategory';
import CategoryList from '../../Data/View/CategoryList';
import Cookies from 'js-cookie';

const App: React.FC = () => {
  
  const clearCategories = async () => {
      // Delete the cookies on the client-side
      Cookies.remove('categories');  // Remove JWT token
      // Cookies.remove('username');  // Remove the username cookie
    
      // Navigate to the login screen
      // handleScreen('login');
  };
  return (
    <CategoryProvider>
      <div>
        <h1>Category Management</h1>
        <AddCategory />
        <CategoryList />




      </div>
      <button onClick={clearCategories}>Test</button>
    </CategoryProvider>
  );
};

export default App;
