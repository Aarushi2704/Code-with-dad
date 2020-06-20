class Form {

    constructor() {
      this.button = createButton('Click here to play');
    }
  
    display(){
      this.button.position(510,500);
      this.button.mousePressed(()=>{
        gameState = 1;
      });
    }

    hide(){
        this.button.hide();
    }
  }
  