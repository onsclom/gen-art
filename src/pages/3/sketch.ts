const canvas = document.querySelector("canvas");
if (!canvas) throw new Error("Canvas not found");
const ctx = canvas.getContext("2d");
if (!ctx) throw new Error("2d context not found");
console.log(canvas, ctx);

// i want to think in 100 x 100 grid
// but i want the resolution to be nice
const cssSize = 500;
canvas.style.width = `${cssSize}px`;
canvas.style.height = `${cssSize}px`;
canvas.width = cssSize * window.devicePixelRatio;
canvas.height = cssSize * window.devicePixelRatio;

// time to draw
const drawSize = 100;
ctx.scale(canvas.width / drawSize, canvas.height / drawSize);

ctx.fillStyle = "white";
ctx.fillRect(0, 0, drawSize, drawSize);

ctx.strokeStyle = "black";
ctx.lineWidth = 0.001 * drawSize;
const margin = 4;
// ctx.strokeRect(margin, margin, drawSize - margin * 2, drawSize - margin * 2);
ctx.beginPath();
ctx.roundRect(
  margin,
  margin,
  drawSize - margin * 2,
  drawSize - margin * 2,
  drawSize,
);
// ctx.stroke()
// ctx.rect(margin, margin, drawSize - margin * 2, drawSize - margin * 2);
ctx.clip();
{
  const squareGridSize = 200;
  const squareGridUnit = drawSize / squareGridSize;
  const squareSize = squareGridUnit;
  for (let y = 0; y <= squareGridSize; y++) {
    for (let x = 0; x <= squareGridSize; x++) {
      // ctx.translate
      ctx.save();

      const randomFactor = 1;
      const cx = x * squareGridUnit - squareGridUnit * 0.5;
      const cy = y * squareGridUnit - squareGridUnit * 0.5;
      ctx.translate(cx, cy);

      const distanceToCenter =
        Math.sqrt((cx - drawSize * 0.5) ** 2 + (cy - drawSize * 0.5) ** 2) /
        (drawSize * 0.5);
      ctx.rotate((Math.random() - 0.5) * randomFactor * distanceToCenter);
      ctx.translate(
        (Math.random() - 0.5) *
          squareGridUnit *
          distanceToCenter *
          randomFactor,
        (Math.random() - 0.5) *
          squareGridUnit *
          distanceToCenter *
          randomFactor,
      );
      // ctx.strokeRect(
      //   -squareSize * 0.5,
      //   -squareSize * 0.5,
      //   squareSize,
      //   squareSize,
      // );
      ctx.beginPath();
      ctx.roundRect(
        -squareSize * 0.5,
        -squareSize * 0.5,
        squareSize,
        squareSize,
        squareSize,
      );
      ctx.stroke();
      ctx.restore();
    }
  }
}
