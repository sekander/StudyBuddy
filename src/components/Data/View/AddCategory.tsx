import React, { useState } from 'react';
import { useCategories } from '../Context/CategoryContext'; // Import the custom hook
import Cookies from 'js-cookie';  // Import js-cookie

const AddCategory: React.FC = () => {
  const { addCategory } = useCategories(); // Access the addCategory function from the context
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#FFFFFF');
  const [icon, setIcon] = useState('');
  let id = 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();


    const newCategory = { id, title, color, icon ,       tasks: [],  // Initialize tasks as an empty array  
  };

    
      // Get the current categories from the cookie (or initialize as an empty array if none exists)
  const savedCategories = Cookies.get('categories');
  let categoriesArray: any[] = [];

  // Check if the savedCategories cookie exists and is valid (i.e., an array)
  if (savedCategories) {
    try {
      categoriesArray = JSON.parse(savedCategories);

      // Ensure categoriesArray is actually an array
      if (!Array.isArray(categoriesArray)) {
        console.warn('Categories from cookie are not in array format, initializing as empty array.');
        categoriesArray = []; // Initialize as empty array if not an array
      }
    } catch (error) {
      console.error('Error parsing categories from cookie:', error);
      categoriesArray = []; // Initialize as empty array in case of an error
    }
  }

  // Add the new category to the array
  categoriesArray.push(newCategory);


    // Get the current categories from the cookie (or initialize as an empty array if none exists)
    // const savedCategories = Cookies.get('categories');
    // let categoriesArray: any[] = [];

    // let categoriesArray = savedCategories ? JSON.parse(savedCategories) : [];

    // // Add the new category to the array
    // categoriesArray.push(newCategory);

    // Save the updated categories array back to the cookie
    Cookies.set('categories', JSON.stringify(categoriesArray));




    addCategory(newCategory); // Use the addCategory function from context
    // Cookies.set('categories', JSON.stringify( newCategory ));  // Store username in a cookie
    // Cookies.set('categories', newCategory );  // Store username in a cookie

    setTitle('');
    setColor('#FFFFFF');
    setIcon('');
    id++;
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Category Title"
        required
      />
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <input
        type="text"
        value={icon}
        onChange={(e) => setIcon(e.target.value)}
        placeholder="Category Icon (e.g., 🍎)"
        required
      />
      <button type="submit">Add Category</button>
    </form>
  );
};

export default AddCategory;
