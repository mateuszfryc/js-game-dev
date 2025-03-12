window.onload = () => {
  const canvas = document.querySelector('#canvas');
  const draw = canvas.getContext('2d');

  canvas.width = window.innerWidth || document.body.clientWidth;
  canvas.height = window.innerHeight || document.body.clientHeight;

  const circle = {
    x: window.innerWidth * 0.5,
    y: window.innerHeight * 0.5,
    radius: 150,
  };

  const pointOnCricle = {
    x: window.innerWidth * 0.5,
    y: window.innerHeight * 0.5,
  };

  const mouse = {
    x: 0,
    y: 0,
  };

  const getPointOnCircleClosestToPoint = (c, p) => {
    const vX = p.x - c.x;
    const vY = p.y - c.y;
    const length = Math.sqrt(vX * vX + vY * vY);

    return {
      x: c.x + (vX / length) * c.radius,
      y: c.y + (vY / length) * c.radius,
    };
  };

  document.addEventListener('mousemove', (e) => {
    const event = e || window.event;
    mouse.x = event.x || event.pageX || event.clientX;
    mouse.y = event.y || event.pageY || event.clientY;

    const point = getPointOnCircleClosestToPoint(circle, mouse);
    console.log(point);
    pointOnCricle.x = point.x;
    pointOnCricle.y = point.y;
  });

  const update = () => {
    draw.clearRect(0, 0, canvas.width, canvas.height);

    // draw mouse
    draw.beginPath();
    draw.fillStyle = 'blue';
    draw.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
    draw.fill();

    // draw circle
    draw.beginPath();
    draw.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    draw.stroke();

    // point on circle
    draw.beginPath();
    draw.fillStyle = 'red';
    draw.arc(pointOnCricle.x, pointOnCricle.y, 3, 0, Math.PI * 2);
    draw.fill();

    requestAnimationFrame(update);
  };

  update();
};
