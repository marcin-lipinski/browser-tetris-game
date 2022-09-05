import {boardTiles} from "./dom.js";

function canMove(blocks, dir){
    for(let i = 0; i< 4; i++){
        if(blocks[i][1] + dir < 0 || blocks[i][1] + dir > 9) return false;
        if(blocks[i][0] >= 0 ) if(boardTiles[blocks[i][0]][blocks[i][1] + dir].classList.contains("taken")) return false;    
    }
    return true;
}

function checkIsRotationPossible(arr){
    for(let i = 0; i<4; i++){
        if(arr[i][0] > 19) return false;
        if(arr[i][1] < 0 || arr[i][1] > 9) return false;
        if(arr[i][0] >= 0) if(boardTiles[arr[i][0]][arr[i][1]].classList.contains("taken")) return false;
    }
    return true;
}

function rotationConfirmed(prev, next, color){
    
    for(let i = 3; i>=0;i--){
        if(prev[i][0] >= 0) boardTiles[prev[i][0]][prev[i][1]].style.backgroundColor = "white";        
    }
    
    for(let i = 0; i<4;i++){
        if(next[i][0] >= 0) boardTiles[next[i][0]][next[i][1]].style.backgroundColor = color;
    }
}

class brick{
    constructor(color){
        this.color = color;
        this.positions = ["up", "left", "down", "right"];
        this.position = 0;
    }
    move(dir){
        if(canMove(this.blocks, dir)){
            for(let i =0 ;i<4;i++){
                if(this.blocks[i][0] >= 0) boardTiles[this.blocks[i][0]][this.blocks[i][1]].style.backgroundColor = "white";
                this.blocks[i][1] += dir;
            }
            for(let i =0 ;i<4;i++){
                if(this.blocks[i][0] >= 0)boardTiles[this.blocks[i][0]][this.blocks[i][1]].style.backgroundColor = this.color;
            }
        }
    }
    rotate(dir){
        let temp = this.findNext(dir, this.positions[this.position]);
        if(checkIsRotationPossible(temp)){
            rotationConfirmed(this.blocks, temp, this.color);
            this.blocks = temp;
            this.position = (this.position + dir) % 4;
            if(this.position == -1 )this.position = 3;
        }        
    }
}

class I extends brick{
    constructor(color){
        super(color);
        this.blocks = [[-1, 5], [-2, 5], [-3, 5], [-4, 5]];
        this.previewBlocks = [[3, 1], [2, 1], [1, 1], [0, 1]];
    }
    findNext(dir, position){
        if(dir == 1 && position == "up" || dir == -1 && position == "right") return [[this.blocks[0][0], this.blocks[0][1]], [this.blocks[1][0] + 1, this.blocks[1][1] - 1], [this.blocks[2][0] + 2, this.blocks[2][1] - 2], [this.blocks[3][0] + 3, this.blocks[3][1] - 3]];
        if(dir == 1 && position == "left" || dir == -1 && position == "up") return [[this.blocks[0][0], this.blocks[0][1]], [this.blocks[1][0] + 1, this.blocks[1][1] + 1], [this.blocks[2][0] + 2, this.blocks[2][1] + 2], [this.blocks[3][0] + 3, this.blocks[3][1] + 3]];
        if(dir == 1 && position == "down" || dir == -1 && position == "left") return [[this.blocks[0][0], this.blocks[0][1]], [this.blocks[1][0] - 1, this.blocks[1][1] + 1], [this.blocks[2][0] - 2, this.blocks[2][1] + 2], [this.blocks[3][0] - 3, this.blocks[3][1] + 3]];
        if(dir == 1 && position == "right" || dir == -1 && position == "down") return [[this.blocks[0][0], this.blocks[0][1]], [this.blocks[1][0] - 1, this.blocks[1][1] - 1], [this.blocks[2][0] - 2, this.blocks[2][1] - 2], [this.blocks[3][0] - 3, this.blocks[3][1] - 3]];
    }
}

