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

var playerBlockList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 44, 45, 48];
var backgroundBlockList = [43, 46, 47, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110];

inputHTML = "";

inputHTML += "<button class='btn layer' type='button' data-toggle='collapse' data-target='#layer3' aria-expanded='false' aria-controls='layer3'>Objects with collision</button><div class='collapse' id='layer3'>";
for(i = 0; i < playerBlockList.length; i++) {
    var imageBG = "images/" + playerBlockList[i] + ".png";
    inputHTML += "<img class='tool' id='" + playerBlockList[i] + "' onClick='clickTool(this)' src='" + imageBG + "'>";
};

inputHTML += "</div><button class='btn layer' type='button' data-toggle='collapse' data-target='#layer1' aria-expanded='false' aria-controls='layer1'>Objects without collision (background/scenery)</button><div class='collapse' id='layer1'>";
for(i = 0; i < backgroundBlockList.length; i++) {
    var imageBG = "images/" + backgroundBlockList[i] + ".png";
    inputHTML += "<img class='tool' id='" + backgroundBlockList[i] + "' onClick='clickTool(this)' src='" + imageBG + "'>";
};

inputHTML += "</div>";
$("#toolbar").append(inputHTML);

//----------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------Grid layout------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------

var selection = 0;
//create grid layout
for (i = 1; i < 5; i++) {
    for (y = 0; y < 20; y++) {
        for (x = 0; x < 30; x++) {
            $("#grid").append("<img src='images/" + (grid.vals[i][y][x] != 0 ? grid.vals[i][y][x] : "blank") + ".png' class='gridLayer" + i + "' id='" + i + "-" + x.toString() + "-" + y.toString() + "' data-x='" + x + "' data-y='" + y +"' style='bottom: " + y*70 + "px; left: " + x * 70 + "px' draggable='false'>");
        }
    }
}

//top interaction layer
for (y = 0; y < 20; y++) {
    for (x = 0; x < 30; x++) {
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
        $(box)[0].src = "";
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