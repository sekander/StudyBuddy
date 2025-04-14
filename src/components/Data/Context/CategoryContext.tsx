import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Category } from '../Interfaces/Category';

// Define the context type
interface CategoryContextType {
  categories: Category[];
  addCategory: (category: Category) => void;
}

// Create a context with an empty array as the default value
const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

// Provider component to wrap the app
export const CategoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  // Function to add a new category to the list
  const addCategory = (category: Category) => {
    setCategories((prevCategories) => [...prevCategories, category]);
  };

  // Function to update an existing category
  // const updateCategory = (id: string, updatedCategory: Category) => {
  const updateCategory = (id: number, updatedCategory: Category) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === id ? { ...category, ...updatedCategory } : category
      )
    );
  };

  // Function to delete a category
  const deleteCategory = (id: number) => {
    setCategories((prevCategories) => prevCategories.filter((category) => category.id !== id));
  };

  return (
    <CategoryContext.Provider value={{ categories, addCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

// Custom hook to use the Category Context
export const useCategories = (): CategoryContextType => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategories must be used within a CategoryProvider');
  }
  return context;
};
