import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useScreenVisibility } from '../../Data/Context/ScreenVisibilityContext';
import styled from 'styled-components';

const TaskManagerView = styled.div`
  display: flex;
  flex-direction: column;
`;

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

  return (
    <TaskManagerView>
      <h1>Task Manager</h1>
      <h2>Current Visible Screen: {Object.keys(screenVisibility).find((screen) => screenVisibility[screen])}</h2>

      {/* Task Form */}
      <form onSubmit={addTask}>
        {/* Title Input */}
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />

        {/* Category Dropdown */}
        <label>Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat.title}>
              {cat.title}
            </option>
          ))}
        </select>
        <br />

        {/* Date Input */}
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <br />

        {/* Start Time Input */}
        <label>Start Time:</label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
        <br />

        {/* End Time Input */}
        <label>End Time:</label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
        <br />

        {/* Repeat Reminder Checkbox */}
        <label>Repeat Reminder:</label>
        <input
          type="checkbox"
          checked={repeatReminder}
          onChange={(e) => setRepeatReminder(e.target.checked)}
        />
        <br />

        {/* Description Input */}
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          required
        ></textarea>
        <br />

        {/* Priority Dropdown */}
        <label>Priority:</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <br />

        {/* Submit Button */}
        <button type="submit">Add Task</button>
      </form>

      {/* Display task list */}
      <div>
        <h3>Tasks:</h3>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.title} - {task.date} - {task.startTime} to {task.endTime} - {task.priority}
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <button onClick={() => handleScreen('dashboard')}>DashBoard</button>
    </TaskManagerView>
  );
};

export default TaskManager;
