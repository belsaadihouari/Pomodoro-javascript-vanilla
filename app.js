let workTime = 1800;
let restTime = 300;

function formattedTime(time) {
  return `${Math.trunc(time/60)}:${time % 60 < 10 ? `0${time % 60}` : time % 60}`
}

const displayWork = document.querySelector(".work-display-time");
const displayPause = document.querySelector(".pause-display-time");

displayWork.textContent = formattedTime(workTime)
displayPause.textContent = formattedTime(restTime)

const togglePlayBtn = document.querySelector(".toggle-btn");
togglePlayBtn.addEventListener("click", togglePomodoro);

let currentInterval = false;
let timerID;

function togglePomodoro(){
  handlePlayPause()

  if(currentInterval) return;
  currentInterval = true;

  workTime--;
  displayWork.textContent = formattedTime(workTime);
  timerID = setInterval(handleTicks, 1000)
}

let pause = true;
function handlePlayPause(){
  if(togglePlayBtn.getAttribute("data-toggle") === "play"){
    pause = false;
    togglePlayBtn.firstElementChild.src = "ressources/pause.svg";
    togglePlayBtn.setAttribute("data-toggle", "pause");

    if(workTime) {
      handleClassAnimation({work: true, rest: false})
    }
    else {
      handleClassAnimation({work: false, rest: true})
    }
  }
  else {
    pause = true;
    togglePlayBtn.firstElementChild.src = "ressources/play.svg";
    togglePlayBtn.setAttribute("data-toggle", "play");
    handleClassAnimation({work: false, rest: false})
  }
}

function handleClassAnimation(itemState){
  for(const item in itemState){
    if(itemState[item]) {
      document.querySelector(`.${item}`).classList.add("active")
    }
    else {
      document.querySelector(`.${item}`).classList.remove("active")
    }
  }
}

const cycles = document.querySelector(".cycles");
let cyclesNumber = 0;

function handleTicks(){
  if(!pause && workTime > 0){
    workTime--;
    displayWork.textContent = formattedTime(workTime)
    handleClassAnimation({work: true, rest: false})

  }
  else if(!pause && !workTime && restTime > 0){
    restTime--;
    displayPause.textContent = formattedTime(restTime);
    handleClassAnimation({work: false, rest: true})

  }
  else if(!pause && !workTime && !restTime) {
    workTime = 1799;
    restTime = 300;
    displayWork.textContent = formattedTime(workTime)
    displayPause.textContent = formattedTime(restTime)
    handleClassAnimation({work: true, rest: false})

    cyclesNumber++;
    cycles.textContent = `Cycle(s) : ${cyclesNumber}`

  }
}

const resetBtn = document.querySelector(".reset-btn");
resetBtn.addEventListener("click", reset);

function reset(){
  workTime = 1800;
  restTime = 300;

  displayWork.textContent = formattedTime(workTime)
  displayPause.textContent = formattedTime(restTime)

  cyclesNumber = 0;
  cycles.textContent = `Cycle(s) : 0`

  clearInterval(timerID);
  currentInterval = false;
  pause = true;

  togglePlayBtn.setAttribute("data-toggle", "play");
  togglePlayBtn.firstElementChild.src = "ressources/play.svg"

  handleClassAnimation({work: false, rest: false})
}