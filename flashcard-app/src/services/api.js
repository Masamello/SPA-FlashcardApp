import axios from 'axios';

// Using JSONPlaceholder API
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Flashcard related API functions
export const flashcardAPI = {
  // Get flashcard list (GET)
  getFlashcards: async () => {
    try {
      const response = await api.get('/posts?_limit=10');
      
      // Convert response data to flashcard format
      const flashcards = response.data.map((post, index) => ({
        id: post.id.toString(),
        question: `Question ${post.id}: ${post.title.substring(0, 50)}`,
        answer: post.body.substring(0, 100),
        category: ['General', 'Study', 'Work', 'Personal'][index % 4],
        createdAt: new Date().toISOString()
      }));
      
      return { data: flashcards };
    } catch (error) {
      console.error('Error fetching flashcards:', error);
      throw error;
    }
  },

  // Add new flashcard (POST)
  createFlashcard: async (flashcardData) => {
    try {
      const response = await api.post('/posts', {
        title: flashcardData.question,
        body: flashcardData.answer,
        userId: 1
      });
      
      const newFlashcard = {
        ...flashcardData,
        id: response.data.id.toString(),
        createdAt: new Date().toISOString()
      };
      
      return { data: newFlashcard };
    } catch (error) {
      console.error('Error creating flashcard:', error);
      throw error;
    }
  },

  // Get study statistics (GET)
  getStudyStats: async () => {
    try {
      const response = await api.get('/posts?_limit=5');
      
      // Generate study statistics data
      const stats = {
        totalCards: response.data.length,
        studiedToday: parseInt(Math.random() * 5, 10) + 1,
        totalStudySessions: parseInt(Math.random() * 50, 10) + 10,
        averageScore: parseInt(Math.random() * 30, 10) + 70
      };
      
      return { data: stats };
    } catch (error) {
      console.error('Error fetching study stats:', error);
      throw error;
    }
  }
};

// Category related API functions (GET only)
export const categoryAPI = {
  getCategories: async () => {
    try {
      const response = await api.get('/posts?_limit=4');
      
      const categories = response.data.map((post, index) => ({
        id: post.id.toString(),
        name: ['General', 'Study', 'Work', 'Personal'][index] || 'Category',
        color: ['primary', 'success', 'warning', 'info'][index] || 'secondary',
        description: post.title,
        createdAt: new Date().toISOString()
      }));
      
      return { data: categories };
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }
};





export default api; 