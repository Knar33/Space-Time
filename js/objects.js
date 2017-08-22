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
                        //update debug menu
                        updateDebug();
                        
                        camera.xPos = window.innerWidth / 2;
                        camera.yPos = window.innerHeight / 2;
                    }
                    objects.push(thisObj);
                    break;
                    
                //collectible objects
                case "44":
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
                    thisObj.friction = .2;
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
                    }
                    objects.push(thisObj);
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
blockLeft.xpos = -2;
blockLeft.ypos = 0;
blockLeft.xBox = 2;
blockLeft.yBox = 5000;
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
blockRight.ypos = 0;
blockRight.xBox = 2;
blockRight.yBox = 5000;
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