import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Navbar from './includes/Navbar';
import SideCard from './includes/Sidecard';
import Footer from './includes/Footer';
import SubscriptionForm from './SubscriptionForm'; // Import your SubscriptionForm component
import '../css/App.css'

function SurfEBooks() {
  // State to store search filter values
  const [searchByName, setSearchByName] = useState('');
  const [searchByCategory, setSearchByCategory] = useState('');
  const [searchByAuthor, setSearchByAuthor] = useState('');

  // State for modals
  const [showModal, setShowModal] = useState(false);
  const [selectedEbook, setSelectedEbook] = useState(null);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false); // Added state for full description

  const ebookData = [
    {
      ebookId: 100, // Add a book ID starting from 100
      title: 'Harry Potter',
      author: 'J.K. Rowling',
      category: 'Fiction',
      imageUrl: '/images/book1.jpg',
      description: 'Harry Potter is about to start his fifth year at Hogwarts School of Witchcraft and Wizardry. Unlike most schoolboys, Harry never enjoys his summer holidays, but this summer is even worse than usual. The Dursleys, of course, are making his life a misery, but even his best friends, Ron and Hermione, seem to be neglecting him. Harry has had enough. He is beginning to think he must do something, anything, to change his situation, when the summer holidays come to an end in a very dramatic fashion. What Harry is about to discover in his new year at Hogwarts will turn his world upside down...',
      bookPoints: 100,
    },
    {
      ebookId: 101, // Increment the book ID for the next book
      title: 'A Passage to India',
      author: 'E.M. Forster',
      category: 'Novel',
      imageUrl: '/images/book2.jpg',
      description: 'Two englishwomen, the young Miss Adela Quested and the elderly Mrs. Moore, travel to India. Adela expects to become engaged to Mrs. Moore’s son, Ronny, a British magistrate in the Indian city of Chandrapore. Adela and Mrs. Moore each hope to see the real India during their visit, rather than cultural institutions imported by the British. At the same time, Aziz, a young Muslim doctor in India, is increasingly frustrated by the poor treatment he receives at the hands of the English. Aziz is especially annoyed with Major Callendar, the civil surgeon, who has a tendency to summon Aziz for frivolous reasons in the middle of dinner. Aziz and two of his educated friends, Hamidullah and Mahmoud Ali, hold a lively conversation about whether or not an Indian can be friends with an Englishman in India. That night, Mrs. Moore and Aziz happen to run into each other while exploring a local mosque, and the two become friendly. Aziz is moved and surprised that an English person would treat him like a friend.',
      bookPoints: 250,

    },
    {
      ebookId: 102, // Increment the book ID for the next book
      title: 'The Hunger Games',
      author: 'Suzanne Collins',
      category: 'Novel',
      imageUrl: '/images/book4.jpg',
      description: 'Sixteen-year-old Katniss Everdeen, who lives alone with her mother and younger sister, regards it as a death sentence when she steps forward to take her sisters place in the Games. But Katniss has been close to dead before—and survival, for her, is second nature. Without really meaning to, she becomes a contender. But if she is to win, she will have to start making choices that weight survival against humanity and life against love.',
      bookPoints: 200,
    },
    {
      ebookId: 103, // Increment the book ID for the next book
      title: 'The Age of A.I.',
      author: 'Henry Kissinger',
      category: 'Technology',
      imageUrl: '/images/book3.jpg',
      description: 'Robin Sharma',
      bookPoints: 150,
    },
    {
      ebookId: 104, // Increment the book ID for the next book
      title: 'The Monk who sold his Ferrari',
      author: 'Robin Sharma',
      category: 'Fiction',
      imageUrl: '/images/book5.jpg',
      description: 'A renowned inspirational fiction, The Monk Who Sold His Ferrari is a revealing story that offers the readers a simple yet profound way to live life. The plot of this story revolves around Julian Mantle, a lawyer who has made his fortune and name in the profession.',
      bookPoints: 300,
    },
    // Add more e-books here with incrementing IDs
  ];


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

  // Apply filtering logic based on search criteria in real-time
  const filteredEbookData = ebookData.filter((ebook) => {
    const nameMatch = ebook.title.toLowerCase().includes(searchByName.toLowerCase());
    const categoryMatch = ebook.category.toLowerCase().includes(searchByCategory.toLowerCase());
    const authorMatch = ebook.author.toLowerCase().includes(searchByAuthor.toLowerCase());

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
              <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                <Card.Body>
                  <h5 className="card-title">E-Book Filter</h5>
                  <Form>
                    <Row>
                      <Col md={4}>
                        <Form.Group controlId="searchByName">
                          <Form.Control
                            type="text"
                            placeholder="Search by Name"
                            value={searchByName}
                            onChange={(e) => setSearchByName(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group controlId="searchByCategory">
                          <Form.Control
                            type="text"
                            placeholder="Search by Category"
                            value={searchByCategory}
                            onChange={(e) => setSearchByCategory(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group controlId="searchByAuthor">
                          <Form.Control
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
                <p><b>No records found</b></p>
              ) : (
                <Row>
                  {filteredEbookData.map((ebook, index) => (
                    <Col sm={4} key={index}>
                      <Card className="mb-4 card-hover" card style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                        <Card.Img
                          variant="top"
                          src={ebook.imageUrl}
                          alt={ebook.title}
                          style={{ height: '200px' }}
                        />
                        <Card.Body>
                          <Card.Title>{ebook.title}</Card.Title>
                          <Card.Text >
                            <strong>Author:</strong> {ebook.author}
                            <br />
                            <strong>Category:</strong> {ebook.category}
                            <br />

                            <strong>Points:</strong> {ebook.bookPoints}

                          </Card.Text>
                          <Button class="btn btn-primary" onClick={() => openModal(ebook)}>
                            <FontAwesomeIcon icon={faEye} /> Preview
                          </Button>{" "}
                          <Button class="btn btn-primary" onClick={() => openSubscriptionModal(ebook)}>
                            <FontAwesomeIcon icon={faEnvelope} /> Subscribe
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
      <br /><br />
      <Footer />
      {/* Modal for eBook preview and description */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedEbook && selectedEbook.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEbook && (
            <div>
              <img
                src={selectedEbook.imageUrl}
                alt={selectedEbook.title}
                style={{ width: '100%', height: '200px' }}
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
                      style={{ color: 'blue', cursor: 'pointer' }}
                      onClick={() => setShowFullDescription(true)}
                    >
                      Read More
                    </span>
                  </>
                )}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>

          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Subscription Form */}
      <Modal show={showSubscriptionModal} onHide={closeSubscriptionModal}>
        <Modal.Header closeButton>
          <Modal.Title>Subscribe to {selectedEbook && selectedEbook.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Render the subscription form with ebookTitle and bookPoints props */}
          <SubscriptionForm ebookTitle={selectedEbook && selectedEbook.title} ebookId={selectedEbook && selectedEbook.ebookId} bookPoints={selectedEbook && selectedEbook.bookPoints} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default SurfEBooks;
