import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from './AppContext';

export const TodoPage: React.FC = () => {
  const { tasks, fetchTasks, createTask, updateTask } = useContext(AppContext);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    // Fetch tasks when the component mounts
    fetchTasks();
  }, [fetchTasks]);

  const handleCreateTask = async () => {
    if (newTaskTitle.trim()) {
      await createTask({ title: newTaskTitle, completed: false });
      setNewTaskTitle(''); // Clear the input field
    }
  };

  const handleToggleTask = async (taskId: number, completed: boolean) => {
    await updateTask(taskId, { completed: !completed });
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={handleCreateTask}>Add Task</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleTask(task.id, task.completed)}
            />
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
