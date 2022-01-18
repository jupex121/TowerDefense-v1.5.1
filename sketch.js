//variables para imágenes, sprites y grupos
var bg, bgHome, castle, castleImg, castle2Img, castle3Img;
var will, willWlk, willAtk, power, powerImg, powerGroup;
var power2, power2Img, power2Group;
var skeleton, skeletonAtk, skeletonGroup;

var wall, wall2, wall3;
var health100Img, health83Img, health66Img, health50Img, health33Img, health16Img;
var start, startImg;
var dragon, dragonImg, dragonGroup;
var life;


//temprizadores para poderes y vidas 
var timer1 = 30;
var timer2 = 0;
var lifeTimer = 100;

//contadores y estado de juego
var gameState = "fight";
var lives = 100;
var wave = 1;
var skeletonCount = 5;
var iniciowave = 1;

//precarga de imágenes y animaciones
function preload() {
    //fondo
    bg = loadImage("images/bg.png");
    bgHome = loadImage("images/bgHome.jpg");

    //castillo
    castleImg = loadImage("images/castle1.png");
    castle2Img = loadImage("images/castle2.png");
    castle3Img = loadImage("images/castle3.png");

    //Will y sus poderes
    willWlk = loadAnimation("images/willsonWlk.png", "images/willsonWlk2.png", "images/willsonWlk3.png", 
    "images/willsonWlk4.png", "images/willsonWlk5.png");
    
    willAtk = loadAnimation("images/willsonAtk.png", "images/willsonAtk2.png", "images/willsonAtk3.png", 
    "images/willsonAtk4.png", "images/willsonAtk5.png");

    powerImg = loadImage("images/power.png");

    power2Img = loadAnimation("images/p1.png", "images/p2.png", "images/p3.png", "images/p4.png", "images/p5.png", 
    "images/p6.png", "images/p7.png", "images/p8.png", "images/p9.png", "images/p10.png", "images/p11.png", 
    "images/p12.png", "images/p13.png");


    //enemigos
    skeletonAtk = loadAnimation("images/skeleton1.png", "images/skeleton2.png", "images/skeleton3.png",
    "images/skeleton4.png", "images/skeleton5.png", "images/skeleton6.png", "images/skeleton7.png", 
    "images/skeleton8.png", "images/skeleton9.png", "images/skeleton10.png", "images/skeleton11.png", 
    "images/skeleton12.png", "images/skeleton13.png");

    dragonImg = loadAnimation("images/dragon1.png", "images/dragon2.png", "images/dragon3.png", 
    "images/dragon4.png", "images/dragon5.png", "images/dragon6.png", "images/dragon7.png");


    //vida y botones
    health100Img = loadImage("images/life100.png");
    health83Img = loadImage("images/life83.png");
    health66Img = loadImage("images/life66.png");
    health50Img = loadImage("images/life50.png");
    health33Img = loadImage("images/life33.png");
    health16Img = loadImage("images/life16.png");

    startImg = loadImage("images/startButton.png");


}

//disposición
function setup() {
    //sprite castillo
    castle = createSprite(200, 350);
    castle.setCollider("circle", 0, 0, 700);
    castle.visible = false;

    //sprite Will
    will = createSprite(600, 525);
    will.addAnimation("willCaminando", willWlk);
    will.addAnimation("willAtacando", willAtk);
    will.visible = false;

    //paredes invisibles
    wall = createSprite(displayWidth / 2, 355, displayWidth, 1);
    wall.visible = false;
    wall2 = createSprite(displayWidth / 2, displayHeight +8, displayWidth, 20);
    wall2.visible = false;

    //barra de vida
    life = createSprite(displayWidth / 2 -200, displayHeight / 2 -300);
    life.visible = false;

    //botón de inicio
    start = createSprite(displayWidth / 2, displayHeight / 2 +200);
    start.addImage(startImg);
    start.scale = 0.5;
    start.debug = true;
    start.setCollider("rectangle", 0, 0, 400, 150);

    //grupos
    powerGroup = new Group();
    power2Group = new Group();
    skeletonGroup = new Group();
    dragonGroup = new Group();
}

