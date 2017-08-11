var objects = [];

//create objects from grid array
for (y = 0; y < grid.height; y++) {
    for (x = 0; x < grid.width; x++) {
        if (grid.vals[y][x] != 0) {
            thisTile = "images/" + grid.vals[y][x] + ".png";
            $("body").append("<div class='tile' style='left: " + x*70 + "px; bottom: " + y*70 + "px; background: url(" + thisTile + ");'></div>");

            //ground object
            var thisObj = new Object();
            thisObj.xpos = x * 70;
            thisObj.ypos = y * 70;
            thisObj.xBox = 70;
            thisObj.yBox = 70;
            thisObj.friction = .2;
            thisObj.collide = function(target) {
                //ground collision 
                if (target.ypos+1 >= this.ypos + this.yBox) {
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
        else {
            thisTile="";
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