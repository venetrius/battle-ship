
class Ship extends{

    constructor(props){
        super(props);
        this.state = {
            horizontal : props.horizontal ? props.horizontal : true,
            length : props.length,
            xCoordinate : props.xCoordinate,
            yCoordinate : props.yCoordinate
        };
    }

}


