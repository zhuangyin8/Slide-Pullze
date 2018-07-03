//移动的步数
var steps = 0;
//秒钟数
var sec = "00";
//分钟数
var min = 0;
var seconds;
var minutes;
var div_sec = document.getElementById("sec");
var div_min = document.getElementById("min");

function startTimer() {
  /**
   * setInterval() 方法重复调用一个函数或执行一个代码段，在每次调用之间具有固定的时间延迟。
   * 返回一个 intervalID。
   * let intervalID = window.setInterval(func, delay);
   * intervalID 是此重复操作的唯一辨识符，可以作为参数传给clearInterval()
   * func 是你想要重复调用的函数。
   */
  //每一秒,秒钟自增一
  seconds = window.setInterval(secTimer, 1000);
  //每六十秒,分钟自增一
  minutes = window.setInterval(minTimer, 60000);
}

//秒钟自增1
function secTimer() {
  sec++; //秒钟自增1

  if (sec < 10) {
    //当秒钟小于 10,秒钟数前加 0
    sec = "0" + sec;
  } else if (sec > 59) {
    //当秒钟大于 59,秒钟归零
    sec = "0" + 0;
  }
  div_sec.innerHTML = sec; //写入秒钟数
}

//分钟增1
function minTimer() {
  min++; //分钟增1
  div_min.innerHTML = min; //写入分钟数
}

//清除定时器
function clearTimer() {
  /**
   * 取消用setInterval设置的重复定时任务。
   * window.clearInterval(intervalID)
   * intervalID是你想要取消的定时器的ID,这个ID是个整数,是由setInterval()返回的.
   */
  window.clearInterval(seconds);
  window.clearInterval(minutes);
}

// 重置时间为 0:00
function resetTimer() {
  sec = "00"; // 变量值置为零
  min = 0;
  div_sec.innerHTML = "00"; // 页面显示置为零
  div_min.innerHTML = 0;
}

//获取九宫格
var numbers = document.getElementsByClassName("numbers");

function change(x, left, up, right, down, left2, up2, right2, down2) {
  var id = x;
  if (left == true && verIfEmpty(id - 1) == true) {
    changeContent(id, id - 1);
  } else if (left2 == true && verIfEmpty(id - 2) == true) {
    changeContent(id - 1, id - 2);
    changeContent(id, id - 1);
  } else if (up == true && verIfEmpty(id - 3) == true) {
    changeContent(id, id - 3);
  } else if (up2 == true && verIfEmpty(id - 6) == true) {
    changeContent(id - 3, id - 6);
    changeContent(id, id - 3);
  } else if (right == true && verIfEmpty(id + 1) == true) {
    changeContent(id, id + 1);
  } else if (right2 == true && verIfEmpty(id + 2) == true) {
    changeContent(id + 1, id + 2);
    changeContent(id, id + 1);
  } else if (down == true && verIfEmpty(id + 3) == true) {
    changeContent(id, id + 3);
  } else if (down2 == true && verIfEmpty(id + 6) == true) {
    changeContent(id + 3, id + 6);
    changeContent(id, id + 3);
  }
  steps++;
}

//确认九宫格是否存在空格
function verIfEmpty(x) {
  return document.getElementById(x).innerHTML === "";
}

//改变内容
function changeContent(x, y) {
  var m = document.getElementById(x);
  var n = document.getElementById(y);
  n.innerHTML = m.innerHTML;
  m.innerHTML = "";
  win();
  showScore();
  ok();
}

/****************************************
 this random generator I found on internet
 ****************************************/

function randomGenerator(low, high) {
  if (arguments.length < 2) {
    high = low;
    low = 0;
  }
  this.low = low;
  this.high = high;
  this.reset();
}

randomGenerator.prototype = {
  reset: function() {
    this.remaining = [];
    for (var i = this.low; i <= this.high; i++) {
      this.remaining.push(i);
    }
  },
  get: function() {
    if (!this.remaining.length) {
      this.reset();
    }
    var index = Math.floor(Math.random() * this.remaining.length);
    var val = this.remaining[index];
    this.remaining.splice(index, 1);
    return val;
  }
};

/**************************************
 write the random numbers in the puzzle
 **************************************/

function getNum() {
  var randomNoRepeatNumbers = new randomGenerator(0, 8);
  for (var i = 1; i <= 9; i++) {
    var newNumbers = document.getElementById(i);
    newNumbers.innerHTML = randomNoRepeatNumbers.get();
  }
  for (var i in numbers) {
    if (numbers[i].innerHTML == 0) {
      numbers[i].innerHTML = "";
    }
  }
  steps = 0;
  showScore();
  verifArray();
  clearTimer();
  resetTimer();
  startTimer();
  ok();
}

/*****************************************
 Thank you Nikolay Nachev for this function
 *****************************************/

function win() {
  var time = min + ":" + sec;
  var win = true;
  for (var i in numbers) {
    if (numbers[i].innerHTML != numbers[i].id) {
      if (numbers[i].id != numbers.length) {
        win = false;
        break;
      }
    }
  }
  if (win) {
    clearTimer();

    navigator.vibrate(500);

    function showAlert() {
      alert(
        " YOU WIN!\n You made " +
          steps +
          " moves\n Your time is " +
          min +
          " min. and " +
          sec +
          " sec."
      );
    }

    setTimeout(showAlert, 1000);
    document.getElementById("9").innerHTML = "9";
  }
}

function showScore() {
  document.getElementById("score").innerHTML = "MOVES = " + steps;
}

function verifArray() {
  var count = 0;
  var arrayNum = [];
  for (var i = 1; i <= 9; i++) {
    arrayNum[i - 1] = document.getElementById(i).innerHTML;
  }

  for (var i = 0; i <= arrayNum.length - 1; i++) {
    for (var n = i + 1; n <= arrayNum.length - 1; n++) {
      if (arrayNum[i] > arrayNum[n] && arrayNum[n] != 0) {
        count++;
      }
    }
  }
  if (count % 2 != 0) {
    getNum();
  }
}

function ok() {
  for (var i = 1; i < 10; i++) {
    var x = document.getElementById(i);
    if (x.innerHTML == i) {
      x.style.color = "#15b1f3";
    } else {
      x.style.color = "#e95142";
    }
  }
}
