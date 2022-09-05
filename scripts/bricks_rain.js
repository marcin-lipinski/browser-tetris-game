const brickImage = ["images/T.png", "images/I.png", "images/J.png", "images/L.png", "images/O.png", "images/S.png", "images/Z.png"];
const bricksDropContainer = document.getElementsByClassName("bricks-drop-container")[0];

function renderBrick(bricksDropContainer){
    const brickContainer = document.createElement("div");
    const img = document.createElement("img");
    brickContainer.classList.add("brick-container");
        
    brickContainer.style.left = `${Math.random()*100}%`;    
    
    brickContainer.style.animation = `fall ${(Math.random() * 6) + 15}s 0s 1 linear forwards`;
    img.src = brickImage[Math.floor(Math.random() * brickImage.length)];
    img.style.animation = `rotate 15s 0s infinite linear forwards`;
    img.style.transform = `scale(${Math.random()})`;

    brickContainer.appendChild(img);
    bricksDropContainer.appendChild(brickContainer);
    setTimeout(removeDiv, 21000, brickContainer);
    setTimeout(renderBrick, 1000, bricksDropContainer);
}


function removeDiv(div){
    bricksDropContainer.removeChild(div)
}
renderBrick(bricksDropContainer);