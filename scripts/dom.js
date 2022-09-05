export const gamaBoard = document.getElementsByClassName("game-board")[0];
export const nextBlockPreview = document.getElementsByClassName("next-block")[0];
export const body = document.getElementsByTagName("body")[0];
export const boardTiles= []; //wiersz, kolumna
export const nextBlockPreviewTiles= []; //wiersz, kolumna
export const startGameButton = document.getElementsByClassName("start-game-button")[0];
export const enterScreenBackground = document.getElementsByClassName("background")[0];
export const enterScreen = document.getElementsByClassName("info-screen")[0];
export const exitEnterScreenButton = document.getElementsByClassName("info-screen-button")[0];
export const enterScreenText= document.getElementsByClassName("info-screen-text")[0];
export const userScore= document.getElementsByClassName("score")[0];
export const userLevel= document.getElementsByClassName("level")[0];
export const colorChoose = Array.from(document.getElementsByClassName("theme-color"));
export let chosenColor ="red";

//turning off enter screen
exitEnterScreenButton.addEventListener("click", ()=>{
    exitEnterScreenButton.disabled = true;
    enterScreenBackground.style.animation = "disapear 0.4s 0s 1 linear forwards";
    enterScreen.style.animation = "slideLeft 0.4s 0s 1 ease-in-out forwards";
})

//getting which color was clickes
colorChoose.forEach((color)=>{
    color.addEventListener("click", function(){
        chosenColor = color.classList[1].toString();
    })
})

//game board generating
function gameBoardGenerating(){
    for(let i = 0; i<20; i++){
        let tempAr = [];
        for(let j = 0; j<10; j++){
            let newBlock = document.createElement("div");
            newBlock.classList.add("gameblock");
            gamaBoard.appendChild(newBlock);
            tempAr.push(newBlock);
        }
        boardTiles.push(tempAr);
    }
}

//next block preview board generating
function previewGenerating(){
    for(let i = 0; i<4; i++){
        let tempAr = [];
        for(let j = 0; j<3; j++){
            let newBlock = document.createElement("div");
            newBlock.classList.add("gameblock");
            nextBlockPreview.appendChild(newBlock);
            tempAr.push(newBlock);
        }
        nextBlockPreviewTiles.push(tempAr);
    }
}

gameBoardGenerating();
previewGenerating();