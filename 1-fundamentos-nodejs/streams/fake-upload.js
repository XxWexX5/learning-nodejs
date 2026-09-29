import { Readable } from 'node:stream';

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      const buffer = Buffer.from(String(i));

      this.push(buffer);

      if (i >= 5) {
        this.push(null);
      }
    }, 1000);
  }
}

fetch('http://localhost:3334', {
  method: 'POST',
  body: new OneToHundredStream(),
  duplex: 'half',
}).then(async (response) => {
  const data = await response.text();
  console.log(data);
});
