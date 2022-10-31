let player = 'X';
let gameOver = false;


//Changing Player
const changeplayer = () => {
    return player === 'X' ? "0":"X";
}


//To check who won
const checkwon = () => {
    let boxtext = document.getElementsByClassName("boxText");
     let winpos = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6], 
        [1,4,7],
        [2,5,8],
        [0,4,8], 
        [2,3,6]
     ]

     winpos.forEach(element=>{
        if(boxtext[element[0]].innerHTML===boxtext[element[1]].innerHTML && boxtext[element[1]].innerHTML===boxtext[element[2]].innerHTML && boxtext[element[0]].innerHTML!==""){
                document.getElementById("winner").innerHTML=boxtext[element[0]].innerHTML;
                gameOver=true;
                document.getElementById("winimg").style.display = "block";
                // document.getElementById("grid").style.visibility = "hidden";
            }
     })
}


//Changing Player X or O
let boxes = document.getElementsByClassName("box");


Array.from(boxes).forEach(box=>{
    let boxText = box.querySelector(".boxText");
     
    box.addEventListener("click", ()=>{
        if(boxText.innerHTML===""&& !gameOver){
        boxText.innerHTML= player;
        player = changeplayer();
        checkwon();
        document.getElementsByClassName("player")[0].innerHTML=player;
      }
    })
})


//reset button

let reset = document.getElementsByClassName("reset")[0];

reset.addEventListener("click",()=>{
    let boxText = document.querySelectorAll(".boxText");
    boxText.forEach(boxText=>{
        boxText.innerHTML="";
    })
    player='X';
    document.getElementById("winner").innerHTML='None';
    document.getElementById("winimg").style.display = "none";
    gameOver=false;

})