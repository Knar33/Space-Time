buildWorld();
layer = 1;

for (i = 1; i <= 5; i++) {
    if (i == layer) {
        $("#objdiv" + i).css("display", "block");
    } else {
        $("#objdiv" + i).css("display", "none");
    }
}

//keeps track of whether or not the player is currently phasing through time
var changing = false;
//----------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------player control---------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------

var rightDown = false;
var leftDown = false;
var upDown = false;
var downDown = false;

function leftKey(keyDown) {
    if (keyDown) {
        leftDown = true;
        player.xFace = "left";
    } else {
        leftDown = false;
    }
    
}

//these are here for the option to have alternative control schemes, like on-screen buttons for mobile
function rightKey(keyDown) {
    if (keyDown) {
        rightDown = true;
        player.xFace = "right";
    } else {
        rightDown = false;
    }
}

function upKey(keyDown) {
    if (keyDown) {
        upDown = true;
    } else {
        upDown = false;
    }
}

function downKey(keyDown) {
    if (keyDown) {
        downDown = true;
    } else {
        downDown = false;
    }
}true

function keyPressDown(key) {
    var thisKey = key.keyCode? key.keyCode : key.charCode;
    switch(thisKey) {
        //E
        case 69:
            if (layer < 5) {
                if (!changing) {
                    changing = true;
                    layer++;
                    for (i = 1; i <=5; i++) {
                        $("#objdiv" + i).css("display", "none");
                        $("#objdiv" + i)[0].classList.remove("animating");
                    }
                    $("#objdiv" + (layer-1)).css({"display":"inline-block", "position":"absolute", "z-index":"25"});
                    $("#objdiv" + layer).css({"display":"inline-block", "position":"absolute", "z-index":"50"});
                    $("#objdiv" + layer)[0].classList.add("animating");
                    setTimeout (function() {
                        changing = false;
                    }, 1000);
                }
            }
            break;
        //Q
        case 81:
            if (layer > 1) {
                if (!changing) {
                    changing = true;
                    layer--;
                    for (i = 1; i <=5; i++) {
                        $("#objdiv" + i).css("display", "none");
                        $("#objdiv" + i)[0].classList.remove("animating");
                    }
                    $("#objdiv" + (layer+1)).css({"display":"inline-block", "position":"absolute", "z-index":"25"});
                    $("#objdiv" + layer).css({"display":"inline-block", "position":"absolute", "z-index":"50"});
                    $("#objdiv" + layer)[0].classList.add("animating");
                    setTimeout (function() {
                        changing = false;
                    }, 1000);
                }
            }
            break;
        case 37:
        case 65: 
            leftKey(true);
            break;
        case 39:
        case 68:
            rightKey(true);
            break;
        case 38:
        case 87:
            upKey(true);
            break;
        case 40:
        case 83:
            downKey(true);
            break;
    }
}

function keyPressUp(key) {
    var thisKey = key.keyCode? key.keyCode : key.charCode;
    switch(thisKey) {
        case 37:
        case 65: 
            leftKey(false);
            break;
        case 39:
        case 68:
            rightKey(false);
            break;
        case 38:
        case 87:
            upKey(false);
            break;
        case 40:
        case 83:
            downKey(false);
            break;
    }
} 

function checkCollision(obj1, obj2) {
        //top left corner
            if (            obj1.xpos >= obj2.xpos && 
                            obj1.xpos <= obj2.xpos+obj2.xBox-1 && 
                obj1.ypos+obj1.yBox-1 >= obj2.ypos && 
                obj1.ypos+obj1.yBox-1 <= obj2.ypos+obj2.yBox-1) {
                    return true;
            }
        //top right corner
            if (obj1.xpos+obj1.xBox-1 >= obj2.xpos && 
                obj1.xpos+obj1.xBox-1 <= obj2.xpos+obj2.xBox-1 && 
                obj1.ypos+obj1.yBox-1 >= obj2.ypos && 
                obj1.ypos+obj1.yBox-1 <= obj2.ypos+obj2.yBox-1) {
                    return true;
            }
        //bottom left corner

            if (            obj1.xpos >= obj2.xpos && 
                            obj1.xpos <= obj2.xpos+obj2.xBox-1 && 
                            obj1.ypos >= obj2.ypos && 
                            obj1.ypos <= obj2.ypos+obj2.yBox-1) {
                    return true;
            }
        //bottom right 
            if (obj1.xpos+obj1.xBox-1 >= obj2.xpos && 
                obj1.xpos+obj1.xBox-1 <= obj2.xpos+obj2.xBox-1 && 
                            obj1.ypos >= obj2.ypos && 
                            obj1.ypos <= obj2.ypos+obj2.yBox-1) {
                    return true;
            }
    return false;
}

function updateDebug() {
    //$("#debug")[0].innerHTML="Debug<br>xpos: " + player.xpos + "<br>ypos: " + player.ypos + "<br>xspeed: " + player.xspeed.toFixed(2) + "<br>yspeed: " + player.yspeed.toFixed(2);
}

