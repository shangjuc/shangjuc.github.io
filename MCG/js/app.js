var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector(".header");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init(){
    //mode buttons event listners
    setupModeButtons();
    setupSquares();
    reset();
}

function setupModeButtons(){
    for(var i = 0; i < modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function(){
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "簡單" ? numSquares = 3: numSquares = 6;
            reset();
        })
    }
}

function setupSquares(){
    for(var i = 0; i < squares.length; i++){
        //add click listeners to square
        squares[i].addEventListener("click", function(){
            //grab color of clicked square
            var clickedColor = this.style.backgroundColor;
            //compare color to the pickedcolor
            if(clickedColor === pickedColor){
                messageDisplay.textContent = "啊不就好棒棒?"
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;                       
                resetButton.textContent = "再玩一次";
            }
            else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "嫩!"
            }
        });
    }
}

function reset(){
    colors = generateRandomColors(numSquares);
    //pick a new random color from array
    pickedColor = pickColor();
    //change colorDisplay to match picked Color
    colorDisplay.textContent = pickedColor;
    resetButton.textContent = "重新開始";
    messageDisplay.textContent = "";
    //change colors of squares
    for(var i = 0; i < squares.length; i++){
        if(colors[i]){
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];   
        } else {
            squares[i].style.display = "none";
        }
    }
    h1.style.backgroundColor = "steelblue";
}

resetButton.addEventListener("click", function(){
    reset();
})

function changeColors(color){
    //loop through all squares
    for(var i=0; i<squares.length; i++){
        //change each to match given color
        squares[i].style.backgroundColor = color;
    }
}

function pickColor(){
    var random = Math.floor(Math.random() * colors.length)
    return colors[random];
}

function generateRandomColors(num){
    //make an array
    var arr = []
    for(var i=0; i<num; i++){
        //get random color and push into arr
        arr.push(randomColor())
    }
    //add num random colors to array
    //return the array
    return arr;
}


function randomColor(){
    //pick a "red" from 0-255
    var r = Math.floor(Math.random() * 256)
    //pick a "green" from 0-255
    var g = Math.floor(Math.random() * 256)
    //pick a "blue" from 0-255
    var b = Math.floor(Math.random() * 256)
    // "rgb(r, g, b)"
    return "rgb(" + r + ", " + g + ", " + b + ")";
}