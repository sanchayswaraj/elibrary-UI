  // Define the quiz questions and answers
  const quizData = [
    {
      ebookTitle: "Harry Potter",
      questions: [
        {
          question: "Who is Fluffy?",
          correctAnswer: "Hagrid’s three-headed dog",
          wrongAnswers: ["Ron Weasley", "Harry’s owl", "Dumbledore’s pet snake"],
          points: 10,
        },
        {
          question: "Who is Harry Potter's best friend?",
          correctAnswer: "Ron Weasley",
          wrongAnswers: [
            "Hermione Granger",
            "Neville Longbottom",
            "Draco Malfoy",
          ],
          points: 8,
        },
        {
          question: "What is the name of the school in Harry Potter?",
          correctAnswer: "Hogwarts School of Witchcraft and Wizardry",
          wrongAnswers: ["Durmstrang Institute", "Beauxbatons Academy of Magic", "Ilvermorny School of Witchcraft and Wizardry"],
          points: 12,
        },
        {
          question: "Who is the headmaster of Hogwarts in the first book?",
          correctAnswer: "Albus Dumbledore",
          wrongAnswers: ["Severus Snape", "Gilderoy Lockhart", "Rubeus Hagrid"],
          points: 10,
        },
      ],
    },
    {
      ebookTitle: "A Passage to India",
      questions: [
        {
          question: 'Where does "A Passage to India" take place?',
          correctAnswer: "India",
          wrongAnswers: ["England", "Australia", "USA"],
          points: 8,
        },
        {
          question: 'Who is the author of "A Passage to India"?',
          correctAnswer: "E.M. Forster",
          wrongAnswers: ["J.K. Rowling", "Suzanne Collins", "George Orwell"],
          points: 7,
        },
        // Add more questions for the same eBook here
      ],
    },
    {
      ebookTitle: "The Age of A.I.",
      questions: [
        {
          question: 'What is the main topic of "The Age of A.I."?',
          correctAnswer: "Artificial Intelligence",
          wrongAnswers: ["Biology", "History", "Physics"],
          points: 12,
        },
        {
          question: 'Who co-authored "The Age of A.I."?',
          correctAnswer:
            "Henry Kissinger, Eric Schmidt, and Daniel Huttenlocher",
          wrongAnswers: ["Stephen Hawking", "Elon Musk", "Mark Zuckerberg"],
          points: 9,
        },
        // Add more questions for the same eBook here
      ],
    },
    {
      ebookTitle: "The Monk who sold his Ferrari",
      questions: [
        {
          question: "What is the main theme of the book?",
          correctAnswer: "Self-discovery and life's purpose",
          wrongAnswers: [
            "Wealth accumulation",
            "Healthy eating",
            "Travel experiences",
          ],
          points: 10,
        },
        {
          question: "Who is the author of the book?",
          correctAnswer: "Robin Sharma",
          wrongAnswers: ["Stephen King", "J.K. Rowling", "George Orwell"],
          points: 8,
        },
        {
          question: "Where does the protagonist find his enlightenment?",
          correctAnswer: "Himalayan mountains",
          wrongAnswers: ["New York City", "Paris", "Amazon Rainforest"],
          points: 9,
        },
      ],
    },
  ];

  export default quizData;