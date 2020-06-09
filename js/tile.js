
export class Tile {
    constructor(currentValue, xCoord, yCoord, isEmpty) {
        this.currentValue = currentValue;
        this.xCoord = xCoord;
        this.yCoord = yCoord;
        this.isEmpty = isEmpty;
      }

      get currentPosition(){
          return this.currentPosition;
      }

      get currentValue(){
          return this.currentValue;
      }

      get isEmpty(){
        return this.isEmpty;
    }

      currentPosition() {
        return [this.xCoord, this.yCoord];
      }

      changePosition(newXCoord, newYCoord){
          this.xCoord = newXCoord;
          this.yCoord = newYCoord;
      }

      mergeTile(otherTileXCoord, otherTileYCoord, otherTileValue){

      }

      get HTML(){
          return `<div class="tile tile-${this.currentValue} tile-position-${this.xCoord}-${this.yCoord} tile-new"><div class="tile-inner">${this.currentValue}</div></div>`;
      }
}

function createStarterTile(){
    //find grid array and find 2 random empty tiles
    //create tile with those positions and value of 2


}


    // - Function - mergeTile (updates score as well)
    // - Function - changeValue - this changes number/color/fontsize
    // - Funciton - deleteTile