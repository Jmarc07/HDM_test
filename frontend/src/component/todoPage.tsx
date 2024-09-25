import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from './AppContext';

export const TodoPage: React.FC = () => {
  const { tasks, fetchTasks, createTask, updateTask } = useContext(AppContext);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreateTask = async () => {
    if (newTaskTitle.trim()) {
      await createTask({ title: newTaskTitle, completed: false });
      setNewTaskTitle('');
    }
  };

  const handleToggleTask = async (taskId: number, completed: boolean) => {
    await updateTask(taskId, { completed: !completed });
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Todo List</h1>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Add a new task"
        />
        <button className="btn btn-primary" onClick={handleCreateTask}>
          Add Task
        </button>
      </div>

      <ul className="list-group">
        {tasks.map((task) => (
          <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleTask(task.id, task.completed)}
                className="me-2"
              />
              {task.title}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
