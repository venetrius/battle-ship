import React, { Component } from 'react';
import Board from './Board/Board.js';
import GameLogic from './../../Logic/game-logic.js';
import { Button, Navbar, Container, Row,Col } from 'react-bootstrap';
import './Game.css';


class Game extends Component{

  constructor(props){
    super(props);
    this.state = {
      started : false,
      isPlayerTurn : true,
      dimension: 10,
      player: this.initBoardState(10),
      enemy : this.initBoardState(10),
      targets : this.initTargetArrForAi()
    };
  }

  render(){
    const game = 
      <div>
        {this.header()}
        <h2>it is {(this.state.isPlayerTurn ? "the player's" : "the AI's")} turn </h2>
        <Container>
          <Row>
            <Col>
              <h3>your board</h3>
              <Board type="own" fields={this.state.player.fields}/>
              
            </Col>
            <Col>
              <h3>enemy board</h3>
              <Board changeTurn={(x,y)=>this.handleFieldClick(x,y)} enemyTurn = {() => this.handleEnemyCommand()} 
                isPlayerTurn={this.state.isPlayerTurn} type="enemy" fields={this.state.enemy.fields}>
              </Board>        
            </Col>
          </Row>
        </Container>
      </div>
    return ( game    );
  }

  /**
   * src : https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
  shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
  }

  initTargetArrForAi(){
    const targetArr = [];
    for (let i = 0; i < 10; i++){
      for (let j = 0; j < 10; j++){
        targetArr.push({x : i, y : j});
      }
    }
    return (this.shuffle(targetArr));
  }

  header(){
    return (
    <Navbar bg="light" expand="lg">
     <span> <h1> Battle Ship </h1> </span> <Button variant="danger" onClick={() => this.restartGame()}> Start a new Game</Button>
    </Navbar>);
  }

  restartGame(){
    let newState = {
     isPlayerTurn : true,
     dimension : 10,
     player : this.initBoardState(10),
     enemy : this.initBoardState(10),
     targets : this.initTargetArrForAi()
    }
    this.setState(newState);
  }

  changeTurn(){
    this.setState(
      {isPlayerTurn : !this.state.isPlayerTurn}
    );
  }

  handleFieldClick(x,y){
    let enemy = this.state.enemy;
    enemy.fields[x][y].discovered = true;
    let ship = enemy.shipCoordMap[(x*1000+y)];
    console.log(ship,enemy.shipCoordMap);
    if(ship){
      ship.gotHit(x,y);
      console.log(ship);
      if(GameLogic.isGameEnd(enemy.ships)){
        alert('Enemy has been elminated. You have won!')
        return;
      }
    }
    this.setState(
      {enemy : enemy}
      );
    this.changeTurn();
  }

 handleEnemyCommand(){  // TODO DRY it
  const {x,y} = this.state.targets.pop();
    //let x = Math.floor(Math.random() * 10);
    //let y = Math.floor(Math.random() * 10);
    let player = this.state.player;
    player.fields[x][y].discovered = true;
    let ship = player.shipCoordMap[(x*1000+y)];
    console.log(ship,player.shipCoordMap);
    if(ship){
      ship.gotHit(x,y);
      console.log(ship);
      if(GameLogic.isGameEnd(player.ships)){
        alert('You have been elminated. You have lost!')
        return;
      }
    }
    this.setState(
      {fields : player}
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
              {discovered : false,
                hasShip :  false
              }
            );
        }
        fieldArr.push(line);
    }
    console.log("fieldArr",fieldArr);
    return fieldArr;
  }

  initBoardState(dimension){
    let fieldArr = this.initFields(10);
    console.log("fieldArr",fieldArr);
    let shipsWithCoordMap = GameLogic.getShipsWithCoordMap();
    let ships = shipsWithCoordMap.ships;
    console.log("ships", ships);
    for(let ship of ships){
      console.log("init enemy",ship);
      for(let cord of ship.coordinates){
        console.log(cord);
        fieldArr[cord.x][cord.y] = {discovered : false,
                                    hasShip :  true,
                                    sunk : false}
      }
    }
    console.log("enemyfields", fieldArr);
    return {
      fields : fieldArr,
      shipCoordMap : shipsWithCoordMap.shipCoordMap,
      ships : ships
    };
  }

}

export default Game;