function draw() {
    //creación del lienzo
    createCanvas(displayWidth, displayHeight);

    //estado de juego "inicio"
    if(gameState === "home") {
        //fondo
        background(bgHome);

        start.visible = true;

        //mensaje de bienvenida
        textSize(40);
        fill("black");
        stroke("white");
        strokeWeight(2.5);
        text("¡Bienvenido al mundo de Ataque a los Esqueletos!", displayWidth / 2 -450, displayHeight / 2);

        textSize(30);
        text("Presiona la barra espaciadora para usar tu poder", displayWidth / 2 -320, displayHeight / 2 +100);

        //contador para iniciar el juego
        /*if(frameCount % 120 === 0) {
            gameState = "fight";
        }*/

        if(mousePressedOver(start)) {
            fight();
        }

        //createSprite(displayWidth / 2, displayHeight / 2, 5, displayHeight);
    }

    //estado de juego "jugar"
    if(gameState == "fight") {

        //fondo
        background(bg);

        start.visible = false;
        will.visible = true;
        castle.visible = true;
        life.visible = true;

        //movimiento del personaje
        if(keyDown("UP_ARROW")) {
            will.y = will.y -10;
        }

        if(keyDown("DOWN_ARROW")) {
            will.y = will.y +10;
        }


        //generación de poderes
        if(keyWentDown("space") && timer2 >= 1) {
            power = createSprite(420, 405);
            power.addImage("poder", powerImg);
            power.scale = 0.3;
            power.visible = true;

            power.velocityX = +10;
            power.position.x = will.position.x +25;
            power.position.y = will.position.y;
            power.lifetime = 75;

            power.setCollider("rectangle", 0, 0, 50, 50);
            powerGroup.add(power);
            
            timer2 = 0;
            will.changeAnimation("willAtacando", willAtk);

        }
        else if(keyWentUp("space")){
            will.changeAnimation("willCaminando", willWlk);
        }

        if(keyWentDown("O") && timer1 <= 0) {
            power2 = createSprite(420, 405);
            power2.addAnimation("poder2", power2Img);
            power2.scale = 3;
            power2.visible = true;

            power2.position.x = mouseX;
            power2.position.y = mouseY;
            power2.lifetime = 50;
            power2Group.add(power2);

            power2.setCollider("circle", 0, -25, 90);

            if(wave <= 2) {
                timer1 = 30;
            }
            else if(wave >= 3 && wave <= 4) {
                timer1 = 20;
            }
            else if(wave >= 5) {
                timer1 = 10;
            }

            will.changeAnimation("willAtacando", willAtk);

        }
        else if(keyWentUp("O")){
            will.changeAnimation("willCaminando", willWlk);
        }


        //detección de tacto entre los poderes y los enemigos
        if(skeletonGroup.isTouching(powerGroup)) {
            for(var i = 0; i < skeletonGroup.length; i++) {     
                if(skeletonGroup[i].isTouching(powerGroup)) {
                    skeletonGroup[i].destroy();
                    powerGroup.destroyEach();
                    skeletonCount = skeletonCount -1;

                } 
            }
        }

        if(skeletonGroup.isTouching(power2Group)) {
            for(var i = 0; i < skeletonGroup.length; i++) {     
                if(skeletonGroup[i].isTouching(power2Group)) {
                    skeletonGroup[i].destroy();
                    skeletonCount = skeletonCount -1;

                } 
            }
        }

        if(dragonGroup.isTouching(power2Group)) {
            for(var i = 0; i < dragonGroup.length; i++) {     
                if(dragonGroup[i].isTouching(power2Group)) {
                    dragonGroup[i].destroy();
                    skeletonCount = skeletonCount -3;

                } 
            }
        }


        //detección de tacto entre los enemigos y el castillo
        if(skeletonGroup.isTouching(castle)) {
            for(var i = 0; i < skeletonGroup.length; i++){     
                if(skeletonGroup[i].isTouching(castle)){
                    skeletonGroup[i].velocityX = 0;

                    if(frameCount % 100 === 0) {
                        lifeTimer = lifeTimer -1;
                    }

                    lives = lifeTimer;
                }
            }
        }

        if(dragonGroup.isTouching(castle)) {
            for(var i = 0; i < dragonGroup.length; i++){     
                if(dragonGroup[i].isTouching(castle)){
                    dragonGroup[i].velocityX = 0;

                    if(frameCount % 100 === 0) {
                        lifeTimer = lifeTimer -5;
                    }

                    lives = lifeTimer;
                }
            }
        }

        //temporizador para poderes
        if(frameCount % 20 === 0 && timer1 != 0) {
            timer1 = timer1 -1;
        }

        if(frameCount % 20 === 0) {
            timer2 = timer2 +1;
        }


        //condición de victoria
        if(wave === 5 && skeletonCount === 0 && gameState === "fight") {
            gameState = "won";
        }
        console.log(iniciowave);
        //condiciones de oleadas

        if(skeletonCount === 0 && gameState !== "won") {
            wave = wave +1;
            iniciowave = 1;
        }

        if(wave === 2 && iniciowave === 1) {
            skeletonCount = 10;
            iniciowave = 0;
        }

        if(wave === 3 && iniciowave === 1) {
            skeletonCount = 20;
            iniciowave = 0;
        }

        if(wave === 4 && iniciowave === 1) {
            skeletonCount = 40;
            iniciowave = 0;
        }

        if(wave === 5 && iniciowave === 1) {
            skeletonCount = 80;
            iniciowave = 0;
        }


        //cambio de imagen para barra de vida
        if(lives <= 100 && lives > 83) {
            life.addImage(health100Img);
            castle.addImage(castleImg);
            castle.scale = 0.5;
        }

        if(lives <= 83 && lives > 66) {
            life.addImage(health83Img);
        }

        if(lives <= 66 && lives > 50) {
            life.addImage(health66Img);
        }

        if(lives <= 50 && lives > 33) {
            life.addImage(health50Img);
            castle.addImage(castle2Img);
        }

        if(lives <= 33 && lives > 16) {
            life.addImage(health33Img);
        }

        if(lives <= 16 && lives > 0) {
            life.addImage(health16Img);
            castle.addImage(castle3Img);
        }


        //colisión entre Will y las paredes invisibles
        will.collide(wall);
        will.collide(wall2);

        //porcentaje de vida restante
        textSize(20);
        fill("black");
        stroke("white");
        strokeWeight(0.25);
        text(lives + "%", life.x -20, life.y -20);

        //tiempo restante para shockwave
        if(timer1 > 1) {
            text("Tiempo restante para usar 'Shockwave' (Letra O): " + timer1 + " segundos", displayWidth / 2 +90, 
            displayHeight / 2 +375);
        }
        else if(timer1 === 1) {
            text("Tiempo restante para usar 'Shockwave' (Letra O): " + timer1 + " segundo", displayWidth / 2 +90, 
            displayHeight / 2 +375);
        }
        else if(timer1 === 0) {
            text("Tiempo restante para usar 'Shockwave' (Letra O): " + timer1 + " segundos", displayWidth / 2 +90, 
            displayHeight / 2 +375);
        }

        //oleadas
        strokeWeight(2.5);
        text("Oleada: " + wave, displayWidth / 2 +550, displayHeight / 2 -350);


        //enemigos restantes
        textSize(17.5);
        if(wave === 1) {
            text("Enemigos Restantes: " + skeletonCount + "/5", displayWidth / 2 +440, displayHeight / 2 -320);
            sk1();
        }

        if(wave === 2) {
            text("Enemigos Restantes: " + skeletonCount + "/10", displayWidth / 2 +440, displayHeight / 2 -320);
            sk2();
        }

        if(wave === 3) {
            text("Enemigos Restantes: " + skeletonCount + "/20", displayWidth / 2 +440, displayHeight / 2 -320);
            sk3();
        }

        if(wave === 4) {
            text("Enemigos Restantes: " + skeletonCount + "/40", displayWidth / 2 +440, displayHeight / 2 -320);
            sk4();
        }

        if(wave === 5) {
            text("Enemigos Restantes: " + skeletonCount + "/80", displayWidth / 2 +440, displayHeight / 2 -320);
            sk5();
            dragon1();
        }
        

        //condición de derrota
        if(lives <= 0) {
            gameState = "gameOver";
        }
    }

    //estado de juego "victoria"
    if(gameState === "won") {
        will.visible = false;
        life.visible = false;
        castle.visible = false;

        skeletonGroup.destroyEach();
        dragonGroup.destroyEach();
        powerGroup.destroyEach();
        power2Group.destroyEach();

        background(bgHome);

        textSize(50);
        fill("red");
        stroke("black");
        strokeWeight(2.5);
        text("¡Ganaste!", displayWidth / 2 -120, displayHeight / 2);

        textSize(20);
        fill("white");
        stroke("red");
        text("Presiona la letra 'R' para reiniciar el juego", displayWidth / 2 -200, displayHeight / 2 +80);

        restart();
    }

    //estado de juego "derrota"
    if(gameState === "gameOver") {
        will.visible = false;
        life.visible = false;
        castle.visible = false;

        skeletonGroup.destroyEach();
        dragonGroup.destroyEach();
        powerGroup.destroyEach();
        power2Group.destroyEach();

        background(bgHome);

        textSize(50);
        fill("red");
        stroke("black");
        strokeWeight(2.5);
        text("¡Perdiste!", displayWidth / 2 -120, displayHeight / 2);

        textSize(25);
        fill("black");
        stroke("white");
        text("Oleada: " + wave, displayWidth / 2 -65, displayHeight / 2 +50);

        textSize(20);
        fill("white");
        stroke("red");
        text("Presiona la letra 'R' para reiniciar el juego", displayWidth / 2 -200, displayHeight / 2 +80);

        restart();

    }

    drawSprites();
}


