import React, { Component } from 'react';
import './Field.css';

class Field extends Component{

    constructor(props) {
        super (props);
        this.state = {
          type: this.props.attributes.type,
          ship: false
        };
      }

    render(){
      let classes = this.getClasses(this.props.attributes);
        return(
            <button onClick={this.props.changeTurn} className={"field " + this.getClasses()}>
            </button>
        )
    }

    getClasses(){
      let classes = this.props.attributes.type === "own" ? "own" : "enemy";
      classes += this.props.attributes.discovered ? "-discovered" : "-unknown";
      classes += this.props.attributes.hasShip ? "-hasShip" : "-empty";
      return classes;
  }
}

export default Field;