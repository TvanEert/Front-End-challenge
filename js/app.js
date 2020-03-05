//creates
const title = document.createElement("h1");
const question = document.createElement("h2");

//Text
const MainPText = document.querySelector(".MainPText");

//Containers
const mainPageBtns = document.querySelector(".mainPageBtns");
const resultContainer = document.querySelector(".resultContainer");

//Pages
const resultPage = document.querySelector(".resultP");
const startPage = document.querySelector(".startP");
const mainPage = document.querySelector(".mainP");

//Buttons
const startBtn = document.querySelector("#startBtn");
const proBtn = document.querySelector("#proBtn");
const noneBtn = document.querySelector("#noneBtn");
const contraBtn = document.querySelector("#contraBtn");
const backBtn = document.querySelector("#backBtn");
const btnSkip = document.querySelector(".btnSkip");
const allBtn = document.querySelector("#allBtn");
const secBtn = document.querySelector("#secBtn");
const largeBtn = document.querySelector("#largeBtn");

//Numbers
let counter = 0;
let questionNum = 1;
let large = 10;

let answers = [];

//Button Events
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
allBtn.addEventListener("click", () => {
  displayResult("all");
});

secBtn.addEventListener("click", () => {
  displayResult("sec");
});
largeBtn.addEventListener("click", () => {
  displayResult("size");
});

//Init main page
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
    mainPage.innerHTML = "";
    resultPage.style.display = "initial";
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
    for (let p = 0; p < parties.length - 1; p++) {
      if (subjects[i].parties[p].position == answers[i]) {
        if (!parties[p].score) parties[p].score = 1;
        else parties[p].score = parties[p].score + 1;
      }
    }
  }
  console.log(parties);
}

function displayResult(arg) {
  resultPage.innerHTML = "";
  calcScore();
  for (let i = 0; i < parties.length; i++) {
    if (arg == "sec") {
      if (parties[i].secular == true) {
        let pScores = document.createElement("p");
        if (parties[i].score) {
          pScores.innerHTML = parties[i].name + " " + parties[i].score;
        } else {
          pScores.innerHTML = parties[i].name + " 0";
        }
        resultContainer.appendChild(pScores);
      }
    } else if (arg == "size") {
      if (parties[i].size > large) {
        let pScores = document.createElement("p");
        if (parties[i].score) {
          pScores.innerHTML = parties[i].name + " " + parties[i].score;
        } else {
          pScores.innerHTML = parties[i].name + " 0";
        }
        resultContainer.appendChild(pScores);
      }
    } else if (arg == "all") {
      let pScores = document.createElement("p");
      if (parties[i].score) {
        pScores.innerHTML = parties[i].name + " " + parties[i].score;
      } else {
        pScores.innerHTML = parties[i].name + " 0";
      }
      resultContainer.appendChild(pScores);
    }
  }
}
