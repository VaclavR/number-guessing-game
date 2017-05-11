var min = randomizeNumber(-5, 0);
var max = min + 20;
var randomNumber = randomizeNumber(min, max);
var attemps = 0;
var guess;
var minDisplay = document.getElementById("min-display");
var maxDisplay = document.getElementById("max-display");
var rangeDisplay = document.getElementById("range");
var minValue = document.getElementById("min-value");
var maxValue = document.getElementById("max-value");
var help = document.getElementById("help");
var buttonsDiv = document.getElementById("buttons");
var restartButton = document.getElementById("restart");
var gameOver = false;
var clickedButton;
minValue.setAttribute("value", min);
maxValue.setAttribute("value", max);

function randomizeNumber(min, max){
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

function generateButtons(){
  for(var i = min; i <= max; i++){
    var button = document.createElement("button");
    buttonsDiv.appendChild(button);
    var lastButton = buttonsDiv.querySelector("button:last-child");
    lastButton.classList.add("btn", "btn-info", "btn-lg");
    lastButton.textContent = i;
    lastButton.addEventListener("click", buttonsListener);
  }
}

function getRange(){
  minValue.addEventListener("change", function(){
    min = Number(this.value);
    restart();
  });
  maxValue.addEventListener("change", function(){
    max = Number(this.value);
    restart();
  });
}

function displayRange(){
  minDisplay.textContent = min;
  maxDisplay.textContent = max;
  rangeDisplay.textContent = max - min + 1;
}

function restart(){
  buttonsDiv.textContent = "";
  generateButtons(min, max);
  randomNumber = randomizeNumber(min, max);
  help.textContent = "Click on a number!";
  gameOver = false;
  attemps = 0;
  displayRange();
}

function buttonsListener(){
  guess = Number(this.textContent);
  clickedButton = this;
  check();  
}

restartButton.addEventListener("click", restart);

function check(){
  clickedButton.classList.add("disabled");
  clickedButton.removeEventListener("click", buttonsListener);
  attemps++;
  if(!gameOver){
    if(guess === randomNumber){
      clickedButton.classList.remove("btn-info", "disabled");
      clickedButton.classList.add("btn-success");
      help.innerHTML = "<strong>" + attemps +". attemp - YOU WIN!</strong>";
      gameOver = true;
      var buttons = document.querySelectorAll(".btn-info");
      for (var i = 0; i < buttons.length; i++){
        buttons[i].removeEventListener("click", buttonsListener);
      }
    } else if(guess < randomNumber){
      help.textContent = "Attemp " + attemps +". Your number is lesser";
      clickedButton.textContent = ">";
    } else if(guess > randomNumber){
      help.textContent = "Attemp " + attemps +". Your number is higher";
      clickedButton.textContent = "<";
    }
  }
}

generateButtons(min, max);
getRange();
displayRange();