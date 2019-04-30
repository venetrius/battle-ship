import React, { Component } from 'react';

class Ship extends Component{

    constructor(props){
        super(props);
        this.state = {
            horizontal : props.horizontal ? props.horizontal : true,
            length : props.length,
            xCoordinate : props.xCoordinate,
            yCoordinate : props.yCoordinate
        };
    }

    render(props){
        return(
            <div>
                
            </div>
        );
    }
}


