class Coordinate {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  equal(other) {
    if(! other){
      return false;
    }
    return this.x === other.x && this.y === other.y;
  }

  toString(){
    return String(this.x * 1000 + this.y);
  }
}

//module.exports = Coordinate;

/*
var c1 = new Coordinate(1,1);
var c2 = new Coordinate(1,3);
var c3 = new Coordinate(1,3);

console.log(c1, c2, c1.equal(c2));
console.log(c2, c3, c2.equal(c3));
console.log(c1, "null", c1.equal(null));
*/
export default Coordinate;