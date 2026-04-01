/**
 * [BOJ 12852] 1로 만들기 2
 *
 * 정수 X에 사용할 수 있는 연산은 다음 세 가지이다.
 *   1. X가 3으로 나누어 떨어지면, 3으로 나눈다.
 *   2. X가 2로 나누어 떨어지면, 2로 나눈다.
 *   3. 1을 뺀다.
 * 정수 N이 주어졌을 때, 연산을 최소 횟수로 사용하여 1을 만드는 방법을 구하라.
 *
 * 제한:
 * 1 ≤ N ≤ 1,000,000
 * 시간: 0.5초 / 메모리: 512MB
 *
 * 풀이:
 * BFS를 이용한 최단 경로 탐색
 * - N에서 시작해 3가지 연산으로 도달 가능한 수를 BFS로 탐색
 * - 1에 가장 먼저 도달한 순간이 최소 연산 횟수를 보장함
 * - parent[x] = x에 도달하기 직전의 수를 기록해 경로를 역추적
 * - 시간복잡도: O(N)
 * - 공간복잡도: O(N)
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ12852.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

const N = +input[0];

// BFS 큐와 포인터 (shift 대신 인덱스 증가로 O(1) dequeue)
const queue = [N];
let queueHead = 0;

// parent[x] = x로 오기 직전의 수, -1이면 미방문
const parent = new Array(N + 1).fill(-1);

while (queueHead < queue.length) {
    const num = queue[queueHead++];
    if (num === 1) break;

    // 연산 1: 3으로 나누기
    if (num % 3 === 0 && parent[num / 3] < 0) {
        queue.push(num / 3);
        parent[num / 3] = num;
    }
    // 연산 2: 2로 나누기
    if (num % 2 === 0 && parent[num / 2] < 0) {
        queue.push(num / 2);
        parent[num / 2] = num;
    }
    // 연산 3: 1 빼기
    if (num > 1 && parent[num - 1] < 0) {
        queue.push(num - 1);
        parent[num - 1] = num;
    }
}

// parent를 역추적하여 N → 1 경로 복원
const path = [1];
let cur = 1;
while (parent[cur] > 0) {
    path.push(parent[cur]);
    cur = parent[cur];
}
path.reverse();

// 연산 횟수 = 경로 상의 숫자 개수 - 1
console.log(path.length - 1);
console.log(path.join(" "));