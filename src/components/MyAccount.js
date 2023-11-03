// MyAccount.js
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Navbar from './includes/Navbar';
import Footer from './includes/Footer';
import SideCard from './includes/Sidecard';

function MyAccount() {
  // Replace with your user data
  const userData = {
    username: 'Sanchay Swaraj',
    email: 'sanchay.a.swaraj@capgemini.com',
    profileImage: '/images/user.png', // URL to the user's profile image
    // Add more user details
    phoneNumber: '123-456-7890',
    address: 'Bangalore, Karnataka, India',
  };

  return (
    <div className="my-account-container mt-5">
      <Navbar />
      <Container fluid>
        <SideCard/>
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
                    <div style={{textAlign: '-webkit-left'}}>
                      <h3>{userData.username}</h3>
                      <p><b>Email: </b>{userData.email}</p>
                      <p><b>Phone Number: </b>{userData.phoneNumber}</p>
                      <p><b>Address: </b>{userData.address}</p>
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
