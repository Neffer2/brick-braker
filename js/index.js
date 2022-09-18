let bricks;
let ball;
let breaker;
let mouse;

class MainScene extends Phaser.Scene {
    constructor(){
        super('gameScene');
    } 

    preload(){
        this.load.image("blue-brick", "./img/PNG/brick_blue.png");
        this.load.image("green-brick", "./img/PNG/03-Breakout-Tiles.png");
        this.load.image("yellow-brick", "./img/PNG/13-Breakout-Tiles.png");
        this.load.image("breaker", "./img/PNG/43-Breakout-Tiles.png");
        this.load.image("ball", "./img/PNG/58-Breakout-Tiles.png");

        let width = this.cameras.main.width;
        let height = this.cameras.main.height;
    }
 
    create(){
        //  Enable world bounds, but disable the floor
        this.physics.world.setBoundsCollision(true, true, true, false);

        bricks = this.physics.add.staticGroup({
            key: ['blue-brick'],
            frameQuantity: 12,
            // setScale: { x: .1, y: .1}
        });

        Phaser.Actions.GridAlign(bricks.getChildren(), {
            width: 3,
            height: 4,
            cellWidth: 70,
            cellHeight: 35,
            x: 80,
            y: 40
        });
        bricks.refresh();

        /* Creo la bola */
        ball = this.physics.add.sprite(150, 280, 'ball').setScale(.1).setBounce(1);
        ball.setCollideWorldBounds(true);
        ball.setVelocity(-75, -300);

        /* Creo el breaker, le quito la gravedad, lo vuelvo inmovible
        * y permito que choque con las paredes
        */
        breaker = this.physics.add.image(150, 280, 'breaker').setScale(.1);
        breaker.setImmovable(true);
        breaker.body.allowGravity = false;
        breaker.setCollideWorldBounds(true); 
        /* --- */

        /* Defino el mouse */
        mouse = this.input;
        /* --- */ 

        /* Colliders */
        this.physics.add.collider(breaker, ball, breakerCollideBall, null, this);
        this.physics.add.collider(ball, bricks, ballColideBrick ,null, this);

        function breakerCollideBall (breaker, ball){
            var diff = 0;
            if (ball.x < breaker.x)
            {
                //  Ball is on the left-hand side of the paddle
                diff = breaker.x - ball.x;
                ball.setVelocityX(-10 * diff);
            }
            else if (ball.x > breaker.x)
            {
                //  Ball is on the right-hand side of the paddle
                diff = ball.x -breaker.x;
                ball.setVelocityX(10 * diff);
            }
            else
            {
                console.log("Middle");
                //  Ball is perfectly in the middle
                //  Add a little random X to stop it bouncing straight up!
                ball.setVelocityX(2 + Math.random() * 8);
            }
        }

        function ballColideBrick (ball, brick){
            brick.disableBody(true, true);

            if (bricks.countActive() === 0){
                bricks.children.iterate((child) => {
                    child.enableBody(false, child.x, child.y, true, true);
                });
            }
        }
    }

    resetBall (){
        ball.setVelocity(-75, -300);
        ball.setPosition(150, 280);
    }

    update(){
        mouse.on('pointermove', function (pointer) {
            breaker.setPosition(pointer.x, 280);
        });

        if (ball.y > 600) {
            this.resetBall();
        }
    }
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
        default: 'arcade'
    }
}

/* Configuracion de gravedad para plataformas */
// physics: {
//     default: 'arcade',
//     arcade: {
//         gravity: { y: 500 }
//     }
// }
/* --- */

// Inicializacion del objeto
game = new Phaser.Game(config)