import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Button from "@mui/material/Button";
import {
  faArrowLeft,
  faArrowRight,
  faCheck,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "./includes/Navbar";
import SideCard from "./includes/Sidecard";
import Footer from "./includes/Footer";
import quizData from "./includes/quizData";
import "../css/App.css"; // Import your CSS file for styling

function TakeQuiz() {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showQuizCard, setShowQuizCard] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [totalPoints, setTotalPoints] = useState(0);
  const [subscriptions, setSubscriptions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showScoreModal, setShowScoreModal] = useState(false);

  const resetQuiz = () => {
    setSelectedQuiz(null);
    setShowQuizCard(false);
    setSelectedAnswers({});
    setTotalPoints(0);
    setCurrentQuestionIndex(0);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const quizQuestions = quizData;

  useEffect(() => {
    const subscriptionsData = JSON.parse(localStorage.getItem("subscriptions"));
    if (subscriptionsData) {
      setSubscriptions(subscriptionsData);
    }
  }, []);

  const loggedInUserDetails = JSON.parse(localStorage.getItem("loggedInUser"));
  const userSubscriptions = subscriptions.filter(
    (subscription) => subscription.userEmail === loggedInUserDetails.email
  );

  const handleQuizSelection = (quiz) => {
    setSelectedQuiz(quiz);
    setShowQuizCard(true);
    setSelectedAnswers({});
    setTotalPoints(0);
    setCurrentQuestionIndex(0);
  };

  const handleAnswerSelection = (questionIndex, answer) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: answer,
    }));
  };

  const handleSubmitQuiz = () => {
    if (!selectedQuiz || !selectedQuiz.ebookTitle) {
      return;
    }

    const quizQuestion = quizQuestions.find(
      (questionSet) => questionSet.ebookTitle === selectedQuiz.ebookTitle
    );

    if (!quizQuestion) {
      return;
    }

    let total = 0;
    quizQuestion.questions.forEach((question, questionIndex) => {
      if (selectedAnswers[questionIndex] === question.correctAnswer) {
        total += question.points;
      }
    });

    setTotalPoints(total);
    setShowScoreModal(true);

    const userEmail = loggedInUserDetails.email;

    const updatedSubscriptions = subscriptions.map((subscription) => {
      if (
        subscription.userEmail === userEmail &&
        subscription.ebookTitle === selectedQuiz.ebookTitle
      ) {
        return {
          ...subscription,
          points: total,
        };
      }
      return subscription;
    });

    localStorage.setItem("subscriptions", JSON.stringify(updatedSubscriptions));
    setSubscriptions(updatedSubscriptions);
  };

  const renderQuizQuestions = () => {
    if (!selectedQuiz || !selectedQuiz.ebookTitle) {
      return <p>No quiz questions available for this eBook.</p>;
    }

    const quizQuestion = quizQuestions.find(
      (questionSet) => questionSet.ebookTitle === selectedQuiz.ebookTitle
    );

    if (
      !quizQuestion ||
      !quizQuestion.questions ||
      quizQuestion.questions.length === 0
    ) {
      return <p>No quiz questions available for this eBook.</p>;
    }

    const currentQuestion = quizQuestion.questions[currentQuestionIndex];

    const isLastQuestion =
      currentQuestionIndex === quizQuestion.questions.length - 1;

    return (
      <div>
        <h5 style={{ fontWeight: "bold" }}>
          Quiz for Ebook: {selectedQuiz.ebookTitle}
        </h5>
        <br />
        <p style={{ textAlign: "left", fontWeight: "bold" }}>
          {currentQuestion.question}
        </p>
        <div style={{ textAlign: "-webkit-left", flexDirection: "column" }}>
          {currentQuestion.wrongAnswers.map((wrongAnswer, answerIndex) => (
            <Button
              key={answerIndex}
              variant={
                selectedAnswers[currentQuestionIndex] === wrongAnswer
                  ? "contained"
                  : "outlined"
              }
              style={{ margin: "5px", alignSelf: "flex-start" }}
              onClick={() =>
                handleAnswerSelection(currentQuestionIndex, wrongAnswer)
              }
            >
              {wrongAnswer}
            </Button>
          ))}
          <Button
            variant={
              selectedAnswers[currentQuestionIndex] ===
              currentQuestion.correctAnswer
                ? "contained"
                : "outlined"
            }
            style={{ margin: "5px", alignSelf: "flex-start" }}
            onClick={() =>
              handleAnswerSelection(
                currentQuestionIndex,
                currentQuestion.correctAnswer
              )
            }
          >
            {currentQuestion.correctAnswer}
          </Button>
        </div>
        <div style={{ marginTop: "10px" }}>
          <Button
            variant="contained"
            color="success"
            style={{ marginRight: "10px" }}
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            <span>
              <FontAwesomeIcon icon={faArrowLeft} /> Previous
            </span>
          </Button>
          <Button
            variant="contained"
            color="success"
            style={{ marginRight: "10px" }}
            onClick={isLastQuestion ? handleSubmitQuiz : handleNextQuestion}
            disabled={!selectedAnswers[currentQuestionIndex]}
          >
            {isLastQuestion ? (
              <span>
                Submit <FontAwesomeIcon icon={faCheck} />
              </span>
            ) : (
              <span>
                Next <FontAwesomeIcon icon={faArrowRight} />
              </span>
            )}
          </Button>
          <br />
          <br />
          <Button variant="danger" onClick={resetQuiz}>
            <span>
              <FontAwesomeIcon icon={faUndo} /> Reset
            </span>
          </Button>
        </div>
      </div>
    );
  };

  const closeScoreModal = () => {
    setShowScoreModal(false);
  };

  const renderScoreModal = () => {
    if (!showScoreModal) {
      return null; // Don't render the modal if showScoreModal is false
    }

    return (
      <div className="score-modal">
        <div>
          <h3>Your Score</h3>
          <p>Total Points: {totalPoints}</p>
          <Button variant="contained" onClick={closeScoreModal}>
            Close
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="take-quiz-container mt-5">
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
                  <h5>Select From Your Active Subscriptions</h5>
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
                      {userSubscriptions.map((subscription) => (
                        <tr key={subscription.id}>
                          <td>{subscription.ebookTitle}</td>
                          <td>{subscription.subscriptionDate}</td>
                          <td>{subscription.subscriptionId}</td>
                          <td>
                            <Button
                              variant="contained"
                              color="success"
                              onClick={() => handleQuizSelection(subscription)}
                            >
                              <AssignmentIcon /> Attempt Quiz
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
              <br />
              {showQuizCard && selectedQuiz && (
                <Card style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
                  <Card.Body>{renderQuizQuestions()}</Card.Body>
                </Card>
              )}
            </div>
          </Col>
        </Row>
      </Container>
      <br />
      <br />
      <br />
      <Footer />
      {renderScoreModal()}
    </div>
  );
}

export default TakeQuiz;