class T extends brick{
    constructor(color){
        super(color);
        this.blocks = [[-1, 5], [-2, 4], [-2, 5], [-2, 6]];
        this.previewBlocks = [[3, 1], [2, 0], [2, 1], [2, 2]];
    }
    findNext(dir, position){
        if(dir == 1 && position == "up" || dir == -1 && position == "right") return [[this.blocks[0][0] - 1, this.blocks[0][1] + 1], [this.blocks[1][0] + 1, this.blocks[1][1] + 1], [this.blocks[2][0], this.blocks[2][1]], [this.blocks[3][0] - 1, this.blocks[3][1] - 1]];
        if(dir == 1 && position == "left" || dir == -1 && position == "up") return [[this.blocks[0][0] - 1, this.blocks[0][1] - 1], [this.blocks[1][0] - 1, this.blocks[1][1] + 1], [this.blocks[2][0], this.blocks[2][1]], [this.blocks[3][0] + 1, this.blocks[3][1] - 1]];
        if(dir == 1 && position == "down" || dir == -1 && position == "left") return [[this.blocks[0][0] + 1, this.blocks[0][1] - 1], [this.blocks[1][0] - 1, this.blocks[1][1] - 1], [this.blocks[2][0], this.blocks[2][1]], [this.blocks[3][0] + 1, this.blocks[3][1] + 1]];
        if(dir == 1 && position == "right" || dir == -1 && position == "down") return [[this.blocks[0][0] + 1, this.blocks[0][1] + 1], [this.blocks[1][0] + 1, this.blocks[1][1] - 1], [this.blocks[2][0], this.blocks[2][1]], [this.blocks[3][0] - 1, this.blocks[3][1] + 1]];
    }
}

class O extends brick{
    constructor(color){
        super(color);
        this.blocks = [[-1, 4], [-1, 5], [-2, 4], [-2, 5]];
        this.previewBlocks = [[3, 1], [2, 1], [3, 2], [2, 2]];
    }
    rotate(dir){}
}

class L extends brick{
    constructor(color){
        super(color);
        this.blocks = [[-1, 5], [-1, 4], [-2, 4], [-3, 4]];
        this.previewBlocks = [[3, 1], [2, 1], [1, 1], [3, 2]];
    }
    findNext(dir, position){
        if(dir == 1 && position == "up" || dir == -1 && position == "right") return [[this.blocks[0][0] - 1, this.blocks[0][1] - 1], [this.blocks[1][0], this.blocks[1][1]], [this.blocks[2][0] + 1, this.blocks[2][1] - 1], [this.blocks[3][0] + 2, this.blocks[3][1] - 2]];
        if(dir == 1 && position == "left" || dir == -1 && position == "up") return [[this.blocks[0][0] + 1, this.blocks[0][1] - 1], [this.blocks[1][0], this.blocks[1][1]], [this.blocks[2][0] + 1, this.blocks[2][1] + 1], [this.blocks[3][0] + 2, this.blocks[3][1] + 2]];
        if(dir == 1 && position == "down" || dir == -1 && position == "left") return [[this.blocks[0][0] + 1, this.blocks[0][1] + 1], [this.blocks[1][0], this.blocks[1][1]], [this.blocks[2][0] - 1, this.blocks[2][1] + 1], [this.blocks[3][0] - 2, this.blocks[3][1] + 2]];
        if(dir == 1 && position == "right" || dir == -1 && position == "down") return [[this.blocks[0][0] - 1, this.blocks[0][1] + 1], [this.blocks[1][0], this.blocks[1][1]], [this.blocks[2][0] - 1, this.blocks[2][1] - 1], [this.blocks[3][0] - 2, this.blocks[3][1] - 2]];
    }
}

class J extends brick{
    constructor(color){
        super(color);
        this.blocks = [[-1, 4], [-1, 5], [-2, 5], [-3, 5]];
        this.previewBlocks = [[3, 1], [3, 2], [2, 2], [1, 2]];
    }
    findNext(dir, position){
        if(dir == 1 && position == "up" || dir == -1 && position == "right") return [[this.blocks[0][0] + 1, this.blocks[0][1] + 1], [this.blocks[1][0], this.blocks[1][1]], [this.blocks[2][0] + 1, this.blocks[2][1] - 1], [this.blocks[3][0] + 2, this.blocks[3][1] - 2]];
        if(dir == 1 && position == "left" || dir == -1 && position == "up") return [[this.blocks[0][0] - 1, this.blocks[0][1] + 1], [this.blocks[1][0], this.blocks[1][1]], [this.blocks[2][0] + 1, this.blocks[2][1] + 1], [this.blocks[3][0] + 2, this.blocks[3][1] + 2]];
        if(dir == 1 && position == "down" || dir == -1 && position == "left") return [[this.blocks[0][0] - 1, this.blocks[0][1] - 1], [this.blocks[1][0], this.blocks[1][1]], [this.blocks[2][0] - 1, this.blocks[2][1] + 1], [this.blocks[3][0] - 2, this.blocks[3][1] + 2]];
        if(dir == 1 && position == "right" || dir == -1 && position == "down") return [[this.blocks[0][0] + 1, this.blocks[0][1] - 1], [this.blocks[1][0], this.blocks[1][1]], [this.blocks[2][0] - 1, this.blocks[2][1] - 1], [this.blocks[3][0] - 2, this.blocks[3][1] - 2]];
    }
}

