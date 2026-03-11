const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ9184.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

const DP = Array.from({length: 21}, () => Array.from({length: 21}, () => new Array(21).fill(1)));

for (let a = 0; a < 21; a++) {
    for (let b = 0; b < 21; b++) {
        for (let c = 0; c < 21; c++) {
            if (a === 0 || b === 0 || c === 0) continue;
            if (a < b && b < c) {
                DP[a][b][c] = DP[a][b][c - 1] + DP[a][b - 1][c - 1] - DP[a][b - 1][c];
            } else {
                DP[a][b][c] = DP[a - 1][b][c] + DP[a - 1][b - 1][c] + DP[a - 1][b][c - 1] - DP[a - 1][b - 1][c - 1];
            }
        }
    }
}

const answer = [];
for (const line of input) {
    if (line === "-1 -1 -1") break;
    const [a, b, c] = line.split(" ").map(Number);
    if (a <= 0 || b <= 0 || c <= 0) {
        answer.push(`w(${a}, ${b}, ${c}) = 1`);
    } else if (a > 20 || b > 20 || c > 20) {
        answer.push(`w(${a}, ${b}, ${c}) = ${DP[20][20][20]}`);
    } else {
        answer.push(`w(${a}, ${b}, ${c}) = ${DP[a][b][c]}`);
    }
}
console.log(answer.join("\n"));