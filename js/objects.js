$("body").append("<div id='objdiv' style='overflow: hidden; position: relative; top: 0; left: 0; height: " + (grid.height * 70 - 2) + "px; width: " + (grid.width  * 70) + "px;'><div id='box' class='box'></div></div>");

var objects = [];
var collectibles = [];
var collected = 0;

//create background layer 1 images
for (y = 0; y < grid.height; y++) {
    for (x = 0; x < grid.width; x++) {
        if (grid.vals[1][y][x] != 0) {
            thisTile = "images/" + grid.vals[1][y][x] + ".png";
            $("#objdiv").append("<img class='tile' style='position: absolute; left: " + x*70 + "px; bottom: " + y*70 + "px; z-index: 1;' src='" + thisTile + "'>");
        }
    }
}

//create background layer 2 images
for (y = 0; y < grid.height; y++) {
    for (x = 0; x < grid.width; x++) {
        if (grid.vals[2][y][x] != 0) {
            thisTile = "images/" + grid.vals[2][y][x] + ".png";
            $("#objdiv").append("<img class='tile' style='position: absolute; left: " + x*70 + "px; bottom: " + y*70 + "px; z-index: 2' src='" + thisTile + "'>");
        }
    }
}

//create foreground layer images
for (y = 0; y < grid.height; y++) {
    for (x = 0; x < grid.width; x++) {
        if (grid.vals[4][y][x] != 0) {
            thisTile = "images/" + grid.vals[4][y][x] + ".png";
            $("#objdiv").append("<img class='tile' style='position: absolute; left: " + x*70 + "px; bottom: " + y*70 + "px; z-index: 4;' src='" + thisTile + "'>");
        }
    }
}

