const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

let snakes = [];
let food;

const animate = playersNumber => {
  const snakesAlive = snakes.filter(snake => snake.alive).length;
  if(playersNumber === 1 && snakesAlive === 0 || playersNumber > 1 && snakesAlive <= 1) {
    const scores = document.getElementById('scores');
    while (scores.hasChildNodes()) {
      scores.removeChild(scores.firstChild);
    }
    let winnerIdx = 0;
    let winners = [winnerIdx];
    for(let i = 1; i < snakes.length; i++) {
      if(snakes[winnerIdx].score < snakes[i].score) {
        winners = []
        winners.push(i)
        winnerIdx = i
      } else if(snakes[winnerIdx].score === snakes[i].score) {
        winners.push(i)
      }
    }
    snakes.forEach((snake, idx) => {
      const node = document.createElement("li");
      node.style.color = snake.color;
      document.getElementById('scores').appendChild(node);
      const textnode = document.createTextNode(`${idx + 1} player - ${snake.score}`);
      node.appendChild(textnode);
      winners.forEach(winnerIdx => {
        if(idx === winnerIdx) {
          const imgnode = document.createElement('img');
          imgnode.src = "./assets/crown.svg"
          imgnode.style.width = '20px'
          imgnode.style.height = '20px'
          imgnode.style.position = 'relative'
          imgnode.style.left = '10px'
          imgnode.style.top = '4px'
          node.appendChild(imgnode);
        }
      })
    })
    document.getElementById('gameOver').style.display = 'flex';
    document.getElementById('canvas').style.display = 'none';
    return;
  }
  const fps = 15;
  setTimeout(() => requestAnimationFrame(() => animate(playersNumber)), 1000/fps);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for(let i = 0; i < playersNumber; i++) {
    if(snakes[i] && snakes[i].alive) {
      if(snakes[i].segments[0].position.x - 20 === food.position.x && snakes[i].segments[0].position.y - 20 === food.position.y) {
        snakes[i].eat(food);
        food.generate();
      }
      const firstSegmentPosition = snakes[i].segments[0].position;
      snakes.forEach((snake,snakeIdx) => snake.segments.forEach((segment,segmentIdx) => {
        if(snakeIdx !== i && segmentIdx === 0 && firstSegmentPosition.x === segment.position.x && firstSegmentPosition.y === segment.position.y) {
          snake.death();
          snakes[i].death();
        } else if(segmentIdx !== 0 && firstSegmentPosition.x === segment.position.x && firstSegmentPosition.y === segment.position.y) {
          snake.score += 50;
          snakes[i].death();
        }
      }));
      snakes[i].update();
    }
  }
  food.draw();
}

const keyboardSettings = playersNumber => {
  document.addEventListener('keydown', event => {
    const keys = [{
      up: 'ArrowUp',
      down: 'ArrowDown',
      left: 'ArrowLeft',
      right: 'ArrowRight'
    }, {
      up: 'KeyW',
      down: 'KeyS',
      left: 'KeyA',
      right: 'KeyD'
    }, {
      up: 'KeyI',
      down: 'KeyK',
      left: 'KeyJ',
      right: 'KeyL'
    }];
    for(let i = 0; i < playersNumber; i++) {
      switch(event.code) {
        case keys[i].up:
          if(snakes[i].direction === 'down' && snakes[i].segments.length > 1) {
            break;
          } else if(snakes[i].canChangeDirection) {
            snakes[i].direction = 'up';
            snakes[i].canChangeDirection = false;
            break;
          }
        case keys[i].down:
          if(snakes[i].direction === 'up' && snakes[i].segments.length > 1) {
            break;
          } else if(snakes[i].canChangeDirection) {
            snakes[i].direction = 'down';
            snakes[i].canChangeDirection = false;
            break;
          }
        case keys[i].left:
          if(snakes[i].direction === 'right' && snakes[i].segments.length > 1) {
            break;
          } else if(snakes[i].canChangeDirection) {
            snakes[i].direction = 'left';
            snakes[i].canChangeDirection = false;
            break;
          }
        case keys[i].right:
          if(snakes[i].direction === 'left' && snakes[i].segments.length > 1) {
            break;
          } else if(snakes[i].canChangeDirection) {
            snakes[i].direction = 'right';
            snakes[i].canChangeDirection = false;
            break;
          }
      }
    }
  });
}

const startGame = (playersNumber, colors) => {
  keyboardSettings(playersNumber);
  document.getElementById('container').style.display = 'none';
  document.getElementById('canvas').style.display = 'block';
  for(let i = 0; i < playersNumber; i++) {
    const initialPosition = generateInitialPosition();
    const snake = Object.create(Snake).init(initialPosition, colors[i]);
    snakes.push(snake);
  }
  food = Object.create(Food).init();
  animate(playersNumber);
}

document.addEventListener("DOMContentLoaded", event => {
  let colors = ["#e66465", "#f6b73c", "#3f87a6"];
  for(let i = 1; i <= 3; i++) {
    document.getElementById(`colorPicker${i}`).addEventListener('input', event => colors[i-1] = event.target.value);
    document.getElementById(`${i}Players`).addEventListener('click', event => startGame(i, colors));
  }
  document.getElementById("newGame").addEventListener('click', event => {
    snakes = [];
    food = null;
    document.getElementById('gameOver').style.display = 'none';
    document.getElementById('container').style.display = 'flex';
  });
});
