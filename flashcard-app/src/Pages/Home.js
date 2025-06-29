import { useAuth } from '../Context/AuthContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div className="container text-center mt-5">
      <h1 className="display-4 mb-4">Flashcard Learning App</h1>
      <p className="lead">
        {currentUser
          ? `Welcome back, ${currentUser.name || currentUser.email}!`
          : 'Start learning with interactive flashcards'}
      </p>
      
      <div className="mt-5">
        {currentUser ? (
          <div className="d-grid gap-3 col-md-6 mx-auto">
            <Link to="/dashboard" className="btn btn-primary btn-lg">
              Go to Dashboard
            </Link>
            <Link to="/profile" className="btn btn-outline-secondary btn-lg">
              View Profile
            </Link>
          </div>
        ) : (
          <div className="d-grid gap-3 col-md-6 mx-auto">
            <Link to="/login" className="btn btn-primary btn-lg">
              Login
            </Link>
            <Link to="/register" className="btn btn-success btn-lg">
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
