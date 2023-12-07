import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./includes/Header";
import Footer from "./includes/Footer";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Alert from "@mui/material/Alert";

function Signup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isPasswordValid = () => {
    return (
      password.length >= 6 &&
      /[A-Z]/.test(password) &&
      /\d/.test(password) &&
      /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(password)
    );
  };

  const generateUserId = () => {
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const maxUserId = existingUsers.reduce((max, user) => {
      const userId = parseInt(user.id);
      return userId > max ? userId : max;
    }, 99);

    return (maxUserId + 1).toString();
  };

  const handleTimeout = () => {
    setTimeout(() => {
      setShowErrorMessage(false);
      setShowSuccessMessage(false);
    }, 3000);
  };

  const handleSignup = () => {
    if (
      !name.trim() ||
      !username.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setShowErrorMessage("Please fill in all fields.");
      setShowSuccessMessage(false);
      handleTimeout();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(username)) {
      setShowErrorMessage("Please provide a valid email.");
      setShowSuccessMessage(false);
      handleTimeout();
      return;
    }

    if (!isPasswordValid()) {
      setShowErrorMessage("Password does not meet the requirements.");
      setShowSuccessMessage(false);
      handleTimeout();
      return;
    }

    if (password !== confirmPassword) {
      setShowErrorMessage("Passwords do not match.");
      setShowSuccessMessage(false);
      handleTimeout();
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    const isUserRegistered = existingUsers.some(
      (user) => user.email === username
    );

    if (isUserRegistered) {
      setShowErrorMessage("This email or username is already registered.");
      setShowSuccessMessage(false);
      return;
    }

    const userId = generateUserId();

    const user = {
      id: userId,
      name: name,
      email: username,
      password: password,
      joiningDate: new Date().toISOString(),
      phoneNumber: "",
      address: "",
    };

    existingUsers.push(user);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    setShowSuccessMessage("Account created successfully.");
    handleTimeout();

    setName("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="App">
      <Header />
      <Container component="main" maxWidth="xs">
        <div className="row justify-content-center mt-2">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <Typography component="h1" variant="h5" align="center">
                  Signup
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="center"
                >
                  It's quick and easy
                </Typography>
                {/* Alert Container with Styling */}
                <div style={{ position: "relative", marginTop: "20px" }}></div>

                <form>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Full Name"
                    name="name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username or Email"
                    name="username"
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={togglePasswordVisibility}>
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {password !== "" && (
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      align="left"
                    >
                      <b>Password must contain:</b>
                      <ul style={{ listStyle: "inside", paddingLeft: 0 }}>
                        <li>
                          At least 6 characters
                          {password.length >= 6 ? (
                            <span style={{ color: "green" }}>✔</span>
                          ) : (
                            <span style={{ color: "red" }}>✘</span>
                          )}
                        </li>
                        <li>
                          At least one capital letter
                          {/[A-Z]/.test(password) ? (
                            <span style={{ color: "green" }}>✔</span>
                          ) : (
                            <span style={{ color: "red" }}>✘</span>
                          )}
                        </li>
                        <li>
                          At least one number
                          {/\d/.test(password) ? (
                            <span style={{ color: "green" }}>✔</span>
                          ) : (
                            <span style={{ color: "red" }}>✘</span>
                          )}
                        </li>
                        <li>
                          At least one special character
                          {/[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(password) ? (
                            <span style={{ color: "green" }}>✔</span>
                          ) : (
                            <span style={{ color: "red" }}>✘</span>
                          )}
                        </li>
                      </ul>
                    </Typography>
                  )}
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />

                  {password !== "" &&
                    confirmPassword !== "" &&
                    password !== confirmPassword && (
                      <Typography variant="body2" color="error">
                        Passwords do not match.
                      </Typography>
                    )}
                                      {showErrorMessage && (
                    
                    <Alert
                      severity="error"
                      style={{
                        margin: "20px 0 0", // Add top margin of 20px
                        top: 0,
                        left: 0,
                        right: 0,
                      }}
                    >
                      {showErrorMessage}
                    </Alert>
                  )}
                  {showSuccessMessage && (
                    <Alert
                      severity="success"
                      style={{
                        margin: "20px 0 0", // Add top margin of 20px
                        top: 0,
                        left: 0,
                        right: 0,
                      }}
                    >
                      {showSuccessMessage}
                    </Alert>
                  )}
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="success"
                    onClick={handleSignup}
                    style={{ marginTop: "20px" }}
                  >
                    Signup
                  </Button>

                  <Typography
                    variant="body2"
                    color="textSecondary"
                    align="center"
                    style={{ marginTop: "20px" }}
                  >
                    Already have an account? <Link to="/login">Login</Link>
                  </Typography>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default Signup;
