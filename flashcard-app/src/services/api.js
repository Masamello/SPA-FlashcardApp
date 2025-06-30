import axios from 'axios';

// 無料のAPIサービス（JSONPlaceholder）を使用
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// axiosインスタンスの作成
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// フラッシュカード関連のAPI関数
export const flashcardAPI = {
  // フラッシュカード一覧を取得（GET）
  getFlashcards: async () => {
    try {
      const response = await api.get('/posts?_limit=10');
      
      // レスポンスデータをフラッシュカード形式に変換
      const flashcards = response.data.map((post, index) => ({
        id: post.id.toString(),
        question: `Question ${post.id}: ${post.title.substring(0, 50)}`,
        answer: post.body.substring(0, 100),
        category: ['General', 'Study', 'Work', 'Personal'][index % 4],
        createdAt: new Date().toISOString(),
        lastStudied: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
      }));
      
      return { data: flashcards };
    } catch (error) {
      console.error('Error fetching flashcards:', error);
      throw error;
    }
  },

  // 新しいフラッシュカードを追加（POST）
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
        createdAt: new Date().toISOString(),
        studyCount: 0,
        lastStudied: null
      };
      
      return { data: newFlashcard };
    } catch (error) {
      console.error('Error creating flashcard:', error);
      throw error;
    }
  },

  // 学習統計を取得（GET）
  getStudyStats: async () => {
    try {
      const response = await api.get('/posts?_limit=5');
      
      // 学習統計データを生成
      const stats = {
        totalCards: response.data.length,
        studiedToday: Math.floor(Math.random() * 5) + 1,
        totalStudySessions: Math.floor(Math.random() * 50) + 10,
        averageScore: Math.floor(Math.random() * 30) + 70
      };
      
      return { data: stats };
    } catch (error) {
      console.error('Error fetching study stats:', error);
      throw error;
    }
  }
};

// カテゴリ関連のAPI関数（GETのみ）
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

// 追加のAPI関数：ユーザー情報を取得（GETのみ）
export const userAPI = {
  getUserInfo: async (userId = 1) => {
    try {
      const response = await api.get(`/users/${userId}`);
      return { data: response.data };
    } catch (error) {
      console.error('Error fetching user info:', error);
      throw error;
    }
  }
};

// 追加のAPI関数：写真データを取得（photosエンドポイントを使用）
export const photoAPI = {
  // 写真一覧を取得（フラッシュカードのサムネイルとして使用可能）
  getPhotos: async (limit = 10) => {
    try {
      const response = await api.get(`/photos?_limit=${limit}`);
      return { data: response.data };
    } catch (error) {
      console.error('Error fetching photos:', error);
      throw error;
    }
  }
};

export default api; 