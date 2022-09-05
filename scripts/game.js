import { blockClasses } from "./blocks.js";
import * as dom from "./dom.js"

let currentBlock;
let nextBlock;
let fall;
let canEnter = true;
let score = 0;
let level = 0;
let sublevels = 0;
let speed = 500;
let prevSpeed = speed;

const colors = {
    "yellow": {
        pallete: ["#fddd8a", "#fdcf58", "#e3ba4f", "#b1903d", "#7e672c"]
    },
    "blue": {
        pallete: ["#62c4ea", "#1face2", "#1889b4", "#126787", "#093343"]
    },
    "red": {
        pallete: ["#ca716c", "#b02a23", "#971109", "#750d07", "#540905"]
    }
}

//add steering
dom.body.addEventListener("keydown", steering);

//steering
function steering(event){;
    if(canEnter){
        canEnter = false;
        clearInterval(fall);
        switch(event.keyCode){
            case 37:                
                currentBlock.move(-1);
                break;
            case 38:
                currentBlock.rotate(1);
                break;
            case 39:
                currentBlock.move(1);
                break;
            case 40:
                prevSpeed = speed;
                speed = 10;
                break;
        }
        setTimeout(steps, 100);
    }
}

//add starting game
dom.startGameButton.addEventListener("click", function(e){
    e.stopPropagation();
    startGame();
    dom.startGameButton.disabled = "true";
})

function startGame(){
    drawBlocks();
    steps();
}

function steps(){
    canEnter = true;
    fall = setInterval(blockFalling, speed);
}

//blocks falling
function blockFalling(){
    let doFall = 0;
    for(let i = 0; i< 4; i++){  
        if(currentBlock.blocks[i][0] + 1 < 0) doFall++;
        if(currentBlock.blocks[i][0] + 1 >= 0){
            if(currentBlock.blocks[i][0] + 1 <= 19){
                if(!dom.boardTiles[currentBlock.blocks[i][0] + 1][currentBlock.blocks[i][1]].classList.contains("taken")) doFall++;
            }
        }        
    }
    if(doFall == 4){
        for(let i = 0; i<4; i++){
            if(currentBlock.blocks[i][0] >= 0){
                dom.boardTiles[currentBlock.blocks[i][0]][currentBlock.blocks[i][1]].style.backgroundColor = "white";               
            }
            currentBlock.blocks[i][0] += 1;
        }
        for(let i = 0; i<4; i++){
            if(currentBlock.blocks[i][0] >= 0){
                dom.boardTiles[currentBlock.blocks[i][0]][currentBlock.blocks[i][1]].style.backgroundColor = currentBlock.color;
            }
        }
    }
    else{
        speed = prevSpeed;
        let doContinues = true;
        clearInterval(fall);
        for(let i = 0; i<4; i++){
            if(currentBlock.blocks[i][0] < 0){
                doContinues = false;
            }
            else {
                dom.boardTiles[currentBlock.blocks[i][0]][currentBlock.blocks[i][1]].classList.add("taken");
           }
        }   
        if(doContinues){
            checkIsRowCompleted();
            startGame();
        }
        else endGame();
    }
}

//end screen
function endGame(){
    dom.enterScreenText.innerHTML = `You lost.<br>Your score is: ${score}`;
    dom.exitEnterScreenButton.innerHTML = `Play again.`;
    dom.exitEnterScreenButton.addEventListener("click", ()=>{
        window.location.reload(true);
    })
    dom.exitEnterScreenButton.disabled = false;
    dom.enterScreenBackground.style.animation = "apear 0.4s 0s 1 linear forwards";
    dom.enterScreen.style.animation = "slideRight 0.4s 0s 1 ease-in-out forwards";                  
}

//checking if one of rows is completed and can be cleared
function checkIsRowCompleted(){
    let rowsToClear = [];
    for(let i = 0; i<=19; i++){
        let isCompleted = true;
        for(let j = 0; j < 10; j++){
            if(!dom.boardTiles[i][j].classList.contains("taken")){
                isCompleted = false;
                break;
            }
        }
        if(isCompleted){
            rowsToClear.push(i);
        }
    }
    for(let i = 0; i<rowsToClear.length; i++){
        for(let j = 0; j<10;j++){
            dom.boardTiles[rowsToClear[i]][j].classList.remove("taken");
            dom.boardTiles[rowsToClear[i]][j].style.backgroundColor = "white";
        }
        for(let j = rowsToClear[i]; j > 0; j--){
            for(let a = 0; a< 10; a++){
                dom.boardTiles[j][a].classList.remove("taken");
                dom.boardTiles[j][a].style.backgroundColor = dom.boardTiles[j - 1][a].style.backgroundColor;
                if(dom.boardTiles[j - 1][a].classList.contains("taken"))dom.boardTiles[j][a].classList.add("taken");
                dom.boardTiles[j - 1][a].classList.remove("taken");
                dom.boardTiles[j - 1][a].style.backgroundColor = "white";
            }            
        }
        sublevels++;
        speed -=5;
    }  
    level = Math.floor(sublevels/10) + 1;              
    if(rowsToClear.length == 1) score += level * 40;
    if(rowsToClear.length == 2) score += level * 100;
    if(rowsToClear.length == 3) score += level * 300;
    if(rowsToClear.length == 4) score += level * 1200;    
    dom.userLevel.innerHTML = `${level - 1}`;
    dom.userScore.innerHTML = `${score}`;
}

//drawing a block
function drawBlocks(){
    if(!nextBlock) currentBlock = new blockClasses[Math.floor(Math.random() * blockClasses.length)](colors[dom.chosenColor].pallete[Math.floor(Math.random()*5)]);
    else currentBlock = nextBlock;
    nextBlock = new blockClasses[Math.floor(Math.random() * blockClasses.length)](colors[dom.chosenColor].pallete[Math.floor(Math.random()*5)]);
    addPreviewSight(nextBlock);
}

//adding a block to preview
function addPreviewSight(nextBlock){
    for(let i = 0; i<4; i++){
        for(let j = 0; j<3; j++){
            dom.nextBlockPreviewTiles[i][j].style.backgroundColor = "white";
        }            
    }
    nextBlock.previewBlocks.forEach((el) => dom.nextBlockPreviewTiles[el[0]][el[1]].style.backgroundColor = nextBlock.color);
}