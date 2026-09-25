import fs from 'fs';
import zlib from 'zlib';

const buf = fs.readFileSync('src/assets/logo-original-master.png');
let pos = 8;
const idatChunks = [];
let width = buf.readUInt32BE(16);
let height = buf.readUInt32BE(20);

while (pos < buf.length) {
  const len = buf.readUInt32BE(pos);
  const type = buf.toString('ascii', pos + 4, pos + 8);
  if (type === 'IDAT') idatChunks.push(buf.subarray(pos + 8, pos + 8 + len));
  pos += 12 + len;
}

const raw = zlib.inflateSync(Buffer.concat(idatChunks));
const stride = width * 4;
const pixels = Buffer.alloc(width * height * 4);

let rawPos = 0;
for (let y = 0; y < height; y++) {
  const filter = raw[rawPos++];
  for (let x = 0; x < width; x++) {
    const pIdx = (y * width + x) * 4;
    for (let c = 0; c < 4; c++) {
      let b = raw[rawPos++];
      let a = x > 0 ? pixels[pIdx - 4 + c] : 0;
      let bPrev = y > 0 ? pixels[pIdx - stride + c] : 0;
      let cPrev = (x > 0 && y > 0) ? pixels[pIdx - stride - 4 + c] : 0;
      if (filter === 1) b = (b + a) & 0xff;
      else if (filter === 2) b = (b + bPrev) & 0xff;
      else if (filter === 3) b = (b + Math.floor((a + bPrev) / 2)) & 0xff;
      else if (filter === 4) {
        const p = a + bPrev - cPrev;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - bPrev);
        const pc = Math.abs(p - cPrev);
        let pr = (pa <= pb && pa <= pc) ? a : (pb <= pc ? bPrev : cPrev);
        b = (b + pr) & 0xff;
      }
      pixels[pIdx + c] = b;
    }
  }
}

function createPNG(w, h, rgba) {
  const rawData = Buffer.alloc(h * (w * 4 + 1));
  let rIdx = 0;
  for (let y = 0; y < h; y++) {
    rawData[rIdx++] = 0;
    for (let x = 0; x < w; x++) {
      const srcIdx = (y * w + x) * 4;
      rawData[rIdx++] = rgba[srcIdx];
      rawData[rIdx++] = rgba[srcIdx + 1];
      rawData[rIdx++] = rgba[srcIdx + 2];
      rawData[rIdx++] = rgba[srcIdx + 3];
    }
  }
  const deflated = zlib.deflateSync(rawData);
  const crcTable = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    crcTable[n] = c >>> 0;
  }
  function crc32(b) {
    let crc = 0xffffffff;
    for (let i = 0; i < b.length; i++) crc = crcTable[(crc ^ b[i]) & 0xff] ^ (crc >>> 8);
    return (crc ^ 0xffffffff) >>> 0;
  }
  function makeChunk(type, data) {
    const len = data.length;
    const chunk = Buffer.alloc(12 + len);
    chunk.writeUInt32BE(len, 0);
    chunk.write(type, 4, 4, 'ascii');
    data.copy(chunk, 8);
    chunk.writeUInt32BE(crc32(chunk.subarray(4, 8 + len)), 8 + len);
    return chunk;
  }
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    makeChunk('IHDR', Buffer.from([
      (w >> 24) & 255, (w >> 16) & 255, (w >> 8) & 255, w & 255,
      (h >> 24) & 255, (h >> 16) & 255, (h >> 8) & 255, h & 255,
      8, 6, 0, 0, 0
    ])),
    makeChunk('IDAT', deflated),
    makeChunk('IEND', Buffer.alloc(0))
  ]);
}

// Connected components on text region (x >= 340, excluding blue emblem pixels)
const visited = new Uint8Array(width * height);
const components = [];

