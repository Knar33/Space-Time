var grid = {height: 20, width: 100, bgColor: "linear-gradient(#b3f0ff, #49daff)", startXPos: 70, startYPos: 70};
grid.vals = [];
grid.vals[0] = null;
for (z = 1; z < 5; z++) {
    grid.vals[z] = [];
    for (y = 0; y < grid.height; y++) {
        grid.vals[z][y] = [];
        for (x = 0; x < grid.width; x++) {
            grid.vals[z][y][x] = 0;
        }
    }
}