class Girl {
  
  constructor() {
    this.frame = createVector(rows/2,cols/2);
    this.xspeed = 0;
    this.yspeed = 0;
  }
  
  //to set coordinates of snake
  setDir(x, y) {
  	this.xspeed = x;
    this.yspeed = y;
  }

  update() {
    this.frame.x += this.xspeed;
    this.frame.y += this.yspeed;
  }
  
  
  //to eat the food
  eat(pos) {
  	var x = this.frame.x;
    var y = this.frame.y;
    if(x == pos.x && y == pos.y) {
      return true;
    }
    return false;
  }
  
  //to display the snake
  display() {
    noStroke();
    fill(0);
    rect(this.frame.x,this.frame.y,1,1);
    imageMode(CENTER);
    image(girl_Img,this.frame.x+0.5,this.frame.y+0.5,2.25,2.75);
  }

  //to end the game
  GameEnd() {
  	var x = this.frame.x;
    var y = this.frame.y;

    if(x > rows-1.5 || x < 0.5 || y > cols-3.5 || y < 2.5) {
      return true;
    }
  }
}