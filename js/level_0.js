var level = [];

function blankLevel(xTiles, yTiles) {
    level = [];
    for (i = 1; i < 6; i++) {
        level[i] = {};
        if (i == 1) {
            level[1] = {height: yTiles, width: xTiles, bgColor1: "#b3f0ff", bgColor2: "#49daff", startXPos: 70, startYPos: 70};
        } else {
            level[i] = {bgColor1: "#b3f0ff", bgColor2: "#49daff"};
        }
        level[i].vals = [];
        level[i].vals[0] = null;
        for (z = 1; z < 5; z++) {
            level[i].vals[z] = [];
            for (y = 0; y < level[1].height; y++) {
                level[i].vals[z][y] = [];
                for (x = 0; x < level[1].width; x++) {
                    level[i].vals[z][y][x] = 0;
                }
            }
        }
    }
    createLayout();
    layer = 1;
    grid = level[1];
}