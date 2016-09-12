#!/usr/bin/env node
var sys = require('bonescript');

var  led1    = 'P9_21';
var  led2    = 'P9_23';
var  led3    = 'P9_27';
var  led4    = 'P9_41';

var  button1 = 'P9_11';
var  button2 = 'P9_13';
var  button3 = 'P9_42';
var  button4 = 'P9_17';
var  button5 = 'P9_41';

sys.pinMode(button1, sys.INPUT, 7, 'pulldown');
sys.pinMode(button2, sys.INPUT, 7, 'pulldown');
sys.pinMode(button3, sys.INPUT, 7, 'pulldown');
sys.pinMode(button4, sys.INPUT, 7, 'pulldown');
sys.pinMode(button5, sys.INPUT, 7, 'pulldown');


sys.pinMode(led1, sys.OUTPUT);
sys.pinMode(led2, sys.OUTPUT);
sys.pinMode(led3, sys.OUTPUT);
sys.pinMode(led4, sys.OUTPUT);

sys.attachInterrupt(button1, true, sys.CHANGE, setRight);
sys.attachInterrupt(button2, true, sys.CHANGE, setDown);
sys.attachInterrupt(button3, true, sys.CHANGE, setLeft);
sys.attachInterrupt(button4, true, sys.CHANGE, setUp);
sys.attachInterrupt(button5, true, sys.CHANGE, clear);


console.log('Beginning System Initiated. Commencing takeover of Earth...Dr. Yoder, what have you done');
var max = 8; //couldn't figure out how to use user inputs
var px = 0;
var py = 0;
var num = 0;
var dir = 0;
var i = 0; var j = 0;

var grid = new Array(max);
for (var i = 0; i<max;i++){
    grid[i]=new Array(max); //assuming square graph
    
}
for (var i =0; i<max;i++){
    for(var j = 0; j<max;j++){
        grid[i][j] = " ";
    }
    
}

//attempt at creating 2 d array 
/* for ( i = 0; i < max ; i++) {
     if(!grid[i])
         grid[i] = [];
     for (j = 0; j < max ; j++){
         grid[i][j] = i+j; 
         console.log(grid[i][j]); // 1
     }
 }
*/


 

function setLeft(x){
  py = py -1 ;
  if(py<0){
      out_of_bounds_message();
      py=0;
  }
  draw();
}

function setUp(x){
  px = px -1;
  if(px<0){
      out_of_bounds_message();
      px=0;
  }
  draw();
}

function setDown(x){
  px = px +1 ;
  if(px>=max){
      out_of_bounds_message();
      px=max-1;
  }
  draw();
}

function setRight(x){
  py = py +1 ;
  if(py>=max){
      out_of_bounds_message();
      py=max-1;
  }
  draw();
}

function out_of_bounds_message(x){
    console.log("You have violated the boundries of this most holy of etch a sketch boundries. For this treachery your world shall fall victim to this incredibly unnecesarily long message. BEEB BEEB BEEB. Don't do it again");
}


function draw(po){
    grid[px][py]="x";
    var temp="";
    for(var x =0; x < max; x++){
        temp += " " + "x"
    } 
    console.log(temp);  //I could not find way to to the print in the for loop without it skipping a line
    var temp="";
    for(var y = 0; y < max; y ++){
        temp = y + "";
        for(var x =0; x < max; x++){
        temp += " " + grid[x][y];
        } 
    }
}

function changeLED(x){
    switch(x.pin.key){
        case button1:
            if(x.value == 1){
                sys.digitalWrite(led1, 1);
            }else{
                sys.digitalWrite(led1, 0);
            }
            break;
        case button2:
            if(x.value == 1){
                sys.digitalWrite(led2, 1);
            }else{
                sys.digitalWrite(led2, 0);
            }
            break;
        case button3:
            if(x.value == 1){
                sys.digitalWrite(led3, 1);
            }else{
                sys.digitalWrite(led3, 0);
            }
            break;
        case button4:
            if(x.value == 1){
                sys.digitalWrite(led4, 1);
            }else{
                sys.digitalWrite(led4, 0);
            }
            break;
        default:
            console.log(x.pin.key);
    }
}



 
