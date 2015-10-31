$(document).ready(function() {
  var countDownId, workMin = 25,
    workSec = 0,
    workCircle, breakMin = 5,
    breakSec = 0,
    breakCircle, initialWork = workMin,
    initialBreak = breakMin;

  function loadInitial() {
    workCircle = $("#workCircle");
    workCircle.html(workMin + " : " + (workSec < 10 ? "0" : "") + workSec);
    workCircle.css("pointer-events", "auto");
    workCircle.removeClass("on");
    breakCircle = $("#breakCircle");
    breakCircle.html(breakMin + " : " + (breakSec < 10 ? "0" : "") + breakSec);
    breakCircle.css("pointer-events", "auto");
    breakCircle.removeClass("on");
  }
  loadInitial();

  
  //Actions for the Plus and Minus buttons
  $("#buttonMinusLeft").click(function() {
    if (breakMin != 1) {
      breakCircle.html(breakMin - 1 + " : " + (breakSec < 10 ? "0" : "") + breakSec);
      breakMin--;
    }
  });
  $("#buttonPlusLeft").click(function() {
    breakCircle.html(breakMin + 1 + " : " + (breakSec < 10 ? "0" : "") + breakSec);
    breakMin++;
  });

  $("#buttonMinusRight").click(function() {
    if (workMin != 1) {
      workCircle.html(workMin - 1 + " : " + (workSec < 10 ? "0" : "") + workSec);
      workMin--;
    }
  });
  $("#buttonPlusRight").click(function() {
    workCircle.html(workMin + 1 + " : " + (workSec < 10 ? "0" : "") + workSec);
    workMin++;
  });
  //^^Actions for the Plus and Minus buttons^^

  workCircle.click(function() {
    initialWork = workMin;
    breakCircle.css("pointer-events", "none");
    if (workCircle.hasClass("on")) {
      clearInterval(countDownId);
      workCircle.toggleClass("on");
    } else {
      initialWork = workMin;
      workCircle.toggleClass("on");
      countDownId = setInterval(workCountDown, 100);
    }

  });
  breakCircle.click(function() {
    workCircle.css("pointer-events", "none");
    if (breakCircle.hasClass("on")) {
      clearInterval(countDownId);
      breakCircle.toggleClass("on");
    } else {
      initialBreak = breakMin;
      breakCircle.toggleClass("on");
      countDownId = setInterval(breakCountDown, 100);
    }
  });

  $(".btn-primary").click(function() {
    clearInterval(countDownId);
    countDownId = null;
    breakCircle, workCircle.removeClass("on");
    workMin = initialWork;
    breakMin = initialBreak;
    workSec = 0;
    breakSec = 0;
    loadInitial();
  });

  function workCountDown() {
    if (workMin == 0 && workSec == 0) {
      clearInterval(countDownId);
      workCircle.toggleClass("on");
      breakCircle.toggleClass("on");
      workCircle.html(workMin + " : " + (workSec < 10 ? "0" : "") + workSec);
      workCircle.css("pointer-events", "none");
      breakCircle.css("pointer-events", "auto");
      countDownId = setInterval(breakCountDown, 100);
    } else if (workSec == 0) {
      workCircle.html(workMin-- + " : " + (workSec < 10 ? "0" : "") + workSec);
      workSec += 59;
    } else {
      workCircle.html(workMin + " : " + (workSec < 10 ? "0" : "") + workSec--);
    }
  }

  function breakCountDown() {
    if (breakMin == 0 && breakSec == 0) {
      clearInterval(countDownId);
      breakCircle.toggleClass("on");
      workCircle.toggleClass("on");
      loadInitial();
      breakCircle.html(breakMin + " : " + (breakSec < 10 ? "0" : "") + breakSec);
      breakCircle.css("pointer-events", "none");
      workCircle.css("pointer-events", "auto");
      countDownId = setInterval(workCountDown, 100);
    } else if (breakSec == 0) {
      breakCircle.html(breakMin-- + " : " + (breakSec < 10 ? "0" : "") + breakSec);
      breakSec += 59;
    } else {
      breakCircle.html(breakMin + " : " + (breakSec < 10 ? "0" : "") + breakSec--);
    }
  }

});