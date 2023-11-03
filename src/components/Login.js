import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import '../css/App.css';
import Header from './includes/Header';
import Footer from './includes/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      setError('Username and password are required fields.');
    } else {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);

        // Retrieve existing user data or initialize an empty array
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

        // Find the user with the matching username and password
        const user = existingUsers.find(
          (u) => u.email === username && u.password === password
        );

        if (user) {
          // Store the logged-in user details in local storage
          localStorage.setItem('loggedInUser', JSON.stringify(user));

          window.location.href = '/dashboard';
        } else {
          setError('Invalid credentials. Please try again.');
        }
      }, 2000);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="App">
      <Header />
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title text-center">Login</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <div className="input-group">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span className="input-group-append">
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={togglePasswordVisibility}
                        >
                          <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                        </button>
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary btn-block"
                    onClick={handleLogin}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Logging in...' : 'Login'}
                  </button>
                 
                </form>
                <p className="text-center mt-3">
                  Don't have an account? <Link to="/signup">Create a new account</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
