export default class Hittest {
  constructor() {}

  checkme(a, b) {
    let ab = a.getBounds();//finder ud af højde og bredde på et objekt
    let bb = b.getBounds();

    return (
      ab.x + ab.width > bb.x &&
      ab.x < bb.x + bb.width &&
      ab.y + ab.height > bb.y &&
      ab.y + bb.y + bb.height
    );
  }
}
