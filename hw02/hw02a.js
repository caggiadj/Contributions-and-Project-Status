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


sys.pinMode(button1, sys.INPUT, 7, 'pulldown');
sys.pinMode(button2, sys.INPUT, 7, 'pulldown');
sys.pinMode(button3, sys.INPUT, 7, 'pulldown');
sys.pinMode(button4, sys.INPUT, 7, 'pulldown');


sys.pinMode(led1, sys.OUTPUT);
sys.pinMode(led2, sys.OUTPUT);
sys.pinMode(led3, sys.OUTPUT);
sys.pinMode(led4, sys.OUTPUT);

sys.attachInterrupt(button1, true, sys.CHANGE, changeLED);
sys.attachInterrupt(button2, true, sys.CHANGE, changeLED);
sys.attachInterrupt(button3, true, sys.CHANGE, changeLED);
sys.attachInterrupt(button4, true, sys.CHANGE, changeLED);


console.log('Beginning System Initiated. Commencing takeover of Earth');

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