$("document").ready(function(){
    camera.scroll();
});

function applyFriction(obj) {
    if (!player.airborne) {
        if (obj.xspeed >= obj.friction) {
            obj.xspeed -= obj.friction;
        }
        else if (obj.xspeed <= -1 * obj.friction) {
            obj.xspeed += obj.friction;
        } else {
            obj.xspeed = 0;
        }
    }
}

//----------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------main runtime function--------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------

//smooth frame timing
var running = true;
var timePerFrame = (1000/60);
var frameEnd = 0;
var frameStart = window.performance.now();
var lastFrameTime = 0;
var isPaused = true;
var pauseTimer = 0;
var pauseStart = window.performance.now();

setInterval(function() {
    //timing
    pauseTimer = window.performance.now();
    if ((lastFrameTime + (pauseTimer - pauseStart)) < timePerFrame) {
        isPaused = true;
    } else {
        isPaused = false;
    }
    if (!isPaused) {
        frameStart = window.performance.now();
        
        //main running loop - 60fps
        //gravity
        if (player.yspeed > terminalVelocity)
            player.yspeed -= gravity;
        //wind resistance
        if (player.xspeed >= windResistance)
            player.xspeed -= windResistance;
        else if (player.xspeed <= -1 * windResistance)
            player.xspeed += windResistance;
        else 
            player.xspeed = 0;

        //check what player is pressing
        if (rightDown) {
            if (player.xspeed < 10)
                player.xspeed += player.moveSpeed + player.friction;
        }
        if (leftDown) {
            if (player.xspeed > -10)
                player.xspeed -= player.moveSpeed + player.friction;
        }
        if (upDown) {
            if (player.airborne == false) {
                player.yspeed += player.jumpStrength;
                player.friction = 0;
                player.airborne = true;
            }
        }
        if (downDown) {
            //nothing here yet - add down animation in future
        }

        //if player yspeed isnt 0, it means they are airborne
        if (player.yspeed != 0) {
            player.airborne = true;
        }

        //horizontal movement
        for (i = 0; i < Math.abs(player.xspeed); i++) {
            if (player.xspeed > 0) {
                player.xpos++;
                //array of all objects with x values that could potentially collide
                var returnedObjects = objects[layer].filter(function(obj) {return player.xpos + player.xBox - 1 == obj.xpos;});
                returnedObjects.forEach(function(object) {
                    if (checkCollision(player, object) || checkCollision(object, player)) {
                        object.collide(player, "left");
                    }
                });
                $(".box").css("left", player.xpos + "px");
                updateDebug();
                camera.scroll();
            } else if (player.xspeed < 0) {
                player.xpos--;
                //array of all objects with x values that could potentially collide
                var returnedObjects = objects[layer].filter(function(obj) {return  player.xpos == obj.xpos + obj.xBox - 1;});
                returnedObjects.forEach(function(object) {
                    if (checkCollision(player, object) || checkCollision(object, player)) {
                        object.collide(player, "right");
                    }
                });
                $(".box").css("left", player.xpos + "px");
                updateDebug();
                camera.scroll();
            }
        }

        //vertical movement
        for (i = 0; i < Math.abs(player.yspeed); i++) {
            if (player.yspeed > 0) {
                player.ypos++;
                //array of all objects with y values that could potentially collide
                var returnedObjects = objects[layer].filter(function(obj) {return  player.ypos + player.yBox - 1 == obj.ypos;});
                returnedObjects.forEach(function(object) {
                    if (checkCollision(player, object) || checkCollision(object, player)) {
                        object.collide(player, "bottom");
                    }
                });
                $(".box").css("bottom", player.ypos + "px");
                updateDebug();
                camera.scroll();
            } else if (player.yspeed < 0) {
                player.ypos--;
                //array of all objects with y values that could potentially collide
                var returnedObjects = objects[layer].filter(function(obj) {return  player.ypos == obj.ypos + obj.yBox - 1;});
                returnedObjects.forEach(function(object) {
                    if (checkCollision(player, object) || checkCollision(object, player)) {
                        object.collide(player, "top");
                    }
                });
                $(".box").css("bottom", player.ypos + "px");
                updateDebug();
                camera.scroll();
            }
        }

        player.animate();
        applyFriction(player);
        updateDebug();
        camera.scroll();

        //basic win condition
        if (collected == collectibles.length) {
            $(".padded")[0].innerHTML = "Return to the ship!<br><img src='images/basic_interact (4).png'>";
        }

        if (player.ypos < -200) {
            player.dead = true;
        }
        //player death check
        if (player.dead) {
            player.ypos = grid.startYPos;
            player.xpos = grid.startXPos;
            $(".box").css({"bottom": player.ypos, "left": player.xpos});
            player.dead = false;
            player.xspeed = 0;
            player.yspeed = 0;
        }
        
        frameTime = window.performance.now();
        lastFrameTime = frameTime - frameStart;
        pauseStart = window.performance.now();
        isPaused = false;
    }
}, 1);