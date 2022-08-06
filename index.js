const currentTime = document.querySelector("h1");
const selectMenu = document.querySelectorAll("select");
const setAlarmBtn = document.querySelector("button");
const content = document.querySelector(".content");

let alarmTime;
let ringtone = new Audio("./src/ringtone.mp3");
let isAlarmSet = false;

for (let i = 12; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option)
}

for (let i = 59; i >= 0; i--) {
    i = i < 10 ? "0" + i : i;
    
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option)
}

for (let i = 2; i > 0; i--) {
    let clockName = i == 1 ? 'AM' : 'PM';
    
    let option = `<option value="${clockName}">${clockName}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option)
}

setInterval(() => {
    let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    clockName = 'AM';

    if(h >= 12) {
        h = h - 12;
        clockName = "PM";
    }

    // если значение по часу установлено 0, установить значение - 12
    h = h == 0 ? h = 12 : h;
    

    //добавление 0 к часам, минутам, секундам, когда это значение меньше 10
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    currentTime.innerText = `${h}:${m}:${s} ${clockName}`;

    if(alarmTime == `${h}:${m} ${clockName}`){
        ringtone.play();
        ringtone.loop = true;
    }
    
}, 1000)

function setAlarm(){
    if(isAlarmSet) {
        alarmTime = "";
        ringtone.pause();
        content.classList.remove("disable")
        setAlarmBtn.innerText = "Set Alarm"
        return isAlarmSet = false;
    }

    let time = `${selectMenu[0].value}:${selectMenu[1].value}:${selectMenu[2].value}`;
    
    if(time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")){
        return alert("Пожалуйста, выберите время для установления будильника!")
    }

    isAlarmSet = true;
    alarmTime = time;
    content.classList.add("disable");
    setAlarmBtn.innerText = "Clear Alarm"
}

setAlarmBtn.addEventListener("click", setAlarm)