import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser, faSignOutAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown';

function Navbar() {
  const iconStyle = {
    color: 'white',
    cursor: 'pointer',
  };

  // Custom CSS styles for the icon buttons
  const iconButtonStyle = {
    background: 'none',
    border: 'none',
  };

  const navbarStyle = {
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 1000,
    padding: '10px 10px', // Add padding (adjust values as needed)
    margin: '0',
  };

    // Fetch the currently logged-in username from local storage
    const loggedInUserDetails = JSON.parse(localStorage.getItem('loggedInUser'));
    const loggedInUserName = loggedInUserDetails ? loggedInUserDetails.name : '';
    console.log(loggedInUserName)
  

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
        <div className="d-flex align-items-center"> {/* Updated this line */}
          <span style={{ color: 'white', marginRight: '10px' }}>Welcome, {loggedInUserName}</span> {/* Display the username */}
          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-bell"
              style={iconButtonStyle}
            >
              <FontAwesomeIcon icon={faBell} style={iconStyle} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> Notification1
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> Notification2
              </Dropdown.Item>
              <Dropdown.Item href="#/action-3">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> Notification3
              </Dropdown.Item>
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
