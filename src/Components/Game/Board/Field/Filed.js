import React, { Component } from 'react';
import './Field.css';

class Field extends Component{

    constructor(props) {
        super (props);
        console.log("hasShip: " + this.props.hasShip);
        this.state = {
          hasShip: this.props.hasShip,
          ship: null
        };
      }

    render(){
        console.log(this.state.hasShip);
        return(
            <button className={"field "  + (this.state.hasShip === true ? "hasShip" : "empty")}>
            </button>
        )
    }
}

export default Field;