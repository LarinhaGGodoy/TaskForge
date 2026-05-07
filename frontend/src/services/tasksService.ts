import axios from 'axios';

export interface Task {
  id: number;
  name: string;
}

const API_URL = 'http://localhost:3000/tasks';

export const getTasks = async (): Promise<Task[]> => {
  const response = await axios.get<Task[]>(API_URL);
  return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

export const createTask = async (name: string): Promise<Task> => {
  const response = await axios.post<Task>(API_URL, { name });
  return response.data;
};
