var monkey, MonkeyRunning;
var bananaSprite, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground, groundImage;
var background1, backgrondImage;
var survivalTime;
var gameState = 1;
var GameOver, gameOverImage;
var restart, restartImage;
var jumpSound, dieSound;

var prev_frameC

function preload(){
  MonkeyRunning = loadAnimation("Monkey_5.png", "Monkey_6.png", "Monkey_7.png", "Monkey_8.png", "Monkey_9.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  gameOverImage = loadImage("gameover.png");
  
  groundImage = loadImage("ground2.jpg");
  
  restartImage = loadImage("restart.png")
  
  jumpSound = loadSound("Boiing.mp3");
  
  dieSound = loadSound("die.mp3")
}


function setup() {
  createCanvas(600, 600);
  
  monkey = createSprite(100,500,30,30);
  monkey.addAnimation("running", MonkeyRunning);
  monkey.scale = 0.13;
  
  
  ground = createSprite(300, 575, 900, 250);
  ground.addImage(groundImage);
  ground.position.x = ground.width /2;
  ground.scale = 1.8;
  
  obstacleGroup = new Group();
  FoodGroup = new Group();
  
  GameOver = createSprite(300,300);
  GameOver.scale = 2;
  GameOver.addImage(gameOverImage);
 
  
  restart = createSprite(300,350);
  restart.scale = 0.1;
  restart.addImage(restartImage)
  
  survivalTime = 0;
  score = 0;
  
}

function draw() {
  if(gameState >= 1){
    
    ground.velocity.x = -(6 + (score/10));
    
    GameOver.visible = false;
    restart.visible = false;
    
    background("light blue");
    
    stroke("black");
    strokeWeight(0.5);
    textSize(15);
    fill("black");
    
    if (gameState === 1.5){
      survivalTime = abs(prev_frameC -Math.ceil(frameCount/frameRate()));
    }
    
    if (gameState === 1){
      survivalTime = Math.ceil(frameCount/frameRate());
    }
    
    text("Survival Time: "+survivalTime, 450,80);
    text("Socre: " + score, 450,50);

    if (keyDown("space") && monkey.position.y >=  400){
      monkey.velocity.y = -8;
      jumpSound.play();

    }
    monkey.velocity.y = monkey.velocity.y + 0.2


    if (ground.position.x < 0)
    {
        ground.position.x = ground.width/2;
    }

    spawnObstacles();
    banana();

    monkey.collide(ground);

    if (FoodGroup.overlap(monkey)){
      bananaSprite.remove();
      score = score + 1;
    }
    if (obstacleGroup.overlap(monkey)){
      gameState = 0;
      dieSound.play();
    }
  }
  
  if (gameState === 0){
    prev_frameC = Math.ceil(frameCount/frameRate());
    monkey.visible = false;
    monkey.position.x = 100
    monkey.position.y = 500;
    
    ground.velocity.x = 0;
    ground.position.x = 300;
    
    bananaSprite.visible = false;
    bananaSprite.velocity.x = 0;
    bananaSprite.remove();
    
    obstacle.remove();
    obstacle.velocity.x = 0;
    
    GameOver.visible = true;
    restart.visible = true;
    
    if(mouseIsPressed) {
      monkey.visible = true;
      score = 0;
      FrameCount = 0;
      ground.velocity.x = -6;
      gameState = 1.5;
    }
  }
  
   drawSprites();
}


function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(600, 425,10,40);
    //obstacle.debug = true;
    obstacle.velocity.x = -(6 + (score/10));
    
    obstacle.addImage(obstacleImage);
    
    obstacle.scale = 0.2;
    obstacle.lifetime = 100 ;
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}

function banana(){
  if(frameCount % 100 === 0) {
    var R = random(180,300);
    bananaSprite = createSprite(600, R,10,40);
    bananaSprite.velocity.x = -(6 + (score/10));
    
    bananaSprite.addImage(bananaImage);
    
    bananaSprite.scale = 0.1;
    bananaSprite.life = 100;
    //add each obstacle to the group
    FoodGroup.add(bananaSprite);
  }
}




