// Main wordmark is in upper half (y < 210), Tagline is in lower half (y >= 205)
for (let y = 0; y < height; y++) {
  for (let x = 340; x < width; x++) {
    const idx = y * width + x;
    const r = pixels[idx * 4];
    const b = pixels[idx * 4 + 2];
    const a = pixels[idx * 4 + 3];
    const isBlue = b > 120 && b > r + 20;

    if (a > 10 && !isBlue && !visited[idx]) {
      const comp = [];
      const queue = [idx];
      visited[idx] = 1;
      while (queue.length > 0) {
        const curr = queue.pop();
        comp.push(curr);
        const cy = Math.floor(curr / width);
        const cx = curr % width;
        const neighbors = [
          [cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1],
          [cx + 1, cy + 1], [cx - 1, cy - 1], [cx + 1, cy - 1], [cx - 1, cy + 1]
        ];
        for (const [nx, ny] of neighbors) {
          if (nx >= 340 && nx < width && ny >= 0 && ny < height) {
            const nIdx = ny * width + nx;
            const nr = pixels[nIdx * 4];
            const nb = pixels[nIdx * 4 + 2];
            const na = pixels[nIdx * 4 + 3];
            const nIsBlue = nb > 120 && nb > nr + 20;
            if (!visited[nIdx] && na > 10 && !nIsBlue) {
              visited[nIdx] = 1;
              queue.push(nIdx);
            }
          }
        }
      }
      if (comp.length > 30) {
        let sumX = 0, sumY = 0;
        comp.forEach(c => {
          sumX += c % width;
          sumY += Math.floor(c / width);
        });
        components.push({
          count: comp.length,
          cx: sumX / comp.length,
          cy: sumY / comp.length,
          pixels: comp
        });
      }
    }
  }
}

console.log('Total text components found:', components.length);

// Separate main wordmark letters (cy < 205 and count > 300)
const letters = components.filter(c => c.cy < 205 && c.count > 300);
letters.sort((a, b) => a.cx - b.cx);

console.log('Main wordmark letters count:', letters.length);
letters.forEach((l, i) => {
  console.log('Letter ' + (i + 1) + ': cx=' + Math.round(l.cx) + ', cy=' + Math.round(l.cy) + ', count=' + l.count);
});

// Tagline components
const taglinePixels = [];
components.forEach(c => {
  if (c.cy >= 200 || c.count <= 300) {
    taglinePixels.push(...c.pixels);
  }
});

// Extract each letter in the 505x311 text bounding box (from x=343 to 848)
const tStartX = 343;
const TW = width - tStartX; // 505
const TH = height; // 311

// Save each letter as clean white PNG
letters.forEach((l, i) => {
  const lBuf = Buffer.alloc(TW * TH * 4);
  l.pixels.forEach(idx => {
    const px = idx % width;
    const py = Math.floor(idx / width);
    const dstX = px - tStartX;
    const dstY = py;
    if (dstX >= 0 && dstX < TW && dstY >= 0 && dstY < TH) {
      const dstIdx = (dstY * TW + dstX) * 4;
      const srcIdx = (py * width + px) * 4;
      lBuf[dstIdx] = 255;
      lBuf[dstIdx + 1] = 255;
      lBuf[dstIdx + 2] = 255;
      lBuf[dstIdx + 3] = pixels[srcIdx + 3];
    }
  });
  fs.writeFileSync('src/assets/logo-slices/letter-' + (i + 1) + '.png', createPNG(TW, TH, lBuf));
});

// Save Tagline
const tagBuf = Buffer.alloc(TW * TH * 4);
taglinePixels.forEach(idx => {
  const px = idx % width;
  const py = Math.floor(idx / width);
  const dstX = px - tStartX;
  const dstY = py;
  if (dstX >= 0 && dstX < TW && dstY >= 0 && dstY < TH) {
    const dstIdx = (dstY * TW + dstX) * 4;
    const srcIdx = (py * width + px) * 4;
    tagBuf[dstIdx] = 255;
    tagBuf[dstIdx + 1] = 255;
    tagBuf[dstIdx + 2] = 255;
    tagBuf[dstIdx + 3] = pixels[srcIdx + 3];
  }
});
fs.writeFileSync('src/assets/logo-slices/tagline.png', createPNG(TW, TH, tagBuf));

console.log('All 7 letters and tagline sliced successfully!');
