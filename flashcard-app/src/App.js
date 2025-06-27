import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import { FlashcardProvider } from './Context/FlashcardContext';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import Details from './Pages/Details';
import Profile from './Pages/Profile';


const App = () => {
  return (
    <AuthProvider>
      <FlashcardProvider>
        <Router>
          <Navbar />
          <div className="container py-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/flashcards/:id" element={<Details />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </Router>
      </FlashcardProvider>
    </AuthProvider>
  );
};

export default App;
