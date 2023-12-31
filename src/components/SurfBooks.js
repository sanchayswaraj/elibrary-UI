import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Modal } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import MailIcon from "@mui/icons-material/Mail";
import SendIcon from "@mui/icons-material/Send";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./includes/Navbar";
import SideCard from "./includes/Sidecard";
import Footer from "./includes/Footer";
import SubscriptionForm from "./SubscriptionForm"; // Import your SubscriptionForm component
import "../css/App.css";
import ebookData from "./includes/ebookData";

function SurfEBooks() {
  // State to store search filter values
  const [searchByName, setSearchByName] = useState("");
  const [searchByCategory, setSearchByCategory] = useState("");
  const [searchByAuthor, setSearchByAuthor] = useState("");

  // State for modals
  const [showModal, setShowModal] = useState(false);
  const [selectedEbook, setSelectedEbook] = useState(null);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showRecommendModal, setShowRecommendModal] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false); // Added state for full description

  const [recommendEmail, setRecommendEmail] = useState("");
  const [recommendationSent, setRecommendationSent] = useState(false);

  <ebookData />;

  // Function to open the modal
  const openModal = (ebook) => {
    setSelectedEbook(ebook);
    setShowModal(true);
    setShowFullDescription(false); // Reset to show truncated description initially
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedEbook(null);
    setShowModal(false);
  };

  // Function to open the subscription modal
  const openSubscriptionModal = (ebook) => {
    setSelectedEbook(ebook);
    setShowSubscriptionModal(true);
    setShowModal(false); // Close the preview modal
  };

  // Function to close the subscription modal
  const closeSubscriptionModal = () => {
    setShowSubscriptionModal(false);
  };

  // Function to open the recommendation modal
  const openRecommendModal = () => {
    setShowRecommendModal(true);
  };

  // Function to close the recommendation modal and reset recommendation-related state
  const closeRecommendModal = () => {
    setShowRecommendModal(false);
    setRecommendEmail("");
    setRecommendationSent(false);
  };

  // Function to recommend the eBook to a colleague
  const recommendToColleague = () => {
    // Reset the recommendation status
    setRecommendationSent(false);

    // You can add email validation here
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(recommendEmail)) {
      // Handle email validation error (e.g., display an error message)
      return;
    }

    // Send the recommendation email
    // You can implement your logic to send an email here (e.g., using an API)

    // Mark recommendation as sent
    setRecommendationSent(true);
  };

  // Apply filtering logic based on search criteria in real-time
  const filteredEbookData = ebookData.filter((ebook) => {
    const nameMatch = ebook.title
      .toLowerCase()
      .includes(searchByName.toLowerCase());
    const categoryMatch = ebook.category
      .toLowerCase()
      .includes(searchByCategory.toLowerCase());
    const authorMatch = ebook.author
      .toLowerCase()
      .includes(searchByAuthor.toLowerCase());

    // Display the ebook only if all search criteria match
    return nameMatch && categoryMatch && authorMatch;
  });

  return (
    <div className="surf-ebooks-container mt-5">
      <Navbar />
      <Container fluid>
        <Row>
          <Col md={2}>
            <SideCard />
          </Col>
          <Col md={10}>
            <div className="container mt-4">
              {/* Search Filters */}
              <Card style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
                <Card.Body>
                  <h5 className="card-title">E-Book Filter</h5>
                  <Form>
                    <Row>
                      <Col md={4}>
                          {/* Replace Form.Control with TextField */}
                          <TextField
                            fullWidth
                            id="searchByName"
                            label="Search by Name"
                            type="text"
                            placeholder="Search by Name"
                            value={searchByName}
                            onChange={(e) => setSearchByName(e.target.value)}

                          />
                      </Col>
                      <Col md={4}>
                        <Form.Group controlId="searchByCategory">
                          {/* Replace Form.Control with TextField */}
                          <TextField
                            fullWidth
                            id="searchByCategory"
                            label="Search by Category"
                            type="text"
                            placeholder="Search by Category"
                            value={searchByCategory}
                            onChange={(e) =>
                              setSearchByCategory(e.target.value)
                            }
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group controlId="searchByAuthor">
                          {/* Replace Form.Control with TextField */}
                          <TextField
                            fullWidth
                            id="searchByAuthor"
                            label="Search by Author"
                            type="text"
                            placeholder="Search by Author"
                            value={searchByAuthor}
                            onChange={(e) => setSearchByAuthor(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
              <br />
              {/* Display Search Results */}
              {filteredEbookData.length === 0 ? (
                <Card style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
                  <Card.Body>
                    <b>No Records Found</b>
                  </Card.Body>
                </Card>
              ) : (
                <Row>
                  {filteredEbookData.map((ebook, index) => (
                    <Col sm={4} key={index}>
                      <Card
                        className="mb-4 card-hover"
                        style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
                      >
                        <Card.Img
                          variant="top"
                          src={ebook.imageUrl}
                          alt={ebook.title}
                          style={{ height: "200px" }}
                        />
                        <Card.Body>
                          <Card.Title>{ebook.title}</Card.Title>
                          <Card.Text>
                            <strong>Author:</strong> {ebook.author}
                            <br />
                            <strong>Category:</strong> {ebook.category}
                            <br />
                            <strong>Points:</strong> {ebook.bookPoints}
                          </Card.Text>
                          <Button
                            variant="contained"
                            onClick={() => openModal(ebook)}
                          >
                            <FontAwesomeIcon
                              icon={faEye}
                              style={{ marginRight: "5px" }}
                            />{" "}
                            Preview
                          </Button>{" "}
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => openSubscriptionModal(ebook)}
                          >
                            <FontAwesomeIcon
                              icon={faEnvelope}
                              style={{ marginRight: "5px" }}
                            />{" "}
                            Subscribe
                          </Button>{" "}
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
            </div>
          </Col>
        </Row>
      </Container>
      <br />
      <br />
      <Footer />
      {/* Modal for eBook preview and description */}
      <Modal show={showModal} onHide={closeModal} className="modal-container">
        <Modal.Header closeButton>
          <Modal.Title>{selectedEbook && selectedEbook.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEbook && (
            <div>
              <img
                src={selectedEbook.imageUrl}
                alt={selectedEbook.title}
                style={{ width: "100%", height: "200px" }}
              />
              <p>
                <strong>Author:</strong> {selectedEbook.author}
              </p>
              <p>
                <strong>Category:</strong> {selectedEbook.category}
              </p>
              {/* Display the truncated description with a "Read More" link */}
              <p>
                {showFullDescription ? (
                  selectedEbook.description
                ) : (
                  <>
                    {selectedEbook.description.substring(0, 200)}...
                    <span
                      style={{ color: "blue", cursor: "pointer" }}
                      onClick={() => setShowFullDescription(true)}
                    >
                      Read More
                    </span>
                  </>
                )}
              </p>
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={() => openRecommendModal()}
              >
                Recommend to Colleague
              </Button>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button color="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Subscription Form */}
      <Modal show={showSubscriptionModal} onHide={closeSubscriptionModal} className="modal-container">
        <Modal.Header closeButton>
          <Modal.Title>
            Subscribe to {selectedEbook && selectedEbook.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Render the subscription form with ebookTitle and bookPoints props */}
          <SubscriptionForm
            ebookTitle={selectedEbook && selectedEbook.title}
            ebookId={selectedEbook && selectedEbook.ebookId}
            bookPoints={selectedEbook && selectedEbook.bookPoints}
          />
        </Modal.Body>
      </Modal>

      {/* Modal for Recommending to Colleague*/}
      <Modal show={showRecommendModal} onHide={closeRecommendModal} className="modal-container">
        <Modal.Header closeButton>
          <Modal.Title>Recommend to Colleague</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TextField
            fullWidth
            label="Colleague's Email"
            type="email"
            placeholder="Enter colleague's email"
            value={recommendEmail}
            onChange={(e) => setRecommendEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailIcon />{" "}
                  {/* Make sure to import MailIcon from '@mui/icons-material/Mail' */}
                </InputAdornment>
              ),
            }}
          />

          {recommendationSent && (
            <p>Recommendation to {recommendEmail} sent.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button color="secondary" onClick={closeRecommendModal}>
            Close
          </Button>
          <Button color="primary" onClick={recommendToColleague}>
            Recommend
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SurfEBooks;