//generación de enemigos
function dragon1() {
    if(frameCount % 200 === 0) {
        dragon = createSprite(displayWidth +10, displayHeight / 2 -200);
        dragon.addAnimation("dragón", dragonImg);
        dragon.scale = 1.8;

        dragon.velocityX = -2.5;
        dragon.setCollider("circle", 0, 0, 30);
        dragonGroup.add(dragon);
    }
}

function sk1() {
    if(frameCount % 120 === 0) {
        skeleton = createSprite(displayWidth +10, random(displayHeight / 2 +50, displayHeight / 2 +225));
        skeleton.addAnimation("esqueletoAtacando", skeletonAtk);
        skeleton.scale = 1.8;

        skeleton.velocityX = -5;
        skeleton.setCollider("circle", 0, -5, 30);
        skeletonGroup.add(skeleton);
      }
}

function sk2() {
    if(frameCount % 60 === 0) {
        skeleton = createSprite(displayWidth +10, random(displayHeight / 2 +50, displayHeight / 2 +225));
        skeleton.addAnimation("esqueletoAtacando", skeletonAtk);
        skeleton.scale = 1.8;

        skeleton.velocityX = -5;
        skeleton.setCollider("circle", 0, -5, 30);
        skeletonGroup.add(skeleton);
      }
}

