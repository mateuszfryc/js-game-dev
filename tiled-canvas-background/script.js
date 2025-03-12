const img = new Image();
img.src = './tile.jpg'

img.addEventListener('load', () => {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  const body = document.querySelector('body');
  const mouse = {
    x: 0,
    y: 0,
  }
  let zoom = 1;
  let isMouseDown = false;  

  canvas.width = window.innerWidth || document.documentElement.clientWidth || body.clientWidth;
  canvas.height = window.innerHeight || document.documentElement.clientHeight || body.clientHeight;

  const viewport = {
    width: 400,
    height: 200,
    x: (canvas.width / 2) - 200,
    y: (canvas.height / 2) - 100,
  }

  /** Random position of the image. */
  let imgX = viewport.x - 125;
  let imgY = viewport.y + 93;

  document.addEventListener('wheel', (e) => {
    zoom += Math.sign(e.deltaY) * 0.1;
    if (zoom < 0.1) zoom = 0.1;
    if (zoom > 2) zoom = 2;
  });

  document.addEventListener('mousedown', (e) => {
    mouse.x = e.pageX ?? e.clientX;
    mouse.y = e.pageY ?? e.clientY;
    isMouseDown = true;
  });

  document.addEventListener('mouseup', () => {
    isMouseDown = false;
  });

  document.addEventListener('mousemove', (e) => {
    if (isMouseDown) {
      const x = e.pageX ?? e.clientX;
      const y = e.pageY ?? e.clientY;
      imgX -= mouse.x - x;
      imgY -= mouse.y - y;
      mouse.x = x;
      mouse.y = y;
    }
  });

  /**
   * Ideally this function takes Image
   * with its position and size
   * and viewport with its position
   * and size as argumets.
   * 
   * Find how manny columns and rows of image
   * needs to be rendered to cover entire viewport.
   * Cell size is equal to image size.
  */
  const drawTiledImage = () => {
    const x = imgX - viewport.x;
    const y = imgY - viewport.y;
    const width = img.width * zoom;
    const height = img.height * zoom;

    /** Grid top left corner */
    const xOffset = x - Math.ceil(x / width) * width;
    const yOffset = y - Math.ceil(y / height) * height;

    /**
     * Find how many images needs to be drawn from xOffset
     * to the right and from yOffset to the bottom.
     * */
    const columns = Math.ceil((Math.abs(xOffset) + viewport.width) / width);
    const rows = Math.ceil((Math.abs(yOffset) + viewport.height) / height);

    const gridX = viewport.x + xOffset;
    const gridY = viewport.y + yOffset;

    for (let c = 0; c < columns; c++) {
      for (let r = 0; r < rows; r++) {
        context.drawImage(
          img,
          gridX + c * width,
          gridY + r * height,
          width,
          height,
        );
      }
    }
  }

  const update = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawTiledImage();

    // Drwa viewport bounds
    context.strokeStyle = 'red';
    context.lineWidth = 3;
    context.strokeRect(viewport.x, viewport.y, viewport.width, viewport.height);

    requestAnimationFrame(update);
  }

  update();
})
