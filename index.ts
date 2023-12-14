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
  colors: ImageData

  constructor() {
    this.width = 720;
    this.height = 480;
    this.pixels = new Array(this.width * this.height).fill(0);

    const canvas = document.getElementById('canvas')! as HTMLCanvasElement;
    this.colors = canvas.getContext("2d")!.getImageData(0, 0, this.width, this.height);

    // populate bottom row with white color
    const H = (this.height - 1) * this.width;
    for (let i = 0; i < this.width; ++i) {
      this.pixels[H + i] = 36;
    }
  }

  doFire() {
    for (let x = 0; x < this.width; x++) {
      for (let y = 1; y < this.height; y++) {
        this.spreadFire(y * this.width + x);
      }
    }
  }

  spreadFire(from: number) {
    let to = from - this.width;
    this.pixels[to] = this.pixels[from] - 2;
  }

  run() {
    const updateFunc = () => {
      // this.doFire();

      for (let y = 0; y < this.height; ++y) {
        const offset = y * this.width;
        for (let x = 0; x < this.width; ++x) {
          const index = this.pixels[offset + x];
          this.colors.data[this.width * y + x] = FIRE_RGB[index];
          this.colors.data[this.width * y + x + 1] = FIRE_RGB[index + 1];
          this.colors.data[this.width * y + x + 2] = FIRE_RGB[index + 2];
        }
      }

      window.requestAnimationFrame(updateFunc);
    }

    window.requestAnimationFrame(updateFunc)
  }
}

document.body.onload = () => {
  const doom = new DoomFire();
  doom.run();
}
