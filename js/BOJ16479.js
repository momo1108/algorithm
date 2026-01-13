const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ16479.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");

/*
등변사다리꼴의 위 아래 변의 길이의 차이를 구하고 2로 나누면 직각 삼격형의 한 변의 길이가 된다.
직각 삼각형의 또 다른 변의 길이는 K 이다.
피타고라스 정리로 나머지 변의 길이를 구하면 사다리꼴의 높이가 된다.
*/

const K = parseInt(input[0]);
const [D1, D2] = input[1].split(" ").map(d => parseInt(d));

const l1 = Math.abs((D1 - D2) / 2);

let answer;
if (D1 === D2) answer = K**2;
else answer = K**2 - l1**2;

console.log(answer);