import React, { useEffect, useState } from "react";
import {
  AppBar,
  Badge,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faUser,
  faSignOutAlt,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const iconStyle = {
    color: "white",
    cursor: "pointer",
  };

  const iconButtonStyle = {
    background: "none",
    border: "none",
  };

  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const loggedInUserDetails = JSON.parse(localStorage.getItem("loggedInUser"));
  const loggedInUserEmail = loggedInUserDetails ? loggedInUserDetails.email : "";
  const loggedInUserName = loggedInUserDetails ? loggedInUserDetails.name : "";

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <AppBar position="fixed" style={{background:"black", height: 60 }} >
      <Toolbar style={{ justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <a href="/">
            <img
              src="/images/logo3.png"
              alt="Logo"
              height="30"
              width="150"
              style={{ marginRight: "10px" }}
            />
          </a>
          <Typography variant="h6" component="div">
          E-Library
        </Typography>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" style={{ color: "white", marginRight: "10px", flex: 1 }}>
            Welcome, {loggedInUserName || "Guest"}
          </Typography>

          <div>
            <IconButton
              id="mui-bell"
              onClick={handleMenuOpen}
              style={iconButtonStyle}
            >
              <Badge badgeContent={notifications.length} color="error">
                <FontAwesomeIcon icon={faBell} style={iconStyle} />
              </Badge>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {notifications.length === 0 ? (
                <MenuItem disabled>You are all caught up, come back later</MenuItem>
              ) : (
                <>
                  {notifications.map((notification, index) => (
                    <MenuItem key={index}>
                      <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                      {notification.message}
                    </MenuItem>
                  ))}
                  <MenuItem onClick={clearNotifications}>
                    <small>Clear</small>
                  </MenuItem>
                </>
              )}
            </Menu>

            <IconButton
              id="mui-user"
              component={Button}
              href="/account"
              style={iconButtonStyle}
            >
              <FontAwesomeIcon icon={faUser} style={iconStyle} />
            </IconButton>

            <IconButton
              id="mui-logout"
              component={Button}
              href="/logout"
              style={iconButtonStyle}
            >
              <FontAwesomeIcon icon={faSignOutAlt} style={iconStyle} />
            </IconButton>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
