// #!/usr/bin/env node
var sys = require('bonescript');
var i2c = require('i2c');
var port = '/dev/i2c-2';
var color = 0;

var wire = new i2c(0x70,{
	device: '/dev/i2c-2'
});

var grid = 0x70;

var screen = new Array(16);
var status = 0;
var counter=0;

var  led1    = 'P9_14';
var  led2    = 'P9_23';
var  led3    = 'P9_27';
var  led4    = 'P8_13';

var  button1 = 'P9_42';
var  button2 = 'P9_41';
var  button3 = 'P9_18';
var  button4 = 'P9_17';
var  button5 = 'P9_21';


sys.pinMode(button1, sys.INPUT, 7, 'pulldown');
sys.pinMode(button2, sys.INPUT, 7, 'pulldown');
sys.pinMode(button3, sys.INPUT, 7, 'pulldown');
sys.pinMode(button4, sys.INPUT, 7, 'pulldown');
sys.pinMode(button5, sys.INPUT, 7, 'pulldown');


sys.pinMode(led1, sys.OUTPUT);
sys.pinMode(led2, sys.OUTPUT);
sys.pinMode(led3, sys.OUTPUT);
sys.pinMode(led4, sys.OUTPUT);

blankScreen();

console.log('Beginning System Initiated. Commencing takeover of Earth...Dr. Yoder, what have you done');
var max = 8; 
var px = 0;
var py = 0;
var num = 0;
var dir = 0; var status = 0;
var i = 0; var j = 0;



clear();

wire.writeByte(0x21, function(err){
	wire.writeByte(0x81, function(err){
		wire.writeByte(0xe7, function(err){	
			setTimeout(makeScreen, 0);
		});
	});
});

makeScreen();

function writeScreen(){
	var x = 2 * px;
	if(color===0){
		x++;
	}
	
	grid[x] = grid[x] | Math.pow(2, py);
	if(color===2){
	    grid[x + 1] = grid[x + 1] | Math.pow(2, py);
	}
	makeScreen();
}


function makeScreen(){
	wire.writeBytes(0x00, screen, function(err){
	});
}


function clear(){
	blankScreen();
	writeScreen();
}


function setUp(){
    console.log("You are going up. Fear what you have done");
	py = py - 1;
	if(py < 0){
		out_of_bounds_message();
		py = 0;
	}
	writeScreen();
}

function setDown(){
	console.log("You are going down. Down to the center of EVIIL");
	py = py + 1;
	if(py >= max){
		out_of_bounds_message();
		py = max - 1;
	}
	writeScreen();
}

function setLeft(){
    console.log("You are going left. Run for your lives");
	px = px - 1;
	if(px < 0){
		out_of_bounds_message();
		px = 0;
	}
	writeScreen();
}

function blankScreen(){
	for(var i = 0; i < 16; i = i + 2){
		screen[i] = 0x00;
		screen[i + 1] = 0x00;
	}
}


function setRight(){
    console.log("You are going right. Can no one save us");
	px = px + 1;
	if(px >= max){
		out_of_bounds_message();
		px = max-1;
	}
	writeScreen();
}


function write_Screen(){
	wire.writeBytes(0x00, screen, function(err){
	});
}

 
function out_of_bounds_message(){
    console.log("You have violated the boundries of this most holy of etch a sketch boundries. For this treachery your world shall fall victim to this incredibly unnecesarily long message. BEEB BEEB BEEB. Don't do it again");
}

sys.attachInterrupt(button1, true, sys.FALLING, setRight);
sys.attachInterrupt(button2, true, sys.FALLING, setDown);
sys.attachInterrupt(button3, true, sys.FALLING, setLeft);
sys.attachInterrupt(button4, true, sys.FALLING, setUp);
sys.attachInterrupt(button5, true, sys.FALLING, clear);
