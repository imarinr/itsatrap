var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
const STATE_STARTED = 0;
const STATE_PAUSED = 1;
var gameState = STATE_PAUSED;

var intervalID = -1;

function resizeDimensions(x, y) {
    var aspectRatio = canvas.width / canvas.height;
    var coordenadaX = x * aspectRatio;
    var coordenadaY = y * (1/aspectRatio);
    return { x: coordenadaX, y: coordenadaY };
}

var personaje = {
    px: 0,
    py: 0,
    movable: false,
    init: function(x, y) {
        let dims = resizeDimensions(20,20);
        this.px = x;
        this.py = y;
        ctx.fillRect(x, y, dims.x, dims.y);
    },
    move : function(x, y) {
        let dims = resizeDimensions(20, 20);
        if(this.movable) {
            if(x < 3 || x > canvas.width - dims.x) {
                ctx.fillRect(this.px, this.py, dims.x,  dims.y);
                return;    
            }
            this.px = x;
            this.py = y;
            ctx.fillRect(x, y, dims.x,  dims.y);
        }
    }
}

var objeto = {
    px: 0,
    py: 0,
    good: true,
    type: 'time',
    points: 2,
    speed: 5,
    dims: undefined,
    init: function(x) {
        this.px = x;
        dims = resizeDimensions(10, 10);
        ctx.fillRect(x, 0, dims.x,  dims.y);
    },
    move: function() {
        this.py += this.speed;
        ctx.fillRect(this.px, this.py, dims.x,  dims.y);
    },
    collission: function() {}
}

document.addEventListener('keydown', function(event) {
    //console.log(event.key);
    if (event.key.toLowerCase() == "d") {
        personaje.move(personaje.px + 1, personaje.py);
    }
    else if (event.key.toLowerCase() == "a") {
        personaje.move(personaje.px - 1, personaje.py);
    }
    else if (event.key.toLowerCase() == "p") {
        switch (gameState) {
            case STATE_PAUSED:
                intervalID = runGame();
                gameState = STATE_STARTED;
                personaje.movable = true;
                break;
            case STATE_STARTED:
                if(intervalID != -1) {
                    clearInterval(intervalID);
                    gameState = STATE_PAUSED;
                    personaje.movable = false;
                }
                break;
            default:
                break;
        }
    }
});

personaje.init(131, 140);
objeto.init(50);

function paint() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    objeto.move();
    personaje.move(personaje.px, personaje.py);
}

function runGame() {
    return setInterval(() => {
        paint();
    }, 1000);
}
