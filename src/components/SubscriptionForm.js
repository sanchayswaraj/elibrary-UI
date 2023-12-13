import React, { useState, useEffect } from "react";
import { Container, Card, Modal } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import "../css/App.css";

function SubscriptionForm({ ebookTitle, ebookId, bookPoints }) {
  const generateSubscriptionId = () => {
    return new Date().getTime().toString();
  };

  const [subscriptionId, setSubscriptionId] = useState("");
  const [globalId, setGlobalId] = useState("");
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [empId, setEmpId] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(5); // Initial countdown value

  useEffect(() => {
    const loggedInUserDetails = JSON.parse(
      localStorage.getItem("loggedInUser")
    );

    if (loggedInUserDetails) {
      const userEmail = loggedInUserDetails.email;
      const userName = loggedInUserDetails.name;
      const userId = loggedInUserDetails.id;
      const userJoiningTimestamp = loggedInUserDetails.joiningDate;

      const userJoiningDate = new Date(userJoiningTimestamp)
        .toISOString()
        .split("T")[0];

      setUserEmail(userEmail);
      setName(userName);
      setGlobalId(userId);
      setEmpId(userId);
      setJoiningDate(userJoiningDate || "");
    }
  }, []);

  const clearErrorMessage = () => {
    setErrorMessage("");
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const startCountdown = () => {
    // Start the countdown when the modal is shown
    let timer = setInterval(() => {
      setCountdown((prevCount) => prevCount - 1);
    }, 1000);

    // Stop the countdown when the component unmounts or the modal is closed
    return () => clearInterval(timer);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingSubscriptions =
      JSON.parse(localStorage.getItem("subscriptions")) || [];

    const isAlreadySubscribed = existingSubscriptions.some(
      (subscription) =>
        subscription.ebookId === ebookId && subscription.userEmail === userEmail
    );

    if (isAlreadySubscribed) {
      setErrorMessage("You are already subscribed to this book.");
      setTimeout(clearErrorMessage, 3000);
      return;
    }

    const currentDate = new Date().toISOString().split("T")[0];
    if (joiningDate > currentDate) {
      setErrorMessage("Joining date cannot be greater than the current date.");
      setTimeout(clearErrorMessage, 3000);
      return;
    }

    const newSubscriptionId = generateSubscriptionId();
    setSubscriptionId(newSubscriptionId);

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
      timestamp: new Date().toISOString(),
      userEmail,
      bookPoints,
    };

    existingSubscriptions.push(subscriptionData);

    localStorage.setItem(
      "subscriptions",
      JSON.stringify(existingSubscriptions)
    );

    setShowModal(true);
    startCountdown(); // Start the countdown when the modal is shown

    // Redirect to the quiz page after 5 seconds
    setTimeout(() => {
      setShowModal(false);
      window.location.href = "/take-quiz";
    }, 5000);
  };

  return (
    <div className="App">
      <Container className="justify-content-center align-items-center">
        <Card>
          <Card.Body>
            <form onSubmit={handleSubmit}>
              {errorMessage && (
                <Alert severity="error" sx={{ marginBottom: 2 }}>
                  {errorMessage}
                </Alert>
              )}

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

              <Button
                variant="contained"
                color="success"
                type="submit"
                sx={{ marginBottom: 2 }}
              >
                Subscribe
              </Button>
            </form>
          </Card.Body>
        </Card>
      </Container>

      {/* Modal for successful subscription */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        className="modal-container"
      >
        <Modal.Body>
          <p>You have been successfully subscribed!</p>
          <p><b>Subscription ID: </b>{subscriptionId}</p>
          <br />
          <p>
            Redirecting to Quiz Page in{" "}
            <span className="countdown">{countdown}</span> seconds. If not
            redirected, <a href="/take-quiz">click here</a>
          </p>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default SubscriptionForm;
