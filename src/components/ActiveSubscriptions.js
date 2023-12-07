import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Table, Modal } from "react-bootstrap";
import Button from "@mui/material/Button";
import Navbar from "./includes/Navbar";
import SideCard from "./includes/Sidecard";
import Footer from "./includes/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import ebookData from "./includes/ebookData";

function ActiveSubscriptions() {
  const [activeSubscriptions, setActiveSubscriptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEbook, setSelectedEbook] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const subscriptionsData = JSON.parse(localStorage.getItem("subscriptions"));
    if (subscriptionsData) {
      const currentTimestamp = new Date().getTime();
      const lastOneHourTimestamp = currentTimestamp - 60 * 15 * 1000;

      const activeSubscriptions = subscriptionsData.filter(
        (subscription) =>
          new Date(subscription.timestamp).getTime() > lastOneHourTimestamp
      );

      setActiveSubscriptions(activeSubscriptions);
    }
  }, []);

  // Modal for eBook preview and description
  const PreviewModal = ({ show, handleClose, ebook }) => {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{ebook && ebook.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {ebook ? (
            <div>
              <img
                src={ebook.imageUrl}
                alt={ebook.title}
                style={{ width: "100%", height: "200px" }}
              />
              <p>
                <strong>Author:</strong> {ebook.author}
              </p>
              <p>
                <strong>Category:</strong> {ebook.category}
              </p>
              <p>
                {ebook.description ? (
                  showFullDescription ? (
                    ebook.description
                  ) : (
                    <>
                      {ebook.description.substring(0, 200)}...
                      <span
                        style={{ color: "blue", cursor: "pointer" }}
                        onClick={() => setShowFullDescription(true)}
                      >
                        Read More
                      </span>
                    </>
                  )
                ) : (
                  "No description available."
                )}
              </p>
            </div>
          ) : (
            <p>No eBook selected.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  // Function to open the modal
  const openModal = (ebookId) => {
    const selectedEbook = ebookData.find((ebook) => ebook.ebookId === ebookId);
    setSelectedEbook(selectedEbook);
    setShowModal(true);
    setShowFullDescription(false);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedEbook(null);
    setShowModal(false);
  };

  return (
    <div className="active-subscriptions-container mt-5">
      <Navbar />
      <Container fluid>
        <Row>
          <Col md={2}>
            <SideCard />
          </Col>
          <Col md={10}>
            <div className="container mt-4">
              <Card style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
                <Card.Body>
                  <h5>Active Subscriptions</h5>
                  <Table bordered hover>
                    <thead>
                      <tr>
                        <th>Ebook Name</th>
                        <th>Subscription Date</th>
                        <th>Subscription ID</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeSubscriptions.map((subscription) => (
                        <tr key={subscription.id}>
                          <td>{subscription.ebookTitle}</td>
                          <td>{subscription.subscriptionDate}</td>
                          <td>{subscription.subscriptionId}</td>
                          <td>
                            <Button
                              variant="contained"
                              onClick={() => openModal(subscription.ebookId)}
                            >
                              <FontAwesomeIcon
                                icon={faEye}
                                style={{ marginRight: "5px" }}
                              />{" "}
                              Preview
                            </Button>{" "}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
      <br />
      <br />
      <br />
      <Footer />

      {/* Render the PreviewModal component */}
      <PreviewModal
        show={showModal}
        handleClose={closeModal}
        ebook={selectedEbook}
      />
    </div>
  );
}

export default ActiveSubscriptions;
