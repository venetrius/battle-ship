import React, {Component} from 'react';
import Field from './Field/Filed.js';
import './Board.css';

class Board extends Component{

    constructor(props){
        super(props);
        this.state = {
            dimension : this.props.dimension ? this.props.dimension : 10
        };
    }

    createLetterLabels(type){
        const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
        const labels = [<label key={"label"+type}>{''}</label>];
        for(let i = 0; i < 10 ; i++){
            
            let char = alphabet[i];
            let key = "label"+type+char;
            labels.push(<label key={key}>{char}</label>);
        }
        console.log('labels',labels);
        return labels;
    }

    render(){
        var fields = [];
        const dimension = this.state.dimension;
        for(let i = 0; i < dimension; i++){
            var line = [];
            for(let j = 0; j < dimension; j++){
                let nextField = this.props.fields[i][j];
                nextField.type = this.props.type;
                nextField.id = "FIELD" +(i*1000 + j);
                if(this.props.type === "enemy" && this.props.isPlayerTurn){
                    line.push(<Field key={"FIELDD" +(i*1000 + j)} attributes={nextField} changeTurn={() => this.props.changeTurn(i,j)}/>);
                }else{
                    line.push(<Field key={"FIELDD" +(i*1000 + j)} attributes={nextField}/>);
                }
                
            }
            fields.push(<div key={"FIELDDF" +(i*1000)}><label>{i}</label>{line}</div>);
        }
        fields.push(<div key={'letterLabels'+this.props.type}>{this.createLetterLabels(this.props.type)}</div>);
        return(
            
            <div className="board" key={this.props.type}>
                <button onClick={() => this.props.enemyTurn()}> Enemy Turn </button>
                {fields}
            </div>
        );
    }

}

export default Board;