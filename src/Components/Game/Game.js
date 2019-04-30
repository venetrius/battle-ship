import React, { Component } from 'react';
import Field from './Board/Field/Filed.js';
import Board from './Board/Board.js';

class Game extends Component{
    render(){
        return (
        <div>
            This is the Game component.
            And this is a Field
            <Field hasShip={false}></Field>
            <Field hasShip={true}></Field>
            There should be fields
            <Board></Board>
            There should be a Board component
        </div>
        );
    }
}

export default Game;