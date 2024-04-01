import React, { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';

const TaskInput = ({ addTask, filterTasks }) => {
    // State for the task input field
    const [task, setTask] = useState('');
    
    // State for the active filter
    const [activeFilter, setActiveFilter] = useState('all');

    // Function to handle changes in the input field
    const handleChange = (e) => {
        setTask(e.target.value);
    };

    // Function to handle the add event task to list
    const handleSubmit = (e) => {
        e.preventDefault();
        if (task.trim() !== '') {
            addTask(task);
            setTask('');
        }
    };

    const handleFilter = (filterType) => {
        setActiveFilter(filterType);
        filterTasks(filterType);
    };

    return (
        <Container>
            {/* Form for entering and adding the new task */}
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                <TextField
                    label="Enter a new task"
                    value={task}
                    onChange={handleChange}
                    fullWidth
                />
                {/* Buttons according to their respective needs */}
                <Button type="submit" variant="contained" color="success" style={{ marginTop: '10px' }}>
                    Add Task
                </Button>
                <Button
                    onClick={() => handleFilter('all')}
                    variant={activeFilter === 'all' ? 'contained' : 'outlined'}
                    style={{ marginTop: '10px', marginLeft: '5px' }}
                >
                    All
                </Button>
                <Button
                    onClick={() => handleFilter('incomplete')}
                    variant={activeFilter === 'incomplete' ? 'contained' : 'outlined'}
                    style={{ marginTop: '10px', marginLeft: '5px' }}
                >
                    Incomplete
                </Button>
                <Button
                    onClick={() => handleFilter('complete')}
                    variant={activeFilter === 'complete' ? 'contained' : 'outlined'}
                    style={{ marginTop: '10px', marginLeft: '5px' }}
                >
                    Complete
                </Button>
            </form>
        </Container>
    );
};

export default TaskInput;
