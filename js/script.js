var timerID = 0;
var timerID2 = 0;
var hour="00";
var minute = "00";
var second = "00";
var totaltime=0;
var begintime=0;
var colorwr=0;
var alarmtime=0;
var alarmlength=60;
  
function timer()
{ 
  var timetemp = new Date()-begintime;
  timetemp = (totaltime-timetemp)/1000+1;
  
  if (timetemp<=1)
  {
    timerAlarm();
    return;
  }
  
  var hour = Math.floor(timetemp/3600);
  var minute = Math.floor((timetemp - 3600 * hour)/60);
  var second = Math.floor(timetemp - 3600 * hour - 60 * minute);
      
  if (second < 10) {
    second = "0" + second;
  }
    
  if (minute < 10) {
    minute = "0" + minute;
  }
    
  if (hour < 10) {
    hour = "0" + hour;
  }
    
  document.getElementById("timerhour").value = hour;
  document.getElementById("timerminute").value = minute;
  document.getElementById("timersecond").value = second;
  timerID = setTimeout("timer()", 10)
} 

function timerAlarm(){
  clearTimeout(timerID);
  document.getElementById("timersecond").value = "00";
  document.getElementById("timerhour").disabled = false;
  document.getElementById("timerminute").disabled = false;
  document.getElementById("timersecond").disabled = false;
  document.timergo.startstop.value = "Stop";
  document.timergo.startstop.onclick = stopAlarm;
  document.timergo.reset.value = "Stop";
  document.timergo.reset.onclick = stopAlarm;
  var i=1;
  while (document.getElementById("sound"+i)!=null)
  {
    if (document.getElementById("sound"+i).checked)
    {
      document.getElementById("audio"+i).currentTime = 0;
      document.getElementById("audio"+i).play();
      document.getElementById("audio"+i).loop=true;
    }
    i++;
  }
  alarmtime = Date.now();
  timerColor();
}

function testAlarm(){
  var i=1;
  while (document.getElementById("sound"+i)!=null)
  {
    if (document.getElementById("sound"+i).checked)
    {
      document.getElementById("audio"+i).currentTime = 0;
      document.getElementById("audio"+i).play();
      document.getElementById("audio"+i).loop=false;
    }
    i++;
  }
}

function timerColor()
{ 
  if (colorwr==0)
  {
    document.getElementById("alarmbox").style.backgroundColor = "#ff0000";
    colorwr = 1;
  }
  else
  {
    document.getElementById("alarmbox").style.backgroundColor = "#444444";
    colorwr = 0;
  }
  
  var timetemp = new Date()-alarmtime;
  timetemp = timetemp/1000;
  if (timetemp>alarmlength)
  {
    stopAlarm();
  }
  
  timerID2 = setTimeout("timerColor()", 200);
} 

function stopAlarm()
{
  var i=1;
  while (document.getElementById("sound"+i)!=null)
  {
    document.getElementById("audio"+i).pause();
    i++;
  }
  
  document.getElementById("alarmbox").style.backgroundColor = "#444444";
  document.timergo.startstop.value = "Iniciar";
  document.timergo.startstop.onclick = timerStart;
  document.timergo.reset.onclick = timerReset;
  document.timergo.reset.value = "Limpar";
  clearTimeout(timerID2);
}

