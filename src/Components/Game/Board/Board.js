import React, {Component} from 'react';
import Field from './Field/Filed.js';

class Board extends Component{

    constructor(props){
        super(props);
        this.state = {
            dimension : this.props.dimension ? this.props.dimension : 10
        };
    }

    render(){
        var fields = [];
        const dimension = this.state.dimension;
        for(var i = 0; i < dimension; i++){
            var line = [];
            for(var j = 0; j < dimension; j++){
                line.push(<Field/>);
            }
            fields.push(<div>{line}</div>);
        }
        return(
            
            <div>
                {fields}
            </div>
        );
    }
}

export default Board;