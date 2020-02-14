let startBtn = document.querySelector("#startBtn");
let startPage = document.querySelector(".startP");
let mainPage = document.querySelector(".mainP");
let mainPageBtns = document.querySelector(".mainPageBtns");
let title = document.createElement("h1");
let question = document.createElement("h2");
let proBtn = document.querySelector("#proBtn");
let noneBtn = document.querySelector("#noneBtn");
let contraBtn = document.querySelector("#contraBtn");

let counter = 0;
let questionNum = 1;

startBtn.addEventListener("click", () => {
  startPage.innerHTML = "";
  initMainP();
});

proBtn.addEventListener("click", () => {
  updateQuestion();
});

function initMainP() {
  mainPageBtns.style.display = "flex";
  title.innerHTML = questionNum + ". " + subjects[0].title;
  question.innerHTML = subjects[0].statement;
  mainPage.insertBefore(title, mainPageBtns);
  mainPage.insertBefore(question, mainPageBtns);
}

function updateQuestion() {
  counter++;
  questionNum++;
  title.innerHTML = questionNum + ". " + subjects[counter].title;
  question.innerHTML = subjects[counter].statement;
}
