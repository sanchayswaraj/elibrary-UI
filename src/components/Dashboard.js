import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import PieChart from "./includes/PieChart";
import Navbar from "./includes/Navbar";
import SideCard from "./includes/Sidecard";
import Footer from "./includes/Footer";

function Dashboard() {
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [totalBookPointsForCurrentUser, setTotalBookPointsForCurrentUser] =
    useState(0);
  const [ebookCategoryData, setEbookCategoryData] = useState([]);

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

    const ebookData = [
      {
        ebookId: 100, // Add a book ID starting from 100
        title: "Harry Potter",
        author: "J.K. Rowling",
        category: "Fiction",
        imageUrl: "/images/book1.jpg",
        description:
          "Harry Potter is about to start his fifth year at Hogwarts School of Witchcraft and Wizardry. Unlike most schoolboys, Harry never enjoys his summer holidays, but this summer is even worse than usual. The Dursleys, of course, are making his life a misery, but even his best friends, Ron and Hermione, seem to be neglecting him. Harry has had enough. He is beginning to think he must do something, anything, to change his situation, when the summer holidays come to an end in a very dramatic fashion. What Harry is about to discover in his new year at Hogwarts will turn his world upside down...",
        bookPoints: 100,
      },
      {
        ebookId: 101, // Increment the book ID for the next book
        title: "A Passage to India",
        author: "E.M. Forster",
        category: "Novel",
        imageUrl: "/images/book2.jpg",
        description:
          "Two englishwomen, the young Miss Adela Quested and the elderly Mrs. Moore, travel to India. Adela expects to become engaged to Mrs. Moore’s son, Ronny, a British magistrate in the Indian city of Chandrapore. Adela and Mrs. Moore each hope to see the real India during their visit, rather than cultural institutions imported by the British. At the same time, Aziz, a young Muslim doctor in India, is increasingly frustrated by the poor treatment he receives at the hands of the English. Aziz is especially annoyed with Major Callendar, the civil surgeon, who has a tendency to summon Aziz for frivolous reasons in the middle of dinner. Aziz and two of his educated friends, Hamidullah and Mahmoud Ali, hold a lively conversation about whether or not an Indian can be friends with an Englishman in India. That night, Mrs. Moore and Aziz happen to run into each other while exploring a local mosque, and the two become friendly. Aziz is moved and surprised that an English person would treat him like a friend.",
        bookPoints: 250,
      },
      {
        ebookId: 102, // Increment the book ID for the next book
        title: "The Hunger Games",
        author: "Suzanne Collins",
        category: "Novel",
        imageUrl: "/images/book4.jpg",
        description:
          "Sixteen-year-old Katniss Everdeen, who lives alone with her mother and younger sister, regards it as a death sentence when she steps forward to take her sisters place in the Games. But Katniss has been close to dead before—and survival, for her, is second nature. Without really meaning to, she becomes a contender. But if she is to win, she will have to start making choices that weight survival against humanity and life against love.",
        bookPoints: 200,
      },
      {
        ebookId: 103, // Increment the book ID for the next book
        title: "The Age of A.I.",
        author: "Henry Kissinger",
        category: "Technology",
        imageUrl: "/images/book3.jpg",
        description:
          "The Age of A.I. explores the impact of artificial intelligence on various aspects of society. Henry Kissinger, a renowned political figure, delves into the ethical, social, and geopolitical challenges posed by the rise of A.I. This insightful book offers a thoughtful analysis of the transformative power of artificial intelligence and its implications for the future.",
        bookPoints: 150,
      },
      {
        ebookId: 104, // Increment the book ID for the next book
        title: "The Monk who sold his Ferrari",
        author: "Robin Sharma",
        category: "Fiction",
        imageUrl: "/images/book5.jpg",
        description:
          "A renowned inspirational fiction, The Monk Who Sold His Ferrari is a revealing story that offers the readers a simple yet profound way to live life. The plot of this story revolves around Julian Mantle, a lawyer who has made his fortune and name in the profession.",
        bookPoints: 300,
      },
      // Add more e-books here with incrementing IDs
    ];

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
                        <h1>{subscriptionData.length}</h1>
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
