var objects = [];

//create background layer 1 images
for (y = 0; y < grid.height; y++) {
    for (x = 0; x < grid.width; x++) {
        if (grid.vals1[y][x] != 0) {
            thisTile = "images/" + grid.vals1[y][x] + ".png";
            $("body").append("<img class='tile' style='left: " + x*70 + "px; bottom: " + y*70 + "px; z-index: 1;' src='" + thisTile + "'>");
        }
    }
}

//create background layer 2 images
for (y = 0; y < grid.height; y++) {
    for (x = 0; x < grid.width; x++) {
        if (grid.vals2[y][x] != 0) {
            thisTile = "images/" + grid.vals2[y][x] + ".png";
            $("body").append("<img class='tile' style='left: " + x*70 + "px; bottom: " + y*70 + "px; z-index: 6;' src='" + thisTile + "'>");
        }
    }
}

//create foreground layer images
for (y = 0; y < grid.height; y++) {
    for (x = 0; x < grid.width; x++) {
        if (grid.vals4[y][x] != 0) {
            thisTile = "images/" + grid.vals4[y][x] + ".png";
            $("body").append("<img class='tile' style='left: " + x*70 + "px; bottom: " + y*70 + "px; z-index: 5;' src='" + thisTile + "'>");
        }
    }
}

//create player level objects from grid array
for (y = 0; y < grid.height; y++) {
    for (x = 0; x < grid.width; x++) {
        if (grid.vals3[y][x] != 0) {
            thisTile = "images/" + grid.vals3[y][x] + ".png";
            $("body").append("<img class='tile' style='left: " + x*70 + "px; bottom: " + y*70 + "px; z-index: 3;' src='" + thisTile + "'>");

            switch(grid.vals3[y][x]) {
                //spring
                case "41":
                    var thisObj = new Object();
                    thisObj.xpos = x * 70;
                    thisObj.ypos = y * 70;
                    thisObj.xBox = 70;
                    thisObj.yBox = 50;
                    thisObj.friction = .2;
                    thisObj.collide = function(target) {
                        //collision from above
                        if (target.ypos == this.ypos + this.yBox - 1 
                                && 
                                (
                                    (
                                        (target.xpos+target.xBox-1 > this.xpos) && (target.xpos+target.xBox-1 <= this.xpos+this.xBox-1)
                                    ) 
                                    || 
                                    (
                                        (target.xpos < this.xpos+this.xBox-1) && (target.xpos >= this.xpos)
                                    )
                                )
                           ) {
                            target.yspeed = 33;
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
                
                //basic ground object
                default:
                    var thisObj = new Object();
                    thisObj.xpos = x * 70;
                    thisObj.ypos = y * 70;
                    thisObj.xBox = 70;
                    thisObj.yBox = 70;
                    thisObj.friction = .2;
                    thisObj.collide = function(target) {
                        //collision from above
                        if (target.ypos == this.ypos + this.yBox - 1 
                                && 
                                (
                                    (
                                        (target.xpos+target.xBox-1 > this.xpos) && (target.xpos+target.xBox-1 <= this.xpos+this.xBox-1)
                                    ) 
                                    || 
                                    (
                                        (target.xpos < this.xpos+this.xBox-1) && (target.xpos >= this.xpos)
                                    )
                                )
                           ) {
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
                        } 
                        //update debug menu
                        updateDebug();
                    }
                    objects.push(thisObj);
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