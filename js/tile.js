
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

      currentPosition() {
        return [this.xCoord, this.yCoord];
      }

      changePosition(newXCoord, newYCoord){
          this.xCoord = newXCoord;
          this.yCoord = newYCoord;
      }

      get HTML(){
          return `<div class="tile tile-${this.currentValue} tile-position-${this.xCoord}-${this.yCoord}"><div class="tile-inner">${this.currentValue}</div></div>`;
      }
}