function sk3() {
    if(frameCount % 50 === 0) {
        skeleton = createSprite(displayWidth +10, random(displayHeight / 2 +50, displayHeight / 2 +225));
        skeleton.addAnimation("esqueletoAtacando", skeletonAtk);
        skeleton.scale = 1.8;

        skeleton.velocityX = -5;
        skeleton.setCollider("circle", 0, -5, 30);
        skeletonGroup.add(skeleton);
      }
}

function sk4() {
    if(frameCount % 40 === 0) {
        skeleton = createSprite(displayWidth +10, random(displayHeight / 2 +50, displayHeight / 2 +225));
        skeleton.addAnimation("esqueletoAtacando", skeletonAtk);
        skeleton.scale = 1.8;

        skeleton.velocityX = -5;
        skeleton.setCollider("circle", 0, -5, 30);
        skeletonGroup.add(skeleton);
      }
}

function sk5() {
    if(frameCount % 30 === 0) {
        skeleton = createSprite(displayWidth +10, random(displayHeight / 2 +50, displayHeight / 2 +225));
        skeleton.addAnimation("esqueletoAtacando", skeletonAtk);
        skeleton.scale = 1.8;

        skeleton.velocityX = -5;
        skeleton.setCollider("circle", 0, -5, 30);
        skeletonGroup.add(skeleton);
      }
}


//reinicio de juego
function restart() {
    if(keyWentDown("R")) {
        wave = 1;
        timer1 = 30;
        lives = 100;
        lifeTimer = 100;

        skeletonCount = 5;

        gameState = "home";
    }
}

function fight() {
    gameState == "fight";
}