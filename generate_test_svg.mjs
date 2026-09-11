import fs from 'fs';

// Let's create an exact SVG representation of the Vishvin emblem
// We can compare its geometry to logo.png
const shardPath = "M 0,-42 L -38,-132 L -70,-35 L -8,-8 L 8,-8 L 70,-35 L 38,-132 Z";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600" style="background:#0a0f1d">
  <defs>
    <linearGradient id="shardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4F46E5" />
      <stop offset="100%" stop-color="#3B38FF" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
  <g transform="translate(300, 300)" filter="url(#glow)">
    <!-- Top shard -->
    <path id="shard-top" d="${shardPath}" fill="url(#shardGrad)" transform="rotate(0)" />
    <!-- Right shard -->
    <path id="shard-right" d="${shardPath}" fill="url(#shardGrad)" transform="rotate(90)" />
    <!-- Bottom shard -->
    <path id="shard-bottom" d="${shardPath}" fill="url(#shardGrad)" transform="rotate(180)" />
    <!-- Left shard -->
    <path id="shard-left" d="${shardPath}" fill="url(#shardGrad)" transform="rotate(270)" />
  </g>
</svg>`;

fs.writeFileSync('./src/assets/test_logo.svg', svg);
console.log('SVG written successfully');
