import React, { Component } from 'react';
import './Field.css';

class Field extends Component{

    constructor(props) {
        super (props);
        this.state = {
          type: this.props.type,
          ship: false
        };
      }

    render(){
        return(
            <button onClick={(this.props.changeTurn ? this.props.changeTurn : "" )} className={"field " + this.state.type}>
            </button>
        )
    }

    getClasses(){
      /*if()
      let classes = field.discovered ? "discovered" : "unknown";
      classes += " ";
      classes += field.hasShip ? "hasShip" : "empty";
      return classes; */
      return "";
  }
}

export default Field;