export const gameBoard = document.getElementsByClassName("game-board")[0];
export const nextBlockPreview = document.getElementsByClassName("next-block")[0];
export const body = document.getElementsByTagName("body")[0];
export const boardTiles= [];
export const nextBlockPreviewTiles= [];
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

//getting which color was clicked
colorChoose.forEach((color)=>{
    color.addEventListener("click", function(){
        chosenColor = color.classList[1].toString();
    })
})

//generating main board and nextBlock board function
function boardGenerating(rows, columns, type, section){
    for(let i = 0; i<rows; i++){
        let tempAr = [];
        for(let j = 0; j<columns; j++){
            let newBlock = document.createElement("div");
            newBlock.classList.add("gameblock");
            type.appendChild(newBlock);
            tempAr.push(newBlock);
        }
        section.push(tempAr);
    }
}

boardGenerating(20, 10, gameBoard, boardTiles); //game board generating
boardGenerating(4, 3, nextBlockPreview, nextBlockPreviewTiles); //next block preview board generating