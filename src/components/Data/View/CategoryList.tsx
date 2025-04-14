import React, { useEffect, useRef, useState } from 'react';
import { useCategories } from '../Context/CategoryContext';
import { useScreenVisibility } from '../Context/ScreenVisibilityContext';

import Cookies from 'js-cookie';  // Import js-cookie
; // Assuming TaskManager is the component that shows the details of a category


const CategoryList: React.FC = () => {
  const { categories, addCategory } = useCategories(); // Access categories from context
  const { screenVisibility, handleScreen } = useScreenVisibility();

  const hasRunRef = useRef(false); // Create a ref to track if the effect has already run


  // On initial render, load categories from cookies and sync with context
  useEffect(() => {
    if (hasRunRef.current) return; // Prevent running the effect multiple times

    const savedCategories = Cookies.get('categories'); // Get saved categories from cookie

    console.log(savedCategories);
    // Only proceed if we have saved categories in the cookie
    if (savedCategories) {
      try {
        // Parse the saved cookie data
        const parsedCategories = JSON.parse(savedCategories);

        // Check if parsedCategories is an array before proceeding
        if (Array.isArray(parsedCategories)) {
          parsedCategories.forEach((category: any) => {
            // Ensure the category does not already exist in context
            const categoryExists = categories.some(
              (existingCategory) => existingCategory.id === category.id
            );
            if (!categoryExists) {
              addCategory(category);  // Add category to the context
            }
          });
        } else {
          console.warn('Saved categories are not in the correct format, expected an array.');
        }
      } catch (error) {
        console.error('Error parsing categories from cookie:', error);
      }
    }
    hasRunRef.current = true; // Mark the effect as run
  }, []); // Run only when categories or addCategory changes




  
  // Handle category selection
  const handleCategoryClick = (category: any) => {

    Cookies.set('selectedCategory', JSON.stringify( category));  // Store username in a cookie
    handleScreen('taskManager');
  };

  return (
    <div>
      <h2>Categories:</h2>
      <ul>
        {categories.map((category, index) => (

        <button onClick={() => handleCategoryClick(category)}>
            {category.icon} {category.title} {index}
        </button>
        ))}
      </ul>

    </div>
  );
};

export default CategoryList;
