import React, { Component } from 'react';
import Field from './Board/Field/Filed.js';

class Game extends Component{
    render(){
        return (
        <div>
            This is the Game component.
            And this is a Field
            <Field hasShip={false}></Field>
            <Field hasShip={true}></Field>
            There should be fields
        </div>
        );
    }
}

export default Game;