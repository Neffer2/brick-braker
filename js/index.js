blue_bricks = "";
green_bricks = "";
yellow_bricks = "";

class MainScene extends Phaser.Scene {
    constructor(){
        super('gameScene');
    }

    preload(){
        this.load.image("blue-brick", "./img/PNG/01-Breakout-Tiles.png");
        this.load.image("green-brick", "./img/PNG/03-Breakout-Tiles.png");
        this.load.image("yellow-brick", "./img/PNG/13-Breakout-Tiles.png");
        this.load.image("breaker", "./img/PNG/43-Breakout-Tiles.png");

        let width = this.cameras.main.width;
        let height = this.cameras.main.height;
    }
 
    create(){
        blue_bricks = this.physics.add.staticGroup();
        blue_bricks.create(50, 40, 'blue-brick').setScale(.1);
        blue_bricks.create(100, 40, 'blue-brick').setScale(.1);
        blue_bricks.create(150, 40, 'blue-brick').setScale(.1);
        blue_bricks.create(200, 40, 'blue-brick').setScale(.1);
        blue_bricks.create(250, 40, 'blue-brick').setScale(.1);

        green_bricks = this.physics.add.staticGroup();
        green_bricks.create(50, 80, 'green-brick').setScale(.1);
        green_bricks.create(100, 80, 'green-brick').setScale(.1);
        green_bricks.create(150, 80, 'green-brick').setScale(.1);
        green_bricks.create(200, 80, 'green-brick').setScale(.1);
        green_bricks.create(250, 80, 'green-brick').setScale(.1);

        yellow_bricks = this.physics.add.staticGroup();
        yellow_bricks.create(50, 120, 'yellow-brick').setScale(.1);
        yellow_bricks.create(100, 120, 'yellow-brick').setScale(.1);
        yellow_bricks.create(150, 120, 'yellow-brick').setScale(.1);
        yellow_bricks.create(200, 120, 'yellow-brick').setScale(.1);
        yellow_bricks.create(250, 120, 'yellow-brick').setScale(.1);

        this.add.image(150, 280, 'breaker').setScale(.1);
    }

    update(){}
}

// Configuracion general
const config = {
    // Phaser.AUTO, intenta usa WebGL y si el navegador no lo tiene, usa canva.
    type: Phaser.AUTO,
    width: 300,
    height: 300,
    scene: [MainScene],
    scale: {
        // mode: Phaser.Scale.FIT
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 }
        }
    }
}

// Inicializacion del objeto
game = new Phaser.Game(config)