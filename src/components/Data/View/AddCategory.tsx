import React, { useRef, useState, useEffect } from 'react';
import { useCategories } from '../Context/CategoryContext'; // Import the custom hook
import styled from 'styled-components';
import Cookies from 'js-cookie';  // Import js-cookie
import { HexColorPicker } from 'react-colorful';
// import { useNavigate } from 'react-router-dom';


const AddCategory: React.FC = () => {
  const { addCategory } = useCategories(); // Access the addCategory function from the context
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#FFFFFF');
  const [icon, setIcon] = useState('');
  const [showFullColorPicker, setShowFullColorPicker] = useState(false);
  // const navigate = useNavigate();

  const [customColor, setCustomColor] = useState('');
  const pickerRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowFullColorPicker(false);
      }
    }

    if (showFullColorPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFullColorPicker]);
  
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


  const Input = styled.input`
  width: 90%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 16px;
`;

const TextArea = styled.textarea`
  width: 90%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  height: 100px;
  resize: none;
  margin-bottom: 16px;
`;

const ColorLabel = styled.p`
  font-size: 14px;
  margin: 10px;
  font-weight: 500;
  display: flex;
  align-items: flex-start;
  
`;

const ColorGridBox = styled.div`
  background: #f9f9f9;
  padding: 14px;
  border-radius: 16px;
  margin-bottom: 24px;
  position: relative; 
`;

const SwatchRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  gap: 10px;
  padding: 0 4px;
`;

const SwatchCircle = styled.button<{ color?: string; selected?: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${({ color }) => color || '#e5e7eb'};
  border: ${({ selected }) => (selected ? '2px solid #2563eb' : '1px solid #ccc')};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  font-size: 18px;
  font-weight: bold;
  color: #666;
`;


const SubmitButton = styled.button`
  background: #4f46e5;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  float: right;
  margin-top: 10px;

  &:hover {
    background: #4338ca;
  }
`;


const PageWrapper = styled.div`
  max-width: 390px;
  margin: 30px;
  padding: 20px 16px 140px; 
  font-family: 'Helvetica Neue', sans-serif;
`;


const SubmitWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
`;

const ColorPickerWrapper = styled.div`
  position: absolute;
  top: 130%;
  left: 0;
  width: 50%;
  background: white;
  padding: 12px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 20;

  .react-colorful {
    width: 100%;
    max-width: 250px;
    height: 180px; 
    border-radius: 12px;
    box-shadow: 0 0 0 1px #ddd;
  }

  .react-colorful__saturation {
    touch-action: auto;
    border-radius: 12px;
  }

  .react-colorful__hue {
    margin-top: 12px;
    height: 12px;
    border-radius: 6px;
  }
`;
const TopHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 20px;
`;

const BackLink = styled.button`
  position: absolute;
  left: 0;
  color: #3b82f6;
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
`;

const PageTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin: 0 auto;
`;


return (
  <PageWrapper>
    <TopHeader>
    <BackLink onClick={() => window.history.back()}>Back</BackLink>
    {/* <BackLink onClick={() => navigate(-1)}>Back</BackLink> */}
    <PageTitle>Categories</PageTitle>
    </TopHeader>

      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title Task"
          required
        />

        <TextArea
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          placeholder="Description"
        />

<ColorLabel>Color</ColorLabel>

<ColorGridBox>
  <SwatchRow>
    {['#3b82f6', '#000000', '#9b5de5', '#22c55e', '#facc15', '#ef4444', '#6366f1'].map((c) => (
      <SwatchCircle
        key={c}
        color={c}
        selected={color === c}
        onClick={() => {
          setColor(c);
          setShowFullColorPicker(false);
        }}
        type="button"
      />
    ))}

    {customColor && (
      <SwatchCircle
        color={customColor}
        selected={color === customColor}
        onClick={() => {
          setColor(customColor);
          setShowFullColorPicker(false);
        }}
        type="button"
      />
    )}

    <SwatchCircle
      onClick={() => setShowFullColorPicker((prev) => !prev)}
      style={{ background: '#e5e7eb', fontSize: '20px' }}
      type="button"
    >
      +
    </SwatchCircle>
  </SwatchRow>

  {showFullColorPicker && (
  <ColorPickerWrapper ref={pickerRef}>
    <HexColorPicker
      color={customColor || "#aabbcc"}
      onChange={(newColor) => {
        setCustomColor(newColor);
        setColor(newColor);
      }}
    />
  </ColorPickerWrapper>
)}

</ColorGridBox>


    <SubmitWrapper>
      <SubmitButton type="submit" >Done</SubmitButton>
    </SubmitWrapper>
    </form>
  </PageWrapper>
);
};
export default AddCategory;
