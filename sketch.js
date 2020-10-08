var trex,ground2;
var highscore=0;
var gamestate="play";
var trexscore=0;
var touches=[]
function preload(){
  trex1=loadAnimation("trex1.png","trex3.png","trex4.png");
  ground=loadAnimation("ground2.png");
  cloud=loadAnimation("cloud.png");
  cactus1=loadAnimation("obstacle1.png");
  cactus2=loadAnimation("obstacle2.png");
  cactus3=loadAnimation("obstacle3.png");
  cactus4=loadAnimation("obstacle4.png");
  cactus5=loadAnimation("obstacle5.png");
  cactus6=loadAnimation("obstacle6.png");
  trexk=loadAnimation("trex_collided.png");
  sound1=loadSound("checkPoint.mp3");
  sound2=loadSound("die.mp3");
  sound3=loadSound('jump.mp3');
  restart1=loadAnimation("restart.png");
  over1=loadAnimation("gameOver.png");
  }
function setup() {
  createCanvas(windowWidth,windowHeight);
 trex=createSprite(200,height/2+15,20,20);
   trex.addAnimation("kj",trexk);
   trex.addAnimation("kjl",trex1)
  trex.setCollider("circle",0,0,30);
 // trex.debug=true;
  trex.scale=0.7;//to change the size of the animation
  ground2=createSprite(200,height/2+15,400,10);
  ground2.addAnimation("a",ground)
  ground3=createSprite(200,height/2+23,width,10);
  ground3.visible=false;
   ground2.velocityX=-6; 
  cactii=new Group()
  cloudii=new Group()
  restart=createSprite(width/2,height/8+10);
  restart.addAnimation("jqk",restart1);
  restart.scale=0.5;
  over=createSprite(width/2,height/10);
  over.addAnimation("abc",over1);
  over.scale=0.5;
  
  
}

function draw() {
  background(250);  
    text(trexscore,width-40,height/40);
  text(highscore,width/2,height/20)
  if(trexscore>highscore){
    highscore=trexscore;
     }
  if(gamestate=="play"){
    trex.changeAnimation("kjl",trex1)  
    if(trexscore%100==0){
     sound1.play();     
   }
    if(trexscore%500==0){
     ground2.velocityX=ground2.velocityX-1;
    cactii.setVelocityXEach(ground2.velocityX); 
    }    
    trexscore=trexscore+1;
    if((touches.length>0 ||keyDown("space"))&& (trex.y>=175)){ 
    trex.velocityY=-8;
      touches=[];
 sound3.play();
     }
    trex.velocityY=trex.velocityY+0.2
   trex.collide(ground3);
 
    if(ground2.x<0){
    ground2.x=200;
  }
  //%=modulus symbol 13%3 remainder=1,30%10=0
  console.log(ground2.velocityX);
  var random1 = Math.round(random(height/8,height/4));  
 // console.log(Math.round(random(30,50)))
  if(frameCount%70==0){    
  cloud1=createSprite(width+50,random1);
  cloud1.addAnimation("b",cloud)
  cloud1.velocityX=-4; 
  console.log("cloud",cloud1.depth);
    cloud1.depth=0;//determines what comes in front of the other,lowest comes most behind
    cloud1.lifetime=width;
    cloudii.add(cloud1)
  }
  if(frameCount%100==0){
    cactus=createSprite(width+50,height/2-25,15,70); 
    cactus.velocityX=-6;
    cactus.lifetime=width;
    cactii.add(cactus)
    var r=Math.round(random(1,6));
    switch(r){//aternative condition statement,r should match one of the case
      case 1:cactus.addAnimation("c",cactus1)
        break;
      case 2: cactus.addAnimation("d",cactus2)
        break;
      case 3:cactus.addAnimation("e",cactus3)
        break;
      case 4:cactus.addAnimation("f",cactus4)
        break;
      case 5:cactus.addAnimation("g",cactus5)
        break;
      case 6:cactus.addAnimation("h",cactus6)
        cactus.scale=0.5;
        break;
      default: break;//if none of the case matches
       }//end of switch 
  
  }//end of if
    if(trex.isTouching(cactii)){
    sound2.play();
      gamestate="end";
       trex.velocityY=0;
    trex.changeAnimation("kj",trexk);
       }   
    restart.visible=false;
    over.visible=false;
   
  }//end of play 
  if(gamestate=="end"){
    ground2.velocityX=0
    cactii.setVelocityXEach(0);
    cactii.setLifetimeEach(-1);
    cloudii.setVelocityXEach(0);
    cloudii.setLifetimeEach(-1);
    restart.visible=true;
    over.visible=true;
  if(mousePressedOver(restart)){
    gamestate="play";
    cactii.destroyEach();
    ground2.velocityX=-6;
    trexscore=0;
    cloudii.destroyEach();
     }
  }//end of end
  drawSprites();
}