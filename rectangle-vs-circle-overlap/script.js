window.onload = () => {
  const canvas = document.querySelector('#canvas');
  const draw = canvas.getContext('2d');

  canvas.width = window.innerWidth || document.body.clientWidth;
  canvas.height = window.innerHeight || document.body.clientHeight;

  const clamp = (value, min, max) =>
    value > max ? max : value < min ? min : value;

  const circle = {
    x: 250,
    y: 170,
    radius: 30,
    speed: 73,
    isColliding: false,
  };

  const rectangle = {
    x: 50,
    y: 50,
    width: 400,
    height: 200,
  };

  const mouse = {
    x: 0,
    y: 0,
  };

  document.addEventListener('mousemove', (e) => {
    const event = e || window.event;
    mouse.x = event.pageX || event.clientX;
    mouse.y = event.pageY || event.clientY;
  });

  const point = {
    x: 0,
    y: 0,
  };
  const findClosestPointOnRectangle = (c, r) => {
    point.x = clamp(c.x, r.x, r.x + r.width);
    point.y = clamp(c.y, r.y, r.y + r.height);

    return point;
  };

  const testResult = { x: 0, y: 0 };
  const circleRectangleOverlap = (c, r) => {
    let { x, y } = findClosestPointOnRectangle(c, r);
    x = c.x - x;
    y = c.y - y;

    if (x === 0 && y === 0) {
      testResult.x = 0;
      testResult.y = 0;

      return true;
    }

    const distance = Math.sqrt(x * x + y * y);
    x = (x / distance) * (c.radius - Math.abs(distance) + 0.0000001);
    y = (y / distance) * (c.radius - Math.abs(distance) + 0.0000001);

    testResult.x = x;
    testResult.y = y;

    return distance <= c.radius;
  };

  const update = () => {
    circle.x = mouse.x;
    circle.y = mouse.y;

    circle.isColliding = circleRectangleOverlap(circle, rectangle);
    if (circle.isColliding) {
      circle.x += testResult.x;
      circle.y += testResult.y;
    }

    draw.clearRect(0, 0, canvas.width, canvas.height);
    draw.strokeStyle = circle.isColliding ? 'red' : 'black';

    // draw mouse
    draw.beginPath();
    draw.fillStyle = 'blue';
    draw.arc(mouse.x, mouse.y, 2, 0, Math.PI * 2);
    draw.fill();

    // draw circle
    draw.beginPath();
    draw.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    draw.stroke();

    // draw rectangle
    draw.strokeRect(
      rectangle.x,
      rectangle.y,
      rectangle.width,
      rectangle.height
    );

    // point on rectangle
    draw.beginPath();
    draw.fillStyle = 'red';
    draw.arc(point[0], point[1], 2, 0, Math.PI * 2);
    draw.fill();

    requestAnimationFrame(update);
  };

  update();
};
