// MyAccount.js
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import Navbar from './includes/Navbar';
import Footer from './includes/Footer';
import SideCard from './includes/Sidecard';

function MyAccount() {
  // State to store user data
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    profileImage: '/images/user.png',
    phoneNumber: '',
    address: '',
    id: '', // Assuming 'id' is the key for the user's id
  });

  // State to store edited phone number and address
  const [editedPhoneNumber, setEditedPhoneNumber] = useState('');
  const [editedAddress, setEditedAddress] = useState('');

  // State to manage the edit mode
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch logged-in user data from local storage
    const loggedInUserDetails = JSON.parse(localStorage.getItem('loggedInUser'));

    // Fetch users from local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Find the user with the matching email
    const currentUser = users.find((user) => user.email === loggedInUserDetails.email);

    if (currentUser) {
      // Update state with user data
      setUserData({
        username: currentUser.name || '',
        email: currentUser.email || '',
        profileImage: currentUser.profileImage || '/images/user.png',
        phoneNumber: currentUser.phoneNumber || '',
        address: currentUser.address || '',
        id: currentUser.id || '', // Assuming 'id' is the key for the user's id
      });
    }
  }, []);

  const handleInputChange = (e) => {
    if (e.target.name === 'phoneNumber') {
      setEditedPhoneNumber(e.target.value);
    } else if (e.target.name === 'address') {
      setEditedAddress(e.target.value);
    }
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleUpdateProfile = () => {
    // Fetch users from local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Update user data in the 'users' array
    const updatedUsers = users.map((user) => {
      if (user.id === userData.id) {
        // Update phone number and address for the current user
        user.phoneNumber = editedPhoneNumber;
        user.address = editedAddress;
      }
      return user;
    });

    // Update 'users' array in local storage
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Update state with the edited data
    setUserData({
      ...userData,
      phoneNumber: editedPhoneNumber,
      address: editedAddress,
    });

    // Exit edit mode
    setIsEditing(false);
  };

  return (
    <div className="my-account-container mt-5">
      <Navbar />
      <Container fluid>
        <SideCard />
        <Row>
          <Col md={{ span: 7, offset: 3 }}>
            <div className="container mt-4 text-align:left">
              <Card>
                <Card.Body>
                  <Row>
                    <Col md={3} className="text-center">
                      <img
                        src={userData.profileImage}
                        alt={userData.username}
                        className="img-fluid rounded-circle"
                        style={{ width: '250px', height: '150px' }}
                      />
                      <Button variant="primary" className="mt-3">
                        <FontAwesomeIcon icon={faEdit} className="mr-2" />
                        Change Picture
                      </Button>
                    </Col>
                    <Col md={9}>
                      <div style={{ textAlign: '-webkit-left' }}>
                        <h3>{userData.username}</h3>
                        <p>
                          <b>Email: </b>
                          {userData.email}
                        </p>
                        <Form.Group controlId="phoneNumber" className="mb-3">
                          <Form.Label>
                            <b>Phone Number: </b>
                          </Form.Label>
                          {isEditing ? (
                            <div className="d-flex">
                              <Form.Control
                                type="text"
                                placeholder="Enter phone number"
                                name="phoneNumber"
                                value={editedPhoneNumber}
                                onChange={handleInputChange}
                              />
                              <Button
                                variant="success"
                                className="ml-2"
                                onClick={handleUpdateProfile}
                              >
                                <FontAwesomeIcon icon={faSave} />
                              </Button>
                            </div>
                          ) : (
                            <div className="d-flex align-items-center">
                              <span>{userData.phoneNumber || 'Not available'}</span>
                              {!userData.phoneNumber && (
                                <Button
                                  variant="link"
                                  className="ml-2 p-0"
                                  onClick={handleEditProfile}
                                >
                                  <FontAwesomeIcon icon={faEdit} />
                                </Button>
                              )}
                            </div>
                          )}
                        </Form.Group>
                        <Form.Group controlId="address" className="mb-3">
                          <Form.Label>
                            <b>Address: </b>
                          </Form.Label>
                          {isEditing ? (
                            <div className="d-flex">
                              <Form.Control
                                type="text"
                                placeholder="Enter address"
                                name="address"
                                value={editedAddress}
                                onChange={handleInputChange}
                              />
                              <Button
                                variant="success"
                                className="ml-2"
                                onClick={handleUpdateProfile}
                              >
                                <FontAwesomeIcon icon={faSave} />
                              </Button>
                            </div>
                          ) : (
                            <div className="d-flex align-items-center">
                              <span>{userData.address || 'Not available'}</span>
                              {!userData.address && (
                                <Button
                                  variant="link"
                                  className="ml-2 p-0"
                                  onClick={handleEditProfile}
                                >
                                  <FontAwesomeIcon icon={faEdit} />
                                </Button>
                              )}
                            </div>
                          )}
                        </Form.Group>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              {/* Add more sections or details as needed */}
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default MyAccount;
