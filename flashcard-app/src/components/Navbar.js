import { Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Flashcard App
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            {currentUser && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                </li>
              </>
            )}
          </ul>
          <div className="d-flex">
            {currentUser ? (
              <button className="btn btn-outline-light" onClick={logout}>
                Logout
              </button>
            ) : (
              <>
                <Link className="btn btn-outline-light me-2" to="/login">
                  Login
                </Link>
                <Link className="btn btn-primary" to="/register">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
