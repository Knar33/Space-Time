var grid = level[1];

$("body").append("<div class='grid' id='grid' style='position: relative; top: 0; left: 0; margin-left: 420px; height: " + level[1].height * 70 + "px; width: " + level[1].width  * 70 + "px;'></div>");

createLayout();

var layer = 1;

function keyPressDown(key) {
    var thisKey = key.keyCode? key.keyCode : key.charCode;
    switch(thisKey) {
        case 69:
            if (layer < 5) {
                layer++;
                changeLevel();
            }
            break;
        case 81:
            if (layer > 1) {
                layer--;
                changeLevel();
            }
            break;
    }
}

var gridShow = true;
var selectedLayer = 1;
var selection = 0;

function changeLevel() {
    grid = level[layer];
    createLayout()
}

function toggleGrid() {
    if (gridShow) {
        $(".gridBox").css("border", "none");
        gridShow = false;
    } else {
        $(".gridBox").css("border", "1px solid rgba(100, 100, 100, 0.2)");
        gridShow = true;
    }
}
//TODO: add second array for background layer
function clickTool(tool) {
    $(".tool").css("border", "none");
    $(".toptool").css("border", "none");
    tool.style.border='3px solid white';
    selection = tool.id;
}

function clickLayer(box, layer) {
    $(".layer").css("border", "none");
    box.style.border='3px solid white';
    box.style.border='3px solid white';
    selectedLayer = layer;
}

function changebgColor() {
    grid.bgColor1 = $('#bgColor1')[0].value;
    grid.bgColor2 = $('#bgColor2')[0].value;
    $("body").css("background", "linear-gradient(" + grid.bgColor1 + ", " + grid.bgColor2 + ")");
}

function changeStartingPos() {
    level[1].startXPos = parseInt($("#startXPos")[0].value);
    level[1].startYPos = parseInt($("#startYPos")[0].value);
    $("#player").css({"bottom": level[1].startYPos + "px", "left": level[1].startXPos + "px"});
}

function changeBG(x, y) {
    box = "#" + selectedLayer + "-" + x.toString() + "-" + y.toString();
    if (selection != 0) {
        $(box)[0].src = "images/" + selection + ".png";
    } else {
        $(box)[0].src = "images/blank.png";
    }
    level[1].vals[selectedLayer][y][x] = selection;
}

//----------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------toolbar----------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------

inputHTML = "<h3>Tile Sets</h3>";
var prefixes = [["basic_background", 88], ["basic_interact", 83], ["collectible", 187], ["house_background", 50], ["house_interact", 39], ["industrial_background", 45], ["industrial_interact", 35], ["medieval_background", 99], ["medieval_interact", 169], ["mushroom_background",  14], ["mushroom_interact",  32], ["candy_interact",  39], ["candy_background",  44], ["clouds", 9]];

for (i = 0; i < prefixes.length; i++) {
    inputHTML += "<button class='butn layer' type='button' data-toggle='collapse' data-target='#" + prefixes[i][0] + "' aria-expanded='false' aria-controls='" + prefixes[i][0] + "'>" + prefixes[i][0] + "</button><div class='collapse' id='" + prefixes[i][0] + "'>";
    for(j = 1; j <= prefixes[i][1]; j++) {
        var imageBG = prefixes[i][0] + " (" + j + ")";
        inputHTML += "<img class='tool' id='" + imageBG + "' onClick='clickTool(this)' src='images/" + imageBG + ".png'>";
    };
    inputHTML += "</div>";
}

$("#toolbar").append(inputHTML);

//----------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------Grid layout------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------

//creating this as a function lets user choose which map they want to edit
function createLayout() {
    $("#grid").css({"height": ((level[1].height * 70) + "px"), "width": ((level[1].width  * 70) + "px")})
    $("#grid")[0].innerHTML = "";
    //create grid layout
    for (i = 1; i < 5; i++) {
        for (y = 0; y < level[1].height; y++) {
            for (x = 0; x < level[1].width; x++) {
                $("#grid").append("<img src='images/" + (grid.vals[i][y][x] != 0 ? grid.vals[i][y][x] : "blank") + ".png' class='gridLayer" + i + "' id='" + i + "-" + x.toString() + "-" + y.toString() + "' data-x='" + x + "' data-y='" + y +"' style='bottom: " + y*70 + "px; left: " + x * 70 + "px' draggable='false'>");
            }
        }
    }

    //top interaction layer
    for (y = 0; y < level[1].height; y++) {
        for (x = 0; x < level[1].width; x++) {
            $("#grid").append("<div class='gridBox' data-x='" + x + "' data-y='" + y +"' style='bottom: " + y*70 + "px; left: " + x * 70 + "px' onmousedown='changeBG(" + x + ", " + y + ")'></div>");
        }
    }

    //player image
    $("#grid").append("<img src='images/player.png' class='gridLayer3' id='player' style='position: absolute; bottom: " + level[1].startYPos + "px; left: " + level[1].startXPos + "px' draggable='false'>");

    $("body").css("background", "linear-gradient(" + grid.bgColor1 + ", " + grid.bgColor2 + ")");
 
    $("#bgColor1")[0].value = grid.bgColor1;
    $("#bgColor2")[0].value = grid.bgColor2;
    $("#startXPos")[0].value = level[1].startXPos;
    $("#startXPos")[0].value = level[1].startYPos;
}
createLayout();

//dragging to paint blocks
$("#grid").mousedown(function() {
    $(".gridBox").mouseover(function() {changeBG(this.dataset.x, this.dataset.y)});
});

$("#grid").mouseup(function() {
    $(".gridBox").off("mouseover");
});

$("#grid").mouseleave(function() {
    $(".gridBox").off("mouseover");
});

//prevents user from dragging images
window.ondragstart = function() { return false; } 