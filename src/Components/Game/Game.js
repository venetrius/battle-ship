import React, { Component } from 'react';
import Board from './Board/Board.js';

class Game extends Component{

  constructor(props){
    super(props);
    this.state = {
      isPlayerTurn : true,
      dimension: 10,
      fields: this.initFields(10)
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
        <Board changeTurn={(x,y)=>this.handleFieldClick(x,y)} isPlayerTurn={this.state.isPlayerTurn} type="enemy" fields={this.state.fields}></Board>        
      </div>
    );
  }

  changeTurn(){
    this.setState(
      {isPlayerTurn : !this.state.isPlayerTurn}
    );
  }

  handleFieldClick(x,y){
    let fields = this.state.fields;
    fields[x][y].discovered = true;
    this.setState(
      {fields : fields}
      );
    this.changeTurn();
  }

  initFields(dimension){
    console.log("initFields is called");
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

}



export default Game;