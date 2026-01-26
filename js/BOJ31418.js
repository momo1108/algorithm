const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/mom/Desktop/algorithm/data/BOJ31418.txt";
let data = require("fs").readFileSync(filePath, "utf-8");
let idx = 0;
const n = data.length;

function readInt() {
  while (idx < n) {
    const c = data.charCodeAt(idx);
    if (c > 32) break; // skip whitespace
    idx++;
  }
  let sign = 1;
  if (data[idx] === '-') { sign = -1; idx++; }

  let num = 0;
  while (idx < n) {
    const c = data.charCodeAt(idx);
    if (c <= 32) break;
    num = num * 10 + (c - 48);
    idx++;
  }
  return num * sign;
}

const W = readInt();
const H = readInt();
const K = readInt();
const T = readInt();

const MOD = 998244353n;
let ans = 1n;

for (let i = 0; i < K; i++) {
  const x = readInt();
  const y = readInt();

  const x1 = Math.max(1, x - T);
  const x2 = Math.min(W, x + T);
  const y1 = Math.max(1, y - T);
  const y2 = Math.min(H, y + T);

  const wCase = x2 - x1 + 1; // <= 2T+1
  const hCase = y2 - y1 + 1;

  // 곱셈은 BigInt로 (Number 정밀도 문제 방지)
  ans = (ans * (BigInt(wCase) % MOD)) % MOD;
  ans = (ans * (BigInt(hCase) % MOD)) % MOD;
}

console.log(ans.toString());