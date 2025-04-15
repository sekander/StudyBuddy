import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useScreenVisibility } from '../../Data/Context/ScreenVisibilityContext';
import styled from 'styled-components';


const TaskManager: React.FC = () => {
  const { screenVisibility, handleScreen } = useScreenVisibility();
  const savedCategories = Cookies.get('categories'); // Get saved categories from cookie
  const selectedCategory = Cookies.get('selectedCategory'); // Get selected category from cookie

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [repeatReminder, setRepeatReminder] = useState(false);
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [tasks, setTasks] = useState<any[]>([]); // Local state for tasks
  const [categories, setCategories] = useState<any[]>([]); // State for categories from cookies

  // Load categories from cookies and selected category
  useEffect(() => {
    if (savedCategories) {
      try {
        const categoriesFromCookie = JSON.parse(savedCategories);
        setCategories(categoriesFromCookie); // Set the categories state

        // If a selected category exists, update the category state
        if (selectedCategory) {
          const categoryFromSelected = categoriesFromCookie.find(
            (cat: any) => cat.title === JSON.parse(selectedCategory).title
          );
          if (categoryFromSelected) {
            setCategory(categoryFromSelected.title);
            setTasks(categoryFromSelected.tasks || []);
          }
        }
      } catch (error) {
        console.error('Error parsing categories from cookies:', error);
      }
    }
  }, [savedCategories, selectedCategory]); // Only run when savedCategories or selectedCategory change


  // Update task list when category changes
  useEffect(() => {
    if (category && categories.length > 0) {
      const categoryFromSelected = categories.find(
        (cat) => cat.title === category
      );
      if (categoryFromSelected) {
        setTasks(categoryFromSelected.tasks || []);
      }
    }
  }, [category, categories]); // Run whenever category or categories change



  // Handle Add Task
  const addTask = (e: React.FormEvent) => {
    e.preventDefault();

    // if (title && date && startTime && endTime && description && category) {
    if (title && date && startTime && endTime && description ) {
      const newTask = {
        id: Date.now(),
        title,
        date,
        startTime,
        endTime,
        repeatReminder,
        description,
        priority,
      };

      // Update the tasks state with the new task
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);

      // Update tasks in the selected category cookie
      if (selectedCategory) {
        try {
          const categoryFromSelected = JSON.parse(selectedCategory);
          categoryFromSelected.tasks = updatedTasks; // Update the tasks in the category
          // Update the category in the saved categories
          const categoriesFromCookie = JSON.parse(savedCategories || '[]');
          const categoryIndex = categoriesFromCookie.findIndex(
            (cat: any) => cat.title === categoryFromSelected.title
          );
          if (categoryIndex > -1) {
            categoriesFromCookie[categoryIndex] = categoryFromSelected;
          }
          Cookies.set('categories', JSON.stringify(categoriesFromCookie));
          Cookies.set('selectedCategory', JSON.stringify(categoryFromSelected)); // Update selected category
        } catch (error) {
          console.error('Error updating tasks in selectedCategory cookie:', error);
        }
        console.log(category);
      }

      // Reset form fields after adding the task
      setTitle('');
      setDate('');
      setStartTime('');
      setEndTime('');
      setRepeatReminder(false);
      setDescription('');
      setPriority('medium');
    } else {
      alert('Please fill in all required fields.');
      console.log(title);
      console.log(date);
      console.log(startTime);
      console.log(endTime);
      console.log(description);
      console.log(category);
      // (title && date && startTime && endTime && description && category)
    }
  };

  // Handle Delete Task
  const deleteTask = (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);

    // Update tasks in the selected category cookie
    if (selectedCategory) {
      try {
        const categoryFromSelected = JSON.parse(selectedCategory);
        categoryFromSelected.tasks = updatedTasks;
        const categoriesFromCookie = JSON.parse(savedCategories || '[]');
        const categoryIndex = categoriesFromCookie.findIndex(
          (cat: any) => cat.title === categoryFromSelected.title
        );
        if (categoryIndex > -1) {
          categoriesFromCookie[categoryIndex] = categoryFromSelected;
        }
        Cookies.set('categories', JSON.stringify(categoriesFromCookie));
        Cookies.set('selectedCategory', JSON.stringify(categoryFromSelected));
      } catch (error) {
        console.error('Error updating tasks in selectedCategory cookie:', error);
      }
      // try {
      //   category = JSON.parse(selectedCategory);
      //   if (!category || !category.title) {
      //     throw new Error('Invalid category data');
      //   }
      // } catch (error) {
      //   console.error('Error parsing the selectedCategory cookie:', error);
      //   category = null; // Ensure category is null if parsing fails
      // }
    }
  };


