var ball;
var dataBase,position;

function setup(){
    dataBase = firebase.database();
    var nodeLoc = dataBase.ref("Ball/position");
    nodeLoc.on("value",readOpp,showError);
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
   dataBase.ref("Ball/position").set({
       x: ball.x+x,
       y:ball.y+y
   });
}

function readOpp(data){
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;
}
function showError(){
    console.log(error);
}