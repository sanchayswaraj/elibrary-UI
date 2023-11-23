import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './includes/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Footer from './includes/Footer';

function Signup() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isPasswordValid = () => {
    // Implement your password validation logic here
    return (
      password.length >= 6 &&
      /[A-Z]/.test(password) &&
      /\d/.test(password) &&
      /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(password)
    );
  };

  const generateUserId = () => {
    // Retrieve existing user data or initialize an empty array
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Find the maximum user ID
    const maxUserId = existingUsers.reduce((max, user) => {
      const userId = parseInt(user.id);
      return userId > max ? userId : max;
    }, 99); // Start from 99 to ensure it starts from 100

    // Increment the maximum user ID to generate a unique ID
    return (maxUserId + 1).toString();
  };

  const handleSignup = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(username)) {
      setShowErrorMessage('Please provide a valid email.');
      setShowSuccessMessage(false);
      return;
    }

    if (!isPasswordValid()) {
      setShowErrorMessage('Password does not meet the requirements.');
      setShowSuccessMessage(false);
      return;
    }

    if (!name.trim() || !username.trim() || !password.trim() || !confirmPassword.trim()) {
      setShowErrorMessage('Please fill in all fields.');
      setShowSuccessMessage(false);
      return;
    }

    // Retrieve existing user data or initialize an empty array
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the email or username is already registered
    const isUserRegistered = existingUsers.some((user) => user.email === username);

    if (isUserRegistered) {
      setShowErrorMessage('This email or username is already registered.');
      setShowSuccessMessage(false);
      return;
    }

  // Generate a unique user ID
  const userId = generateUserId();

  const user = {
    id: userId,
    name: name,
    email: username,
    password: password,
    joiningDate: new Date().toISOString(), // Store the current date and time
    phoneNumber: '', // Initialize with an empty string
    address: '', // Initialize with an empty string
  };

    // Add the new user to the existing users array
    existingUsers.push(user);

    // Store the updated users array in localStorage
    localStorage.setItem('users', JSON.stringify(existingUsers));

    // Show a success message
    setShowSuccessMessage('Account created successfully.');

    // Clear the form fields
    setName('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="App">
      <Header />
      <div className="container">
        <div className="row justify-content-center mt-5 ">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title text-center">Signup</h2>
                <p className='text-muted'>It's quick and easy</p>
                {showErrorMessage && (
                  <div className="alert alert-danger">{showErrorMessage}</div>
                )}
                {showSuccessMessage && (
                  <div className="alert alert-success">{showSuccessMessage}</div>
                )}
                <form>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username or Email"
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
                  {password !== '' && (
                    <div className="text-muted" style={{ textAlign: 'left' }}>
                      <b>Password must contain:</b>
                      <ul style={{ listStyle: 'inside', paddingLeft: 0 }}>
                        <li>
                          At least 6 characters
                          {password.length >= 6 ? (
                            <span className="text-success">✔</span>
                          ) : (
                            <span className="text-danger">✘</span>
                          )}
                        </li>
                        <li>
                          At least one capital letter
                          {/[A-Z]/.test(password) ? (
                            <span className="text-success">✔</span>
                          ) : (
                            <span className="text-danger">✘</span>
                          )}
                        </li>
                        <li>
                          At least one number
                          {/\d/.test(password) ? (
                            <span className="text-success">✔</span>
                          ) : (
                            <span className="text-danger">✘</span>
                          )}
                        </li>
                        <li>
                          At least one special character
                          {/[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(password) ? (
                            <span className="text-success">✔</span>
                          ) : (
                            <span className="text-danger">✘</span>
                          )}
                        </li>
                      </ul>
                    </div>
                  )}
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {password !== '' && confirmPassword !== '' && password !== confirmPassword && (
                      <div className="text-danger">Passwords do not match.</div>
                    )}
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary btn-block"
                    onClick={handleSignup}
                  >
                    Signup
                  </button>
                  {/* Use Link component to navigate to the login page */}
                  <p className="text-center mt-3">
                    Already have an account? <Link to="/login">Login</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Signup;
