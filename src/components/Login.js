import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/App.css";
import Header from "./includes/Header";
import Footer from "./includes/Footer";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Alert from "@mui/material/Alert";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (!username.trim() || !password.trim()) {
      setError("Username and password are required fields.");
      setTimeout(() => setError(""), 3000);
    } else {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);

        // Retrieve existing user data or initialize an empty array
        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

        // Find the user with the matching username
        const user = existingUsers.find((u) => u.email === username);

        if (user) {
          // Check if the password is correct
          if (user.password === password) {
            // Store the logged-in user details in local storage
            localStorage.setItem("loggedInUser", JSON.stringify(user));
            window.location.href = "/dashboard";
          } else {
            setError("Incorrect password. Please try again.");
            setTimeout(() => setError(""), 3000); // Clear error after 5 seconds
          }
        } else {
          setError("Invalid credentials. Please try again.");
          setTimeout(() => setError(""), 3000); // Clear error after 5 seconds
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
      <Container component="main" maxWidth="xs">
        <div className="row justify-content-center mt-5">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <Typography component="h2" variant="h5" align="center">
                  Login
                </Typography>
                <form>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="username"
                    label="Username"
                    autoComplete="off"
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
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                    disabled={isLoading}
                    style={{ marginTop: "20px" }}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </form>
                <br />
                {error && <Alert severity="error">{error}</Alert>}

                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="center"
                  style={{ marginTop: "20px" }}
                >
                  Don't have an account?{" "}
                  <Link to="/signup">Create a new account</Link>
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default Login;
