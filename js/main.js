//physics variables
var gravity = .7;
var windResistance = .05;
var terminalVelocity = -20;

//----------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------camera object----------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------

var camera = new Object();
camera.xPos = grid.startXPos;
camera.yPos = grid.startYPos;
camera.scroll = function() {
    window.scrollTo(camera.xPos - (window.innerWidth / 2), (grid.height * 70) - camera.yPos - (window.innerHeight / 2));
}

//----------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------player object----------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------

//player object
var player = new Object();
player.myID = box;
player.xspeed = 0;
player.yspeed = 0;
player.xpos = grid.startXPos;
player.ypos = grid.startYPos;
player.xBox = 70;
player.yBox = 92;
player.animFrame = 0;
player.jumpStrength = 20;
player.airborne = true;
player.moveSpeed = .5;
player.xFace = "right";
player.dead = false;
player.walk = [[0, 0], [71, 0], [142, 0], [0, 95], [71, 95], [142, 95], [213, 0], [284, 0], [213, 95], [355, 0], [284, 95]];
player.friction = 0;
//player animations
player.animate = function() {
    //jump
    if (player.yspeed > 0 && player.airborne) {
        player.animFrame = 0;
        if (player.xFace == "right") {
            $("#box")[0].style.backgroundPosition = "-423px -95px";
        } else if (player.xFace == "left") {
            $("#box")[0].style.backgroundPosition = "493px -95px";
        }
    }
    //falling
    else if (player.yspeed < 0 && player.airborne) {
        player.animFrame = 0
        if (player.xFace == "right") {
            $("#box")[0].style.backgroundPosition = "-423px 0px";
        } else if (player.xFace == "left") {
            $("#box")[0].style.backgroundPosition = "494px 0px";
        }
    }
    //crouching
    else if (downDown && !rightDown && !leftDown) {
        player.animFrame = 0;
        if (player.xFace == "right") {
            $("#box")[0].style.backgroundPosition = "-352px -94px";
        } else if (player.xFace == "left") {
            $("#box")[0].style.backgroundPosition = "423px -94px";
        }
    }
    //standing
    else if (!rightDown && !leftDown) {
        player.animFrame = 0;
        if (player.xFace == "right") {
            $("#box")[0].style.backgroundPosition = "-67px -190px";
        } else if (player.xFace == "left") {
            $("#box")[0].style.backgroundPosition = "137px -190px";
        }
    }
    //run
    else if (rightDown && !this.airborne) {
        if (player.animFrame == 30) {
            player.animFrame = 0;
            $("#box")[0].style.background = "url('../images/p2_spritesheet.png') 0 0;";
        }
        else {
            player.animFrame++;
            $("#box")[0].style.backgroundPosition = "-" + player.walk[Math.floor(player.animFrame/3)][0] + "px -" + player.walk[Math.floor(player.animFrame/3)][1] + "px";
        }
    } else if (leftDown && !this.airborne) {
        if (player.animFrame == 30) {
            player.animFrame = 0;
            $("#box")[0].style.background = "url('../images/p2_spritesheet.png') 0 0;";
        }
        else {
            player.animFrame++;
            $("#box")[0].style.backgroundPosition = (player.walk[Math.floor(player.animFrame/3)][0] + 70) + "px -" + player.walk[Math.floor(player.animFrame/3)][1] + "px";
        }
    }
}
$("#box").css({"left": grid.startXPos, "bottom": grid.startYPos})
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
        player.yBox = 35;
    } else {
        downDown = false;
        player.yBox = 70;
    }
}true

function keyPressDown(key) {
    var thisKey = key.keyCode? key.keyCode : key.charCode;
    switch(thisKey) {
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
    $("body").css("background", grid.bgColor);
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

//main running loop - 60fps
setInterval(function() { 

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
            var returnedObjects = objects.filter(function(obj) {return  player.xpos + player.xBox - 1 == obj.xpos;});
            returnedObjects.forEach(function(object) {
                if (checkCollision(player, object) || checkCollision(object, player)) {
                    object.collide(player, "left");
                }
            });
            $("#box")[0].style.left = player.xpos + "px";
            //if player is to the right of the camera (center of screen) and the camera x position is less than the center of screen at the right edge of the map, pan camera to the right and scroll to the right
            //set player.xpos+35 and (grid.width * 70)-(window.innerWidth/2)+35 for perfectly centered camera, but odd side effects when screen is too large
            if (    player.xpos+35 > camera.xPos 
                    && camera.xPos < (grid.width * 70)-(window.innerWidth/2)+35) {
                camera.xPos++;
                camera.scroll();
            }
            updateDebug();
        } else if (player.xspeed < 0) {
            player.xpos--;
            //array of all objects with x values that could potentially collide
            var returnedObjects = objects.filter(function(obj) {return  player.xpos == obj.xpos + obj.xBox - 1;});
            returnedObjects.forEach(function(object) {
                if (checkCollision(player, object) || checkCollision(object, player)) {
                    object.collide(player, "right");
                }
            });
            $("#box")[0].style.left = player.xpos + "px";
            //if player is to the right of the camera, and the camera position is greater than the starting camera position, and player is to the left of the center of screen at the right edge of the map
            if (    player.xpos+35 > camera.xPos-2 
                    && camera.xPos > window.innerWidth / 2 
                    && player.xpos < (grid.width * 70)-(window.innerWidth/2)) {
                camera.xPos--;
                camera.scroll();
            }
            updateDebug();
        }
    }

    //vertical movement
    for (i = 0; i < Math.abs(player.yspeed); i++) {
        if (player.yspeed > 0) {
            player.ypos++;
            //array of all objects with y values that could potentially collide
            var returnedObjects = objects.filter(function(obj) {return  player.ypos + player.yBox - 1 == obj.ypos;});
            returnedObjects.forEach(function(object) {
                if (checkCollision(player, object) || checkCollision(object, player)) {
                    object.collide(player, "bottom");
                }
            });
            $("#box")[0].style.bottom = player.ypos + "px";
            if (    player.ypos+35 > camera.yPos 
                    && camera.yPos < (grid.height * 70)-(window.innerHeight/2)) {
                camera.yPos++;
                camera.scroll();
            }
            updateDebug();
        } else if (player.yspeed < 0) {
            player.ypos--;
            //array of all objects with y values that could potentially collide
            var returnedObjects = objects.filter(function(obj) {return  player.ypos == obj.ypos + obj.yBox - 1;});
            returnedObjects.forEach(function(object) {
                if (checkCollision(player, object) || checkCollision(object, player)) {
                    object.collide(player, "top");
                }
            });
            $("#box")[0].style.bottom = player.ypos + "px";
            if (    player.ypos+35 < camera.yPos 
                    && camera.yPos > (window.innerHeight / 2)-35 
                    && player.ypos < (grid.height * 70)-(window.innerHeight/2)) {
                camera.yPos--;
                camera.scroll();
            }
            updateDebug();
        }
    }
    
    player.animate();
    applyFriction(player);
    updateDebug();
    camera.scroll();
    
    //basic win condition
    if (collected == collectibles.length) {
        $(".padded")[0].innerHTML = "Return to the ship!";
    }
    
    if (player.ypos < -200) {
        player.dead = true;
    }
    //player death check
    if (player.dead) {
        player.ypos = grid.startYPos;
        player.xpos = grid.startXPos;
        $("#box").css({"bottom": player.ypos, "left": player.xpos});
        player.dead = false;
        player.xspeed = 0;
        player.yspeed = 0;
        camera.xPos = grid.startXPos;
        camera.yPos = grid.startYPos;
        camera.scroll();
    }
}, 17);