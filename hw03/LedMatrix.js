#!/usr/bin/env node

//Hazen Hamather
//Initializing requirements
var i2c = require('i2c');
var b = require('bonescript');
var port = '/dev/i2c-2';

var matrix = 0x70;
var time = 1000; // Delay between images in ms
var empty = 0x00;

var wire = new i2c(0x70, {
    device: '/dev/i2c-2'
});

// Initializing the starting coordinates of the etch a sketch
var c = 0;
var y = 0;

//Initializing each of the directional buttons
var button1 = 'P9_11';
var button2 = 'P9_13';
var button3 = 'P9_22';
var button4 = 'P9_17';

//Setting the pin mode for each of the buttons
b.pinMode(button1, b.INPUT);
b.pinMode(button2, b.INPUT);
b.pinMode(button3, b.INPUT);
b.pinMode(button4, b.INPUT);

//Attaching interrupts to each of the buttons
b.attachInterrupt(button1, true, b.FALLING, moveUp);
b.attachInterrupt(button2, true, b.FALLING, moveDown);
b.attachInterrupt(button3, true, b.FALLING, moveRight);
b.attachInterrupt(button4, true, b.FALLING, moveLeft);

var rows = 8;
var cols = rows;
var board = new Array(rows);

for (i = 0; i < rows; i++) {
    board[i] = new Array(cols);
    for (j = 0; j < cols;j++) {
        board[i][j] = "0";
    }
};
board[y][c] = "1";
printBoard(board, cols, rows);

// The first byte is GREEN, the second is RED.

function printBoard(board,cols,rows) {
    var game = [];
    for (i = rows -1; i >= 0; i--) {
        var line = "";
        for (j = 0;j < rows; j++) {
            line += board[i][j];
        }
        line = parseInt(line,2);
        game.push(line);
        game.push(0x00);
        
    }
    
    wire.writeByte(0x21, function(err) {            // Start oscillator (p10)
        wire.writeByte(0x81, function(err) {        // Disp on, blink off (p11)
            wire.writeByte(0xe7, function(err) {    // Full brightness (page 15)

            });
        });
    });
    
    wire.writeBytes(0x00, game, function(err) {
 
    });
};

function moveUp(x) {
    if (y-1 >= 0) {
        y--;
        board[y][c] = "1";
        printBoard(board, cols, rows);
    }
};

function moveDown(x) {
    if (y+1 < rows) {
        y++;
        board[y][c] = "1";
        printBoard(board, cols, rows);
    }
};

function moveRight(x) {
    if (c+1 < cols) {
        c++;
        board[y][c] = "1";
        printBoard(board, cols, rows);
    }
};

function moveLeft(x) {
    if (c-1 >= 0) {
        c--;
        board[y][c] = "1";
        printBoard(board, cols, rows);
    }
};