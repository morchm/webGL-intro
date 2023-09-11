import Game from "./Game";
import "../css/style.scss";
// import * as PIXI from "pixi.js";
import { Assets } from "pixi.js";

// **  IIFE: Immediately Invoked Function Expression  */
Assets.addBundle("ninjas", {
  ninja: "../assets/spritesheet/ninjarack.json",
  ninjaJump: "../assets/images/ninja-jump.png",
  ninjaHurt: "../assets/images/ninja-hurt.png",
  background: "./assets/images/background.jpg",
  play: "../assets/images/play.png",
  alienSpine: "../assets/spritesheet/alien-spine/alienboss.json",
});

(async () => {
  const assets = await Assets.loadBundle("ninjas");
  
  new Game(assets);
})();
