import React, { Component } from 'react';
import Board from './Board/Board.js';
import GameLogic from './../../Logic/game-logic.js';

class Game extends Component{

  constructor(props){
    super(props);
    this.state = {
      isPlayerTurn : true,
      dimension: 10,
      fields: this.initFields(10),
      enemyFields : this.initEnemyFields(10)
    };
  }

  render(){
    return (
      <div>
        it is {(this.state.isPlayerTurn ? "the player's" : "the AI's")} turn 
        <br/>
        your board
        <Board type="own" fields={this.state.fields}/>
        enemy board
        <Board changeTurn={(x,y)=>this.handleFieldClick(x,y)} isPlayerTurn={this.state.isPlayerTurn} type="enemy" fields={this.state.enemyFields}></Board>        
      </div>
    );
  }

  changeTurn(){
    this.setState(
      {isPlayerTurn : !this.state.isPlayerTurn}
    );
  }

  handleFieldClick(x,y){
    let enemyFields = this.state.enemyFields;
    enemyFields[x][y].discovered = true;
    this.setState(
      {enemyFields : enemyFields}
      );
    this.changeTurn();
  }

  initFields(dimension){
    console.log("initFields is called");
    //console.log(GameLogic.getShips());
    let fieldArr = [];
    for(let i = 0; i < dimension; i++){
        let line = [];
        for(let j = 0; j < dimension; j++){
            line.push(
                {discovered : Math.random() >= 0.5 ? true : false,
                hasShip : Math.random() >= 0.9 ? true : false}
            );
        }
        fieldArr.push(line);
    }
    return fieldArr;
  }

  initEnemyFields(dimension){
    let fieldArr = [];
    for(let i = 0; i < dimension; i++){
        let line = [];
        for(let j = 0; j < dimension; j++){
            line.push(
                {discovered : false,
                hasShip :  false}
            );
        }
        fieldArr.push(line);
    }
    let ships = GameLogic.getShips(dimension);
    console.log("ships", ships);
    for(let ship of ships){
      console.log("init enemy",ship);
      for(let cord of ship.coordinates){
        fieldArr[cord.x][cord.y] = {discovered : false,
                                    hasShip :  true}
      }
    }
    console.log("enemyfields", fieldArr);
    return fieldArr;
  }

}



export default Game;