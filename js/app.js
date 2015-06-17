// the game area is consisting of 5x6 grid
// row and column notes the starting position in the grid
// the top left grid is 0,0
// the width of the grid is 101
// the height is 83 
// 101 and 83 are used to convert between grid coordinates and canvas coordinates

// Enemies our player must avoid
var Enemy = function(row, column,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // x, y are coordinate used in render 
    this.x = column * 101;
    this.y = row * 83;
    // in the demo, the bugs are moving in various speed
    // this is used in update method to determine the new x value
    this.speed = speed;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (pause) return;
    
    this.x = (this.x + (this.speed*dt)) % 750;  
    //mod with slightly large than width to give some breathing room
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(row,column) {
    Enemy.call(this,row,column); //key is to pass args to super class
    this.sprite = 'images/char-boy.png';
    this.score = 0;
}

Player.prototype = Object.create(Enemy.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function () {
    // overwrite Enemy update with doing nothing
}

Player.prototype.restart = function () {
    this.x = 2*101;
    this.y = 5* 83;
    this.score = 0;
}

Player.prototype.handleInput = function(key) {
    //console.log(key);
    if (pause)
        return;
    // update the coordiate when user press arrow keys
    // no move if the new position is out of bound
    var won = false;
    switch (key) {
        case 'up':
            if (this.y - 83 >= 0)
            {
                this.y = this.y - 83;
                if (this.y  == 0)
                    won = true;// you won!
            }    
            break;
        case 'down':
            if ((this.y +83) <= 415)
                this.y = this.y + 83;
            break;
        case 'left':
            if ((this.x - 101) >= 0)
                this.x = this.x - 101;
            break;
        case 'right':
            if ((this.x +101) < 505)
                this.x = this.x + 101;
            break;
        default:
            return;
    }
    // every move is awarded for 10 points
    this.score = this.score + 10;
    //console.log(this.x, this.y);
    if (won) {
        this.score = this.score + 1000;
        pause = true;
        $( ".won" ).dialog("open");
    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
allEnemies.push (new Enemy(1,-1,200));
allEnemies.push (new Enemy(2,-2, 160));
allEnemies.push (new Enemy(2,-6, 300));
allEnemies.push (new Enemy(3,-8, 150));
allEnemies.push (new Enemy(3,-5, 60));


// Place the player object in a variable called player
player = new Player(5,2);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
