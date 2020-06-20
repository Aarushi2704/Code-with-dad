
var gameState = 0;

var girl;
var size = 20;
var cols;
var rows;

var food1,food2,food3,food4;
var rand1, rand2, result;
var opt1, opt2, opt3, opt4;

var score = 0;
var scenes;
var quesSign;

var bb;
var lostImg, wonImg;

var banner;

var form;


function preload(){
  bb = loadImage("images/Blackboard.png");
  girl_Img = loadImage("images/Girl.png");

  lostImg = loadImage("images/lost.png");
  wonImg = loadImage("images/Won.png");

  banner = loadImage("images/banner.png");
  scenes = loadImage("images/scenes.png");
}

function setup() {
  createCanvas(560,560); 

  cols = floor(width / size);
  rows = floor(height / size);

  frameRate(5);

  girl = new Girl();
  form = new Form();

  callFuncts();
}



function draw() {
  scale(size);
  background(46, 55, 60);

  if(gameState == 0){
    imageMode(CENTER);
    image(banner,14,3.5,30,7);
    image(scenes,14,14.5,30,14);
    form.display();
  }

  if (gameState==2){
    imageMode(CENTER);
    image(lostImg,14.25,14.5,30,30);
    noLoop(); 
  }

 if(gameState == 1){

    form.hide();
    image(bb,-5,-5,40,50);

    strokeWeight(0.1);
    line(-1,1.85,50,1.85);
    //line(26,-1,26,50);
    
    strokeWeight(3);
    line(-1,27.5,50,27.5); 

    fill("white");
    noStroke();
    textSize(1);
    text("Score: " + score,1,1.25); 
    textAlign(CENTER);
    text(rand1 + " " + quesSign + " " + rand2 + " = " + " ? ",12,1.25);
    
    text("Math is fun with Dad!",14,27.5)

    fill(255);
    rect(food1.x,food1.y,1,1);
    rect(food2.x,food2.y,1,1);
    rect(food3.x,food3.y,1,1);
    rect(food4.x,food4.y,1,1);

    fill(0);
    for(var i=0;i< 10;i++){
      rect(16+(i*1.1),0.35,1,1);
    }
    
    fill(255);
    noStroke();

    for(var i = 0; i < score; i++){
        fill(150+i*10,0,0);
        rect(16+(i*1.1),0.35,1,1);
    }

    fill(0);
    textSize(0.65);

    text(opt1,food1.x + 0.5,food1.y + 0.75);
    text(opt2,food2.x + 0.5,food2.y + 0.75);
    text(opt3,food3.x + 0.5,food3.y + 0.75);
    text(opt4,food4.x + 0.5,food4.y + 0.75);

    if(opt1 == result && girl.eat(food1)){
      callFuncts();
      score += 1;

    } else if (opt2 == result && girl.eat(food2)){
      callFuncts();
      score += 1;

    } else if (opt3 == result && girl.eat(food3)){
      callFuncts();
      score += 1;

    }  else if (opt4 == result && girl.eat(food4)){
      callFuncts();
      score += 1;
    } 

    girl.update();
    girl.display();

    textSize(3);

    if (girl.GameEnd()) {

      imageMode(CENTER);
      image(lostImg,14.25,14.5,30,30);
      noLoop();
      gameState = 2;
    }

    if (opt1 == result && (girl.eat(food2)||girl.eat(food3)||girl.eat(food4))){
      imageMode(CENTER);
      image(lostImg,14.25,14.5,30,30);
      noLoop();
      gameState = 2;
    } else if (opt2 == result && (girl.eat(food1)||girl.eat(food3)||girl.eat(food4))){
      imageMode(CENTER);
      image(lostImg,14.25,14.5,30,30);
      noLoop();
      gameState = 2;
    } else if (opt3 == result && (girl.eat(food1)||girl.eat(food2)||girl.eat(food4))){  
      imageMode(CENTER);
      image(lostImg,14.25,14.5,30,30);
      noLoop();
      gameState = 2;
    } else if (opt4 == result && (girl.eat(food1)||girl.eat(food2)||girl.eat(food3))){  
      imageMode(CENTER);
      image(lostImg,14.25,14.5,30,30);
      noLoop();
      gameState = 2;
    }

    if(score == 10){
      imageMode(CENTER);
      image(wonImg,14.25,14.5,30,30);
    }
  }
}

function generateOpt(){  
  opt1 = Math.round(random(1,result*4 + 50));
  opt2 = Math.round(random(1,result*4 + 50));
  opt3 = Math.round(random(1,result*4 + 50));
  opt4 = Math.round(random(1,result*4 + 50));
  
  if((opt1==opt2)||(opt1==opt3)||(opt1==opt4)||(opt2==opt3)||(opt2==opt4)||(opt3==opt4)||(opt1==result)||(opt2==result)||(opt3==result)||(opt4==result)){
    generateOpt();
  }
}


function storeResult(){

  var rand = Math.round(random(1,4));
  
  switch(rand) {
    case 1: 
            opt1 = result;    
            break;
    case 2: 
            opt2 = result;
            break;
    case 3: 
            opt3 = result;
            break;
    case 4: 
            opt4 = result;
            break;
   default: break;
  }

}

function Question(){
  rand1 = Math.round(random(1,15));
  rand2 = Math.round(random(1,15));
  var temp;

  var questOpt = Math.round(random(5,6));
  
  switch(questOpt) {
    case 1: 
            quesSign = "+";
            result = rand1 + rand2;
            break;
    case 2: 
            quesSign = "-";
            if(rand1>=rand2){
              result = rand1 - rand2;  
            } else{
              temp=rand2;
              rand2=rand1;
              rand1=rand2;
              result = rand1 - rand2;
            }
            break;
    case 3: 
            quesSign = "*";  
            result = rand1 * rand2;
            break;
    case 4: 
            quesSign = "/";
            result = rand1 * rand2;
            temp = result;
            result = rand1;
            rand1 = temp;
            break;
    case 5: 
            quesSign = "*";
            result = rand1 * rand1;
            rand2  = rand1;
            break;
    case 6: 
            quesSign = "*";
            rand1 = Math.round(random(12,30));
            rand2 = Math.round(random(2,9));
            result = rand1 * rand2;
            break;
   default: break;
  }
}

function pickLocation() {

  var  x1 = floor(Math.round(random(0+1,(cols/2)-1)));
  var  y1 = floor(Math.round(random(0+5,rows/2-1)));

  var  x2 = floor(Math.round(random(((cols/2)+1),cols-1)));
  var  y2 = floor(Math.round(random(0+5,((rows/2)-1))));

  var  x3 = floor(Math.round(random(0+1,(cols/2)-1)));
  var  y3 = floor(Math.round(random(((rows/2)+1),rows-3)));

  var  x4 = floor(Math.round(random((cols/2)+1,cols-1)));
  var  y4 = floor(Math.round(random((rows/2)+1,rows-3)));



  food1 = createVector(x1, y1);
  food2 = createVector(x2, y2);
  food3 = createVector(x3, y3);
  food4 = createVector(x4, y4);

}



function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    girl.setDir(-1, 0);
  } else if (keyCode === RIGHT_ARROW) {
    girl.setDir(1, 0);
  } else if (keyCode === DOWN_ARROW) {
    girl.setDir(0, 1);
  } else if (keyCode === UP_ARROW) {
    girl.setDir(0, -1);
  }

}

function callFuncts(){
  Question();
  pickLocation();
  generateOpt();
  storeResult();
}