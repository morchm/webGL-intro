import * as PIXI from "pixi.js";
import { Application } from "pixi.js";

class Stage {
  constructor() {
    console.log("Stage");

    //For at skalere canvas på forskellige enheder.
    this.targetWidth = 1700;
    this.targetHeight = 768;
    this.targetCenter = 1024; // centers interactive area for objects (not background)
    this.appWidth = window.innerWidth;
    this.appHeight = window.innerHeight;
    this.appWidth = window.innerWidth;
    this.appHeight = window.innerHeight;
    this.scaleFactor = this.appWidth / this.targetWidth;

    //Tilføjer et canvas på siden:
    this.app = new Application();
    // globalThis.__PIXI_APP__ = app;
    document.body.appendChild(this.app.view);

    //Baggrund til canvas:
    this.bg = new PIXI.Container();
    //Tag baggrundens X-position og læg den på midten.
    this.bg.x = this.appWidth / 2; //X er en enhed i pixi's Container
    //Gør det samme for y-aksen
    this.bg.y = this.appHeight / 2;
    this.bg.pivot.x = this.targetWidth * 0.5;
    this.bg.pivot.y = this.targetHeight * 0.5;
    this.bg.eventMode = "static"; //Lyt på eventlistener: Man kan ikke bruge en eventlistener hvis man ikke laver en eventMode

    this.app.stage.addChild(this.bg); //addChild er Pixi's måde at tilføje til canvas

    this.bg.scale.x = this.bg.scale.y = this.scaleFactor;
    this.bg.scale.y = this.bg.scale.x = this.appHeight / this.targetHeight;

    this.scene = new PIXI.Container();
    this.scene.x = this.appWidth / 2;
    this.scene.y = 0;
    this.scene.pivot.x = this.targetCenter * 0.5;
    this.app.stage.addChild(this.scene);
    this.scene.getBounds();
    this.scene.scale.x = this.scene.scale.y = this.scaleFactor;
    this.scene.scale.y = this.scene.scale.x =
      this.appHeight / this.targetHeight;

    this.app.renderer.resize(this.appWidth, this.appHeight);
  } //END constructor

  get StageInfo() {
    return {
      appWidth: this.appWidth,
      appHeight: this.appHeight,
      targetHeight: this.targetHeight,
      targetWidth: this.targetWidth,
      scaleFactor: this.scaleFactor,
      app: this.app,
    };
  }
} //END class

export default Stage;