const Snake = {
	init(initialPosition, color) {
		this.segments = [{
      position: {
        x: initialPosition.x,
        y: initialPosition.y
      },
      lastPosition: {
        x: null,
        y: null
      }
		}];
    this.direction = randomDirection();
		this.alive = true;
		this.color = color;
		this.velocity = 20;
		this.canChangeDirection = true;
		this.score = 0;
		return this;
	},
  draw() {
    this.segments.forEach(segment => {
			ctx.beginPath();
			ctx.arc(segment.position.x - 10, segment.position.y - 10, 10, 0, 2 * Math.PI);
			ctx.closePath();
			ctx.fillStyle = this.color;
			ctx.fill();
    });
  },
	update() {
		this.canChangeDirection = true;
		const firstSegmentPosition = this.segments[0].position;
		if(firstSegmentPosition.x < 10 || firstSegmentPosition.x >= innerWidth ||
			 firstSegmentPosition.y < 10 || firstSegmentPosition.y >= innerHeight) {
			 this.death();
		}
    for(let i = 0; i < this.segments.length; i++) {
      if(this.segments[i].lastPosition.x !== this.segments[i].position.x ||
				 this.segments[i].lastPosition.y !== this.segments[i].position.y) {
        this.segments[i].lastPosition.x = this.segments[i].position.x;
        this.segments[i].lastPosition.y = this.segments[i].position.y;
      }
      if(this.segments[i-1]) {
        this.segments[i].position.x = this.segments[i-1].lastPosition.x;
        this.segments[i].position.y = this.segments[i-1].lastPosition.y;
      }
    }
    switch(this.direction) {
      case 'right':
        this.segments[0].position.x += this.velocity;
        this.segments[0].position.y += 0;
        break;
      case 'left':
        this.segments[0].position.x -= this.velocity;
        this.segments[0].position.y += 0;
        break;
      case 'up':
        this.segments[0].position.x += 0;
        this.segments[0].position.y -= this.velocity;
        break;
      case 'down':
        this.segments[0].position.x += 0;
        this.segments[0].position.y += this.velocity;
        break;
    }
		this.draw();
	},
  eat(food) {
    const segmentsLastIdx = this.segments.length - 1;
    this.segments.push({
      position: {
        x: this.segments[segmentsLastIdx].lastPosition.x,
        y: this.segments[segmentsLastIdx].lastPosition.y
      },
      lastPosition: {
        x: null,
        y: null
      }
    });
		this.score += 10;
  },
	death() {
		this.alive = false;
	}
}