class S extends brick{
    constructor(color){
        super(color);
        this.blocks = [[-1, 4], [-1, 5], [-2, 5], [-2, 6]];
        this.previewBlocks = [[3, 0], [3, 1], [2, 1], [2, 2]];
    }
    findNext(dir, position){
        if(dir == 1 && position == "up" || dir == -1 && position == "right") return [[this.blocks[0][0] + 1, this.blocks[0][1] + 1], [this.blocks[1][0], this.blocks[1][1]], [this.blocks[2][0] + 1, this.blocks[2][1] - 1], [this.blocks[3][0], this.blocks[3][1] - 2]];
        if(dir == 1 && position == "left" || dir == -1 && position == "up") return [[this.blocks[0][0] - 2, this.blocks[0][1] + 1], [this.blocks[1][0] - 1, this.blocks[1][1]], [this.blocks[2][0], this.blocks[2][1] + 1], [this.blocks[3][0] + 1, this.blocks[3][1]]];
        if(dir == 1 && position == "down" || dir == -1 && position == "left") return [[this.blocks[0][0], this.blocks[0][1] - 2], [this.blocks[1][0] + 1, this.blocks[1][1] - 1], [this.blocks[2][0], this.blocks[2][1]], [this.blocks[3][0] + 1, this.blocks[3][1] + 1]];
        if(dir == 1 && position == "right" || dir == -1 && position == "down") return [[this.blocks[0][0] + 1, this.blocks[0][1]], [this.blocks[1][0], this.blocks[1][1] + 1], [this.blocks[2][0] - 1, this.blocks[2][1]], [this.blocks[3][0] - 2, this.blocks[3][1] + 1]];
    }
}

class Z extends brick{
    constructor(color){
        super(color);
        this.blocks = [[-1, 5], [-1, 4], [-2, 4], [-2, 3]];
        this.previewBlocks = [[3, 1], [3, 2], [2, 0], [2, 1]];
    }
    findNext(dir, position){
        if(dir == 1 && position == "up" || dir == -1 && position == "right") return [[this.blocks[0][0] - 1, this.blocks[0][1] - 1], [this.blocks[1][0], this.blocks[1][1]], [this.blocks[2][0] + 1, this.blocks[2][1] - 1], [this.blocks[3][0] + 2, this.blocks[3][1]]];
        if(dir == 1 && position == "left" || dir == -1 && position == "up") return [[this.blocks[0][0], this.blocks[0][1] - 1], [this.blocks[1][0] - 1, this.blocks[1][1]], [this.blocks[2][0], this.blocks[2][1] + 1], [this.blocks[3][0] - 1, this.blocks[3][1] + 2]];
        if(dir == 1 && position == "down" || dir == -1 && position == "left") return [[this.blocks[0][0] + 2, this.blocks[0][1]], [this.blocks[1][0] + 1, this.blocks[1][1] - 1], [this.blocks[2][0], this.blocks[2][1]], [this.blocks[3][0] - 1, this.blocks[3][1] - 1]];
        if(dir == 1 && position == "right" || dir == -1 && position == "down") return [[this.blocks[0][0] - 1, this.blocks[0][1] + 2], [this.blocks[1][0], this.blocks[1][1] + 1], [this.blocks[2][0] - 1, this.blocks[2][1]], [this.blocks[3][0], this.blocks[3][1] - 1]];
    }
}

export const blockClasses = [I, T, O, L, J, S, Z];