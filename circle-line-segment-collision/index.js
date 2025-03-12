const circleA = {
  x: 0,
  y: 0,
  radius: 40,
};

const lineA = {
  a: {
    x: 140,
    y: 140,
  },
  b: {
    x: 350,
    y: 360,
  },
};

function isCircleOverlappingLine(circle, line) {
  const { x, y, radius } = circle;
  const { a, b } = line;
  const v1x = b.x - a.x;
  const v1y = b.y - a.y;
  const v2x = x - a.x;
  const v2y = y - a.y;
  // get the unit distance along the line of the closest point to
  // circle center
  const u = (v2x * v1x + v2y * v1y) / (v1y * v1y + v1x * v1x);

  const dist =
    u >= 0 && u <= 1
      ? // if the point is on the line segment get the distance squared
        // from that point to the circle center
        (a.x + v1x * u - x) ** 2 + (a.y + v1y * u - y) ** 2
      : // if closest point not on the line segment
      // use the unit distance to determine which end is closest
      // and get dist square to circle
      u < 0
      ? (a.x - x) ** 2 + (a.y - y) ** 2
      : (b.x - x) ** 2 + (b.y - y) ** 2;

  return dist <= radius * radius;
}

function findLineCircleIntersections(circle, line) {
  const { x, y, radius } = circle;
  const { a, b } = line;
  const points = [];

  const v1x = b.x - a.x;
  const v1y = b.y - a.y;
  const v2x = a.x - x;
  const v2y = a.y - y;
  const c = 2 * (v1x * v1x + v1y * v1y);
  let l = -2 * (v1x * v2x + v1y * v2y);
  let d = l * l - 2 * c * (v2x * v2x + v2y * v2y - radius * radius);
  console.log(d);
  // no overlap
  if (d < 0) return points;

  // these represent the unit distance of point one and two on the line
  d = Math.sqrt(d);
  const u1 = (l - d) / c;
  const u2 = (l + d) / c;

  // add point if on the line segment
  if (u1 <= 1 && u1 >= 0) {
    points[0] = {
      x: a.x + v1x * u1,
      y: a.y + v1y * u1,
    };
  }

  // second add point if on the line segment
  if (u2 <= 1 && u2 >= 0) {
    points[points.length] = {
      x: a.x + v1x * u2,
      y: a.y + v1y * u2,
    };
  }

  return points;
}

const canvas = document.getElementById('canvas');
const body = document.getElementsByTagName('body');

const width =
  window.innerWidth || document.documentElement.clientWidth || body.clientWidth;
const height =
  window.innerHeight ||
  document.documentElement.clientHeight ||
  body.clientHeight;

canvas.width = width;
canvas.height = height;

const ctx = canvas.getContext('2d');
ctx.fillStyle = 'red';

document.addEventListener('mousemove', (event) => {
  const e = event ?? window.event;
  circleA.x = e.pageX ?? e.clientX ?? 0;
  circleA.y = e.pageY ?? e.clientY ?? 0;

  const points = findLineCircleIntersections(circleA, lineA);

  ctx.strokeStyle = isCircleOverlappingLine(circleA, lineA) ? 'red' : 'black';
  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();
  ctx.arc(circleA.x, circleA.y, circleA.radius, 0, Math.PI * 2);

  ctx.moveTo(lineA.a.x, lineA.a.y);
  ctx.lineTo(lineA.b.x, lineA.b.y);
  ctx.stroke();

  if (points.length > 0) {
    ctx.beginPath();
    points.forEach((point) => ctx.arc(point.x, point.y, 4, 0, Math.PI * 2));
    ctx.fill();
  }
});
