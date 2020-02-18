let startBtn = document.querySelector("#startBtn");
let startPage = document.querySelector(".startP");
let mainPage = document.querySelector(".mainP");
let mainPageBtns = document.querySelector(".mainPageBtns");
let title = document.createElement("h1");
let question = document.createElement("h2");
let proBtn = document.querySelector("#proBtn");
let noneBtn = document.querySelector("#noneBtn");
let contraBtn = document.querySelector("#contraBtn");
let backBtn = document.querySelector("#backBtn");
let MainPText = document.querySelector(".MainPText");

let counter = 0;
let questionNum = 1;

let answers = [];

startBtn.addEventListener("click", () => {
  startPage.innerHTML = "";
  initMainP();
});

proBtn.addEventListener("click", () => {
  updateQuestion("pro");
});

noneBtn.addEventListener("click", () => {
  updateQuestion("none");
});

contraBtn.addEventListener("click", () => {
  updateQuestion("contra");
});

backBtn.addEventListener("click", () => {
  back();
});

function initMainP() {
  mainPageBtns.style.display = "flex";
  backBtn.style.display = "initial";
  title.innerHTML = questionNum + ". " + subjects[0].title;
  question.innerHTML = subjects[0].statement;
  MainPText.appendChild(title);
  MainPText.appendChild(question);
}

function updateQuestion(answer) {
  answers.push(answer);
  counter++;
  questionNum++;
  title.innerHTML = questionNum + ". " + subjects[counter].title;
  question.innerHTML = subjects[counter].statement;
  console.log(answers);
}

function back() {
  if (counter > 0) {
    answers.pop();
    counter--;
    questionNum--;
    title.innerHTML = questionNum + ". " + subjects[counter].title;
    question.innerHTML = subjects[counter].statement;
    console.log(answers);
  }
}
