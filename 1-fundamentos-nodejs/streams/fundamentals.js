import { Readable } from 'node:stream';

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      const buffer = Buffer.from(String(i));

      this.push(buffer);

      if (i >= 100) {
        this.push(null);
      }
    }, 1000);
  }
}

new OneToHundredStream().pipe(process.stdout);
