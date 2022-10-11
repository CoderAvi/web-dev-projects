
var increaseTime=time=>time+1;
var timer;
var timer_on=0;

//For Making Timer Active
var increaseTimer=()=>{
    var currentTime=document.getElementById("timer-time").innerHTML;
    console.log(currentTime);
    var minutes=parseInt(currentTime.split(':')[0]);
    var seconds=parseInt(currentTime.split(':')[1]);
    console.log(minutes,seconds);
    currentTime=minutes*60+seconds;
    currentTime=increaseTime(currentTime);
    minutes=Math.floor(currentTime/60);
    seconds=currentTime%60;
    currentTime=minutes.toString().padStart(2,'0').concat(':').concat(seconds.toString().padStart(2,'0'));
    document.getElementById("timer-time").innerHTML=currentTime;
    timer=setTimeout(increaseTimer,1000);
}

//For Start Button
var start=()=>{
    if(!timer_on){
        increaseTimer();
        timer_on=1;
    }
}

//For Pause Button
var pause=()=>{
    clearTimeout(timer);
    timer_on=0;
}

//For Stop Button
var stop=()=>{
    if(timer_on){
        clearTimeout(timer);
        timer_on=0;
        document.getElementById("timer-time").innerHTML="00:00";
    }
    else{
        document.getElementById("timer-time").innerHTML="00:00";
    }
}

document.getElementById("b1").addEventListener('click',start);
document.getElementById("b2").addEventListener('click',pause);
document.getElementById("b3").addEventListener('click',stop);