class Ship {
  constructor(coordinates){
    this.sank = false;
    this.coordinates = coordinates;
    this.coordinatesMap = this.createCoordinatesMap(coordinates); 
  }

  createCoordinatesMap(coordinates){
    let coordinatesMap = {};
    for(let coordinate of coordinates){
      coordinatesMap[coordinate] = false;
    }
    return coordinatesMap;
  }

  isSunk(){
    let map = this.coordinatesMap;
    return Object.keys(map).map(key => this.coordinatesMap[key]).reduce((a,b) => a && b);
  }

  gotHit(x,y){
    this.coordinatesMap[[x*1000+y]] = true;
    this.sank = this.isSunk();
  }
}

//module.exports = Ship;
/*
var c1 = new Coordinate(1,1);
var c2 = new Coordinate(1,1);
var c3 = new Coordinate(1,3);

var ship = new Ship([c1,c2]);

console.log(ship);

*/

export default Ship;