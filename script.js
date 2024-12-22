const quizData = [
  {
    question: "Which company developed the first computer mouse?",
    choices: ["Apple", "Microsoft", "Xerox", "IBM"],
    answer: "Xerox",
  },
  {
    question: "Which chemical element has the symbol 'O'?",
    choices: ["Oxygen", "Osmium", "Ozone", "Oganesson"],
    answer: "Oxygen",
  },
  {
    question: "What is the longest river in the world?",
    choices: ["Amazon", "Nile", "Yangtze", "Mississippi"],
    answer: "Nile",
  },
  {
    question: "Which animal is known for its black and white stripes?",
    choices: ["Zebra", "Tiger", "Lion", "Panda"],
    answer: "Zebra",
  },
  {
    question: "Who is known as the 'Father of Computers'?",
    choices: ["Charles Babbage", "Alan Turing", "Bill Gates", "Steve Jobs"],
    answer: "Charles Babbage",
  },
];

let currentQuestionIndex = 0;
let score = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let timeLeft = 30;
let timer;
let isTimerRunning = false;
const correctAnswerList = [];

const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("time-left");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");
const correctAnswersElement = document.getElementById("correct-answers");
const incorrectAnswersElement = document.getElementById("incorrect-answers");
const restartButton = document.getElementById("restart-btn");
const startButton = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz");
const correctAnswerListElement = document.getElementById(
  "correct-answers-list"
);

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function loadQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  choicesElement.innerHTML = "";

  shuffleArray(currentQuestion.choices);

  currentQuestion.choices.forEach((choice) => {
    const li = document.createElement("li");
    li.textContent = choice;
    li.addEventListener("click", () => checkAnswer(choice, li));
    choicesElement.appendChild(li);
  });

  nextButton.disabled = true;
  startTimer();
}

function checkAnswer(selectedAnswer, choiceElement) {
  const correctAnswer = quizData[currentQuestionIndex].answer;
  if (selectedAnswer === correctAnswer) {
    score++;
    correctAnswers++;
    choiceElement.style.backgroundColor = "#4CAF50"; // Green for correct answer
    correctAnswerList.push(
      `${quizData[currentQuestionIndex].question} - Correct Answer: ${correctAnswer}`
    );
  } else {
    incorrectAnswers++;
    choiceElement.style.backgroundColor = "#f44336"; // Red for incorrect answer
    correctAnswerList.push(
      `${quizData[currentQuestionIndex].question} - Correct Answer: ${correctAnswer}`
    );
  }

  // Disable choices after answering
  const choices = choicesElement.querySelectorAll("li");
  choices.forEach((choice) => (choice.style.pointerEvents = "none"));

  nextButton.disabled = false;
}

function startTimer() {
  if (isTimerRunning) return;
  isTimerRunning = true;

  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      timerElement.textContent = `Time Remaining: ${timeLeft} seconds`;
    } else {
      clearInterval(timer);
      nextButton.disabled = false;
      const choices = choicesElement.querySelectorAll("li");
      choices.forEach((choice) => (choice.style.pointerEvents = "none"));
      isTimerRunning = false;
    }
  }, 1000);
}

nextButton.addEventListener("click", () => {
  clearInterval(timer);
  isTimerRunning = false;
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
    timeLeft = 30; // Reset time for the next question
  } else {
    showResult();
  }
});

function showResult() {
  resultElement.style.display = "block";
  scoreElement.textContent = score;
  correctAnswersElement.textContent = correctAnswers;
  incorrectAnswersElement.textContent = incorrectAnswers;
  quizScreen.style.display = "none";

  correctAnswerListElement.innerHTML = `<h3>Correct Answers for Each Question:</h3><ul style="margin: 10px;">${correctAnswerList
    .map((answer) => `<li  style="margin: 10px;">${answer}</li>`)
    .join("")}</ul>`;
}

restartButton.addEventListener("click", () => {
  currentQuestionIndex = 0;
  score = 0;
  correctAnswers = 0;
  incorrectAnswers = 0;
  timeLeft = 30;
  isTimerRunning = false;
  correctAnswerList.length = 0; // Clear previous correct answers

  resultElement.style.display = "none";
  quizScreen.style.display = "none";
  startScreen.style.display = "block"; // Show the start screen again
});

startButton.addEventListener("click", () => {
  startScreen.style.display = "none";
  quizScreen.style.display = "block";
  loadQuestion(); // Start the quiz
});