function timerStart(){
  hour = document.getElementById("timerhour").value;
  minute = document.getElementById("timerminute").value;
  second = document.getElementById("timersecond").value;
  alarmlength = document.getElementById("alarmlength").value;
  
  if ((hour==0)&&(minute==0)&&(second==0))
  {
    alert("Você deve escolher um horário maior que 00:00:00");
    return;
  }
  
  if((isNaN(hour) == true)||(isNaN(minute) == true)||(isNaN(second) == true))
  {
    alert("Apenas números são permitidos.");
    return;
  }
  
  if (hour<0)
  {
    alert("Você não pode usar um número negativo para horas.");
    document.getElementById("timerminute").value="59";
    return;
  }
  
  if ((minute>59)||(minute<0))
  {
    alert("Você não pode usar um número negativo ou maior que 59 para minutos.");
    document.getElementById("timerminute").value="59";
    return;
  }
  
  if ((second>59)||(second<0))
  {
    alert("Você não pode usar um número negativo ou maior que 59 para segundos.");
    document.getElementById("timersecond").value="59";
    return;
  }
  
  document.timergo.startstop.value = "Stop";
  document.timergo.startstop.onclick = timerStop;
  document.timergo.reset.onclick = timerReset;
  document.getElementById("timerhour").disabled = "disabled";
  document.getElementById("timerminute").disabled = "disabled";
  document.getElementById("timersecond").disabled = "disabled";
  totaltime = (parseInt(document.getElementById("timerhour").value * 3600 + document.getElementById("timerminute").value * 60 +  document.getElementById("timersecond").value * 1))*1000;
  begintime = Date.now();
  timer();
}

document.addEventListener("keypress", function(i) {
  if(i.key === 'i') {
  
      var btn = document.querySelector("#start");
    
    timerStart();
  }
});

function timerContinue(){
  document.timergo.startstop.value = "Stop";
  document.timergo.startstop.onclick = timerStop;
  document.timergo.reset.onclick = timerReset;
  totaltime = (parseInt(document.getElementById("timerhour").value * 3600 + document.getElementById("timerminute").value * 60 +  document.getElementById("timersecond").value * 1))*1000;
  begintime = Date.now();
  timer();
}

function timerStop(){
  document.timergo.startstop.value = "Iniciar";
  document.timergo.startstop.onclick = timerContinue;
  document.timergo.reset.onclick = timerReset;
  document.timergo.reset.value = "Novo";
  clearTimeout(timerID);
}

document.addEventListener("keypress", function(p) {
  if(p.key === 'p') {
  
      var btn = document.querySelector("#reset");
    
    timerStop();
  }
});

function timerReset(){
  document.getElementById("timerhour").disabled = false;
  document.getElementById("timerminute").disabled = false;
  document.getElementById("timersecond").disabled = false;
  document.getElementById("timerhour").value = "00";
  document.getElementById("timerminute").value = "00";
  document.getElementById("timersecond").value = "00";
  document.timergo.startstop.value = "Iniciar";
  document.timergo.startstop.onclick = timerStart;
  clearTimeout(timerID);
}

function addHour(){
  var h = parseFloat(document.getElementById("timerhour").value);
  var h1 = h + 1;
  document.getElementById("timerhour").value = h1;
}

function addMinute(){
  var h = parseFloat(document.getElementById("timerminute").value);
  var h1 = 59;
  if (h<59){
    h1 = h + 1;
  }
  document.getElementById("timerminute").value = h1;
}

function addSecond(){
  var h = parseFloat(document.getElementById("timersecond").value);
  var h1 = 59;
  if (h<59){
    h1 = h + 1;
  }
  document.getElementById("timersecond").value = h1;
}

function subHour(){
  var h = parseFloat(document.getElementById("timerhour").value);
  var h1 = h - 1;
  if (h1<0){
    h1 = h;
  }
  document.getElementById("timerhour").value = h1;
}

function subMinute(){
  var h = parseFloat(document.getElementById("timerminute").value);
  var h1 = h - 1;
  if (h1<0){
    h1 = h;
  }
  document.getElementById("timerminute").value = h1;
}

function subSecond(){
  var h = parseFloat(document.getElementById("timersecond").value);
  var h1 = h - 1;
  if (h1<0){
    h1 = h;
  }
  document.getElementById("timersecond").value = h1;
}

function SetTimeSec(newtimesec){
  document.getElementById("timersecond").value = newtimesec;
}

function SetTimeMin(newtimemin){
  document.getElementById("timerminute").value = newtimemin;
}

function SetTimeHour(newtimehora){
  document.getElementById("timerhour").value = newtimehora;
}

function LoadSound(idsound){
  document.getElementById(idsound).load();
}