const Wrapper = styled.div`
  min-width: 390px;
  height: 100vh;
  margin: auto;
  font-family: 'Helvetica Neue', sans-serif;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
  background: #ffffff;
`;


const ScrollContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 16px 100px;
  box-sizing: border-box;
`;

const TopBar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;  // Centers title
  padding: 16px;
  margin-top: 20px; 
  margin-bottom: 12px;

  button {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #3b82f6;
    font-size: 14px;
    cursor: pointer;
  }

  h2 {
    font-size: 18px;
    font-weight: 600;
    margin: 0;
  }
`;


const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 4px;
  display: block;
  text-align: left;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
`;


const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  resize: none;
  height: 100px;
  box-sizing: border-box;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
`;

const Button = styled.button`
  background: #4f46e5;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  margin-top: 16px;
  align-self: flex-end;
  cursor: pointer;

  &:hover {
    background: #4338ca;
  }
`;


const Section = styled.div`
  display: flex;
  gap:90px;
  justify-content: space-between;
  align-items: center;
`;

const PriorityGroup = styled.div`
  display: flex;
  justify-content: space-between;
  background: #f3f4f6;
  border-radius: 8px;
  overflow: hidden;
`;

const PriorityButton = styled.button<{ selected: boolean }>`
  flex: 1;
  background: ${({ selected }) => (selected ? '#e0e7ff' : 'transparent')};
  border: none;
  font-size: 14px;
  padding: 12px 0;
  cursor: pointer;
  border-right: 1px solid #ccc;

  &:last-child {
    border-right: none;
  }
`;



const Reminder = styled.div`
display: flex;
gap: 90px;
`;


return (
  <Wrapper>
    <ScrollContainer>
    <TopBar>
      <button onClick={() => handleScreen('dashboard')}>Cancel</button>
      <h2>New Task</h2>
    </TopBar>


    <Form onSubmit={addTask}>
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />

      <Section>
        <Label>Category</Label>
        <Select value={category} onChange={(e) => setCategory(e.target.value)} required>
          {categories.map((cat, index) => (
            <option key={index} value={cat.title}>
              {cat.title}
            </option>
          ))}
        </Select>
      </Section>

      <Section>
      <Label>Date</Label>
      <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </Section>
     
      <Section>
      <Label>Start Time</Label>
      <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
      </Section>
     
     
      <Section>
      <Label>End Time</Label>
      <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
      </Section>
      
      <Reminder>
      <Label>Repeat Reminder</Label>
      <input type="checkbox" checked={repeatReminder} onChange={(e) => setRepeatReminder(e.target.checked)} />
      </Reminder>


      <Label>Description</Label>
      <TextArea value={description} onChange={(e) => setDescription(e.target.value)} required />


      <Label>Priority</Label>
      <PriorityGroup>
        {['High', 'Medium', 'Low'].map((level) => (
          <PriorityButton
            key={level}
            selected={priority === level.toLowerCase()}
            onClick={() => setPriority(level.toLowerCase())}
            type="button"
          >
            {level}
          </PriorityButton>
        ))}
      </PriorityGroup>

      <Button type="submit">Done</Button>
    </Form>
    </ScrollContainer>
  </Wrapper>
);
};

export default TaskManager;
