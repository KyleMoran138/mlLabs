import Phaser from "phaser";
import listenForRefresh from "./websocketListener";
import { Agent } from "./agent";
import { Point } from "./point";
listenForRefresh();

class SimpleGame extends Phaser.Scene {
  private agent!: Agent;
  private points: Point[] = [];

  constructor() {
    super({
      key: SimpleGame.name,
    });
  }

  preload() {}

  create() {
    this.agent = new Agent(this, 400, 300);

    // Create 10 random points randomly on the screen
    for (let i = 0; i < 10; i++) {
      const x = Phaser.Math.Between(0, this.cameras.main.width);
      const y = Phaser.Math.Between(0, this.cameras.main.height);
      const point = new Point(this, x, y);
      this.points.push(point);
    }
  }

  update() {
    this.agent.update();
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "content",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0, x: 0 },

      debug: true,
    },
  },
  scene: SimpleGame,
};

const game = new Phaser.Game(config);
