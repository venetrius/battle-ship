import Ship from './ship.js';
import Coordinate from './coordinate.js';
import ShipsSet from './shipset';
/*
var Ship = require('./ship');
var Coordinate = require('./coordinate');
*/
class GameLogic{

  constructor(dimensions){
    this.dimensions = dimensions;
  }

  static getShips(dimensions) {
    let ships = new ShipsSet().shipSet;
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