//DOM ELEMENTS
const selectedSession = document.querySelector('#selected-session');
const selectedBreak = document.querySelector('#selected-break');
const currentMode = document.querySelector('#current-mode');
const currentTime = document.querySelector('#current-time');

//BUTTONS
const upSession = document.querySelector('#up-session');
const downSession = document.querySelector('#down-session');
const upBreak = document.querySelector('#up-break');
const downBreak = document.querySelector('#down-break');

const play = document.querySelector('#play');
const reset = document.querySelector('#reset');
const pause = document.querySelector('#pause');
const stop = document.querySelector('#stop');


function addToSelectedElement(dom,n){
    if(!currentTime.classList.contains('playing') && !currentTime.classList.contains('paused')){
        let num = Number(dom.textContent)
        num+=n;
        if(num>0){
            dom.textContent = num;
        }

        let timeText =''
        if(Number(selectedSession.textContent)<10){
            timeText=`0${selectedSession.textContent}:00`;
        }else{
            timeText=`${selectedSession.textContent}:00`;
        }
        currentTime.textContent = timeText;
    }
}
function getTimerMillis(){
    let numbers = currentTime.textContent.split(':');
    let seconds = (Number(numbers[0])*60 + Number(numbers[1]))*1000;
    return seconds;
}
function toTime(seconds){
    let minutes = Math.floor(seconds/60);
    let secs = seconds % 60;
    let time = '';
    if(minutes<10){
        time = `0${minutes}:`
    }else{
        time = `${minutes}:`
    }
    if(secs<10){
        time+='0'+secs;
    }else{
        time+=secs;
    }
    return time;
}
let countdown;
function playTimer(e){
    if(currentTime.classList.contains('playing')){
        return;
    }
    currentTime.classList.add('playing');
    currentTime.classList.remove('paused');
    const now = Date.now();
    let then = now + getTimerMillis();

    countdown = setInterval(()=>{
        const secondsLeft = Math.round((then-Date.now())/1000);
        if(secondsLeft<=0){
            if(currentMode.textContent == 'Session'){
                currentTime.textContent = toTime(Number(selectedBreak.textContent)*60);
                then = Date.now()+ getTimerMillis();
                currentMode.textContent = 'Break';
            }else{
                currentTime.textContent = toTime(Number(selectedSession.textContent)*60);
                then = Date.now()+ getTimerMillis();
                currentMode.textContent = 'Session';
            }
        }
        let time = toTime(secondsLeft);
        currentTime.textContent = time;
    },1000);
}
function stopTimer(e){
    clearInterval(countdown);
    currentTime.classList.remove('playing');
    currentTime.classList.remove('paused');
    currentTime.textContent = toTime(Number(selectedSession.textContent)*60);
    currentMode.textContent = 'Session';
}
function pauseTimer(e){
    clearInterval(countdown);
    currentTime.classList.add('paused');
    currentTime.classList.remove('playing');
}
function resetTimer(e){
    clearInterval(countdown);
    currentTime.classList.remove('playing');
    currentTime.classList.remove('paused');
    currentTime.textContent = toTime(25*60);
    selectedBreak.textContent = '5';
    selectedSession.textContent = '25';
    currentMode.textContent = 'Session';
}


upSession.addEventListener('click',e=>addToSelectedElement(selectedSession,1));
downSession.addEventListener('click',e=>addToSelectedElement(selectedSession,-1));
upBreak.addEventListener('click',e=>addToSelectedElement(selectedBreak,1));
downBreak.addEventListener('click',e=>addToSelectedElement(selectedBreak,-1));

play.addEventListener('click',playTimer);
stop.addEventListener('click',stopTimer);
pause.addEventListener('click', pauseTimer);
reset.addEventListener('click',resetTimer);
