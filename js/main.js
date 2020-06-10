import { Tile } from "./tile.js";

const tileArray = [[],[],[],[]];
const tileContainer = document.getElementById("tile-container");

initialisation();


function initialisation(){
    createStarterTiles();
}

function createStarterTiles(){
    //find grid array and find 2 random empty tiles
    let randomNum1 = randomNumberGenerator(0,15);
    let randomNum2 = randomNumberGenerator(0,15);

    while (randomNum2 == randomNum1) {
        randomNum2 = randomNumberGenerator(0,15);
    }

    let randomCoords1 = getXandYCoordFromInt(randomNum1);
    let randomCoords2 = getXandYCoordFromInt(randomNum2);

    console.log(randomCoords1);
    console.log(randomCoords2);

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

function mergeTilesInGrid(tile1, tile2, direction){

}

function moveTileInGrid(tile){

}

function renderGrid(){
    //multidimensional loop iterator
    for(var i = 0; i < 4; i++) {
        var tile = tileArray[i];
        for(var j = 0; j < 4; j++) {
            if(tile[j] != undefined) tileContainer.innerHTML += tile[j].HTML;
        }
    }
}


//event listeners for arrow keys pressed
document.addEventListener('keydown', function(event) {
    if (event.code == 'ArrowUp') {
      alert('Up pressed!')
    } else if (event.code == 'ArrowDown') {
        alert('Down pressed!')
    } else if (event.code == 'ArrowRight') {
        alert('Right pressed!')
    } else if (event.code == 'ArrowLeft') {
        alert('Left pressed!')
    }
 });




