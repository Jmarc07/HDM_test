import React, { createContext, useState, useCallback } from 'react';
import axios from 'axios';

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

interface AppContextProps {
  tasks: Task[];
  fetchTasks: () => void;
  createTask: (task: Partial<Task>) => Promise<void>;
  updateTask: (id: number, task: Partial<Task>) => Promise<void>;
}

export const AppContext = createContext<AppContextProps>({
  tasks: [],
  fetchTasks: () => {},
  createTask: async () => {},
  updateTask: async () => {},
});

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = useCallback(async () => {
    const response = await axios.get('http://localhost:3001/tasks');
    setTasks(response.data);
  }, []);

  const createTask = async (task: Partial<Task>) => {
    await axios.post('http://localhost:3001/tasks', task);
    await fetchTasks(); // Refresh tasks after creation
  };

  const updateTask = async (id: number, task: Partial<Task>) => {
    await axios.put(`http://localhost:3001/tasks/${id}`, task);
    await fetchTasks(); // Refresh tasks after update
  };

  
  return (
    <AppContext.Provider value={{ tasks, fetchTasks, createTask, updateTask }}>
      {children} {/* Render children here */}
    </AppContext.Provider>
  );
};
