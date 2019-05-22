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
      fields: this.initFields(10),
      enemy : this.initEnemyFields(10)
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
              <Board type="own" fields={this.state.fields}/>
              
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
     fields : this.initFields(10),
     enemy : this.initEnemyFields(10)
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
        alert('Game over')
        return;
      }
    }
    this.setState(
      {enemy : enemy}
      );
    this.changeTurn();
  }

 handleEnemyCommand(){  // TODO DRY it
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    let fields = this.state.fields;
    fields[x][y].discovered = true;
    this.setState(
      {fields : fields}
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
                {discovered : 0, //Math.random() >= 0.5 ? true : false,
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
    let shipsWithCoordMap = GameLogic.getShipsWithCoordMap();
    let ships = shipsWithCoordMap.ships;
    console.log("ships", ships);
    for(let ship of ships){
      console.log("init enemy",ship);
      for(let cord of ship.coordinates){
        fieldArr[cord.x][cord.y] = {discovered : false,
                                    hasShip :  true}
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