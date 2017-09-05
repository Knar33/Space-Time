//this script builds (and rebuilds on command) the gameworld, and defines all of the objects within the gameworld
var objects = [];
var collectibles = [];
var collected = 0;

var grid = level[1];
var currentLevel = 1;

var maxLevel = 1;

var player = new Object();
player.xBox = 70;
player.yBox = 92;
player.jumpStrength = 20;
player.moveSpeed = .5;
player.walk = [[0, 0], [71, 0], [142, 0], [0, 95], [71, 95], [142, 95], [213, 0], [284, 0], [213, 95], [355, 0], [284, 95]];
player.animate = function() {
    //jump
    if (player.yspeed > 0 && player.airborne) {
        player.animFrame = 0;
        if (player.xFace == "right") {
            $(".box").css("backgroundPosition", "-423px -95px");
        } else if (player.xFace == "left") {
            $(".box").css("backgroundPosition", "493px -95px");
        }
    }
    //falling
    else if (player.yspeed < 0 && player.airborne) {
        player.animFrame = 0;
        if (player.xFace == "right") {
            $(".box").css("backgroundPosition", "-423px 0px");
        } else if (player.xFace == "left") {
            $(".box").css("backgroundPosition", "494px 0px");
        }
    }
    //crouching
    else if (downDown && !rightDown && !leftDown) {
        player.animFrame = 0;
        if (player.xFace == "right") {
            $(".box").css("backgroundPosition", "-352px -94px");
        } else if (player.xFace == "left") {
            $(".box").css("backgroundPosition", "423px -94px");
        }
    }
    //standing
    else if (!rightDown && !leftDown) {
        player.animFrame = 0;
        if (player.xFace == "right") {
            $(".box").css("backgroundPosition", "-67px -190px");
        } else if (player.xFace == "left") {
            $(".box").css("backgroundPosition", "137px -190px");
        }
    }
    //run
    else if (rightDown && !this.airborne) {
        if (player.animFrame == 30) {
            player.animFrame = 0;
            $(".box").css("background", "url('../images/p2_spritesheet.png') 0 0;");
        }
        else {
            player.animFrame++;
            $(".box").css("backgroundPosition", "-" + player.walk[Math.floor(player.animFrame/3)][0] + "px -" + player.walk[Math.floor(player.animFrame/3)][1] + "px");
        }
    } else if (leftDown && !this.airborne) {
        if (player.animFrame == 30) {
            player.animFrame = 0;
            $(".box").css("background", "url('../images/p2_spritesheet.png') 0 0;");
        }
        else {
            player.animFrame++;
            $(".box").css("backgroundPosition", (player.walk[Math.floor(player.animFrame/3)][0] + 70) + "px -" + player.walk[Math.floor(player.animFrame/3)][1] + "px");
        }
    }
}

//----------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------camera object----------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------

var camera = new Object();
camera.scroll = function() {
    window.scrollTo(player.xpos - (window.innerWidth / 2) + 35, (level[1].height * 70) - player.ypos - (window.innerHeight / 2) - 35);
}
    
//physics variables
    var gravity = .7;
    var windResistance = .05;
    var terminalVelocity = -20;

//----------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------function that builds/rebuilds world----------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------

