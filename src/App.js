import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from '@mui/material'
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import './App.css'

const App = () => {
    // State to store the list of tasks added by the user
    const [tasks, setTasks] = useState([]);
    const [filterType, setFilterType] = useState('all');

    // Fetching any of the tasks stored in the local storage (if any)
    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    // Function to add task to list
    const addTask = (text) => {
        const newTask = {
            id: Date.now(),
            text,
            completed: false,
        };
        setTasks([...tasks, newTask]);
        saveTasks([...tasks, newTask]);
        toast.success('Task added successfully!');
    };

    // Function to update the state of task (complete or incomplete)
    const toggleTask = (id) => {
        const updatedTasks = tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
        saveTasks(updatedTasks);

        const updatedTask = updatedTasks.find((task) => task.id === id);
        const message = updatedTask.completed
            ? 'Task marked as completed!'
            : 'Task marked as incomplete!';
        toast.info(message);
    };

    // Function to delete task from the list
    const deleteTask = (id) => {
        const updatedTasks = tasks.filter((task) => task.id !== id);
        setTasks(updatedTasks);
        saveTasks(updatedTasks);
        toast.error('Task deleted successfully!');
    };

    // Implementing persistent storage by saving the tasks to local storage
    const saveTasks = (tasks) => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Display tasks based on the filter (All, incomplete, complete)
    const filterTasks = (filterType) => {
        setFilterType(filterType);
    };


    return (
        <div className='App'>
            <Container  className='todo-app'>
                <h1><FormatListBulletedIcon /> Todo List</h1>
                <TaskInput addTask={addTask} filterTasks={filterTasks} filterType={filterType} />
                <TaskList tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} filterType={filterType} />
            </Container>
            <ToastContainer
                position="bottom-center"
                toastStyle={{ marginBottom: '5px' }} // Adjust this value to fit your needs
                autoClose={1500} // Set the autoClose time to 2000 milliseconds (2 seconds)
            />
        </div>
    );
};

export default App;
