const quesJSON = [
  {
    correctAnswer: "Three ",
    options: ["Two", "Three ", "Four", "Five"],
    question: "Q1 How many pieces of bun are in a Mcdonald's Big Mac?",
  },
  {
    correctAnswer: "L. Frank Baum",
    options: [
      "Suzanne Collins",
      "James Fenimore Cooper",
      "L. Frank Baum",
      "Donna Leon",
    ],
    question: "Q2 Which author wrote 'The Wonderful Wizard of Oz'?",
  },
  {
    correctAnswer: "Atlanta United",
    options: [
      "Atlanta United",
      "Atlanta Impact",
      "Atlanta Bulls",
      "Atlanta Stars",
    ],
    question: "Q3 Which of these is a soccer team based in Atlanta?",
  },
  {
    correctAnswer: "A Nanny",
    options: ["A Sow", "A Lioness", "A Hen", "A Nanny"],
    question: "Q4 A female goat is known as what?",
  },
  {
    correctAnswer: "P. L. Travers",
    options: [
      "J. R. R. Tolkien",
      "P. L. Travers",
      "Lewis Carroll",
      "Enid Blyton",
    ],
    question: "Q5 Which author wrote 'Mary Poppins'?",
  },
];

let score = 0;
let currentQuestion = 0;
let time = 30;
const totalScore = quesJSON.length;

//Accessing all the elements:
const questionEl = document.getElementById("question");
const optionEl = document.getElementById("options");
const scoreEl = document.getElementById("score");
const nextEl = document.getElementById("next");
const timmer = document.getElementById("timer");
const tryAgain = document.getElementById("again");
tryAgain.style.display = "none";
showQuestion();

nextEl.addEventListener("click", () => {
  scoreEl.textContent = `Score: ${score} / ${totalScore}`;
  nextQuestion();
  timerZero();
});
tryAgain.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  scoreEl.textContent = `Score: ${score} / ${totalScore}`;
  showQuestion();
  timerZero();
  timmer.style.display = "block";
  nextEl.style.display = "inline-block";
  tryAgain.style.display = "none";
  optionEl.style.display = "flex";
});

function showQuestion() {
  // Destructuring the object
  const { correctAnswer, options, question } = quesJSON[currentQuestion];

  //Setting question text content
  questionEl.textContent = question;

  const shuffledOptions = shuffleOptions(options);

  //Populating the Options div with the buttons.
  shuffledOptions.forEach((opt) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    optionEl.appendChild(btn);

    // Event handling on the button:
    btn.addEventListener("click", () => {
      if (opt === correctAnswer) {
        score++;
      } else {
        score = score - 0.25;
      }
      scoreEl.textContent = `Score: ${score} / ${totalScore}`;
      nextQuestion();
      timerZero();
    });
  });
}

function nextQuestion() {
  currentQuestion++;
  optionEl.textContent = "";
  if (currentQuestion >= quesJSON.length) {
    questionEl.textContent = "Quiz Completed!!";
    nextEl.style.display = "none";
    timmer.style.display = "none";
    tryAgain.style.display = "inline-block";
    optionEl.style.display = "none";
  } else {
    showQuestion();
  }
}

//Shuffling the Options
function shuffleOptions(options) {
  for (let i = options.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * i + 1);
    [options[i], options[j]] = [options[j], options[i]];
  }
  return options;
}

//   shuffleOptions([1, 2, 3, 4, 5]);
setInterval(() => {
  time = time - 1;
  timmer.textContent = `Time:${time} sec`;
  if (time <= 0) {
    nextQuestion();
    timerZero();
  }
}, 1000);
function timerZero() {
  time = 30;
  timmer.textContent = `Time:${time} sec`;
}