function buildWorld() {
    camera.scroll();
    
    $("body")[0].innerHTML = "<div id='objdiv1' style='background: linear-gradient(" + level[1].bgColor1 + ", " + level[1].bgColor2 + "); overflow: hidden; position: relative; top: 0; left: 0; height: " + (level[1].height * 70 - 2) + "px; width: " + (level[1].width  * 70) + "px;'><div class='box'></div></div><div id='objdiv2' style='background: linear-gradient(" + level[2].bgColor1 + ", " + level[2].bgColor2 + "); overflow: hidden; position: relative; top: 0; left: 0; height: " + (level[1].height * 70 - 2) + "px; width: " + (level[1].width  * 70) + "px;'><div class='box'></div></div><div id='objdiv3' style='background: linear-gradient(" + level[3].bgColor1 + ", " + level[3].bgColor2 + "); overflow: hidden; position: relative; top: 0; left: 0; height: " + (level[1].height * 70 - 2) + "px; width: " + (level[1].width  * 70) + "px;'><div class='box'></div></div><div id='objdiv4' style='background: linear-gradient(" + level[4].bgColor1 + ", " + level[4].bgColor2 + "); overflow: hidden; position: relative; top: 0; left: 0; height: " + (level[1].height * 70 - 2) + "px; width: " + (level[1].width  * 70) + "px;'><div class='box'></div></div><div id='objdiv5' style='background: linear-gradient(" + level[5].bgColor1 + ", " + level[5].bgColor2 + "); overflow: hidden; position: relative; top: 0; left: 0; height: " + (level[1].height * 70 - 2) + "px; width: " + (level[1].width  * 70) + "px;'><div class='box'></div></div><div class='ui'><div class='padded''>Objects to collect:</div></div>";
    
    objects = [];
    collectibles = [];
    collected = 0;
    
//----------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------player object----------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------

    //player object
    player.xspeed = 0;
    player.yspeed = 0;
    player.xpos = level[1].startXPos;
    player.ypos = level[1].startYPos;
    player.animFrame = 0;
    player.airborne = true;
    player.xFace = "right";
    player.dead = false;
    player.friction = 0;
    //player animations
    
    $(".box").css({"left": level[1].startXPos, "bottom": level[1].startYPos})
    

//----------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------Gameworld objects------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------
    for (i = 1; i <= 5; i++) {
        objects[i] = [];
        
        //create background layer 1 images
        for (y = 0; y < level[1].height; y++) {
            for (x = 0; x < level[1].width; x++) {
                if (level[i].vals[1][y][x] != 0) {
                    thisTile = "images/" + level[i].vals[1][y][x] + ".png";
                    $("#objdiv" + i).append("<img class='tile shadowed1' style='position: absolute; left: " + x*70 + "px; bottom: " + y*70 + "px; z-index: 1;' src='" + thisTile + "'>");
                }
            }
        }

        //create background layer 2 images
        for (y = 0; y < level[1].height; y++) {
            for (x = 0; x < level[1].width; x++) {
                if (level[i].vals[2][y][x] != 0) {
                    thisTile = "images/" + level[i].vals[2][y][x] + ".png";
                    $("#objdiv" + i).append("<img class='tile shadowed2' style='position: absolute; left: " + x*70 + "px; bottom: " + y*70 + "px; z-index: 2' src='" + thisTile + "'>");
                }
            }
        }

        //create foreground layer images
        for (y = 0; y < level[1].height; y++) {
            for (x = 0; x < level[1].width; x++) {
                if (level[i].vals[4][y][x] != 0) {
                    thisTile = "images/" + level[i].vals[4][y][x] + ".png";
                    $("#objdiv" + i).append("<img class='tile' style='position: absolute; left: " + x*70 + "px; bottom: " + y*70 + "px; z-index: 4;' src='" + thisTile + "'>");
                }
            }
        }

        //create player level objects from grid array
        for (y = 0; y < level[1].height; y++) {
            for (x = 0; x < level[1].width; x++) {
                if (level[i].vals[3][y][x] != 0) {
                    thisTile = "images/" + level[i].vals[3][y][x] + ".png";
                    $("#objdiv" + i).append("<img class='tile' id='" + x + "-" + y + "-" + i + "' style='position: absolute; left: " + x*70 + "px; bottom: " + y*70 + "px; z-index: 3;' src='" + thisTile + "'>");


                    switch(level[i].vals[3][y][x]) {

        //left facing rounded bottom edges
                        case "industrial_interact (12)": 
                        case "basic_interact (18)": 
                        case "basic_interact (34)": 
                        case "basic_interact (42)": 
                        case "basic_interact (50)": 
                        case "basic_interact (57)": 
                        case "candy_interact (13)": 
                        case "candy_interact (34)": 
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
                            objects[i].push(thisObj);

                            var thisObj2 = Object.assign({}, thisObj);
                            var thisObj3 = Object.assign({}, thisObj);
                            var thisObj4 = Object.assign({}, thisObj);
                            var thisObj5 = Object.assign({}, thisObj);


                            thisObj2.xpos = (x * 70) + 7;
                            thisObj2.ypos = (y * 70) + 33;
                            thisObj2.xBox = 6;
                            thisObj2.yBox = 37;
                            objects[i].push(thisObj2);

                            thisObj3.xpos = (x * 70) + 13;
                            thisObj3.ypos = (y * 70) + 26;
                            thisObj3.xBox = 9;
                            thisObj3.yBox = 44;
                            objects[i].push(thisObj3);

                            thisObj4.xpos = (x * 70) + 22;
                            thisObj4.ypos = (y * 70) + 19;
                            thisObj4.xBox = 25;
                            thisObj4.yBox = 51;
                            objects[i].push(thisObj4);

                            thisObj5.xpos = (x * 70) + 47;
                            thisObj5.ypos = (y * 70) + 4;
                            thisObj5.xBox = 23;
                            thisObj5.yBox = 66;
                            objects[i].push(thisObj5);
                            break;

        //snowy left facing rounded bottom edges
                        case "basic_interact (26)":
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
                            objects[i].push(thisObj);

                            var thisObj2 = Object.assign({}, thisObj);
                            var thisObj3 = Object.assign({}, thisObj);
                            var thisObj4 = Object.assign({}, thisObj);
                            var thisObj5 = Object.assign({}, thisObj);


                            thisObj2.xpos = (x * 70) + 7;
                            thisObj2.ypos = (y * 70) + 33;
                            thisObj2.xBox = 6;
                            thisObj2.yBox = 37;
                            objects[i].push(thisObj2);

                            thisObj3.xpos = (x * 70) + 13;
                            thisObj3.ypos = (y * 70) + 26;
                            thisObj3.xBox = 9;
                            thisObj3.yBox = 44;
                            objects[i].push(thisObj3);

                            thisObj4.xpos = (x * 70) + 22;
                            thisObj4.ypos = (y * 70) + 19;
                            thisObj4.xBox = 25;
                            thisObj4.yBox = 51;
                            objects[i].push(thisObj4);

                            thisObj5.xpos = (x * 70) + 47;
                            thisObj5.ypos = (y * 70) + 4;
                            thisObj5.xBox = 23;
                            thisObj5.yBox = 66;
                            objects[i].push(thisObj5);
                            break;

        //left facing cliff edge
                        case "basic_interact (58)": 
                        case "basic_interact (19)": 
                        case "basic_interact (35)": 
                        case "basic_interact (43)": 
                        case "basic_interact (51)": 
                        case "candy_interact (14)": 
                        case "candy_interact (35)": 
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
                            objects[i].push(thisObj);

                            var thisObj2 = Object.assign({}, thisObj);
                            var thisObj3 = Object.assign({}, thisObj);
                            var thisObj4 = Object.assign({}, thisObj);
                            var thisObj5 = Object.assign({}, thisObj);


                            thisObj2.xpos = (x * 70) + 14;
                            thisObj2.ypos = (y * 70) + 43;
                            thisObj2.xBox = 16;
                            thisObj2.yBox = 27;
                            objects[i].push(thisObj2);

                            thisObj3.xpos = (x * 70) + 31;
                            thisObj3.ypos = (y * 70) + 32;
                            thisObj3.xBox = 20;
                            thisObj3.yBox = 38;
                            objects[i].push(thisObj3);

                            thisObj4.xpos = (x * 70) + 51;
                            thisObj4.ypos = y * 70;
                            thisObj4.xBox = 19;
                            thisObj4.yBox = 70;
                            objects[i].push(thisObj4);
                            break;

        //snowy left facing cliff edge
                        case "basic_interact (27)":
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
                            objects[i].push(thisObj);

                            var thisObj2 = Object.assign({}, thisObj);
                            var thisObj3 = Object.assign({}, thisObj);
                            var thisObj4 = Object.assign({}, thisObj);

                            thisObj2.xpos = (x * 70) + 14;
                            thisObj2.ypos = (y * 70) + 43;
                            thisObj2.xBox = 16;
                            thisObj2.yBox = 27;
                            objects[i].push(thisObj2);

                            thisObj3.xpos = (x * 70) + 31;
                            thisObj3.ypos = (y * 70) + 32;
                            thisObj3.xBox = 20;
                            thisObj3.yBox = 38;
                            objects[i].push(thisObj3);

                            thisObj4.xpos = (x * 70) + 51;
                            thisObj4.ypos = y * 70;
                            thisObj4.xBox = 19;
                            thisObj4.yBox = 70;
                            objects[i].push(thisObj4);
                            break;

        //right facing rounded bottom edges
                        case "basic_interact (59)": 
                        case "industrial_interact (13)": 
                        case "basic_interact (1)": 
                        case "basic_interact (20)": 
                        case "basic_interact (36)": 
                        case "basic_interact (44)": 
                        case "candy_interact (15)": 
                        case "candy_interact (36)": 
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
                            objects[i].push(thisObj);

                            var thisObj2 = Object.assign({}, thisObj);
                            var thisObj3 = Object.assign({}, thisObj);
                            var thisObj4 = Object.assign({}, thisObj);
                            var thisObj5 = Object.assign({}, thisObj);


                            thisObj2.xpos = (x * 70) + 23;
                            thisObj2.ypos = (y * 70) + 19;
                            thisObj2.xBox = 25;
                            thisObj2.yBox = 51;
                            objects[i].push(thisObj2);

                            thisObj3.xpos = (x * 70) + 48;
                            thisObj3.ypos = (y * 70) + 26;
                            thisObj3.xBox = 9;
                            thisObj3.yBox = 44;
                            objects[i].push(thisObj3);

                            thisObj4.xpos = (x * 70) + 57;
                            thisObj4.ypos = (y * 70) + 33;
                            thisObj4.xBox = 6;
                            thisObj4.yBox = 37;
                            objects[i].push(thisObj4);

                            thisObj5.xpos = (x * 70) + 63;
                            thisObj5.ypos = (y * 70) + 42;
                            thisObj5.xBox = 7;
                            thisObj5.yBox = 28;
                            objects[i].push(thisObj5);
                            break;

        //snowy right facing rounded bottom edges
                        case "basic_interact (28)":
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
                            objects[i].push(thisObj);

                            var thisObj2 = Object.assign({}, thisObj);
                            var thisObj3 = Object.assign({}, thisObj);
                            var thisObj4 = Object.assign({}, thisObj);
                            var thisObj5 = Object.assign({}, thisObj);

                            thisObj2.xpos = (x * 70) + 23;
                            thisObj2.ypos = (y * 70) + 19;
                            thisObj2.xBox = 25;
                            thisObj2.yBox = 51;
                            objects[i].push(thisObj2);

                            thisObj3.xpos = (x * 70) + 48;
                            thisObj3.ypos = (y * 70) + 26;
                            thisObj3.xBox = 9;
                            thisObj3.yBox = 44;
                            objects[i].push(thisObj3);

                            thisObj4.xpos = (x * 70) + 57;
                            thisObj4.ypos = (y * 70) + 33;
                            thisObj4.xBox = 6;
                            thisObj4.yBox = 37;
                            objects[i].push(thisObj4);

                            thisObj5.xpos = (x * 70) + 63;
                            thisObj5.ypos = (y * 70) + 42;
                            thisObj5.xBox = 7;
                            thisObj5.yBox = 28;
                            objects[i].push(thisObj5);
                            break;

        //right facing cliff edge
                        case "basic_interact (2)": 
                        case "basic_interact (21)": 
                        case "basic_interact (37)": 
                        case "basic_interact (45)": 
                        case "basic_interact (60)": 
                        case "candy_interact (16)": 
                        case "candy_interact (37)": 
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
                            objects[i].push(thisObj);

                            var thisObj2 = Object.assign({}, thisObj);
                            var thisObj3 = Object.assign({}, thisObj);
                            var thisObj4 = Object.assign({}, thisObj);
                            var thisObj5 = Object.assign({}, thisObj);

                            thisObj2.xpos = (x * 70) + 31;
                            thisObj2.ypos = (y * 70) + 43;
                            thisObj2.xBox = 20;
                            thisObj2.yBox = 27;
                            objects[i].push(thisObj2);

                            thisObj3.xpos = (x * 70) + 15;
                            thisObj3.ypos = (y * 70) + 32;
                            thisObj3.xBox = 16;
                            thisObj3.yBox = 38;
                            objects[i].push(thisObj3);

                            thisObj4.xpos = x * 70;
                            thisObj4.ypos = y * 70;
                            thisObj4.xBox = 15;
                            thisObj4.yBox = 70;
                            objects[i].push(thisObj4);
                            break;

        //right facing snowy cliff edge
                        case "basic_interact (29)":
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
                            objects[i].push(thisObj);

                            var thisObj2 = Object.assign({}, thisObj);
                            var thisObj3 = Object.assign({}, thisObj);
                            var thisObj4 = Object.assign({}, thisObj);
                            var thisObj5 = Object.assign({}, thisObj);


                            thisObj2.xpos = (x * 70) + 31;
                            thisObj2.ypos = (y * 70) + 43;
                            thisObj2.xBox = 20;
                            thisObj2.yBox = 27;
                            objects[i].push(thisObj2);

                            thisObj3.xpos = (x * 70) + 15;
                            thisObj3.ypos = (y * 70) + 32;
                            thisObj3.xBox = 16;
                            thisObj3.yBox = 38;
                            objects[i].push(thisObj3);

                            thisObj4.xpos = x * 70;
                            thisObj4.ypos = y * 70;
                            thisObj4.xBox = 15;
                            thisObj4.yBox = 70;
                            objects[i].push(thisObj4);
                            break;

        //normal square tiles
                        case "basic_interact (17)": 
                        case "basic_interact (9)":     
                        case "basic_interact (10)": 
                        case "basic_interact (11)": 
                        case "basic_interact (12)": 
                        case "basic_interact (13)": 
                        case "basic_interact (14)": 
                        case "basic_interact (15)": 
                        case "basic_interact (16)": 
                        case "basic_interact (25)": 
                        case "basic_interact (22)": 
                        case "basic_interact (23)": 
                        case "basic_interact (24)": 
                        case "basic_interact (33)": 
                        case "basic_interact (30)": 
                        case "basic_interact (31)": 
                        case "basic_interact (32)": 
                        case "basic_interact (41)": 
                        case "basic_interact (38)": 
                        case "basic_interact (39)": 
                        case "basic_interact (40)": 
                        case "basic_interact (49)": 
                        case "basic_interact (46)": 
                        case "basic_interact (47)": 
                        case "basic_interact (48)": 
                        case "basic_interact (56)": 
                        case "basic_interact (53)": 
                        case "basic_interact (54)": 
                        case "basic_interact (55)": 
                        case "basic_interact (61)": 
                        case "house_interact (39)": 
                        case "house_interact (1)": 
                        case "house_interact (2)": 
                        case "house_interact (3)": 
                        case "house_interact (4)": 
                        case "house_interact (5)": 
                        case "house_interact (6)": 
                        case "house_interact (7)": 
                        case "house_interact (8)": 
                        case "house_interact (9)": 
                        case "house_interact (10)": 
                        case "house_interact (11)": 
                        case "house_interact (12)": 
                        case "house_interact (13)": 
                        case "house_interact (14)": 
                        case "house_interact (15)": 
                        case "house_interact (16)": 
                        case "house_interact (17)": 
                        case "house_interact (18)": 
                        case "house_interact (19)": 
                        case "house_interact (20)": 
                        case "house_interact (21)": 
                        case "house_interact (22)": 
                        case "house_interact (23)": 
                        case "house_interact (24)": 
                        case "house_interact (25)": 
                        case "house_interact (26)": 
                        case "house_interact (27)": 
                        case "house_interact (28)": 
                        case "house_interact (29)": 
                        case "house_interact (30)": 
                        case "house_interact (31)": 
                        case "house_interact (32)": 
                        case "house_interact (33)": 
                        case "house_interact (34)": 
                        case "house_interact (35)": 
                        case "house_interact (36)": 
                        case "house_interact (37)": 
                        case "house_interact (38)": 
                        case "industrial_interact (11)": 
                        case "industrial_interact (1)": 
                        case "industrial_interact (2)": 
                        case "industrial_interact (3)": 
                        case "industrial_interact (4)": 
                        case "industrial_interact (5)": 
                        case "industrial_interact (6)": 
                        case "industrial_interact (7)": 
                        case "industrial_interact (8)": 
                        case "industrial_interact (9)": 
                        case "industrial_interact (10)": 
                        case "industrial_interact (32)": 
                        case "industrial_interact (14)": 
                        case "industrial_interact (15)": 
                        case "industrial_interact (16)": 
                        case "industrial_interact (17)": 
                        case "industrial_interact (18)": 
                        case "industrial_interact (19)": 
                        case "industrial_interact (20)": 
                        case "industrial_interact (21)": 
                        case "industrial_interact (22)": 
                        case "industrial_interact (23)": 
                        case "industrial_interact (24)": 
                        case "industrial_interact (25)": 
                        case "industrial_interact (26)": 
                        case "industrial_interact (27)": 
                        case "industrial_interact (28)": 
                        case "industrial_interact (29)": 
                        case "industrial_interact (30)": 
                        case "industrial_interact (31)": 
                        case "medieval_interact (169)": 
                        case "medieval_interact (1)": 
                        case "medieval_interact (2)": 
                        case "medieval_interact (3)": 
                        case "medieval_interact (4)": 
                        case "medieval_interact (5)": 
                        case "medieval_interact (6)": 
                        case "medieval_interact (7)": 
                        case "medieval_interact (8)": 
                        case "medieval_interact (9)": 
                        case "medieval_interact (10)": 
                        case "medieval_interact (11)": 
                        case "medieval_interact (12)": 
                        case "medieval_interact (13)": 
                        case "medieval_interact (14)": 
                        case "medieval_interact (15)": 
                        case "medieval_interact (16)": 
                        case "medieval_interact (17)": 
                        case "medieval_interact (18)": 
                        case "medieval_interact (19)": 
                        case "medieval_interact (20)": 
                        case "medieval_interact (21)": 
                        case "medieval_interact (22)": 
                        case "medieval_interact (23)": 
                        case "medieval_interact (24)": 
                        case "medieval_interact (25)": 
                        case "medieval_interact (26)": 
                        case "medieval_interact (27)": 
                        case "medieval_interact (28)": 
                        case "medieval_interact (29)": 
                        case "medieval_interact (30)": 
                        case "medieval_interact (31)": 
                        case "medieval_interact (32)": 
                        case "medieval_interact (33)": 
                        case "medieval_interact (34)": 
                        case "medieval_interact (35)": 
                        case "medieval_interact (36)": 
                        case "medieval_interact (37)": 
                        case "medieval_interact (38)": 
                        case "medieval_interact (39)": 
                        case "medieval_interact (40)": 
                        case "medieval_interact (41)": 
                        case "medieval_interact (42)": 
                        case "medieval_interact (43)": 
                        case "medieval_interact (44)": 
                        case "medieval_interact (45)": 
                        case "medieval_interact (46)": 
                        case "medieval_interact (47)": 
                        case "medieval_interact (48)": 
                        case "medieval_interact (49)": 
                        case "medieval_interact (50)": 
                        case "medieval_interact (51)": 
                        case "medieval_interact (52)": 
                        case "medieval_interact (53)": 
                        case "medieval_interact (54)": 
                        case "medieval_interact (55)": 
                        case "medieval_interact (56)": 
                        case "medieval_interact (57)": 
                        case "medieval_interact (58)": 
                        case "medieval_interact (59)": 
                        case "medieval_interact (60)": 
                        case "medieval_interact (61)": 
                        case "medieval_interact (62)": 
                        case "medieval_interact (63)": 
                        case "medieval_interact (64)": 
                        case "medieval_interact (65)": 
                        case "medieval_interact (66)": 
                        case "medieval_interact (67)": 
                        case "medieval_interact (68)": 
                        case "medieval_interact (69)": 
                        case "medieval_interact (70)": 
                        case "medieval_interact (71)": 
                        case "medieval_interact (72)": 
                        case "medieval_interact (73)": 
                        case "medieval_interact (74)": 
                        case "medieval_interact (75)": 
                        case "medieval_interact (76)": 
                        case "medieval_interact (77)": 
                        case "medieval_interact (78)": 
                        case "medieval_interact (79)": 
                        case "medieval_interact (80)": 
                        case "medieval_interact (81)": 
                        case "medieval_interact (82)": 
                        case "medieval_interact (83)": 
                        case "medieval_interact (84)": 
                        case "medieval_interact (85)": 
                        case "medieval_interact (86)": 
                        case "medieval_interact (87)": 
                        case "medieval_interact (88)": 
                        case "medieval_interact (89)": 
                        case "medieval_interact (90)": 
                        case "medieval_interact (91)": 
                        case "medieval_interact (92)": 
                        case "medieval_interact (93)": 
                        case "medieval_interact (94)": 
                        case "medieval_interact (95)": 
                        case "medieval_interact (96)": 
                        case "medieval_interact (97)": 
                        case "medieval_interact (98)": 
                        case "medieval_interact (99)": 
                        case "medieval_interact (100)": 
                        case "medieval_interact (101)": 
                        case "medieval_interact (102)": 
                        case "medieval_interact (103)": 
                        case "medieval_interact (104)": 
                        case "medieval_interact (105)": 
                        case "medieval_interact (106)": 
                        case "medieval_interact (107)": 
                        case "medieval_interact (108)": 
                        case "medieval_interact (109)": 
                        case "medieval_interact (110)": 
                        case "medieval_interact (111)": 
                        case "medieval_interact (112)": 
                        case "medieval_interact (113)": 
                        case "medieval_interact (114)": 
                        case "medieval_interact (115)": 
                        case "medieval_interact (116)": 
                        case "medieval_interact (117)": 
                        case "medieval_interact (118)": 
                        case "medieval_interact (119)": 
                        case "medieval_interact (120)": 
                        case "medieval_interact (121)": 
                        case "medieval_interact (122)": 
                        case "medieval_interact (123)": 
                        case "medieval_interact (124)": 
                        case "medieval_interact (125)": 
                        case "medieval_interact (126)": 
                        case "medieval_interact (127)": 
                        case "medieval_interact (128)": 
                        case "medieval_interact (129)": 
                        case "medieval_interact (130)": 
                        case "medieval_interact (131)": 
                        case "medieval_interact (132)": 
                        case "medieval_interact (133)": 
                        case "medieval_interact (134)": 
                        case "medieval_interact (135)": 
                        case "medieval_interact (136)": 
                        case "medieval_interact (137)": 
                        case "medieval_interact (138)": 
                        case "medieval_interact (139)": 
                        case "medieval_interact (140)": 
                        case "medieval_interact (141)": 
                        case "medieval_interact (142)": 
                        case "medieval_interact (143)": 
                        case "medieval_interact (144)": 
                        case "medieval_interact (145)": 
                        case "medieval_interact (146)": 
                        case "medieval_interact (147)": 
                        case "medieval_interact (148)": 
                        case "medieval_interact (149)": 
                        case "medieval_interact (150)": 
                        case "medieval_interact (151)": 
                        case "medieval_interact (152)": 
                        case "medieval_interact (153)": 
                        case "medieval_interact (154)": 
                        case "medieval_interact (155)": 
                        case "medieval_interact (156)": 
                        case "medieval_interact (157)": 
                        case "medieval_interact (158)": 
                        case "medieval_interact (159)": 
                        case "medieval_interact (160)": 
                        case "medieval_interact (161)": 
                        case "medieval_interact (162)": 
                        case "medieval_interact (163)": 
                        case "medieval_interact (164)": 
                        case "medieval_interact (165)": 
                        case "medieval_interact (166)": 
                        case "medieval_interact (167)": 
                        case "medieval_interact (168)": 
                        case "candy_interact (7)": 
                        case "candy_interact (8)": 
                        case "candy_interact (9)": 
                        case "candy_interact (10)": 
                        case "candy_interact (11)": 
                        case "candy_interact (12)": 
                        case "candy_interact (25)": 
                        case "candy_interact (26)": 
                        case "candy_interact (27)": 
                        case "candy_interact (31)": 
                        case "candy_interact (32)": 
                        case "candy_interact (33)": 
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
                            objects[i].push(thisObj);
                            break;

        //square snow tiles
                        case "basic_interact (23)":
                        case "basic_interact (24)":
                        case "basic_interact (25)":
                        case "basic_interact (30)":
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
                            objects[i].push(thisObj);
                            break;

        //regular half tiles
                        case "basic_interact (63)": 
                        case "basic_interact (64)": 
                        case "basic_interact (65)": 
                        case "basic_interact (66)": 
                        case "basic_interact (67)": 
                        case "basic_interact (68)": 
                        case "basic_interact (69)": 
                        case "basic_interact (70)": 
                        case "basic_interact (71)": 
                        case "basic_interact (72)": 
                        case "basic_interact (73)": 
                        case "basic_interact (74)": 
                        case "basic_interact (75)": 
                        case "basic_interact (76)": 
                        case "basic_interact (77)": 
                        case "basic_interact (62)": 
                        case "mushroom_interact (1)": 
                        case "mushroom_interact (2)": 
                        case "mushroom_interact (3)": 
                        case "mushroom_interact (4)": 
                        case "mushroom_interact (5)": 
                        case "mushroom_interact (6)": 
                        case "mushroom_interact (7)": 
                        case "mushroom_interact (8)": 
                        case "mushroom_interact (9)": 
                        case "mushroom_interact (10)": 
                        case "mushroom_interact (11)": 
                        case "mushroom_interact (12)": 
                        case "mushroom_interact (13)": 
                        case "mushroom_interact (14)": 
                        case "mushroom_interact (15)": 
                        case "mushroom_interact (16)": 
                        case "mushroom_interact (17)": 
                        case "mushroom_interact (18)": 
                        case "mushroom_interact (19)": 
                        case "mushroom_interact (20)": 
                        case "mushroom_interact (21)": 
                        case "mushroom_interact (22)": 
                        case "mushroom_interact (23)": 
                        case "mushroom_interact (24)": 
                        case "mushroom_interact (25)": 
                        case "mushroom_interact (26)": 
                        case "mushroom_interact (27)": 
                        case "mushroom_interact (28)": 
                        case "mushroom_interact (29)": 
                        case "mushroom_interact (30)": 
                        case "mushroom_interact (31)": 
                        case "mushroom_interact (32)": 
                        case "industrial_interact (33)": 
                        case "industrial_interact (34)": 
                        case "industrial_interact (35)": 
                        case "candy_interact (1)": 
                        case "candy_interact (2)": 
                        case "candy_interact (3)": 
                        case "candy_interact (4)": 
                        case "candy_interact (5)": 
                        case "candy_interact (6)": 
                        case "candy_interact (17)": 
                        case "candy_interact (18)": 
                        case "candy_interact (19)": 
                        case "candy_interact (20)": 
                        case "candy_interact (21)": 
                        case "candy_interact (22)": 
                        case "candy_interact (23)": 
                        case "candy_interact (24)": 
                        case "candy_interact (28)": 
                        case "candy_interact (29)": 
                        case "candy_interact (30)": 
                        case "candy_interact (38)": 
                        case "candy_interact (39)": 
                            var thisObj = new Object();
                            thisObj.xpos = x * 70;
                            thisObj.ypos = (y * 70) + 30;
                            thisObj.xBox = 70;
                            thisObj.yBox = 40;
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
                            objects[i].push(thisObj);
                            break;

        //snow half tiles
                        case "basic_interact (81)": 
                        case "basic_interact (78)": 
                        case "basic_interact (79)": 
                        case "basic_interact (80)": 
                            var thisObj = new Object();
                            thisObj.xpos = x * 70;
                            thisObj.ypos = (y * 70) + 30;
                            thisObj.xBox = 70;
                            thisObj.yBox = 40;
                            thisObj.friction = .05;
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
                            objects[i].push(thisObj);
                            break;

        //bridges
                        case "basic_interact (82)": 
                        case "basic_interact (83)": 
                            var thisObj = new Object();
                            thisObj.xpos = x * 70;
                            thisObj.ypos = y * 70;
                            thisObj.xBox = 70;
                            thisObj.yBox = 20;
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
                            objects[i].push(thisObj);
                            break;

        //spring
                        case "basic_interact (52)":
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
                                    player.friction = 0;
                                } 
                                //update debug menu
                                updateDebug();
                            }
                            objects[i].push(thisObj);
                            break;

        //spikes
                        case "basic_interact (3)":
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
                            objects[i].push(thisObj);
                            break;

        //water top
                        case "basic_interact (6)":
                        case "basic_interact (8)":
                            var thisObj = new Object();
                            thisObj.xpos = x * 70;
                            thisObj.ypos = y * 70;
                            thisObj.xBox = 70;
                            thisObj.yBox = 20;
                            thisObj.collide = function(target, direction) {
                                player.dead = true;
                                updateDebug();
                            }
                            objects[i].push(thisObj);
                            break;

        //water body
                        case "basic_interact (5)":
                        case "basic_interact (7)": 
                            var thisObj = new Object();
                            thisObj.xpos = x * 70;
                            thisObj.ypos = y * 70;
                            thisObj.xBox = 70;
                            thisObj.yBox = 70;
                            thisObj.collide = function(target, direction) {
                                player.dead = true;
                                updateDebug();
                            }
                            objects[i].push(thisObj);
                            break;

        //collectible objects[i]
                            case "collectible (142)": 
                            case "collectible (143)": 
                            case "collectible (144)": 
                            case "collectible (145)": 
                            case "collectible (1)": 
                            case "collectible (2)": 
                            case "collectible (3)": 
                            case "collectible (4)": 
                            case "collectible (5)": 
                            case "collectible (6)": 
                            case "collectible (7)": 
                            case "collectible (8)": 
                            case "collectible (9)": 
                            case "collectible (10)": 
                            case "collectible (11)": 
                            case "collectible (12)": 
                            case "collectible (13)": 
                            case "collectible (14)": 
                            case "collectible (15)": 
                            case "collectible (16)": 
                            case "collectible (17)": 
                            case "collectible (18)": 
                            case "collectible (19)": 
                            case "collectible (20)": 
                            case "collectible (21)": 
                            case "collectible (22)": 
                            case "collectible (23)": 
                            case "collectible (24)": 
                            case "collectible (25)": 
                            case "collectible (26)": 
                            case "collectible (27)": 
                            case "collectible (28)": 
                            case "collectible (29)": 
                            case "collectible (30)": 
                            case "collectible (31)": 
                            case "collectible (32)": 
                            case "collectible (33)": 
                            case "collectible (34)": 
                            case "collectible (35)": 
                            case "collectible (36)": 
                            case "collectible (37)": 
                            case "collectible (38)": 
                            case "collectible (39)": 
                            case "collectible (40)": 
                            case "collectible (41)": 
                            case "collectible (42)": 
                            case "collectible (43)": 
                            case "collectible (44)": 
                            case "collectible (45)": 
                            case "collectible (46)": 
                            case "collectible (47)": 
                            case "collectible (48)": 
                            case "collectible (49)": 
                            case "collectible (50)": 
                            case "collectible (51)": 
                            case "collectible (52)": 
                            case "collectible (53)": 
                            case "collectible (54)": 
                            case "collectible (55)": 
                            case "collectible (56)": 
                            case "collectible (57)": 
                            case "collectible (58)": 
                            case "collectible (59)": 
                            case "collectible (60)": 
                            case "collectible (61)": 
                            case "collectible (62)": 
                            case "collectible (63)": 
                            case "collectible (64)": 
                            case "collectible (65)": 
                            case "collectible (66)": 
                            case "collectible (67)": 
                            case "collectible (68)": 
                            case "collectible (69)": 
                            case "collectible (70)": 
                            case "collectible (71)": 
                            case "collectible (72)": 
                            case "collectible (73)": 
                            case "collectible (74)": 
                            case "collectible (75)": 
                            case "collectible (76)": 
                            case "collectible (77)": 
                            case "collectible (78)": 
                            case "collectible (79)": 
                            case "collectible (80)": 
                            case "collectible (81)": 
                            case "collectible (82)": 
                            case "collectible (83)": 
                            case "collectible (84)": 
                            case "collectible (85)": 
                            case "collectible (86)": 
                            case "collectible (87)": 
                            case "collectible (88)": 
                            case "collectible (89)": 
                            case "collectible (90)": 
                            case "collectible (91)": 
                            case "collectible (92)": 
                            case "collectible (93)": 
                            case "collectible (94)": 
                            case "collectible (95)": 
                            case "collectible (96)": 
                            case "collectible (97)": 
                            case "collectible (98)": 
                            case "collectible (99)": 
                            case "collectible (100)": 
                            case "collectible (101)": 
                            case "collectible (102)": 
                            case "collectible (103)": 
                            case "collectible (104)": 
                            case "collectible (105)": 
                            case "collectible (106)": 
                            case "collectible (107)": 
                            case "collectible (108)": 
                            case "collectible (109)": 
                            case "collectible (110)": 
                            case "collectible (111)": 
                            case "collectible (112)": 
                            case "collectible (113)": 
                            case "collectible (114)": 
                            case "collectible (115)": 
                            case "collectible (116)": 
                            case "collectible (117)": 
                            case "collectible (118)": 
                            case "collectible (119)": 
                            case "collectible (120)": 
                            case "collectible (121)": 
                            case "collectible (122)": 
                            case "collectible (123)": 
                            case "collectible (124)": 
                            case "collectible (125)": 
                            case "collectible (126)": 
                            case "collectible (127)": 
                            case "collectible (128)": 
                            case "collectible (129)": 
                            case "collectible (130)": 
                            case "collectible (131)": 
                            case "collectible (132)": 
                            case "collectible (133)": 
                            case "collectible (134)": 
                            case "collectible (135)": 
                            case "collectible (136)": 
                            case "collectible (137)": 
                            case "collectible (138)": 
                            case "collectible (139)": 
                            case "collectible (140)": 
                            case "collectible (141)": 
                            case "collectible (146)": 
                            case "collectible (147)": 
                            case "collectible (148)": 
                            case "collectible (149)": 
                            case "collectible (150)": 
                            case "collectible (151)": 
                            case "collectible (152)": 
                            case "collectible (153)": 
                            case "collectible (154)": 
                            case "collectible (155)": 
                            case "collectible (156)": 
                            case "collectible (157)": 
                            case "collectible (158)": 
                            case "collectible (159)": 
                            case "collectible (160)": 
                            case "collectible (161)": 
                            case "collectible (162)": 
                            case "collectible (163)": 
                            case "collectible (164)": 
                            case "collectible (165)": 
                            case "collectible (166)": 
                            case "collectible (167)": 
                            case "collectible (168)": 
                            case "collectible (169)": 
                            case "collectible (170)": 
                            case "collectible (171)": 
                            case "collectible (172)": 
                            case "collectible (173)": 
                            case "collectible (174)": 
                            case "collectible (175)": 
                            case "collectible (176)": 
                            case "collectible (177)": 
                            case "collectible (178)": 
                            case "collectible (179)": 
                            case "collectible (180)": 
                            case "collectible (181)": 
                            case "collectible (182)": 
                            case "collectible (183)": 
                            case "collectible (184)": 
                            case "collectible (185)": 
                            case "collectible (186)": 
                            case "collectible (187)": 
                            var thisObj = new Object();
                            thisObj.xpos = x * 70;
                            thisObj.ypos = y * 70;
                            thisObj.xBox = 70;
                            thisObj.yBox = 70;
                            thisObj.id = x + "-" + y + "-" + i;
                            thisObj.collide = function(target, direction) {
                                collected++;
                                this.xpos = -1000;
                                $("#" + this.id)[0].style.display = "none";
                                $("#" + this.id + "-gui")[0].style.display = "none";
                            }
                            objects[i].push(thisObj);
                            collectibles.push(thisObj);
                            $(".ui").append("<img src='" + thisTile + "' id='" + x + "-" + y + "-" + i + "-gui'>");
                            break;    

        //Spaceship
                        case "basic_interact (4)":
                            var thisObj = new Object();
                            thisObj.xpos = x * 70;
                            thisObj.ypos = y * 70;
                            thisObj.xBox = 120;
                            thisObj.yBox = 70;
                            thisObj.friction = .1;
                            thisObj.collide = function(target, direction) {
                                if (collected == collectibles.length) {
                                    if (currentLevel == maxLevel) {
                                        window.location = "win.html";
                                    } else {
                                        currentLevel++;
                                        grid = level[currentLevel];
                                        buildWorld();
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
                            objects[i].push(thisObj);
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
                            objects[i].push(thisObj);
                            break;
                        }
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
    for (i = 1; i <=5; i++) {
        objects[i].push(blockLeft);
    }

    //right boundry
    var blockRight = new Object();
    blockRight.xpos = level[1].width * 70;
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
    for (i = 1; i <=5; i++) {
        objects[i].push(blockRight);
    }
}