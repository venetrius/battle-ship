import Ship from './ship.js';
import Coordinate from './coordinate.js';


// getRandomInt from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomProps = function(){
  let props =
  {
    x : getRandomInt(0,9),
    y : getRandomInt(0,9),
    isHorizontal: Boolean(getRandomInt(0,1))
  }
  return props;
}

const isAviable = function(props, size, board){
  let xEnd = props.x + props.isHorizontal * size;
  let yEnd = props.y + size * (1-props.isHorizontal);
  for(let x = props.x; x <= xEnd; x++){
    for(let y = props.y; y <= yEnd; y++){
      if( (!board[x]) || !board[x][y]){
        return false;
      }
    }
  }
  return true;
}

const createNewShip = function(props, size, board){
  const coordinates = [];
  let xEnd = props.x + props.isHorizontal * size;
  let yEnd = props.y + size * (1-props.isHorizontal);
  for(let x = props.x; x <= xEnd; x++){
    for(let y = props.y; y <= yEnd; y++){
      coordinates.push(new Coordinate(x,y));
      board[x][y] = 0;
    }
  }
  return new Ship(coordinates);
}

const createShipSet = function(){
  let ships = [];
  let board = function(){
    let b = []
    for(let i = 0; i < 10; i++){
      let bi = [];
      for(let j = 0; j < 10; j++){
        bi.push(1);
      }
      b.push(bi);
    }
    return b;
  }();
  const shipSizes = [4,3,2,2,1]; //TODO it should be 5 4 3 3 2 it just cover a bug in isAviable && addNewShip
  let shipIndex = 0;

  while(shipIndex < 5){
    let props = getRandomProps();
    if(isAviable(props, shipSizes[shipIndex], board)){
      ships.push(createNewShip(props, shipSizes[shipIndex], board));
      shipIndex++;
    }
  }
  return ships;
}

class ShipsSet{
  constructor() {
    this.shipSet = createShipSet();
  }
}  

export default ShipsSet;