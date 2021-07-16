var PLAY = 1;
var END = 0;
var gameState = PLAY;



var space, spaceImg;
var fire, fireImg, fireGroup;
var ship, shipImg;
var star, starImg, starGroup;
var gameOver, gameOverImg;
var edge;
var score ;
var count ;

function preload() {
  spaceImg = loadAnimation(
    "0.png",
    "1.png",
    "2.png",
    "3.png",
    "4.png",
    "5.png",
    "6.png",
    "7.png",
    "8.png",
    "9.png",
    "10.png",
    "11.png",
    "12.png",
    "13.png",
    "14.png",
    "15.png",
    "16.png",
    "17.png",
    "18.png",
    "19.png",
    "20.png",
    "21.png",
    "22.png",
    "23.png",
    "24.png",
    "25.png",
    "26.png",
    "27.png",
    "28.png",
    "29.png",
    "30.png",
    "31.png",
    "32.png",
    "33.png",
    "34.png",
    "35.png",
    "36.png",
    "37.png",
    "39.png",
    "40.png"
  );
  fireImg = loadImage("meteor.png");
  shipImg = loadImage("playerShip1_orange.png");
  starImg = loadImage("star.png");
  gameOverImg = loadAnimation(
    "go1.png",
    "go2.png",
    "go3.png",
    "go4.png",
    "go5.png"
  );
}

function setup() {
  createCanvas(600,600);

  edge = createEdgeSprites();

  space = createSprite(300, 300);
  space.addAnimation("space", spaceImg);
  space.velocityY = 5;
  space.scale = 1.6;

  fireGroup = new Group();
  starGroup = new Group();

  ship = createSprite(300, 560, 50, 50);
  ship.addImage("ship", shipImg);
  ship.addAnimation("gameOver", gameOverImg);
  ship.scale = 0.7;
  
  score=0
  stars=0
  
  space.depth = 1
  stars.depth = 1
  score.depth = 1
  stars.depth+=1
  score.depth+=1
  
}

function draw() {
  background(0);

  

  if (gameState === PLAY) {
    score = score + Math.round(getFrameRate() / 60);

    if (space.y > 310) {
      space.y = 210;
    }

    if (keyDown("left_arrow")) {
      ship.x = ship.x - 3;
    }

    if (keyDown("right_arrow")) {
      ship.x = ship.x + 3;
    }

    if (fireGroup.isTouching(ship)) {
      gameState = END;
    }

    if (starGroup.isTouching(ship)) {
      starGroup.destroyEach();
      stars = stars + 1;
    }

    ship.collide(edge);

    spawnStars();
    spawnfires();
    
  }

 else if (gameState === END) {
    ship.changeAnimation("gameOver", gameOverImg);
    ship.x = 250;
    ship.y = 250;
    ship.velocityX = 0;
    fireGroup.destroyEach();
    starGroup.destroyEach();
    fireGroup.setLifetimeEach(-1);
    starGroup.setLifetimeEach(-1);

    fireGroup.setVelocityXEach(0);
    starGroup.setVelocityXEach(0);

  }

  drawSprites();
  fill("white");
  textSize(25);
  strokeWeight(3);
  stroke("yellow");
  text("SCORE = " + score, 20, 50);
  text("STARS = " + stars, 20, 20);
  
}

function spawnStars() {
  if (frameCount % 130 === 0) {
    var star = createSprite(200, 50);
    star.addImage("star", starImg);
    star.scale = 0.1;

    star.velocityY = 4;

    star.x = Math.round(random(50, 550));

    star.lifetime = 800;

    starGroup.add(star);
  }
}

function spawnfires() {
  if (frameCount % 250 === 0) {
    var fire = createSprite(200, -50);
    fire.addImage("fire", fireImg);
    fire.scale = 0.5;
    fire.debug = false
    
    fire.velocityY = 11;

    fire.x = Math.round(random(50, 550));

    fire.lifetime = 800;

    fireGroup.add(fire);
  }
}
