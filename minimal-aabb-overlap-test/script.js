const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function updateAABB(box) {
  const { x, y, width, height, AABB } = box;
  // left
  AABB[0] = x - width * 0.5;
  // right
  AABB[1] = x + width * 0.5;
  // top
  AABB[2] = y - height * 0.5;
  // bottom
  AABB[3] = y + height * 0.5;
}

function testTwoAABBOverlap(A, B) {
  const [aLeft, aRight, aTop, aBottom] = A.AABB;
  const [bLeft, bRight, bTop, bBottom] = B.AABB;

  return (
    aLeft <= bRight && aRight >= bLeft && aBottom >= bTop && aTop <= bBottom
  );
}

function drawBox(box) {
  const { width, height } = box;
  const [left, , top] = box.AABB;

  if (box.isColliding) {
    ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
    ctx.fillRect(left, top, width, height);
  }

  ctx.strokeStyle = 'black';
  ctx.strokeRect(left, top, width, height);
}

// AABB: [left, right, top, bottom]
const mouseBox = {
  x: 0,
  y: 0,
  width: 50,
  height: 50,
  AABB: [0, 0, 0, 0],
  isColliding: false,
};

document.addEventListener('mousemove', (event) => {
  const e = event ?? window.event;
  mouseBox.x = e.pageX ?? e.clientX ?? 0;
  mouseBox.y = e.pageY ?? e.clientY ?? 0;
});

const boxes = Array.from({ length: 50 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  width: Math.random() * 60 + 40,
  height: Math.random() * 60 + 40,
  AABB: [0, 0, 0, 0],
  isColliding: false,
}));

boxes.forEach((box) => updateAABB(box));

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  updateAABB(mouseBox);
  mouseBox.isColliding = false;

  boxes.forEach((box) => {
    const areColliding = testTwoAABBOverlap(box, mouseBox);
    box.isColliding = areColliding;
    if (areColliding && !mouseBox.isColliding) mouseBox.isColliding = true;

    drawBox(box);
  });

  drawBox(mouseBox);

  requestAnimationFrame(update);
}

update();