//create player level objects from grid array
for (y = 0; y < grid.height; y++) {
    for (x = 0; x < grid.width; x++) {
        if (grid.vals[3][y][x] != 0) {
            thisTile = "images/" + grid.vals[3][y][x] + ".png";
            $("#objdiv").append("<img class='tile' id='" + x + "-" + y + "' style='position: absolute; left: " + x*70 + "px; bottom: " + y*70 + "px; z-index: 3;' src='" + thisTile + "'>");
            
            
            switch(grid.vals[3][y][x]) {
                    
//left facing rounded bottom edges
                case "4":
                case "12":
                case "20":
                case "28":
                    var thisObj = new Object();
                    thisObj.xpos = x * 70;
                    thisObj.ypos = (y * 70) + 42;
                    thisObj.xBox = 7;
                    thisObj.yBox = 28;
                    thisObj.friction = .1;
                    thisObj.collide = function(target, direction) {
                        if (direction == "top") {
                            target.yspeed = 0;
                            target.airborne = false;
                            target.friction = this.friction;
                            player.ypos++;
                        } 
                        if (direction == "bottom") {
                            player.ypos--;
                            player.yspeed -= .15;
                        } 
                        if (direction == "left") {
                            player.xpos--;
                            player.xspeed = 0;
                        } 
                        if (direction == "right") {
                            player.xpos++;
                            player.xspeed = 0;
                        } 
                        //update debug menu
                        updateDebug();
                    }
                    objects.push(thisObj);
                    
                    var thisObj2 = Object.assign({}, thisObj);
                    var thisObj3 = Object.assign({}, thisObj);
                    var thisObj4 = Object.assign({}, thisObj);
                    var thisObj5 = Object.assign({}, thisObj);
                    
                    
                    thisObj2.xpos = (x * 70) + 7;
                    thisObj2.ypos = (y * 70) + 33;
                    thisObj2.xBox = 6;
                    thisObj2.yBox = 37;
                    objects.push(thisObj2);
                    
                    thisObj3.xpos = (x * 70) + 13;
                    thisObj3.ypos = (y * 70) + 26;
                    thisObj3.xBox = 9;
                    thisObj3.yBox = 44;
                    objects.push(thisObj3);
                    
                    thisObj4.xpos = (x * 70) + 22;
                    thisObj4.ypos = (y * 70) + 19;
                    thisObj4.xBox = 25;
                    thisObj4.yBox = 51;
                    objects.push(thisObj4);
                    
                    thisObj5.xpos = (x * 70) + 47;
                    thisObj5.ypos = (y * 70) + 4;
                    thisObj5.xBox = 23;
                    thisObj5.yBox = 66;
                    objects.push(thisObj5);
                    break;
                
//snowy left facing rounded bottom edges
                case "36":
                    var thisObj = new Object();
                    thisObj.xpos = x * 70;
                    thisObj.ypos = (y * 70) + 42;
                    thisObj.xBox = 7;
                    thisObj.yBox = 28;
                    thisObj.friction = .01;
                    thisObj.collide = function(target, direction) {
                        if (direction == "top") {
                            target.yspeed = 0;
                            target.airborne = false;
                            target.friction = this.friction;
                            player.ypos++;
                        } 
                        if (direction == "bottom") {
                            player.ypos--;
                            player.yspeed -= .15;
                        } 
                        if (direction == "left") {
                            player.xpos--;
                            player.xspeed = 0;
                            
                        } 
                        if (direction == "right") {
                            player.xpos++;
                            player.xspeed = 0;
                        } 
                        //update debug menu
                        updateDebug();
                    }
                    objects.push(thisObj);
                    
                    var thisObj2 = Object.assign({}, thisObj);
                    var thisObj3 = Object.assign({}, thisObj);
                    var thisObj4 = Object.assign({}, thisObj);
                    var thisObj5 = Object.assign({}, thisObj);
                    
                    
                    thisObj2.xpos = (x * 70) + 7;
                    thisObj2.ypos = (y * 70) + 33;
                    thisObj2.xBox = 6;
                    thisObj2.yBox = 37;
                    objects.push(thisObj2);
                    
                    thisObj3.xpos = (x * 70) + 13;
                    thisObj3.ypos = (y * 70) + 26;
                    thisObj3.xBox = 9;
                    thisObj3.yBox = 44;
                    objects.push(thisObj3);
                    
                    thisObj4.xpos = (x * 70) + 22;
                    thisObj4.ypos = (y * 70) + 19;
                    thisObj4.xBox = 25;
                    thisObj4.yBox = 51;
                    objects.push(thisObj4);
                    
                    thisObj5.xpos = (x * 70) + 47;
                    thisObj5.ypos = (y * 70) + 4;
                    thisObj5.xBox = 23;
                    thisObj5.yBox = 66;
                    objects.push(thisObj5);
                    break;
                    
//left facing cliff edge
                case "5":
                case "13":
                case "21":
                case "29":
                    var thisObj = new Object();
                    thisObj.xpos = x * 70;
                    thisObj.ypos = (y * 70) + 52;
                    thisObj.xBox = 15;
                    thisObj.yBox = 18;
                    thisObj.friction = .1;
                    thisObj.collide = function(target, direction) {
                        if (direction == "top") {
                            target.yspeed = 0;
                            target.airborne = false;
                            target.friction = this.friction;
                            player.ypos++;
                        } 
                        if (direction == "bottom") {
                            player.ypos--;
                            player.yspeed -= .15;
                        } 
                        if (direction == "left") {
                            player.xpos--;
                            player.xspeed = 0;
                        } 
                        if (direction == "right") {
                            player.xpos++;
                            player.xspeed = 0;
                        } 
                        //update debug menu
                        updateDebug();
                    }
                    objects.push(thisObj);
                    
                    var thisObj2 = Object.assign({}, thisObj);
                    var thisObj3 = Object.assign({}, thisObj);
                    var thisObj4 = Object.assign({}, thisObj);
                    var thisObj5 = Object.assign({}, thisObj);
                    
                    
                    thisObj2.xpos = (x * 70) + 14;
                    thisObj2.ypos = (y * 70) + 43;
                    thisObj2.xBox = 16;
                    thisObj2.yBox = 27;
                    objects.push(thisObj2);
                    
                    thisObj3.xpos = (x * 70) + 31;
                    thisObj3.ypos = (y * 70) + 32;
                    thisObj3.xBox = 20;
                    thisObj3.yBox = 38;
                    objects.push(thisObj3);
                    
                    thisObj4.xpos = (x * 70) + 51;
                    thisObj4.ypos = y * 70;
                    thisObj4.xBox = 19;
                    thisObj4.yBox = 70;
                    objects.push(thisObj4);
                    break;
                    
//snowy left facing cliff edge
                case "37":
                    var thisObj = new Object();
                    thisObj.xpos = x * 70;
                    thisObj.ypos = (y * 70) + 52;
                    thisObj.xBox = 10;
                    thisObj.yBox = 18;
                    thisObj.friction = .01;
                    thisObj.collide = function(target, direction) {
                        if (direction == "top") {
                            target.yspeed = 0;
                            target.airborne = false;
                            target.friction = this.friction;
                            player.ypos++;
                        } 
                        if (direction == "bottom") {
                            player.ypos--;
                            player.yspeed -= .15;
                        } 
                        if (direction == "left") {
                            player.xpos--;
                            player.xspeed = 0;
                        } 
                        if (direction == "right") {
                            player.xpos++;
                            player.xspeed = 0;
                        } 
                        //update debug menu
                        updateDebug();
                    }
                    objects.push(thisObj);
                    
                    var thisObj2 = Object.assign({}, thisObj);
                    var thisObj3 = Object.assign({}, thisObj);
                    var thisObj4 = Object.assign({}, thisObj);
                    
                    thisObj2.xpos = (x * 70) + 14;
                    thisObj2.ypos = (y * 70) + 43;
                    thisObj2.xBox = 16;
                    thisObj2.yBox = 27;
                    objects.push(thisObj2);
                    
                    thisObj3.xpos = (x * 70) + 31;
                    thisObj3.ypos = (y * 70) + 32;
                    thisObj3.xBox = 20;
                    thisObj3.yBox = 38;
                    objects.push(thisObj3);
                    
                    thisObj4.xpos = (x * 70) + 51;
                    thisObj4.ypos = y * 70;
                    thisObj4.xBox = 19;
                    thisObj4.yBox = 70;
                    objects.push(thisObj4);
                    break;
                    
//right facing rounded bottom edges
                case "6":
                case "14":
                case "22":
                case "30":
                    var thisObj = new Object();
                    thisObj.xpos = x * 70;
                    thisObj.ypos = (y * 70) + 4;
                    thisObj.xBox = 23;
                    thisObj.yBox = 66;
                    thisObj.friction = .1;
                    thisObj.collide = function(target, direction) {
                        if (direction == "top") {
                            target.yspeed = 0;
                            target.airborne = false;
                            target.friction = this.friction;
                            player.ypos++;
                        } 
                        if (direction == "bottom") {
                            player.ypos--;
                        } 
                        if (direction == "left") {
                            player.xpos--;
                            player.xspeed = 0;
                        } 
                        if (direction == "right") {
                            player.xpos++;
                            player.xspeed = 0;
                        } 
                        //update debug menu
                        updateDebug();
                    }
                    objects.push(thisObj);
                    
                    var thisObj2 = Object.assign({}, thisObj);
                    var thisObj3 = Object.assign({}, thisObj);
                    var thisObj4 = Object.assign({}, thisObj);
                    var thisObj5 = Object.assign({}, thisObj);
                    
                    
                    thisObj2.xpos = (x * 70) + 23;
                    thisObj2.ypos = (y * 70) + 19;
                    thisObj2.xBox = 25;
                    thisObj2.yBox = 51;
                    objects.push(thisObj2);
                    
                    thisObj3.xpos = (x * 70) + 48;
                    thisObj3.ypos = (y * 70) + 26;
                    thisObj3.xBox = 9;
                    thisObj3.yBox = 44;
                    objects.push(thisObj3);
                    
                    thisObj4.xpos = (x * 70) + 57;
                    thisObj4.ypos = (y * 70) + 33;
                    thisObj4.xBox = 6;
                    thisObj4.yBox = 37;
                    objects.push(thisObj4);
                    
                    thisObj5.xpos = (x * 70) + 63;
                    thisObj5.ypos = (y * 70) + 42;
                    thisObj5.xBox = 7;
                    thisObj5.yBox = 28;
                    objects.push(thisObj5);
                    break;
                
//snowy right facing rounded bottom edges
                case "38":
                    var thisObj = new Object();
                    thisObj.xpos = x * 70;
                    thisObj.ypos = (y * 70) + 4;
                    thisObj.xBox = 23;
                    thisObj.yBox = 66;
                    thisObj.friction = .01;
                    thisObj.collide = function(target, direction) {
                        if (direction == "top") {
                            target.yspeed = 0;
                            target.airborne = false;
                            target.friction = this.friction;
                            player.ypos++;
                        } 
                        if (direction == "bottom") {
                            player.ypos--;
                        } 
                        if (direction == "left") {
                            player.xpos--;
                            player.xspeed = 0;
                        } 
                        if (direction == "right") {
                            player.xpos++;
                            player.xspeed = 0;
                        } 
                        //update debug menu
                        updateDebug();
                    }
                    objects.push(thisObj);
                    
                    var thisObj2 = Object.assign({}, thisObj);
                    var thisObj3 = Object.assign({}, thisObj);
                    var thisObj4 = Object.assign({}, thisObj);
                    var thisObj5 = Object.assign({}, thisObj);
                    
                    
                    thisObj2.xpos = (x * 70) + 23;
                    thisObj2.ypos = (y * 70) + 19;
                    thisObj2.xBox = 25;
                    thisObj2.yBox = 51;
                    objects.push(thisObj2);
                    
                    thisObj3.xpos = (x * 70) + 48;
                    thisObj3.ypos = (y * 70) + 26;
                    thisObj3.xBox = 9;
                    thisObj3.yBox = 44;
                    objects.push(thisObj3);
                    
                    thisObj4.xpos = (x * 70) + 57;
                    thisObj4.ypos = (y * 70) + 33;
                    thisObj4.xBox = 6;
                    thisObj4.yBox = 37;
                    objects.push(thisObj4);
                    
                    thisObj5.xpos = (x * 70) + 63;
                    thisObj5.ypos = (y * 70) + 42;
                    thisObj5.xBox = 7;
                    thisObj5.yBox = 28;
                    objects.push(thisObj5);
                    break;
                  
//right facing cliff edge
                case "7":
                case "15":
                case "23":
                case "31":
                    var thisObj = new Object();
                    thisObj.xpos = (x * 70) + 51;
                    thisObj.ypos = (y * 70) + 51;
                    thisObj.xBox = 19;
                    thisObj.yBox = 19;
                    thisObj.friction = .1;
                    thisObj.collide = function(target, direction) {
                        if (direction == "top") {
                            target.yspeed = 0;
                            target.airborne = false;
                            target.friction = this.friction;
                            player.ypos++;
                        } 
                        if (direction == "bottom") {
                            player.ypos--;
                            player.yspeed -= .15;
                        } 
                        if (direction == "left") {
                            player.xpos--;
                            player.xspeed = 0;
                        } 
                        if (direction == "right") {
                            player.xpos++;
                            player.xspeed = 0;
                        } 
                        //update debug menu
                        updateDebug();
                    }
                    objects.push(thisObj);
                    
                    var thisObj2 = Object.assign({}, thisObj);
                    var thisObj3 = Object.assign({}, thisObj);
                    var thisObj4 = Object.assign({}, thisObj);
                    var thisObj5 = Object.assign({}, thisObj);
                    
                    
                    thisObj2.xpos = (x * 70) + 31;
                    thisObj2.ypos = (y * 70) + 43;
                    thisObj2.xBox = 20;
                    thisObj2.yBox = 27;
                    objects.push(thisObj2);
                    
                    thisObj3.xpos = (x * 70) + 15;
                    thisObj3.ypos = (y * 70) + 32;
                    thisObj3.xBox = 16;
                    thisObj3.yBox = 38;
                    objects.push(thisObj3);
                    
                    thisObj4.xpos = x * 70;
                    thisObj4.ypos = y * 70;
                    thisObj4.xBox = 15;
                    thisObj4.yBox = 70;
                    objects.push(thisObj4);
                    break;

//right facing snowy cliff edge
                case "39":
                    var thisObj = new Object();
                    thisObj.xpos = (x * 70) + 51;
                    thisObj.ypos = (y * 70) + 51;
                    thisObj.xBox = 19;
                    thisObj.yBox = 18;
                    thisObj.friction = .01;
                    thisObj.collide = function(target, direction) {
                        if (direction == "top") {
                            target.yspeed = 0;
                            target.airborne = false;
                            target.friction = this.friction;
                            player.ypos++;
                        } 
                        if (direction == "bottom") {
                            player.ypos--;
                            player.yspeed -= .15;
                        } 
                        if (direction == "left") {
                            player.xpos--;
                            player.xspeed = 0;
                        } 
                        if (direction == "right") {
                            player.xpos++;
                            player.xspeed = 0;
                        } 
                        //update debug menu
                        updateDebug();
                    }
                    objects.push(thisObj);
                    
                    var thisObj2 = Object.assign({}, thisObj);
                    var thisObj3 = Object.assign({}, thisObj);
                    var thisObj4 = Object.assign({}, thisObj);
                    var thisObj5 = Object.assign({}, thisObj);
                    
                    
                    thisObj2.xpos = (x * 70) + 31;
                    thisObj2.ypos = (y * 70) + 43;
                    thisObj2.xBox = 20;
                    thisObj2.yBox = 27;
                    objects.push(thisObj2);
                    
                    thisObj3.xpos = (x * 70) + 15;
                    thisObj3.ypos = (y * 70) + 32;
                    thisObj3.xBox = 16;
                    thisObj3.yBox = 38;
                    objects.push(thisObj3);
                    
                    thisObj4.xpos = x * 70;
                    thisObj4.ypos = y * 70;
                    thisObj4.xBox = 15;
                    thisObj4.yBox = 70;
                    objects.push(thisObj4);
                    break;
                    
//normal square tiles
                case "1":
                case "2":
                case "3":
                case "8":
                case "9":
                case "10":
                case "11":
                case "16":
                case "17":
                case "18":
                case "19":
                case "24":
                case "25":
                case "26":
                case "27":
                case "32":
                    var thisObj = new Object();
                    thisObj.xpos = x * 70;
                    thisObj.ypos = y * 70;
                    thisObj.xBox = 70;
                    thisObj.yBox = 70;
                    thisObj.friction = .7;
                    thisObj.collide = function(target, direction) {
                        if (direction == "top") {
                            target.yspeed = 0;
                            target.airborne = false;
                            target.friction = this.friction;
                            player.ypos++;
                        } 
                        if (direction == "bottom") {
                            player.ypos--;
                            player.yspeed -= .15;
                        } 
                        if (direction == "left") {
                            player.xpos--;
                            player.xspeed = 0;
                        } 
                        if (direction == "right") {
                            player.xpos++;
                            player.xspeed = 0;
                        } 
                        //update debug menu
                        updateDebug();
                    }
                    objects.push(thisObj);
                    break;
                
//square snow tiles
                case "33":
                case "34":
                case "35":
                case "40":
                    var thisObj = new Object();
                    thisObj.xpos = x * 70;
                    thisObj.ypos = y * 70;
                    thisObj.xBox = 70;
                    thisObj.yBox = 70;
                    thisObj.friction = .05
                    thisObj.collide = function(target, direction) {
                        if (direction == "top") {
                            target.yspeed = 0;
                            target.airborne = false;
                            target.friction = this.friction;
                            player.ypos++;
                        } 
                        if (direction == "bottom") {
                            player.ypos--;
                            player.yspeed = 0;
                        } 
                        if (direction == "left") {
                            player.xpos--;
                            player.xspeed = 0;
                        } 
                        if (direction == "right") {
                            player.xpos++;
                            player.xspeed = 0;
                        } 
                        //update debug menu
                        updateDebug();
                    }
                    objects.push(thisObj);
                    break;
                    
//spring
                case "41":
                    var thisObj = new Object();
                    thisObj.xpos = x * 70;
                    thisObj.ypos = y * 70;
                    thisObj.xBox = 70;
                    thisObj.yBox = 50;
                    thisObj.collide = function(target, direction) {
                        //collision from above
                        if (direction == "top") {
                            target.yspeed = 25;
                            target.airborne = true;
                        } 
                        //update debug menu
                        updateDebug();
                    }
                    objects.push(thisObj);
                    break;
                    
//spikes
                case "42":
                    var thisObj = new Object();
                    thisObj.xpos = x * 70;
                    thisObj.ypos = y * 70;
                    thisObj.xBox = 70;
                    thisObj.yBox = 35;
                    thisObj.collide = function(target, direction) {
                        if (direction == "top") {
                            $("#objdiv").append("<div class='bloodSpikes' style='left: " + this.xpos + "px; bottom: " + this.ypos + "px;'></div>");
                            player.dead = true;
                        } 
                        if (direction == "bottom") {
                            player.ypos--;
                            player.yspeed = 0;
                        } 
                        if (direction == "left") {
                            player.xpos--;
                            player.xspeed = 0;
                        } 
                        if (direction == "right") {
                            player.xpos++;
                            player.xspeed = 0;
                        } 
                        updateDebug();
                    }
                    objects.push(thisObj);
                    break;

//water top
                case "111":
                    var thisObj = new Object();
                    thisObj.xpos = x * 70;
                    thisObj.ypos = y * 70;
                    thisObj.xBox = 70;
                    thisObj.yBox = 35;
                    thisObj.collide = function(target, direction) {
                        player.dead = true;
                        updateDebug();
                    }
                    objects.push(thisObj);
                    break;
                    
//water body
                case "112": 
                    var thisObj = new Object();
                    thisObj.xpos = x * 70;
                    thisObj.ypos = y * 70;
                    thisObj.xBox = 70;
                    thisObj.yBox = 70;
                    thisObj.collide = function(target, direction) {
                        player.dead = true;
                        updateDebug();
                    }
                    objects.push(thisObj);
                    break;
                    
//collectible objects
                case "44":
                case "45":
                    var thisObj = new Object();
                    thisObj.xpos = x * 70;
                    thisObj.ypos = y * 70;
                    thisObj.xBox = 70;
                    thisObj.yBox = 70;
                    thisObj.id = x + "-" + y;
                    thisObj.collide = function(target, direction) {
                        collected++;
                        this.xpos = -1000;
                        $("#" + this.id)[0].style.display = "none";
                        $("#" + this.id + "-gui")[0].style.display = "none";
                    }
                    objects.push(thisObj);
                    collectibles.push(thisObj);
                    $(".ui").append("<img src='" + thisTile + "' id='" + x + "-" + y + "-gui'>");
                    break;    
                
//Spaceship
                case "48":
                    var thisObj = new Object();
                    thisObj.xpos = x * 70;
                    thisObj.ypos = y * 70;
                    thisObj.xBox = 120;
                    thisObj.yBox = 70;
                    thisObj.friction = .1;
                    thisObj.collide = function(target, direction) {
                        if (collected == collectibles.length) {
                            if (level == maxLevels) {
                                window.location = "win.html";
                            } else {
                                window.location = "level_" + parseInt(level+1) + ".html";
                            }
                        }
                        if (direction == "top") {
                            target.yspeed = 0;
                            target.airborne = false;
                            target.friction = this.friction;
                            player.ypos++;
                        } 
                        if (direction == "bottom") {
                            player.ypos--;
                            player.yspeed -= .15;
                        } 
                        if (direction == "left") {
                            player.xpos--;
                            player.xspeed = 0;
                        } 
                        if (direction == "right") {
                            player.xpos++;
                            player.xspeed = 0;
                        } 
                    }
                    objects.push(thisObj);
                    break; 
                    
//Default object (no collision)
                default:
                    var thisObj = new Object();
                    thisObj.xpos = x * 70;
                    thisObj.ypos = y * 70;
                    thisObj.xBox = 0;
                    thisObj.yBox = 0;
                    thisObj.collide = function(target, direction) {
                    }
                    objects.push(thisObj);
                    break;
                }
            }
    }
}

//left boundry
var blockLeft = new Object();
blockLeft.xpos = -2;
blockLeft.ypos = -500;
blockLeft.xBox = 2;
blockLeft.yBox = 10000;
blockLeft.collide = function(target, direction) {
    if (direction == "left") {
        player.xpos--;
        player.xspeed = 0;
    } 
    if (direction == "right") {
        player.xpos++;
        player.xspeed = 0;
    } 
};
objects.push(blockLeft);

//right boundry
var blockRight = new Object();
blockRight.xpos = grid.width * 70;
blockRight.ypos = -500;
blockRight.xBox = 2;
blockRight.yBox = 10000;
blockRight.collide = function(target, direction) {
    if (direction == "left") {
        player.xpos--;
        player.xspeed = 0;
    } 
    if (direction == "right") {
        player.xpos++;
        player.xspeed = 0;
    } 
};
objects.push(blockRight);