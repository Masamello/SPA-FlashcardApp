import { createContext, useState, useEffect } from 'react';
import { useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // using useEffect to get the user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('flashcardAppUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    const user = {
      ...userData
    };
    setCurrentUser(user);
    localStorage.setItem('flashcardAppUser', JSON.stringify(user));
    console.log('User logged in:', user);
  };

  const logout = () => {
    // When logging out, only clear the current user state
    // the profile data is preserved in localStorage
    setCurrentUser(null);
    console.log('User logged out, but profile data preserved in localStorage');
  };

  const updateProfile = (profileData) => {
    if (!currentUser) return;
    
    const updatedUser = { 
      ...currentUser, 
      ...profileData,
      // keep the existing important information
      id: currentUser.id,
      email: currentUser.email
    };
    
    // update the state
    setCurrentUser(updatedUser);
    
    // save to localStorage
    localStorage.setItem('flashcardAppUser', JSON.stringify(updatedUser));
    
    // for debugging: check the saved data
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
