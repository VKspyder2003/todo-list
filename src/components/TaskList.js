import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Reward from './Reward';

const TaskList = ({ tasks, toggleTask, deleteTask, filterType }) => {
    // Filter tasks based on the filterType
    const filteredTasks = tasks.filter((task) => {
        if (filterType === 'all') {
            return true;
        } else if (filterType === 'incomplete') {
            return !task.completed;
        } else if (filterType === 'complete') {
            return task.completed;
        }
        return true;
    });

    // Count the number of completed tasks
    const completedTasks = tasks.filter((task) => task.completed).length;

    // Calculate the number of remaining tasks
    const remainingTasks = tasks.length - completedTasks;

    return (
        <>
            <List>
                {/* Map over the filteredTasks array to create a list item for each task */}
                {filteredTasks.map((task) => (
                    <ListItem key={task.id} button onClick={() => toggleTask(task.id)} style={{ textDecoration: task.completed ? 'line-through' : 'none', border: '2px solid grey', borderRadius: '10px', marginTop: '5px' }}>
                        {/* Checkbox to mark tasks as completed without deleting them */}
                        <Checkbox
                            edge="start"
                            checked={task.completed}
                            tabIndex={-1}
                            disableRipple
                        />
                        <ListItemText primary={task.text} />

                        {/* Delete button to remove the task */}
                        <ListItemSecondaryAction>
                            <IconButton onClick={() => deleteTask(task.id)} edge="end" aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>

            {/* Display total number of tasks, completed tasks, and remaining tasks */}
            <Typography color="GrayText">
                Total tasks: {tasks.length} | Completed: {completedTasks} | Remaining: {remainingTasks}
            </Typography>

            {/* Render the Reward component if all tasks are completed */}
            {filteredTasks.length > 0 && remainingTasks === 0 && <Reward />}
        </>
    );
};

export default TaskList;
