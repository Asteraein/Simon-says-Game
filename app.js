let gameSeq=[];
let userSeq=[];

let btns = ["yellow", "purple", "red", "green"]

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress",function(){
  if (started == false){
    console.log("game is started");
    started = true;

   levelUP();
  }
});

function gameFlash(btn) {
    btn.classList.add("flash");       //added a class.. bg-color changes to white because game is started user didnt pressed btn for 1st flash
    setTimeout( function(){
        btn.classList.remove("flash");  //after the flash , we remove the class
    }, 250);
  }

  function userFlash(btn) {
    btn.classList.add("userFlash");       //added a class.. bg-color changes to blue when user press the btn
    setTimeout( function(){
        btn.classList.remove("userFlash");  //after the flash , we remove the class
    }, 250);
  }

function levelUP(){
    userSeq = [];      //jese hi level update hota h , userSeq empty hojayega taki user ko starting se saari value dalni ho
    level++;                         //to update the level by 1
    h2.innerText = `Level ${level}` ; //after update of the level, h2 shows the updated level
    
    let randIdx = Math.floor(Math.random() * 3);  //to chose random index of btn array
    let randColor = btns[randIdx]      //the btn that came, we choose that btn class
    let randBtn = document.querySelector(`.${randColor}`);
    
    gameSeq.push(randColor);   //jese hi random color generete ho jayega..gameSeq me vo color add ho jayega
    console.log(gameSeq);
    gameFlash(randBtn); //random btn choose
}

function checkAns(idx) {
  //console.log("current level is", level);
  

  if (userSeq[idx] === gameSeq[idx]) {
    if(userSeq.length == gameSeq.length) {    //jese hi user utne color click kr denge jitne gameSeq m h , thn levelUp wale function ko call kr denge
      setTimeout(levelUP, 1000);       //nextcolor flash hone m 1 sec ka timeout daal diya, if same color flash ho nxt time toh dikh jaye
    }
    console.log("same value");
  } else {
    h2.innerHTML =`Game Over! Your Score was <b> ${level}</b> <br> press any key to start`;
    document.querySelector("body").style.backgroundColor = "red";  //when game is over screen will become red 
    setTimeout(function() {
      document.querySelector("body").style.backgroundColor = "white"; //we dont want it to be red whole time so resets color to white
    })
    reset();
  }
}

function btnPress() {
  
   let btn = this;
   userFlash(btn);     //after pressing btn , we want to userflash button because user pressed it 

   userColor = btn.getAttribute("id");  //jo color user ne press kiya uski id aa jayegi , phir us color ko hum print krwa lenge
   userSeq.push(userColor);  //jo color aaya vo hum userseq m push kr denge

   checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);   //saare btn pe btnPress is added as a callback
}

function reset () {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}