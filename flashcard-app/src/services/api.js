import axios from 'axios';

// API Base URl(Need to chnage to an actual api end point)
const API_BASE_URL = 'https://jsonplaceholder.typicode.com'; // Mock API for testting

// Creating axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API functions related to categories
export const categoryAPI = {
  // Get categories
  getCategories: async () => {
    try {
      // In actual API: const response = await api.get('/categories');
      // For testing, return mock data
      const mockCategories = [
        { id: '1', name: 'General', color: 'primary', description: 'General flashcards' },
        { id: '2', name: 'Study', color: 'success', description: 'Study materials' },
        { id: '3', name: 'Work', color: 'warning', description: 'Work related' },
        { id: '4', name: 'Personal', color: 'info', description: 'Personal notes' }
      ];
      return { data: mockCategories };
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // Add category
  createCategory: async (categoryData) => {
    try {
      // In actual API: const response = await api.post('/categories', categoryData);
      const newCategory = {
        ...categoryData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      return { data: newCategory };
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  },

  // Update category
  updateCategory: async (id, categoryData) => {
    try {
      // In actual API: const response = await api.put(`/categories/${id}`, categoryData);
      const updatedCategory = {
        ...categoryData,
        id,
        updatedAt: new Date().toISOString()
      };
      return { data: updatedCategory };
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  },

  // Delete category
  deleteCategory: async (id) => {
    try {
      // In actual API: const response = await api.delete(`/categories/${id}`);
      return { data: { id } };
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  }
};

export default api; 