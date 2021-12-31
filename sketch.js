const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var Caveman
var Cave_Running, caveman_falling;
var Dinosaur
var Dinosaur_running
var heart_1, heart_2, heart_3, heart_4, heart_5, heartImg, grey_heartImg
var button, buttonImg
var Background, backgroundImg;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5;
var invisibleGround;
var gameOver, restart;
var dieSound;
var lavaBall, lavaBallImg
var dino_heart, cave_heart, heartImg
var dino_grey_heart, dino_grey_heart, grey_heartImg
var balcony, balconyImg
var victory
var bgMusic


function preload(){

  backgroundImg = loadImage("download.png");
  obstacle1 = loadImage("obstacle_1.png");
  obstacle2 = loadImage("obstacle_2.png");
  obstacle3 = loadImage("obstacle_3.png");
  obstacle4 = loadImage("obstacle_4.png");
  obstacle5 = loadImage("obstacle_5.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  lavaBallImg = loadImage("Lava ball.png")
  heartImg = loadImage("heart.png")
  grey_heartImg = loadImage("grey heart.png")
  buttonImg = loadImage("Volcano_button.png")
  balconyImg = loadImage("balcony.png")

  caveman_falling = loadAnimation("caveman_falling.png");  
  Cave_Running = loadAnimation("caveman-1.png", "caveman-2.png", "caveman-3.png", "caveman-4.png", "caveman-3.png", "caveman-2.png");
  Dinosaur_running = loadAnimation("Dinosaur-1.png", "Dinosaur-2.png", "Dinosaur-3.png", "Dinosaur-4.png", "Dinosaur-5.png", "Dinosaur-6.png", "Dinosaur-5.png",  "Dinosaur-4.png", "Dinosaur-3.png", "Dinosaur-2.png",)

  dieSound = loadSound("Hurt.wav");
  victory = loadSound("Victory.mp3")
  bgMusic = loadSound("Background music.mp3")

  bgMusic.looping = true;
}

function setup() {
  createCanvas(1000, 600);

  engine = Engine.create();
  world = engine.world;
  bgMusic.play();
  bgMusic.setVolume(0.5);
  

  


  Background = createSprite(400,300,800,600);
  Background.addImage("Background", backgroundImg);
  Background.scale = 6;

  Background.velocityX = -4;
  Background.x = Background.width / 2;
  Background.velocityX = -(6 + (3 * score) / 100);

  button = createSprite(750,60,70,70);
  button.addImage(buttonImg);
  button.scale = 0.2

  caveman = createSprite(500,350,200,200);
  caveman.addAnimation('run',Cave_Running);
  caveman.addAnimation("falling", caveman_falling);
  caveman.scale = 1.5
  caveman.debug = true;
  caveman.setCollider("rectangle", 0, 0, 50, 80);


  Dinosaur = createSprite(200, 430, 200, 200)
  Dinosaur.addAnimation('RUN', Dinosaur_running)
  Dinosaur.scale = 1.5
  Dinosaur.debug = true
  
  Dinosaur.setCollider("rectangle", 0, 0, 80, 50);
  invisibleGround = createSprite(420, 490, 400, 10);
  invisibleGround.visible = false;
 
  cave_heart = createSprite(900,50,50,50)
  cave_heart.addImage(heartImg);
  cave_heart.scale = 0.2


  dino_heart = createSprite(100,50,50,50)
  dino_heart.addImage(heartImg);
  dino_heart.scale = 0.2


  lavaBallGroup = createGroup();
  obstaclesGroup = createGroup();
  BalconyGroup = createGroup();
  gameOver = createSprite(500, 200);
  gameOver.addImage(gameOverImg);

  restart = createSprite(500, 300);
  restart.addImage(restartImg);

  gameOver.scale= 2
  restart.scale = 0.3;

  gameOver.visible = false;
  restart.visible = false;

}

function draw() 
{

  
  Engine.update(engine);
  drawSprites()
  spawnObstacles();
  

  fill("red");
  strokeWeight(5);
  textSize(17);
  stroke("cyan");
  text("Score: " + score, 500, 50);
  fill("red");
  strokeWeight(5);
  textSize(17);
  stroke("cyan");
  text("Cavaman Health", 853, 110);
  
  fill("red");
  strokeWeight(5);
  textSize(17);
  stroke("cyan");
  text("Dinosaur Health", 40, 110);
  
  
  
  
  
  if (gameState === PLAY) {
    score = score + Math.round(getFrameRate() / 60);
    Background.velocityX = -(6 + (3 * score) / 100);

    if (keyDown("space") && caveman.y >= 377) {
      caveman.velocityY = -20;
    }

    caveman.velocityY = caveman.velocityY + 0.8;

    if (Background.x < 245) {
      Background.x = 400;
    }

    caveman.collide(invisibleGround);

    if (obstaclesGroup.isTouching(caveman)) {
      gameState = END;
     dieSound.play();
    }
      } else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    cave_heart.addImage(grey_heartImg);
    Dinosaur.velocityX = 6
    Background.velocityX = 0;
    caveman.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    caveman.changeAnimation("falling", caveman_falling);
    obstaclesGroup.destroyEach();
    lavaBallGroup.destroyEach();
    BalconyGroup.destroyEach();
    if (mousePressedOver(restart)) {
      reset();
    }   

  }



  
}

function spawnObstacles() {
  if (frameCount % 100 === 0) {
    var obstacle = createSprite(1100, 480, 10, 40);
    lavaBall = createSprite(1300, 125, 30,30)
    lavaBall.addImage(lavaBallImg)
    balcony = createSprite(1300,120,100,50)
    balcony.addImage(balconyImg)
    
    
    lavaBall.scale=0.2
    balcony.scale=0.2
    balcony.debug= true
    balcony.setCollider("rectangle", 0, 0, 100, 100);
    

    balcony.velocityX = Background.velocityX
    obstacle.velocityX = Background.velocityX
    lavaBall.velocityX = Background.velocityX
    obstacle.debug = true;
    BalconyGroup.debug= true
    var rand = Math.round(random(1, 5));
    switch (rand) {
      case 1:
        obstacle.addImage(obstacle1);
        break;
      case 2:
        obstacle.addImage(obstacle2);
        break;
        case 3:
          obstacle.addImage(obstacle3);
          break;
          case 4:
        obstacle.addImage(obstacle4);
        break;
        case 5:
          obstacle.addImage(obstacle5);
        default:
        break;
    }

    obstacle.scale = 0.4;
    lavaBallGroup.add(lavaBall);
    obstaclesGroup.add(obstacle);
    BalconyGroup.add(balcony);
    

  
  }


    if(mousePressedOver(button)){
      lavaBall.velocityY = lavaBall.velocityY + 0.8;
      balcony.destroy()
    }
    if(lavaBallGroup.collide(Dinosaur)){
      Dinosaur.destroy();
      lavaBall.destroy();
      dino_heart.addImage(grey_heartImg);
      victory.play();
    }
    
}
 



function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  Dinosaur.destroy()
  Dinosaur = createSprite(200, 430, 200, 200)
  Dinosaur.addAnimation('RUN', Dinosaur_running)
  Dinosaur.scale = 1.5
  Dinosaur.debug = true
  Dinosaur.velocityX = 0
  obstaclesGroup.destroyEach();
  lavaBallGroup.destroyEach();
  BalconyGroup.destroyEach();
  caveman.changeAnimation("run", Cave_Running);
  score = 0;
  caveman.y = 200;
  cave_heart.addImage(heartImg);
  dino_heart.addImage(heartImg);
}
