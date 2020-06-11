import { Tile } from "./tile.js";

let tileArray = [[],[],[],[]];
const tileContainer = document.getElementById("tile-container");
document.querySelector(".reset-button").addEventListener("click", resetTileGrid)
let gameOver = false;

initialisation();


function initialisation(){
    createStarterTiles();
}

function createStarterTiles(){
    //find grid array and find 2 random empty tiles
    let randomNum1 = randomNumberGenerator(0,15);
    let randomNum2 = randomNumberGenerator(0,15);

    while (randomNum2 === randomNum1) {
        randomNum2 = randomNumberGenerator(0,15);
    }

    let randomCoords1 = getXandYCoordFromInt(randomNum1);
    let randomCoords2 = getXandYCoordFromInt(randomNum2);

    createNewTile(2, randomCoords1[0], randomCoords1[1], false);
    createNewTile(2, randomCoords2[0], randomCoords2[1], false);
    renderGrid();
}

function randomNumberGenerator(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getXandYCoordFromInt(numLocation) {
    let xCoord = Math.floor(numLocation/4);
    let yCoord = numLocation % 4; 
    return [xCoord, yCoord];
}

function getIntFromXandYCoord(xCoord, yCoord) {
    let int = (4*xCoord)+yCoord;
    return int;
}

//function to add grid
function createNewTile(value, positionX, positionY, isEmpty) {
    let newTile = new Tile(value, positionX, positionY, isEmpty);
    addTileToGridArray(newTile)
}

function addTileToGridArray(tile){
    tileArray[tile.xCoord][tile.yCoord] = tile;
}

function removeTileFromGrid(tile){
    tileArray[tile.xCoord].splice(tile.yCoord, 1);
}

function resetTileGrid(){
    gameOver = false;
    tileArray = [[],[],[],[]];
    createStarterTiles();
}

function moveTilesInGrid(array1, array2, array3, array4, direction){
    let sortedArray1 = [...array1].sort();
    let sortedArray2 = [...array2].sort();
    let sortedArray3 = [...array3].sort();
    let sortedArray4 = [...array4].sort();
    let gridArray1 = [];
    let gridArray2 = [];
    let gridArray3 = [];
    let gridArray4 = [];

    sortedArray1 = mergeTiles(sortedArray1);
    sortedArray2 = mergeTiles(sortedArray2);
    sortedArray3 = mergeTiles(sortedArray3);
    sortedArray4 = mergeTiles(sortedArray4);
    sortedArray1 = sortedArray1.sort();
    sortedArray2 = sortedArray2.sort();
    sortedArray3 = sortedArray3.sort();
    sortedArray4 = sortedArray4.sort();

    if (direction == "up") {
        gridArray1 = [sortedArray1[0],sortedArray2[0],sortedArray3[0],sortedArray4[0]];
        gridArray2 = [sortedArray1[1],sortedArray2[1],sortedArray3[1],sortedArray4[1]];
        gridArray3 = [sortedArray1[2],sortedArray2[2],sortedArray3[2],sortedArray4[2]];
        gridArray4 = [sortedArray1[3],sortedArray2[3],sortedArray3[3],sortedArray4[3]];
     } else if (direction == "down") {
        gridArray1 = [sortedArray1[3],sortedArray2[3],sortedArray3[3],sortedArray4[3]];
        gridArray2 = [sortedArray1[2],sortedArray2[2],sortedArray3[2],sortedArray4[2]];
        gridArray3 = [sortedArray1[1],sortedArray2[1],sortedArray3[1],sortedArray4[1]];
        gridArray4 = [sortedArray1[0],sortedArray2[0],sortedArray3[0],sortedArray4[0]];
    } else if (direction == "right") {
        gridArray1 = [...sortedArray1].reverse();
        gridArray2 = [...sortedArray2].reverse();
        gridArray3 = [...sortedArray3].reverse();
        gridArray4 = [...sortedArray4].reverse();
    } else if (direction == "left") {
        gridArray1 = [...sortedArray1];
        gridArray2 = [...sortedArray2];
        gridArray3 = [...sortedArray3];
        gridArray4 = [...sortedArray4];
    }
    
    tileArray = [[...gridArray1],[...gridArray2],[...gridArray3],[...gridArray4]];
    redoTileCoordinates();
    checkBoard()
    renderGrid();
}

function mergeTiles(oldArray){
    let sortedArray= [...oldArray];
    for (let index = 0; index < 3; index++) {
        if (sortedArray[index] != undefined && sortedArray[index+1] != undefined){
            if (sortedArray[index].currentValue == sortedArray[index+1].currentValue){
                sortedArray[index].currentValue = sortedArray[index].currentValue*2;
                sortedArray[index+1] = undefined;
            }
        }
    }
    return sortedArray;
}


function redoTileCoordinates(){
    //multidimensional loop iterator
    for(var i = 0; i < 4; i++) {
        var tile = tileArray[i];
        for(var j = 0; j < 4; j++) {
            if(tile[j] != undefined){
                tile[j].changePosition(i,j);
            } 
        }
    }
}

function renderGrid(){
    //multidimensional loop iterator
    tileContainer.innerHTML = "";
    for(var i = 0; i < 4; i++) {
        var tile = tileArray[i];
        for(var j = 0; j < 4; j++) {
            if(tile[j] != undefined) tileContainer.innerHTML += tile[j].HTML;
        }
    }
}

function checkBoard(){
    const freeSpaces = [];
    for(var i = 0; i < 4; i++) {
        var tile = tileArray[i];
        for(var j = 0; j < 4; j++) {
            if(tile[j] == undefined) freeSpaces.push(getIntFromXandYCoord(i,j));
        }
    }
    let randomNum1 = freeSpaces[randomNumberGenerator(0,freeSpaces.length-1)];
    let randomCoords1 = getXandYCoordFromInt(randomNum1);   

    //20% chance for number to be a 4
    let tileValue = 2; 
    if (randomNumberGenerator(0,10) > 8) tileValue = 4; 

    createNewTile(tileValue, randomCoords1[0], randomCoords1[1], false);
    renderGrid();
    if(checkIfGameOver()){
        gameOver = true;
        gameOverFunction();
    }
}


//add check to see if game over if no spaces on board or if there are still moves left
function checkIfGameOver(){

    let array1 = [];
    let array2 = [];
    let array3 = [];
    let array4 = [];
    let array1Full = false;
    let array2Full = false;
    let array3Full = false;
    let array4Full = false;

    array1=[tileArray[0][0], tileArray[1][0], tileArray[2][0], tileArray[3][0]];
    array2=[tileArray[0][1], tileArray[1][1], tileArray[2][1], tileArray[3][1]];
    array3=[tileArray[0][2], tileArray[1][2], tileArray[2][2], tileArray[3][2]];
    array4=[tileArray[0][3], tileArray[1][3], tileArray[2][3], tileArray[3][3]];
    if(checkArrayFullWithNoMoves(array1) && checkArrayFullWithNoMoves(array2) && checkArrayFullWithNoMoves(array3) && checkArrayFullWithNoMoves(array4)) array1Full = true;

    array1=[tileArray[3][0], tileArray[2][0], tileArray[1][0], tileArray[0][0]];
    array2=[tileArray[3][1], tileArray[2][1], tileArray[1][1], tileArray[0][1]];
    array3=[tileArray[3][2], tileArray[2][2], tileArray[1][2], tileArray[0][2]];
    array4=[tileArray[3][3], tileArray[2][3], tileArray[1][3], tileArray[0][3]];
    if(checkArrayFullWithNoMoves(array1) && checkArrayFullWithNoMoves(array2) && checkArrayFullWithNoMoves(array3) && checkArrayFullWithNoMoves(array4)) array2Full = true;

    array1=[tileArray[0][3], tileArray[0][2], tileArray[0][1], tileArray[0][0]];
    array2=[tileArray[1][3], tileArray[1][2], tileArray[1][1], tileArray[1][0]];
    array3=[tileArray[2][3], tileArray[2][2], tileArray[2][1], tileArray[2][0]];
    array4=[tileArray[3][3], tileArray[3][2], tileArray[3][1], tileArray[3][0]];
    if(checkArrayFullWithNoMoves(array1) && checkArrayFullWithNoMoves(array2) && checkArrayFullWithNoMoves(array3) && checkArrayFullWithNoMoves(array4)) array3Full = true;

    array1=[tileArray[0][0], tileArray[0][1], tileArray[0][2], tileArray[0][3]];
    array2=[tileArray[1][0], tileArray[1][1], tileArray[1][2], tileArray[1][3]];
    array3=[tileArray[2][0], tileArray[2][1], tileArray[2][2], tileArray[2][3]];
    array4=[tileArray[3][0], tileArray[3][1], tileArray[3][2], tileArray[3][3]];
    if(checkArrayFullWithNoMoves(array1) && checkArrayFullWithNoMoves(array2) && checkArrayFullWithNoMoves(array3) && checkArrayFullWithNoMoves(array4)) array4Full = true;

    if(array1Full && array2Full && array3Full && array4Full){
        return true;        
    }else {
        return false;
    }
}

function checkArrayFullWithNoMoves(array){
    for (let index = 0; index < array.length-1; index++) {
        const element = array[index];
        const nextElement = array[index+1];
        if(element == undefined) return false;
        if (element != undefined && nextElement != undefined){
            if (element.currentValue == nextElement.currentValue) return false;
        }   
    }
    return true;
 }

//event listeners for arrow keys pressed
document.addEventListener("keydown", function(event) {

    if(gameOver==false){
        console.log("move allowed");
        let array1 = [];
        let array2 = [];
        let array3 = [];
        let array4 = [];

        if (event.code == "ArrowUp") {
            array1=[tileArray[0][0], tileArray[1][0], tileArray[2][0], tileArray[3][0]];
            array2=[tileArray[0][1], tileArray[1][1], tileArray[2][1], tileArray[3][1]];
            array3=[tileArray[0][2], tileArray[1][2], tileArray[2][2], tileArray[3][2]];
            array4=[tileArray[0][3], tileArray[1][3], tileArray[2][3], tileArray[3][3]];
            if(validMove(array1, array2, array3, array4)) moveTilesInGrid(array1, array2, array3, array4, "up");
        } else if (event.code == "ArrowDown") {
            array1=[tileArray[3][0], tileArray[2][0], tileArray[1][0], tileArray[0][0]];
            array2=[tileArray[3][1], tileArray[2][1], tileArray[1][1], tileArray[0][1]];
            array3=[tileArray[3][2], tileArray[2][2], tileArray[1][2], tileArray[0][2]];
            array4=[tileArray[3][3], tileArray[2][3], tileArray[1][3], tileArray[0][3]];
            if(validMove(array1, array2, array3, array4)) moveTilesInGrid(array1, array2, array3, array4, "down");
        } else if (event.code == "ArrowRight") {
            array1=[tileArray[0][3], tileArray[0][2], tileArray[0][1], tileArray[0][0]];
            array2=[tileArray[1][3], tileArray[1][2], tileArray[1][1], tileArray[1][0]];
            array3=[tileArray[2][3], tileArray[2][2], tileArray[2][1], tileArray[2][0]];
            array4=[tileArray[3][3], tileArray[3][2], tileArray[3][1], tileArray[3][0]];
            if(validMove(array1, array2, array3, array4)) moveTilesInGrid(array1, array2, array3, array4, "right");
        } else if (event.code == "ArrowLeft") {
            array1=[tileArray[0][0], tileArray[0][1], tileArray[0][2], tileArray[0][3]];
            array2=[tileArray[1][0], tileArray[1][1], tileArray[1][2], tileArray[1][3]];
            array3=[tileArray[2][0], tileArray[2][1], tileArray[2][2], tileArray[2][3]];
            array4=[tileArray[3][0], tileArray[3][1], tileArray[3][2], tileArray[3][3]];
            if(validMove(array1, array2, array3, array4)) moveTilesInGrid(array1, array2, array3, array4, "left");
        }
    }
 });

 function validMove(array1, array2, array3, array4) {

    let array1Valid = checkArrayValid(array1);
    let array2Valid = checkArrayValid(array2);
    let array3Valid = checkArrayValid(array3);
    let array4Valid = checkArrayValid(array4);

    if(array1Valid || array2Valid || array3Valid || array4Valid){
        return true;
    }
    return false;
 }

 function checkArrayValid(array){
    for (let index = 0; index < array.length-1; index++) {
        const element = array[index];
        const nextElement = array[index+1];
        if (element == undefined && nextElement != undefined) return true;
        if (element != undefined && nextElement != undefined){
            if (element.currentValue == nextElement.currentValue) return true;
        }       
    }
    return false
 }

 function gameOverFunction(){

 }





