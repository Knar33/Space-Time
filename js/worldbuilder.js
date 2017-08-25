$("body").append("<div class='grid' id='grid' style='position: relative; top: 0; left: 0; margin-left: 420px; height: " + grid.height * 70 + "px; width: " + grid.width  * 70 + "px;'></div>");

var gridShow = true;
var selectedLayer = 1;
function toggleGrid() {
    if (gridShow) {
        $(".gridBox").css("border", "none");
        gridShow = false;
    } else {
        $(".gridBox").css("border", "1px solid gray");
        gridShow = true;
    }
}
//TODO: add second array for background layer
function clickTool(tool) {
    $(".tool").css("border", "none");
    $(".toptool").css("border", "none");
    tool.style.border='3px solid black';
    selection = tool.id;
}

function clickLayer(box, layer) {
    $(".layer").css("border", "none");
    box.style.border='3px solid black';
    selectedLayer = layer;
}

function changebgColor() {
    grid.bgColor = "linear-gradient(" + $('#bgColor1')[0].value + ", " + $('#bgColor2')[0].value + ")";
    $("body").css("background", "linear-gradient(" + $('#bgColor1')[0].value + ", " + $('#bgColor2')[0].value + ")");
}

function changeStartingPos() {
    grid.startXPos = parseInt($("#startXPos")[0].value);
    grid.startYPos = parseInt($("#startYPos")[0].value);
    $("#player").css({"bottom": grid.startYPos + "px", "left": grid.startXPos + "px"});
}

//----------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------toolbar----------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------

inputHTML = "";
var prefixes = [["basic_background", 88], ["basic_interact", 83], ["collectible", 145], ["house_background", 50], ["house_interact", 39], ["industrial_background", 45], ["industrial_interact", 35], ["mideival_background", 99], ["mideival_interact", 169], ["mushroom_background",  14], ["mushroom_interact",  32], ["candy_interact",  39], ["candy_background",  44], ["clouds", 9]];

for (i = 0; i < prefixes.length; i++) {
    inputHTML += "<button class='btn layer' type='button' data-toggle='collapse' data-target='#" + prefixes[i][0] + "' aria-expanded='false' aria-controls='" + prefixes[i][0] + "'>" + prefixes[i][0] + "</button><div class='collapse' id='" + prefixes[i][0] + "'>";
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

var selection = 0;
//create grid layout
for (i = 1; i < 5; i++) {
    for (y = 0; y < grid.height; y++) {
        for (x = 0; x < grid.width; x++) {
            $("#grid").append("<img src='images/" + (grid.vals[i][y][x] != 0 ? grid.vals[i][y][x] : "blank") + ".png' class='gridLayer" + i + "' id='" + i + "-" + x.toString() + "-" + y.toString() + "' data-x='" + x + "' data-y='" + y +"' style='bottom: " + y*70 + "px; left: " + x * 70 + "px' draggable='false'>");
        }
    }
}

//top interaction layer
for (y = 0; y < grid.height; y++) {
    for (x = 0; x < grid.width; x++) {
        $("#grid").append("<div class='gridBox' data-x='" + x + "' data-y='" + y +"' style='bottom: " + y*70 + "px; left: " + x * 70 + "px' onmousedown='changeBG(" + x + ", " + y + ")'></div>");
    }
}

//player image
$("#grid").append("<img src='images/player.png' class='gridLayer3' id='player' style='position: absolute; bottom: " + grid.startYPos + "px; left: " + grid.startXPos + "px' draggable='false'>");

function changeBG(x, y) {
    box = "#" + selectedLayer + "-" + x.toString() + "-" + y.toString();
    if (selection != 0) {
        $(box)[0].src = "images/" + selection + ".png";
    } else {
        $(box)[0].src = "images/blank.png";
    }
    grid.vals[selectedLayer][y][x] = selection;
}

$("#grid").mousedown(function() {
    $(".gridBox").mouseover(function() {changeBG(this.dataset.x, this.dataset.y)});
});

$("#grid").mouseup(function() {
    $(".gridBox").off("mouseover");
});

//prevents user from dragging images
window.ondragstart = function() { return false; } 

$("document").ready(function(){
    $("body").css("background", grid.bgColor);
});