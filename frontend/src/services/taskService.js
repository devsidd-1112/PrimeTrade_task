import axios from '../api/axios';

const taskService = {
  // Get all tasks with pagination, filtering, and search
  getTasks: async (params = {}) => {
    const response = await axios.get('/tasks', { params });
    return response.data;
  },

  // Get single task
  getTask: async (id) => {
    const response = await axios.get(`/tasks/${id}`);
    return response.data;
  },

  // Create new task
  createTask: async (taskData) => {
    const response = await axios.post('/tasks', taskData);
    return response.data;
  },

  // Update task
  updateTask: async (id, taskData) => {
    const response = await axios.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  // Delete task
  deleteTask: async (id) => {
    const response = await axios.delete(`/tasks/${id}`);
    return response.data;
  },
};

export default taskService;
