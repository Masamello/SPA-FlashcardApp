import { createContext, useState, useEffect } from 'react';
import { useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // ローカルストレージからユーザー状態を復元
  useEffect(() => {
    const storedUser = localStorage.getItem('flashcardAppUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    const user = {
      ...userData,
      role: userData.email === 'admin@example.com' ? 'admin' : 'user'
    };
    setCurrentUser(user);
    localStorage.setItem('flashcardAppUser', JSON.stringify(user));
    console.log('User logged in:', user);
  };

  const logout = () => {
    // ログアウト時は現在のユーザー状態のみをクリア
    // localStorageのデータは保持して、プロフィール情報を維持
    setCurrentUser(null);
    console.log('User logged out, but profile data preserved in localStorage');
  };

  const updateProfile = (profileData) => {
    if (!currentUser) return;
    
    const updatedUser = { 
      ...currentUser, 
      ...profileData,
      // 既存の重要な情報を保持
      id: currentUser.id,
      email: currentUser.email,
      role: currentUser.role
    };
    
    // 状態を更新
    setCurrentUser(updatedUser);
    
    // localStorageに保存
    localStorage.setItem('flashcardAppUser', JSON.stringify(updatedUser));
    
    // デバッグ用：保存されたデータを確認
    console.log('Profile updated:', updatedUser);
    console.log('Saved to localStorage:', localStorage.getItem('flashcardAppUser'));
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
