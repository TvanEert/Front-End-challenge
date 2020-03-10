//creates
const title = document.createElement("h1");
const question = document.createElement("h2");

//Text
const MainPText = document.querySelector(".MainPText");

//Containers
const mainPageBtns = document.querySelector(".mainPageBtns");
const resultContainer = document.querySelector(".resultContainer");
const nulContainer = document.getElementById("nulContainer");

//Pages
const resultPage = document.querySelector(".resultP");
const startPage = document.querySelector(".startP");
const mainPage = document.querySelector(".mainP");

//Buttons
const startBtn = document.getElementById("startBtn");
const proBtn = document.getElementById("proBtn");
const noneBtn = document.getElementById("noneBtn");
const contraBtn = document.getElementById("contraBtn");
const backBtn = document.getElementById("backBtn");
const btnSkip = document.querySelector(".btnSkip");
const allBtn = document.getElementById("allBtn");
const secBtn = document.getElementById("secBtn");
const largeBtn = document.getElementById("largeBtn");

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

//Filter buttons
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
        for (let index = 0; index < parties.length; index++) {
          if (subjects[i].parties[p].name == parties[index].name) {
            if (!parties[index].score) parties[index].score = 1;
            else parties[index].score = parties[index].score + 1;
          }
        }
      }
    }
  }
}

function displayResult(arg) {
  resultPage.innerHTML = "";
  calcScore();

  parties.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));

  for (let parNumber = 0; parNumber < parties.length; parNumber++) {
    if (arg == "sec") {
      if (parties[parNumber].secular == true) {
        let pScores = document.createElement("p");
        if (parties[parNumber].score) {
          pScores.innerHTML = parties[parNumber].name + " " + parties[parNumber].score;
          resultContainer.appendChild(pScores);
        } else {
          pScores.innerHTML = parties[parNumber].name + " 0";
          nulContainer.appendChild(pScores);
        }
      }
    } else if (arg == "size") {
      if (parties[parNumber].size >= large) {
        let pScores = document.createElement("p");
        if (parties[parNumber].score) {
          pScores.innerHTML = parties[parNumber].name + " " + parties[parNumber].score;
          resultContainer.appendChild(pScores);
        } else {
          pScores.innerHTML = parties[parNumber].name + " 0";
          nulContainer.appendChild(pScores);
        }
      }
    } else if (arg == "all") {
      let pScores = document.createElement("p");
      if (parties[parNumber].score) {
        pScores.innerHTML = parties[parNumber].name + " " + parties[parNumber].score;
        resultContainer.appendChild(pScores);
      } else {
        pScores.innerHTML = parties[parNumber].name + " 0";
        nulContainer.appendChild(pScores);
      }
    }
  }
}
