import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faUser,
  faSignOutAlt,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import Dropdown from "react-bootstrap/Dropdown";

function Navbar() {
  const iconStyle = {
    color: "white",
    cursor: "pointer",
  };

  // Custom CSS styles for the icon buttons
  const iconButtonStyle = {
    background: "none",
    border: "none",
  };

  const navbarStyle = {
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 1000,
    padding: "10px 10px", // Add padding (adjust values as needed)
    margin: "0",
  };

  // Fetch the currently logged-in user details from local storage
  const loggedInUserDetails = JSON.parse(localStorage.getItem("loggedInUser"));
  const loggedInUserEmail = loggedInUserDetails ? loggedInUserDetails.email : "";
  const loggedInUserName = loggedInUserDetails ? loggedInUserDetails.name : "";

  // Notification state
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch subscriptions and user data
    const subscriptions =
      JSON.parse(localStorage.getItem("subscriptions")) || [];

    // Filter subscriptions within the last hour for the current user
    const currentTimestamp = new Date().getTime();
    const lastOneHourTimestamp = currentTimestamp - 60 * 15 * 1000; // One hour ago

    const newSubscriptions = subscriptions.filter(
      (subscription) =>
        subscription.userEmail === loggedInUserEmail &&
        new Date(subscription.timestamp).getTime() > lastOneHourTimestamp
    );

    // Extract book names from new subscriptions
    const newBookNames = newSubscriptions.map(
      (subscription) => subscription.ebookTitle
    );

    // Create notifications
    const newNotifications = newBookNames.map((bookname) => ({
      message: `Congratulations, you have subscribed to ${bookname}`,
      bookname,
    }));

    // Update the notifications state
    setNotifications(newNotifications);
  }, [loggedInUserEmail]);

  // Clear notifications
  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <header className="navbar navbar-dark bg-dark" style={navbarStyle}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <a href="/">
            <img
              src="/images/logo.png"
              alt="Logo"
              height="30"
              className="d-inline-block align-top"
            />
          </a>
        </div>
        {/* Icons Container */}
        <div className="d-flex align-items-center">
          <span style={{ color: "white", marginRight: "10px" }}>
            Welcome, {loggedInUserName}
          </span>{" "}
          {/* Display the username */}
          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-bell"
              style={iconButtonStyle}
            >
              <FontAwesomeIcon icon={faBell} style={iconStyle} />
              {notifications.length > 0 && (
                <span className="badge badge-pill badge-danger ml-1">
                  {notifications.length}
                </span>
              )}
            </Dropdown.Toggle>

            <Dropdown.Menu>
            {notifications.length === 0 ? (
              <Dropdown.Item disabled>
                You are all caught up, come back later
              </Dropdown.Item>
            ) : (
              <>
                {notifications.map((notification, index) => (
                  <Dropdown.Item key={index}>
                    <FontAwesomeIcon icon={faEnvelope} className="mr-2" />{" "}
                    {notification.message}
                  </Dropdown.Item>
                ))}
                <Dropdown.Item onClick={clearNotifications}>
                  <small>Clear</small>
                </Dropdown.Item>
              </>
            )}
          </Dropdown.Menu>
        </Dropdown>

          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-user"
              style={iconButtonStyle}
            >
              <FontAwesomeIcon icon={faUser} style={iconStyle} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/account">
                <FontAwesomeIcon icon={faUser} className="mr-2" /> My Account
              </Dropdown.Item>
              <Dropdown.Item href="/logout">
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
