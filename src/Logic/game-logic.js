import Ship from './ship.js';
import Coordinate from './coordinate.js';
/*
var Ship = require('./ship');
var Coordinate = require('./coordinate');
*/
class GameLogic{

  constructor(dimensions){
    this.dimensions = dimensions;
  }

  static getShips(dimensions) {
    let ships = 
      [
        new Ship(
          [ new Coordinate(2,3),
            new Coordinate(0,1),
            new Coordinate(2,2)
          ]),
        new Ship([
          new Coordinate(3,2),
          new Coordinate(4,2)
        ]),
        new Ship([
          new Coordinate(7,1)
        ])
      ];
    return ships;
  }

  static getShipsWithCoordMap(dimensions){
    let ships = this.getShips(dimensions);
    let shipCoordMap = {};
    for (let ship of ships){
      for (let coord of ship.coordinates){
        shipCoordMap[coord] = ship;
      }
    }
    return {ships : ships,
      shipCoordMap: shipCoordMap}
  }

}

export default GameLogic;