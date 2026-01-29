const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ1964.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

/**
 * 단순 수학 구현 문제이다.
 * 각 변의 길이를 L (1 이상) 이라고 했을 때,
 * 변의 길이별로 새로 찍히는 점의 길이는 다음과 같다.
 * 
 * (L + 1) * 3 - 2
 * 
 * 초기 점의 숫자는 1개이므로, 여기에 N 을 1씩 늘려가며 위 공식의 값을 누적한다.
 */

const N = parseInt(input[0]);

let answer = 1;
for (let L = 1; L < N + 1; L++) {
    const newPointCount = (L + 1) * 3 - 2;
    answer += newPointCount;
    answer %= 45678;
}

console.log(answer);