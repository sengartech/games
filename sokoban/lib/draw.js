let boxPic;
let wallPic;
let buttonPic;
let floorPic;
let playerPic1;
let playerPic2;
let placedBoxPic;
var activeSpots;
var px = 0;
var py = 0;

function loadAllImages() {
    boxPic = loadImage('assets/box.png');
    wallPic = loadImage('assets/wall.png');
    floorPic = loadImage('assets/floor.png');
    playerPic1 = loadImage('assets/player.png');
    playerPic2 = loadImage('assets/player2.png');
    buttonPic = loadImage('assets/button.png');
    placedBoxPic = loadImage('assets/boxbutton.png');
}

//draw the whole level
function drawAll() {
    drawFloor(currentLvl);
    drawButtons(currentLvl);
    drawBoxes(currentLvl);
    drawWalls(currentLvl);
    drawPlayer(currentLvl);
    if (inGame) {
        fill(255);
        textSize(17);
        text('Lvl ' + String(levelNumber), 5, 22);
    }
}

function drawBoxes(lvl) {
    lvl.boxes.forEach(box => drawBox(lvl, box));
}

function drawButtons(lvl) {
    lvl.buttons.forEach(function(element) {
        image(buttonPic, element.x * lvl.blockSize, element.y * lvl.blockSize, lvl.blockSize, lvl.blockSize);
    });
}

function drawWalls(lvl) {
    for (var i = 0; i < lvl.nodes.length; i++) {
        for (var j = 0; j < lvl.nodes[0].length; j++) {
            if (lvl.nodes[i][j].wall && !surrounded(lvl, i, j)) {
                image(wallPic, i * lvl.blockSize, j * lvl.blockSize, lvl.blockSize, lvl.blockSize);
            }
        }
    }
}

function drawFloor(lvl) {
    for (var i = 0; i < lvl.nodes.length; i++) {
        for (var j = 0; j < lvl.nodes[0].length; j++) {
            if (!lvl.nodes[i][j].wall) {
                image(floorPic, i * lvl.blockSize, j * lvl.blockSize, lvl.blockSize, lvl.blockSize);
            } else {
                image(wallPic, i * lvl.blockSize, j * lvl.blockSize, lvl.blockSize, lvl.blockSize);
                fill(0, 0, 0, 90);
                noStroke();
                rect(i * lvl.blockSize, j * lvl.blockSize, lvl.blockSize, lvl.blockSize);
            }
        }
    }
}

function drawPlayer(lvl) {
    drawSpot(lvl, lvl.playerX, lvl.playerY)
    if (swap) {
        image(playerPic1, px * lvl.blockSize, py * lvl.blockSize, lvl.blockSize, lvl.blockSize);
    } else {
        image(playerPic2, px * lvl.blockSize, py * lvl.blockSize, lvl.blockSize, lvl.blockSize);
    }
}

function drawSpot(lvl, x, y) {
    if (!lvl.nodes[x][y].wall) {
        image(floorPic, x * lvl.blockSize, y * lvl.blockSize, lvl.blockSize, lvl.blockSize);
    }
    if (getButton(x, y)) {
        image(buttonPic, x * lvl.blockSize, y * lvl.blockSize, lvl.blockSize, lvl.blockSize);
    }
}

function drawBox(lvl, element) {
    if (element.placed) {
        image(placedBoxPic, element.px * lvl.blockSize, element.py * lvl.blockSize, lvl.blockSize, lvl.blockSize);
        playSound('gem_collected');
    } else {
        image(boxPic, element.px * lvl.blockSize, element.py * lvl.blockSize, lvl.blockSize, lvl.blockSize);
    }
}

function drawActiveSpots() {
    for (var i = 0; i < activeSpots.length; i++) {
        if (activeSpots[i][0] == 0) {
            activeSpots.splice(i, 1)
            i--;
        } else {
            activeSpots[i][0]--;
            drawSpot(currentLvl, activeSpots[i][1], activeSpots[i][2]);
            if (activeSpots[i][3] != null) {
                var tempBox = activeSpots[i][3];
                tempBox.px = (tempBox.px + tempBox.x) * 0.5;
                tempBox.py = (tempBox.py + tempBox.y) * 0.5;
                drawBox(currentLvl, tempBox);
            }
        }
    }
}

function drawOnlyWalls(){
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            image(wallPic, i * canvasX/10., j * canvasX/10., canvasX/10., canvasX/10.);
        }
    }
}

function drawWin() {
    var variable = Math.sin(counter / 128.) * 256;
    
    const rectY = (canvasY / 2)/ 2;
    fill(variable, variable, variable);
    rect(0, rectY, canvasX, 250, 20);

    fill(256 - variable, 256 - variable, 256 - variable);
    textSize(100);
    text('Won!', 140, 250);
    textSize(30);
    text('You Can Start New Level', 90, 325);
    counter++;

    if (!winSoundPlayed) {
        playSound('win');
        winSoundPlayed++;
    }
}

//check if a spot is surrounded by walls
function surrounded(lvl, x, y) {
    for (var i = x - 1; i <= x + 1; i++) {
        for (var j = y - 1; j <= y + 1; j++) {
            if (checkBoundaries(lvl.nodes, i, j) && !lvl.nodes[i][j].wall) {
                return false;
            }
        }
    }
    return true;
}

function drawInstructions() {
    fill(200, 200, 200);
    rect(0, 25, canvasX, canvasY-50, 20);

    fill(0, 0, 0);
    textSize(50);
    text('🎮 Instructions 🎮', 60, 100);
    textSize(25);
    text('👉 Click on "Start New Level" to Play', 20, 200);
    text('👉 Use Arrow buttons to move player', 20, 300);
    text('👉 Player have to move all Boxes to Gems', 20, 400);
}