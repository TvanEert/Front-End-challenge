const startBtn = document.querySelector("#startBtn");
const startPage = document.querySelector(".startP");
const mainPage = document.querySelector(".mainP");
const mainPageBtns = document.querySelector(".mainPageBtns");
const title = document.createElement("h1");
const question = document.createElement("h2");
const proBtn = document.querySelector("#proBtn");
const noneBtn = document.querySelector("#noneBtn");
const contraBtn = document.querySelector("#contraBtn");
const backBtn = document.querySelector("#backBtn");
const btnSkip = document.querySelector(".btnSkip");
const MainPText = document.querySelector(".MainPText");
const resultContainer = document.querySelector(".resultContainer");

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

btnSkip.addEventListener("click", () => {
  updateQuestion("skip");
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
  if (counter < subjects.length - 1) {
    counter++;
    questionNum++;
    title.innerHTML = questionNum + ". " + subjects[counter].title;
    question.innerHTML = subjects[counter].statement;
    console.log(answers);
  } else {
    console.log(answers);
    question.style.display = "none";
    mainPageBtns.style.display = "none";
    backBtn.style.display = "none";
    title.innerHTML = "Resultaten";
    resultContainer.style.display = "block";
    displayResult();
  }
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

function calcScore() {
  for (let i = 0; i < answers.length; i++) {
    for (let p = 0; p < parties.length; p++) {
      if (subjects[i].parties[p].position == answers[i]) {
        if (!parties[p].score) parties[p].score = 1;
        else parties[p].score = parties[p].score + 1;
      }
    }
  }
  console.log(parties);
}

function displayResult() {
  calcScore();
  for (let i = 0; i < parties.length; i++) {
    let pScores = document.createElement("p");
    if (parties[i].score) {
      pScores.innerHTML = parties[i].name + " " + parties[i].score;
    } else {
      pScores.innerHTML = parties[i].name + " 0";
    }
    resultContainer.appendChild(pScores);
  }
}
