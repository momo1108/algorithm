const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/mom/Desktop/algorithm/data/BOJ32297.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

const N = parseInt(input[0]);
const word = input[1];

/**
 * 첫번째 글자부터 아래의 과정을 반복한다
 * 1. 현재 글자를 시작점으로 연속된 4글자가 "gori" 이면 정답을 "YES" 로 갱신하고 정답을 출력한다.
 * 2. 그렇지 않은 경우 다음 글자를 시작 글자로 변경한다.
 */
let answer = "NO";
for (let i = 0; i <= N - 4; i++) {
    if (word.substring(i, i + 4) === "gori") {
        answer = "YES";
        break;
    }
}
console.log(answer);