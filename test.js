class Coordinates {
  constructor(x,y){
    this.x = x;
    this.y = y;
  }

 toString(){
    return this.x * 1000 + this.y;
  }
}

// is there toString in js and if yes how does it work?
// Coordinates.prototype.toString = () => this.x;
Coordinates.prototype.toString = function(){
  return String(this.x * 1000 + this.y);
}
console.log(new Coordinates(5,1000));
console.log(new Coordinates(5,9).toString());

let cord1 = new Coordinates(1,2);
let cord3 = new Coordinates(3,4);

// works properly if toString is implemented
var objectMap = {
                  [cord1] : "first",
                  cord3 : "second"
                }
console.log(objectMap);
console.log(typeof cord1.toString());