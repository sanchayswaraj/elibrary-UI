import React, { useState, useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

function SubscriptionForm({ ebookTitle, ebookId, bookPoints }) {
  // Function to generate a unique subscription ID
  const generateSubscriptionId = () => {
    // Generate a unique ID based on a timestamp (for example)
    return new Date().getTime();
  };

  // State to store form input values
  const [subscriptionId, setSubscriptionId] = useState("");
  const [globalId, setGlobalId] = useState("");
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [empId, setEmpId] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch the logged-in user's details from local storage
    const loggedInUserDetails = JSON.parse(
      localStorage.getItem("loggedInUser")
    );

    if (loggedInUserDetails) {
      // Extract the email, name, and id from the user details
      const userEmail = loggedInUserDetails.email;
      const userName = loggedInUserDetails.name;
      const userId = loggedInUserDetails.id; // Assuming 'id' is the key for user's id
      const userJoiningTimestamp = loggedInUserDetails.joiningDate; // Assuming 'joiningDate' is the key for joining date

      // Convert the timestamp to a human-readable date
      const userJoiningDate = new Date(userJoiningTimestamp)
        .toISOString()
        .split("T")[0];

      // Set the email, name, and joining date in the component's state
      setUserEmail(userEmail);
      setName(userName);
      setGlobalId(userId);
      setEmpId(userId);
      setJoiningDate(userJoiningDate || ""); // Set the default value for joining date
    }
  }, []);

  // Function to clear the error message
  const clearErrorMessage = () => {
    setErrorMessage("");
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if a subscription with the same ebookId and userEmail already exists
    const existingSubscriptions =
      JSON.parse(localStorage.getItem("subscriptions")) || [];
    const isAlreadySubscribed = existingSubscriptions.some(
      (subscription) =>
        subscription.ebookId === ebookId && subscription.userEmail === userEmail
    );

    if (isAlreadySubscribed) {
      // Display an error message
      setErrorMessage("You are already subscribed to this book.");

      // Clear the error message after 3 seconds
      setTimeout(clearErrorMessage, 3000);
      return;
    }

    // Validate that joiningDate is not greater than the current date
    const currentDate = new Date().toISOString().split("T")[0];
    if (joiningDate > currentDate) {
      setErrorMessage("Joining date cannot be greater than the current date.");
      // Clear the error message after 3 seconds
      setTimeout(clearErrorMessage, 3000);
      return;
    }
    // Generate a unique subscription ID
    const newSubscriptionId = generateSubscriptionId();
    setSubscriptionId(newSubscriptionId);

    // Create an object with the form data, including book ID, title, subscription date, and bookPoints
    const subscriptionData = {
      subscriptionId: newSubscriptionId,
      globalId,
      name,
      grade,
      joiningDate,
      empId,
      supervisor,
      ebookId,
      ebookTitle,
      subscriptionDate: new Date().toLocaleDateString(),
      timestamp: new Date().toISOString(), // Include timestamp in the subscription data
      userEmail,
      bookPoints, // Include bookPoints in the subscription data
    };

    // Append the new subscription data to the array of subscriptions
    existingSubscriptions.push(subscriptionData);

    // Store the updated subscriptions array in localStorage
    localStorage.setItem(
      "subscriptions",
      JSON.stringify(existingSubscriptions)
    );
  };

  return (
    <div className="App">
      <Container className="justify-content-center align-items-center">
        <Card>
          <Card.Body>
            <form onSubmit={handleSubmit}>
              {/* Display the error message */}
              {errorMessage && (
                <Alert severity="error" sx={{ marginBottom: 2 }}>
                  {errorMessage}
                </Alert>
              )}

              {/* Replace Form.Group with TextField for each input */}
              <TextField
                fullWidth
                id="globalId"
                label="Global Id"
                type="text"
                value={globalId}
                onChange={(e) => setGlobalId(e.target.value)}
                required
                sx={{ marginBottom: 2 }}
              />

              <TextField
                fullWidth
                id="name"
                label="Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                sx={{ marginBottom: 2 }}
              />

              <TextField
                fullWidth
                id="grade"
                label="Grade"
                type="text"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                required
                sx={{ marginBottom: 2 }}
              />

              <TextField
                fullWidth
                id="joiningDate"
                label="Joining Date"
                type="date"
                value={joiningDate}
                onChange={(e) => setJoiningDate(e.target.value)}
                required
                sx={{ marginBottom: 2 }}
              />

              <TextField
                fullWidth
                id="empId"
                label="Emp Id"
                type="text"
                value={empId}
                onChange={(e) => setEmpId(e.target.value)}
                required
                sx={{ marginBottom: 2 }}
              />

              <TextField
                fullWidth
                id="supervisor"
                label="Supervisor"
                type="text"
                value={supervisor}
                onChange={(e) => setSupervisor(e.target.value)}
                required
                sx={{ marginBottom: 2 }}
              />

              <Button variant="contained" color="success" type="submit" sx={{ marginBottom: 2 }}>
                Subscribe
              </Button>

              {subscriptionId && <p>Subscription ID: {subscriptionId}</p>}

              {subscriptionId && <a href="/take-quiz">Take Quiz</a>}
            </form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default SubscriptionForm;
