const FIRE_RGB = [
  0x07, 0x07, 0x07,
  0x1F, 0x07, 0x07,
  0x2F, 0x0F, 0x07,
  0x47, 0x0F, 0x07,
  0x57, 0x17, 0x07,
  0x67, 0x1F, 0x07,
  0x77, 0x1F, 0x07,
  0x8F, 0x27, 0x07,
  0x9F, 0x2F, 0x07,
  0xAF, 0x3F, 0x07,
  0xBF, 0x47, 0x07,
  0xC7, 0x47, 0x07,
  0xDF, 0x4F, 0x07,
  0xDF, 0x57, 0x07,
  0xDF, 0x57, 0x07,
  0xD7, 0x5F, 0x07,
  0xD7, 0x5F, 0x07,
  0xD7, 0x67, 0x0F,
  0xCF, 0x6F, 0x0F,
  0xCF, 0x77, 0x0F,
  0xCF, 0x7F, 0x0F,
  0xCF, 0x87, 0x17,
  0xC7, 0x87, 0x17,
  0xC7, 0x8F, 0x17,
  0xC7, 0x97, 0x1F,
  0xBF, 0x9F, 0x1F,
  0xBF, 0x9F, 0x1F,
  0xBF, 0xA7, 0x27,
  0xBF, 0xA7, 0x27,
  0xBF, 0xAF, 0x2F,
  0xB7, 0xAF, 0x2F,
  0xB7, 0xB7, 0x2F,
  0xB7, 0xB7, 0x37,
  0xCF, 0xCF, 0x6F,
  0xDF, 0xDF, 0x9F,
  0xEF, 0xEF, 0xC7,
  0xFF, 0xFF, 0xFF
];

class DoomFire {
  width: number
  height: number
  pixels: number[]
  ctx: CanvasRenderingContext2D
  imageData: imageData

  constructor() {
    this.width = 500;
    this.height = 100;
    this.pixels = new Array(this.width * this.height).fill(0);

    const canvas = document.getElementById('canvas')! as HTMLCanvasElement;
    // this.ctx = canvas.getContext('2d');
    this.ctx = canvas.getContext('2d', { willReadFrequently: true });
    this.imageData = this.ctx.createImageData(this.width, this.height);

    // populate bottom row with white color
    const H = (this.height - 1) * this.width;
    for (let i = 0; i < this.width; ++i) {
      this.pixels[H + i] = 36;
    }
  }

  update() {
    const wind = Number(document.getElementById("wind")!.value) + 1;
    for (let x = 0; x < this.width; ++x) {
      for (let y = 1; y < this.height; ++y) { // bottom row is always pure white
        const rand = Math.round(Math.random() * 3.0) & 3;
        const from = y * this.width + x;
        const to = from - this.width - rand + wind;
        this.pixels[to] = this.pixels[from] - (rand & 1);
      }
    }
  }

  render() {
    for (let y = 0; y < this.height; ++y) {
      const offset = y * this.width;
      for (let x = 0; x < this.width; ++x) {
        const index = offset + x;
        const colorIndex = this.pixels[offset + x] * 3;

        this.imageData.data[index * 4] = FIRE_RGB[colorIndex];
        this.imageData.data[index * 4 + 1] = FIRE_RGB[colorIndex + 1];
        this.imageData.data[index * 4 + 2] = FIRE_RGB[colorIndex + 2];
        this.imageData.data[index * 4 + 3] = 255;
      }
    }

    this.ctx.putImageData(this.imageData, 0, 0);
  }

  run() {
    const frame = () => {
      this.update();
      this.render();
      window.requestAnimationFrame(frame);
    };

    setTimeout(frame, 50);
  }
}

document.body.onload = () => {
  const doom = new DoomFire();
  doom.run();
}
