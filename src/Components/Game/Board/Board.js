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
        for(let i = 0; i < dimension; i++){
            var line = [];
            for(let j = 0; j < dimension; j++){
                let nextField = this.props.fields[i][j];
                nextField.type = this.props.type;
                if(this.props.type === "enemy" && this.props.isPlayerTurn){
                    line.push(<Field attributes={nextField} changeTurn={() => this.props.changeTurn(i,j)}/>);
                }else{
                    line.push(<Field attributes={nextField}/>);
                }
                
            }
            fields.push(<div>{line}</div>);
        }
        return(
            
            <div className="board">
                <button onClick={() => this.props.changeTurn(1,1)} />
                {fields}
            </div>
        );
    }

}

export default Board;