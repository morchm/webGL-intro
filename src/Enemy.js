import { gsap } from "gsap";
import * as PIXI from "pixi.js";
import "pixi-spine";
import { Spine } from "pixi-spine";
import RandomInterval from "set-random-interval";

class Enemy {
  constructor(assets, scene) {
    this.settings = {
      startFrom: 0,
      endAt: 0,
      front: 0,
      enemyArray: [],
      enemyDuration: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 40, 50],
      from: ["left", "right"],
      counter: 0,
    };

    const myRandomInterval = new RandomInterval(
      () => {
        let getFrom =
          this.settings.from[
            Math.floor(Math.random() * this.settings.from.length)
          ];

        this.settings.counter++;

        //For at få counter til at skifte randomly mellem højre og venstre
        if (getFrom == "left") {
          this.settings.startFrom = -400;
          this.settings.endAt = 1700;
          this.settings.front = -1; //Hvis man bruger en scale.x på containeren og sætter den til -1 vil den flippe horizontalt
        } else {
          this.settings.startFrom = 1700;
          this.settings.endAt = -400;
          this.settings.font = 1;
        }

        //Container til Enemy
        this.enemyContainer = new PIXI.Container();
        this.enemyContainer.x = this.settings.startFrom;
        this.enemyContainer.data =
          this.settings.enemyDuration[
            Math.floor(Math.random() * this.settings.enemyDuration.length)
          ];
        this.enemyContainer.alive = true;
        this.enemyContainer.attack = true;
        this.enemyContainer.id = this.settings.counter;
        this.enemyContainer.y = 768 - 50;
        this.enemyContainer.scale.x = this.settings.front;
        this.enemyContainer.zIndex = 1;
        scene.addChild(this.enemyContainer);
        this.settings.enemyArray.push(this.enemyContainer);

        //ENEMY sprite
        const animation = new Spine(assets.alienSpine.spineData);
        animation.x = 0;
        animation.y = 0;

        this.enemyContainer.addChild(animation);

        if (animation.state.hasAnimation("walk")) {
          animation.state.setAnimation(0, "walk", true);
          animation.state.timeScale = 0.8;

          animation.autoUpdate = true;
        }

        const hitarea = new PIXI.Graphics();
        hitarea.beginFill(0xde3249);
        hitarea.drawRect(-25, -75, 50, 50);
        hitarea.alpha = 1;
        hitarea.endFill();
        this.enemyContainer.addChild(hitarea);

        gsap.to(this.enemyContainer, {
          duration: this.enemyContainer.data,
          x: this.settings.endAt,
          ease: "Power0.easeNone",
          onComplete: () => {
            scene.removeChild(this.settings.enemyArray[0]);
          },
        });
      },
      1000,
      5000
    ); //END random generator
  } //END constructor

  get enemies() {
    return this.settings.enemyArray;
  }
  
} //END class
export default Enemy;
