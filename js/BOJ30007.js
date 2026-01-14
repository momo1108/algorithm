const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ30007.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");

/**
 * 단순 공식 구현 문제
 * W = A(X-1) + B
 */

const N = parseInt(input[0]);

for (let testCase = 1; testCase <= N; testCase++) {
    const [A, B, X] = input[testCase].trim().split(" ").map((value) => parseInt(value));
    const W = A * (X - 1) + B;
    console.log(W);
}