const canvas = document.querySelector("canvas");
if (!canvas) throw new Error("Canvas not found");
const ctx = canvas.getContext("2d");
if (!ctx) throw new Error("2d context not found");
console.log(canvas, ctx);

const cssSize = 500;
canvas.style.width = `${cssSize}px`;
canvas.style.height = `${cssSize}px`;
canvas.width = cssSize * window.devicePixelRatio;
canvas.height = cssSize * window.devicePixelRatio;

const drawSize = 100;
ctx.scale(canvas.width / drawSize, canvas.height / drawSize);

ctx.fillStyle = "white";
ctx.fillRect(0, 0, drawSize, drawSize);

const random = (min: number, max: number) => Math.random() * (max - min) + min;

function drawTree(x: number, y: number, angle: number, depth = 0) {
  if (!ctx) return;
  if (depth > 15) return;
  ctx.lineCap = "round";

  // random die roll
  if (Math.random() < 0.05) return;

  const branchWidth = 0.2;
  // const branchAngle = 0.175 + random(-0.1, 0.1);

  // angle += random(-0.2, 0.2);
  const branchLength = 10 * 0.95 ** depth * (1 + random(-0.1, 0.1));

  ctx.strokeStyle = "black";

  const newX = x + Math.cos(angle) * branchLength;
  const newY = y + Math.sin(angle) * branchLength;

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(newX, newY);
  ctx.lineWidth = branchWidth;
  ctx.stroke();

  if (Math.random() <= 0.3) {
    drawTree(newX, newY, angle + random(0, 0.3), depth + 1);
    drawTree(newX, newY, angle + random(0, -0.3), depth + 1);
  } else {
    drawTree(newX, newY, angle + random(-0.2, 0.2), depth + 1);
  }
}

const initialRandomness = 0.3;
drawTree(
  random(20, 80),
  110 + random(0, 10),
  -Math.PI / 2 + random(-initialRandomness, initialRandomness),
);
drawTree(
  random(20, 80),
  110 + random(0, 10),
  -Math.PI / 2 + random(-initialRandomness, initialRandomness),
);

export {};
