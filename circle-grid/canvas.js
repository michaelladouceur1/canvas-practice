let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext("2d");

const mouse = {
  x: undefined,
  y: undefined,
};

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

// Parameters
const radius = 1;
const jiggle = 2;
const spacing = 20 * radius;
const columns = Math.floor(window.innerWidth / spacing);
const rows = Math.floor(window.innerHeight / spacing);

function Circle(x, y, radius) {
  this.x = x;
  this.y = y;
  this.ox = x;
  this.oy = y;
  this.radius = radius;
  this.oradius = radius;
  this.color = "#fff";

  this.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  };

  this.update = function () {
    this.x = this.ox + (Math.random() - 0.5) * jiggle;
    this.y = this.oy + (Math.random() - 0.5) * jiggle;

    const distance = Math.sqrt(
      Math.pow(this.ox - mouse.x, 2) + Math.pow(this.oy - mouse.y, 2)
    );
    const maxDistance = spacing * 10;

    if (distance < maxDistance) {
      const grad = (maxDistance - distance) / maxDistance;
      this.radius = 5 * grad * this.oradius + this.oradius;
      this.color = `rgba(${(distance / maxDistance) * 255},255,255,0.7)`;
    } else {
      this.radius = this.oradius;
      this.color = "#fff";
    }
    this.draw();
  };
}

const circleArray = [];
function initialize() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      circleArray.push(
        new Circle(spacing * j + spacing / 2, spacing * i + spacing / 2, radius)
      );
    }
  }
  //   console.log(circleArray);
}

// const circle = new Circle(200, 200, 4);
// circle.draw();

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (const circle of circleArray) {
    circle.update();
  }
}

initialize();
// animate();
