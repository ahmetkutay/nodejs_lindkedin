const path = require("path");
const util = require("util");
const v8 = require("v8");
const readLine = require("readline");

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// rl.question("How do you like Node", (answer) => {
//   console.log(`Your answer: ${answer}`);
// });

const collectAnswers = (questions, done) => {
  const answers = [];
  const [firstQuestion] = questions;
  // done(answers);
  const questionAnswered = (answer) => {
    answers.push(answer);
    if (answers.length < questions.length) {
      rl.question(questions[answers.length], questionAnswered);
    } else {
      done(answers);
    }
  };
  rl.question(firstQuestion, questionAnswered);
};

const questions = [
  "What is your name ",
  "Where do you live ",
  "What are you going to do with Nodejs? ",
];

collectAnswers(questions, (answer) => {
  console.log("Thank you for your answer. ");
  console.log(answer);
  process.exit();
});
