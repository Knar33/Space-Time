var level = [];

level[0] = {height: 20, width: 100, bgColor1: "#b3f0ff", bgColor2: "#49daff", startXPos: 70, startYPos: 70};
level[0].vals = [];
level[0].vals[0] = null;
for (z = 1; z < 5; z++) {
    level[0].vals[z] = [];
    for (y = 0; y < level[0].height; y++) {
        level[0].vals[z][y] = [];
        for (x = 0; x < level[0].width; x++) {
            level[0].vals[z][y][x] = 0;
        }
    }
}