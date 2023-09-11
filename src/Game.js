import Stage from "./Stage";
import { Sprite, AnimatedSprite, Texture } from "pixi.js";
import { gsap } from "gsap";
import { Howler } from "howler";

export default class Game {
  constructor(assets) {
    let myStage = new Stage();

    this.scene = myStage.scene;
    this.scene.sortableChildren = true; //Så vi kan bruge z-index på children
    let background = myStage.bg;
    this.si = myStage.StageInfo;

    const bg = Sprite.from(assets.background);
    background.addChild(bg);

    const ninja = new AnimatedSprite(assets.ninja.animations["alien"]);

    //For at sætte ninja(SPRITE) på midten af skærmen
    ninja.anchor.set(0.5);
    ninja.x = 512;
    ninja.y = 768 - 150; //Trækker højden af ninja fra skærmen:
    ninja.zIndex = 2;
    ninja.animationSpeed = 0.5;
    ninja.buttonMode = true;
    ninja.play();

    //Tilføj ninja til scenen
    this.scene.addChild(ninja);

    this.si.app.stage.eventMode = "static";
    this.si.app.stage.on("pointerdown", (event) => {
      ninja.stop();
      ninja.texture = Texture.from("../assets/images/ninja-jump.png");

      let newPosition = event.getLocalPosition(background);

      //For at få ninja til at vende sig om, når man klikker mod højre side af skærmen.
      let mXpos = event.global.x;
      mXpos > this.si.appWidth / 2 ? (ninja.scale.x = -1) : (ninja.scale.x = 1);


      //Afspilling af lyd
      this.hitSound = new Howl ({
        src: ["../assets/sound/punch.mp3"],
        volume: .5
      })

      this.hitSound.play();

      //For at vide hvor musen er, når der trykkes:
      gsap.to(ninja, {
        duration: 0.2,
        x: newPosition.x - 300,
        y: newPosition.y,
        ease: "Circle.easeOut", //Circle gør, at jo længere den kommer ud, så aftager den noget fart.

        //For at få ninja til at hoppe tilbage til midten
        onComplete: () => {
          gsap.to(ninja, {
            duration: 0.2,
            x: 500,
            y: 768 - 150,
            ease: "Circle.easeOut",
          });

          ninja.play(); //Får ninja til at gå tilbage til idle-stance efter at have hoppet
        },
      });
    }); // event
    
          //PLAY knap
          const play = Sprite.from(assets.play);
           play.anchor.set(0.5);
           play.x = 512;
           play.y = 250;
           play.eventMode = "static";
           play.buttonMode = true;
           this.scene.addChild(play);
    
    
          play.on("pointerdown", (event) => {
            event.stopPropagation();
            this.si.app.stage.eventMode = "static";
    
            gsap.to(event.currentTarget, {
              duration: 0.5,
              delay: 0.2,
              y: play.y - 350,
              ease: "Elastic.easeInOut"
            });
    
            let soundSwirp = new Howl ({
              src: ["../assets/sound/effekt_swish.mp3"],
              volume: 0.2
            });
    
            let timerid = setTimeout (()=>{
              soundSwirp.play();
            }, 500);
    
    
          })
  } // END constructor
} // END class
