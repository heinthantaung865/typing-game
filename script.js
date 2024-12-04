let letters = ["a","b","c","d","e","f",
                "g","h","i","j","k","l",
                "m","n","o","p","q","r",
                "s","t","u","v","w",
                "x","y","z"];
let lettersCnt = 0;
let userTypedLetterCnt = 0;
let word = "";
let userTypedWord = "";
let correctWord = 0;
let missWord = 0;
let time = 0;

function play(){
    deleteDifficultyBox();
    checkDifficulty();
    startGame();
}
function startGame(){
    makeWord();
    calculateWPM();
}

//create a word that has lettersCnt
function makeWord(){
    for (let index = 0; index < lettersCnt; index++) {
        let random = Math.floor(Math.random()*letters.length);
        word += letters[random];
        document.getElementsByClassName("word")[0].innerHTML = word;
    }
    console.log(word);
}
function checkWord(e) {
    let btns = document.getElementsByClassName("letter");
    for (let index = 0; index < btns.length; index++) {
        btns[index].style.color = "black";
        btns[index].style.backgroundColor = "white"
    }
    if(letters.includes(e.key)){
        userTypedWord += e.key;
        //show userTypedWord
        document.getElementsByClassName("userTypedWord")[0].innerHTML += `<span class="character">${e.key}</span>`;
        document.getElementById(e.key).style.color = "white";
        document.getElementById(e.key).style.background = "salmon";
        userTypedLetterCnt++;
    }
    //check if userTypedWord and word are the same
    if (userTypedLetterCnt % lettersCnt == 0){
        if(userTypedWord == word){
            correctWord++;
            document.getElementsByClassName("correctWord")[0].innerHTML = "Correct Word: " + correctWord;
            resetWords();
            makeWord();   
        } else {
            missWord++;
            document.getElementsByClassName("missWord")[0].innerHTML = "Miss Word: " + missWord;
            userTypedWord = "";
            document.getElementsByClassName("userTypedWord")[0].innerHTML = "";
        }
    }
}
window.addEventListener("keypress", checkWord);

function resetWords(){
    word = "";
    userTypedWord = "";
    document.getElementsByClassName("userTypedWord")[0].innerHTML = "";
}

function calculateWPM(){
        setInterval(function (){
        time++;
        timeInMin = time/60;
        let grossWPM = (userTypedLetterCnt / 5) / timeInMin;
        let netWPM = grossWPM - (missWord / timeInMin);
        document.getElementsByClassName("wpm")[0].innerHTML = "WPM: "+ parseInt(netWPM);
    },1000)
}
function checkDifficulty() {
    let selected = document.querySelector("input[name = 'level']:checked").value; 
    if (selected == "easy"){
        lettersCnt = 3;
    } else if (selected == "medium"){
        lettersCnt = 7;
    } else if (selected == "hard"){
        lettersCnt = 10;
    }
}
function deleteDifficultyBox(){
    document.getElementsByClassName("container")[0].style.display = "block";
    document.getElementsByClassName("container2")[0].style.display = "none";
}
