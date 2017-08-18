$("body").append("<div class='grid' id='grid' style='position: relative; top: 0; left: 0; height: " + grid.height * 70 + "px; width: " + grid.width  * 70 + "px;'></div>");

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

//----------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------toolbar----------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------

for(i = 1; i < 111; i++) {
    var imageBG = "images/" + i + ".png";
    $("#toolbar").append("<img class='tool' id='" + i + "' onClick='clickTool(this)' src='" + imageBG + "'>");
}

//----------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------Grid layout------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------

var selection = 0;
//create grid layout
for (i = 1; i < 5; i++) {
    for (y = 0; y < 20; y++) {
        for (x = 0; x < 30; x++) {
            $("#grid").append("<img src='" + (grid.vals[i][y][x] != 0 ? ("images/" + grid.vals[i][y][x] + ".png") : ("")) +"' class='gridLayer" + i + "' id='" + i + "-" + x.toString() + "-" + y.toString() + "' data-x='" + x + "' data-y='" + y +"' style='bottom: " + y*70 + "px; left: " + (420+ x * 70) + "px' draggable='false'>");
        }
    }
}

//top interaction layer
for (y = 0; y < 20; y++) {
    for (x = 0; x < 30; x++) {
        $("#grid").append("<div class='gridBox' data-x='" + x + "' data-y='" + y +"' style='bottom: " + y*70 + "px; left: " + (420 + x * 70) + "px' onmousedown='changeBG(" + x + ", " + y + ")'></div>");
    }
}

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