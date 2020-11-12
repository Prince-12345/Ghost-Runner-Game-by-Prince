var PLAY=1;
var END=0;
var gameState=PLAY;

var tower, towerI,ghost,ghostI;
var door,doorI,doorGroup;
var climber,climberI,climberGroup;
var invB,invBGroup;

function preload(){

towerI=loadImage("tower.png");
ghostI=loadAnimation("ghost-jumping.png","ghost-standing.png");
climberI=loadImage("climber.png");  
doorI=loadImage("door.png");

}


function setup(){
createCanvas(700,700);
  
  tower=createSprite(width/2,height/2,width,height);
  tower.addImage("background",towerI);
  tower.velocityY=2;
  tower.scale=1.3;
  //tower.y=tower.height/2;
  
  ghost=createSprite(width/2,height-100,50,50);
  ghost.addAnimation("GHOST",ghostI);
  ghost.scale=0.35;
  
  doorGroup=createGroup();
  climberGroup=createGroup();
  invBGroup=createGroup(); 
}


function draw(){
  background(0);
  
if(gameState===PLAY){
  
  if(tower.y>tower.height-400){
     tower.y=tower.height/2;
    
     }
  
  if(keyDown("left_arrow")){
     ghost.x=ghost.x-4;
     }
   if(keyDown("right_arrow")){
     ghost.x=ghost.x+4;
     }
  if(keyDown("up_arrow")){
     ghost.y=ghost.y-4;
     }
   if(keyDown("down_arrow")){
     ghost.y=ghost.y+4;
     }
  
  
  if(invBGroup.isTouching(ghost)){
     gameState=END;
     }
  
  if(climberGroup.isTouching(ghost)){
ghost.destroy();
  }
  spawnDoors();
  drawSprites();
}
  else if(gameState===END){
    fill("gold");
    textFont("ALGERIAN");
    textSize(50);
    text("Game Over",250,height/2);
     }
}

function spawnDoors(){
if(frameCount%160===0){
  door=createSprite(Math.round(random(50,width-50)),0,50,50);
  door.addImage("door",doorI);
  door.velocityY=2;
  
  climber=createSprite(door.x,door.y+50,50,50);
  climber.addImage(climberI);
  climber.velocityY=door.velocityY;
  
  ghost.depth=door.depth=climber.depth;
  ghost.depth=ghost.depth+1;
  console.log(ghost.depth);
  
   invB=createSprite(door.x,climber.y+10,80,2);
  invB.velocityY=climber.velocityY;
  
 // invB.visible=false;
  invB.debug=true;
  
  doorGroup.add(door);
  climberGroup.add(climber);
  invBGroup.add(invB);
  
  doorGroup.setLifetimeEach(400);
  climberGroup.setLifetimeEach(400);
   invBGroup.setLifetimeEach(400);
  
}
}