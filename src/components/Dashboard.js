import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import PieChart from "./includes/PieChart";
import Navbar from "./includes/Navbar";
import SideCard from "./includes/Sidecard";
import Footer from "./includes/Footer";
import ebookData from "./includes/ebookData";

function Dashboard() {
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [totalBookPointsForCurrentUser, setTotalBookPointsForCurrentUser] =
    useState(0);
  const [ebookCategoryData, setEbookCategoryData] = useState([]);
  const [activeSubscriptionsCount, setActiveSubscriptionsCount] = useState(0);
  const [totalBooksSubscribed, setTotalBooksSubscribed] = useState(0); // Define totalBooksSubscribed

  const handleActiveSubscriptionsClick = () => {
    // Use Link to navigate to /active-subscriptions
    // You can adjust the "to" prop based on your route configuration
    // For example, if your route is /dashboard/active-subscriptions, set to="/dashboard/active-subscriptions"
    return <Link to="/active-subscriptions" />;
  };

  useEffect(() => {
    // Fetch subscriptions and user data
    const subscriptions =
      JSON.parse(localStorage.getItem("subscriptions")) || [];

    // Calculate the total book points for the current logged-in user
    const loggedInUserDetails = JSON.parse(
      localStorage.getItem("loggedInUser")
    );
    if (loggedInUserDetails) {
      const loggedInUserId = loggedInUserDetails.email;
      const userSubscriptions = subscriptions.filter(
        (subscription) => subscription.userEmail === loggedInUserId
      );
      setSubscriptionData(userSubscriptions);

      // Calculate the total book points for the logged-in user
      const totalPoints = userSubscriptions.reduce(
        (total, item) => total + (item.bookPoints || 0),
        0
      );
      setTotalBookPointsForCurrentUser(totalPoints);

      // Filter active subscriptions based on timestamp and current user
      const currentTimestamp = new Date().getTime();
      const lastOneHourTimestamp = currentTimestamp - 60 * 15 * 1000; // One hour ago

      const activeSubscriptions = userSubscriptions.filter(
        (subscription) =>
          new Date(subscription.timestamp).getTime() > lastOneHourTimestamp
      );

      setActiveSubscriptionsCount(activeSubscriptions.length);

      // Display the count of total books subscribed by the current logged-in user
      const totalBooksSubscribed = userSubscriptions.length;
      // You can use this count as needed, for example, to display it in your UI
      console.log("Total books subscribed:", totalBooksSubscribed);
      setTotalBooksSubscribed(totalBooksSubscribed);
    }

    const getEbookCategoryData = (data) => {
      const categoryData = {};

      data.forEach((ebook) => {
        const category = ebook.category;

        if (!categoryData[category]) {
          categoryData[category] = 1;
        } else {
          categoryData[category] += 1;
        }
      });

      return categoryData;
    };

    <ebookData />;

    // Extract category data for the pie chart
    const categoryDataArray = getEbookCategoryData(ebookData);
    setEbookCategoryData(categoryDataArray);

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
    const existingUser = userPointsData.find(
      (user) => user.email === userEmail
    );

    if (existingUser) {
      existingUser.points += points;
    } else {
      userPointsData.push({
        email: userEmail,
        name: subscription.name,
        points,
      });
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
                  <Card
                    className="card-hover"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                  >
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
                  <Card
                    className="card-hover"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                  >
                    <Card.Body>
                      <h5>Books Subscribed</h5>
                      <p>No of books subscribed</p>
                      <div className="circle blue">
                        <h1>{totalBooksSubscribed}</h1>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>

                <Col sm={4}>
                  {/* Wrap Card with Link */}
                  <Link
                    to="/active-subscriptions"
                    style={{ textDecoration: "none" }}
                  >
                    {/* Your Card content */}
                    <Card
                      className="card-hover"
                      style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                    >
                      <Card.Body onClick={handleActiveSubscriptionsClick}>
                        <h5>Active Subscriptions</h5>
                        <p>Number of Books Currently reading</p>
                        <div className="circle red">
                          <h1>{activeSubscriptionsCount}</h1>
                        </div>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              </Row>
              <br />
              <Row>
                <Col sm={6}>
                  <Card
                    className="card-hover"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                  >
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
                  <Card
                    className="card-hover"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                  >
                    <Card.Body>
                      <h5>Trend Chart</h5>
                      {/* Use the PieChart component and pass ebookCategoryData */}
                      <PieChart ebookCategoryData={ebookCategoryData} />
                      <br />
                      <br />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default Dashboard;
