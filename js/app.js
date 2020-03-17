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
const checkBox = document.getElementById("checkBox");

//Numbers
let counter = 0;
let large = 10;

let answers = [];

//Button Events.
startBtn.addEventListener("click", () => {
  startPage.innerHTML = "";
  initMainP();
});

proBtn.addEventListener("click", () => {
  updateQuestion("pro");
  checkBox.checked = false;
});

noneBtn.addEventListener("click", () => {
  updateQuestion("none");
  checkBox.checked = false;
});

contraBtn.addEventListener("click", () => {
  updateQuestion("contra");
  checkBox.checked = false;
});

backBtn.addEventListener("click", () => {
  back();
  checkBox.checked = false;
});

btnSkip.addEventListener("click", () => {
  updateQuestion("skip");
  checkBox.checked = false;
});

//Filter buttons.
allBtn.addEventListener("click", () => {
  displayResult("all");
});
secBtn.addEventListener("click", () => {
  displayResult("sec");
});
largeBtn.addEventListener("click", () => {
  displayResult("size");
});

//Init main page.
function initMainP() {
  mainPageBtns.style.display = "flex";
  backBtn.style.display = "initial";
  title.innerHTML = counter + 1 + ". " + subjects[0].title;
  question.innerHTML = subjects[0].statement;
  MainPText.appendChild(title);
  MainPText.appendChild(question);
}

function updateQuestion(answer) {
  //Check if the check box is ticked if it is push checked is true.
  if (checkBox.checked) answers.push({ opinion: answer, checked: true });
  //Check if the check box is ticked if it isn't push checked is false.
  else answers.push({ opinion: answer, checked: false });
  //if the counter reaches 29 then the else.
  if (counter < subjects.length - 1) {
    counter++;
    title.innerHTML = counter + 1 + ". " + subjects[counter].title;
    question.innerHTML = subjects[counter].statement;
    console.log(answers);
  }
  //deletes the main page then shows the result page.
  else {
    console.log(answers);
    mainPage.innerHTML = "";
    resultPage.style.display = "initial";
  }
}

//back function to go back a question.
function back() {
  if (counter > 0) {
    answers.pop();
    counter--;
    title.innerHTML = counter - 1 + ". " + subjects[counter].title;
    question.innerHTML = subjects[counter].statement;
    console.log(answers);
  }
}

//function to calculate the score.
function calcScore() {
  for (let i = 0; i < answers.length; i++) {
    for (let parIndex = 0; parIndex < parties.length - 1; parIndex++) {
      // loops through the parties postions and look for a matching opinion.
      if (subjects[i].parties[parIndex].position == answers[i].opinion) {
        for (let index = 0; index < parties.length; index++) {
          //if macthing opinion found loop through parties to find a matching name where you can add the score.
          if (subjects[i].parties[parIndex].name == parties[index].name) {
            //Check if you had the checkbox ticked for this question.
            //If that is true then add 2 points of score
            if (answers[i]["checked"] == true) {
              //If score doesn't exist in the current partie create it for the current partie.
              if (!parties[index].score) parties[index].score = 2;
              //If score does exist in the current partie up the score.
              else parties[index].score = parties[index].score + 2;
            }
            //Else add 1 point
            else {
              if (!parties[index].score) parties[index].score = 1;
              else parties[index].score = parties[index].score + 1;
            }
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
