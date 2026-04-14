/**
 * [BOJ 16953] A → B
 *
 * 정수 A를 정수 B로 바꾸려고 한다.
 * 사용할 수 있는 연산은 아래 2가지뿐이다.
 * 1) x를 2배로 만든다.
 * 2) x의 오른쪽에 1을 붙인다. (예: 23 -> 231)
 *
 * A를 B로 만들기 위한 최소 연산 횟수 + 1을 출력한다.
 * 만들 수 없으면 -1을 출력한다.
 *
 * 풀이:
 * BFS로 현재 수에서 만들 수 있는 다음 수(2배, 뒤에 1 붙이기)를 탐색한다.
 * 각 상태에 연산 횟수를 함께 저장하고, B를 처음 만드는 순간의 횟수가 최소값이다.
 */
const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/mom/Desktop/algorithm/data/BOJ16953.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

const [startValue, targetValue] = input[0].split(" ").map(Number);

// 큐에는 [현재 값, 현재까지의 카운트]를 순서대로 저장
const queue = [startValue, 1];
let queueHead = 0;
let answer = -1;

while (queueHead < queue.length) {
    const currentValue = queue[queueHead++];
    const currentCount = queue[queueHead++];

    // 다음 한 번의 연산으로 목표값을 만들 수 있으면 종료
    if (currentValue * 2 === targetValue || (currentValue * 10) + 1 === targetValue) {
        answer = currentCount + 1;
        break;
    }

    // 목표값보다 작은 경우만 확장 (문제 연산 특성상 값은 계속 증가)
    if (currentValue * 2 < targetValue) {
        queue.push(currentValue * 2);
        queue.push(currentCount + 1);
    }
    if ((currentValue * 10) + 1 < targetValue) {
        queue.push((currentValue * 10) + 1);
        queue.push(currentCount + 1);
    }
}

console.log(answer);