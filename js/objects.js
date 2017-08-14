var objects = [];
var collectibles = [];
var collected = 0;

//create background layer 1 images
for (y = 0; y < grid.height; y++) {
    for (x = 0; x < grid.width; x++) {
        if (grid.vals[1][y][x] != 0) {
            thisTile = "images/" + grid.vals[1][y][x] + ".png";
            $("body").append("<img class='tile' style='left: " + x*70 + "px; bottom: " + y*70 + "px; z-index: 1;' src='" + thisTile + "'>");
        }
    }
}

//create background layer 2 images
for (y = 0; y < grid.height; y++) {
    for (x = 0; x < grid.width; x++) {
        if (grid.vals[2][y][x] != 0) {
            thisTile = "images/" + grid.vals[2][y][x] + ".png";
            $("body").append("<img class='tile' style='left: " + x*70 + "px; bottom: " + y*70 + "px; z-index: 2' src='" + thisTile + "'>");
        }
    }
}

//create foreground layer images
for (y = 0; y < grid.height; y++) {
    for (x = 0; x < grid.width; x++) {
        if (grid.vals[4][y][x] != 0) {
            thisTile = "images/" + grid.vals[4][y][x] + ".png";
            $("body").append("<img class='tile' style='left: " + x*70 + "px; bottom: " + y*70 + "px; z-index: 4;' src='" + thisTile + "'>");
        }
    }
}

//create player level objects from grid array
for (y = 0; y < grid.height; y++) {
    for (x = 0; x < grid.width; x++) {
        if (grid.vals[3][y][x] != 0) {
            thisTile = "images/" + grid.vals[3][y][x] + ".png";
            $("body").append("<img class='tile' style='left: " + x*70 + "px; bottom: " + y*70 + "px; z-index: 3;' src='" + thisTile + "'>");

            switch(grid.vals[3][y][x]) {
                //spring
                case "41":
                    var thisObj = new Object();
                    thisObj.xpos = x * 70;
                    thisObj.ypos = y * 70;
                    thisObj.xBox = 70;
                    thisObj.yBox = 50;
                    thisObj.friction = .2;
                    thisObj.collide = function(target, direction) {
                        //collision from above
                        if (direction == "top") {
                            target.yspeed = 25;
                            target.airborne = true;
                            if (target.xspeed >= this.friction) {
                                target.xspeed -= this.friction;
                            }
                            else if (target.xspeed <= -1 * this.friction) {
                                target.xspeed += this.friction;
                            }
                            else 
                                target.xspeed = 0;
                        } 
                        //update debug menu
                        updateDebug();
                    }
                    objects.push(thisObj);
                    break;
                
                //collectible object
                case "44":
                    var thisObj = new Object();
                    thisObj.xpos = x * 70;
                    thisObj.ypos = y * 70;
                    thisObj.xBox = 70;
                    thisObj.yBox = 70;
                    thisObj.collide = function(target, direction) {
                        collected++;
                        //destroy thisObj
                    }
                    objects.push(thisObj);
                    collectibles.push(thisObj);
                    break;    
                    
                //basic ground object
                default:
                    var thisObj = new Object();
                    thisObj.xpos = x * 70;
                    thisObj.ypos = y * 70;
                    thisObj.xBox = 70;
                    thisObj.yBox = 70;
                    thisObj.friction = .2;
                    thisObj.collide = function(target, direction) {
                        if (direction == "top") {
                            target.yspeed = 0;
                            target.airborne = false;
                            if (target.xspeed >= this.friction) {
                                target.xspeed -= this.friction;
                            }
                            else if (target.xspeed <= -1 * this.friction) {
                                target.xspeed += this.friction;
                            }
                            else 
                                target.xspeed = 0;
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
                }
            }
    }
}

//left boundry
var blockLeft = new Object();
blockLeft.myID = boxleft;
blockLeft.xpos = -2;
blockLeft.ypos = 0;
blockLeft.xBox = 2;
blockLeft.yBox = 5000;
blockLeft.collide = function(target) {};
objects.push(blockLeft);

//right boundry
var blockRight = new Object();
blockRight.myID = boxright;
blockRight.xpos = grid.width * 70;
blockRight.ypos = 0;
blockRight.xBox = 2;
blockRight.yBox = 5000;
blockRight.collide = function(target) {};
objects.push(blockRight);