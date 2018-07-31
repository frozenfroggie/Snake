const Food = {
  init() {
    this.position = {
      x: randomInt(0, (innerWidth - 40) / 20) * 20,
      y: randomInt(0, (innerHeight - 40) / 20) * 20
    };
    return this;
  },
  draw() {
    const { x, y } = this.position;
    ctx.fillStyle = '#E53A40';
    ctx.fillRect(x, y, 20, 20);
  },
  generate() {
    this.position.x = randomInt(0, (innerWidth - 40) / 20) * 20;
    this.position.y = randomInt(0, (innerHeight - 40) / 20) * 20;
  }
}
