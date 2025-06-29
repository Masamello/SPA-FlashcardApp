import axios from 'axios';

// APIのベースURL（実際のAPIエンドポイントに合わせて変更してください）
const API_BASE_URL = 'https://jsonplaceholder.typicode.com'; // テスト用のモックAPI

// axiosインスタンスの作成
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// カテゴリ関連のAPI関数
export const categoryAPI = {
  // カテゴリ一覧を取得
  getCategories: async () => {
    try {
      // 実際のAPIでは: const response = await api.get('/categories');
      // テスト用にモックデータを返す
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

  // カテゴリを追加
  createCategory: async (categoryData) => {
    try {
      // 実際のAPIでは: const response = await api.post('/categories', categoryData);
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

  // カテゴリを更新
  updateCategory: async (id, categoryData) => {
    try {
      // 実際のAPIでは: const response = await api.put(`/categories/${id}`, categoryData);
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

  // カテゴリを削除
  deleteCategory: async (id) => {
    try {
      // 実際のAPIでは: const response = await api.delete(`/categories/${id}`);
      return { data: { id } };
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  }
};

export default api; 