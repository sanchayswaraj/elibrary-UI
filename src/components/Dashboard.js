import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import Navbar from './includes/Navbar';
import SideCard from './includes/Sidecard';
import PieChart from './includes/PieChart';
import Footer from './includes/Footer';

function Dashboard() {
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [totalBookPointsForCurrentUser, setTotalBookPointsForCurrentUser] = useState(0);
  

  useEffect(() => {
    // Fetch subscriptions and user data
    const subscriptions = JSON.parse(localStorage.getItem('subscriptions')) || [];

    // Calculate the total book points for the current logged-in user
    const loggedInUserDetails = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUserDetails) {
      const loggedInUserId = loggedInUserDetails.email;
      const userSubscriptions = subscriptions.filter(
        (subscription) => subscription.userEmail === loggedInUserId
      );
      setSubscriptionData(userSubscriptions);

      // Calculate the total book points for the logged-in user
      const totalPoints = userSubscriptions.reduce((total, item) => total + (item.bookPoints || 0), 0);
      setTotalBookPointsForCurrentUser(totalPoints);
    }


    // Create an object to store user data with book points
    const userData = {};
    // Process the subscriptions and calculate book points for each user
    subscriptions.forEach((subscription) => {
      const { userEmail, name, bookPoints } = subscription;

      if (!userData[userEmail]) {
        userData[userEmail] = { name, points: 0 };
      }

      userData[userEmail].points += bookPoints;
    });

    // Convert user data object into an array
    const userDataArray = Object.values(userData);

    // Set the user data in the state
    setSubscriptionData(userDataArray);

// Sort the userDataArray in descending order based on points
userDataArray.sort((a, b) => b.points - a.points);


  }, []);

  const userPointsData = [];
  subscriptionData.forEach((subscription) => {
    const userEmail = subscription.userEmail;
    const points = subscription.bookPoints || 0;
    const existingUser = userPointsData.find((user) => user.email === userEmail);

    if (existingUser) {
      existingUser.points += points;
    } else {
      userPointsData.push({ email: userEmail, name: subscription.name, points });
    }
  });






  return (
    <div className="dashboard-container mt-5">
      <Navbar />
      <Container fluid>
        <Row>
          <Col md={2}>
            <SideCard />
          </Col>
          <Col md={10}>
            <div className="container mt-4">
              <Row>
                <Col sm={4}>
                  <Card className="card-hover" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                    <Card.Body>
                      <h5>Total Points</h5>
                      <p>Points Scored by subscriptions</p>
                      <div className="circle green">
                        <h1>{totalBookPointsForCurrentUser}</h1>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>

                <Col sm={4}>
                  <Card className="card-hover" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                    <Card.Body>
                      <h5>Books Subscribed</h5>
                      <p>No of books subscribed</p>
                      <div className="circle blue">
                        <h1>{subscriptionData.length}</h1>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>

                <Col sm={4}>
                  <Card className="card-hover" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                    <Card.Body>
                      <h5>Active Subscriptions</h5>
                      <p>Number of Books Currently reading</p>
                      <div className="circle red">
                        <h1>{subscriptionData.length}</h1>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <br />
              <Row>
                <Col sm={6}>
                  <Card className="card-hover" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                    <Card.Body>
                      <h5>Top Subscribers by points</h5>
                      <Table bordered hover>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Points</th>
                          </tr>
                        </thead>
                        <tbody>
                          {subscriptionData.map((user, index) => (
                            <tr key={index}>
                              <td>{user.name}</td>
                              <td>{user.points}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                </Col>
                <Col sm={6}>
                  <Card className="card-hover" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                    <Card.Body>
                      <h5>Trend Chart</h5>
                      <div className="pie-chart">
                        <PieChart />
                        <br /><br />
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
      <br /><br /><br />
      <Footer />
    </div>
  );
}

export default Dashboard;
