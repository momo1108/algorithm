/**
 * [BOJ 10986] 나머지 합
 * 
 * 길이가 N인 수열이 주어질 때, 연속 부분 구간의 합이 M으로 나누어떨어지는 경우의 수를 구하는 문제.
 * 
 * 핵심 아이디어:
 * 누적합의 나머지를 사용한다.
 * - prefixSum[j] % M == prefixSum[i] % M 이면,
 *   i+1 ~ j 구간합은 M으로 나누어떨어진다.
 * - 같은 나머지가 나온 횟수를 세어 조합 C(k, 2)를 더하면 된다.
 * - 나머지가 0인 누적합은 그 자체로 정답에 포함된다.
 * 
 * 시간복잡도: O(N + M)
 * 공간복잡도: O(M)
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/mom/Desktop/algorithm/data/BOJ10986.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

const [N, M] = input[0].split(" ").map(Number);
const nums = input[1].split(" ").map(Number);
// 각 나머지(0 ~ M-1)가 나온 인덱스를 저장
const remainderArrayMap = Object.fromEntries(Array.from({length: M}, (_, i) => [i, []]));
let prefixRemainder = 0;

// 누적합의 나머지를 순서대로 기록
for (let i = 0; i < N; i++) {
    const currentNumber = nums[i];
    prefixRemainder += currentNumber;
    prefixRemainder %= M;
    remainderArrayMap[prefixRemainder].push(i);
}

let answer = 0;
// 누적합 자체가 M으로 나누어떨어지는 경우
answer += remainderArrayMap[0].length;

// 같은 나머지끼리 2개를 고르는 조합 수를 더함
for (let i = 0; i < M; i++) {
    const sameRemainderCount = remainderArrayMap[i].length;
    if (sameRemainderCount > 1) answer += (sameRemainderCount * (sameRemainderCount - 1) / 2);
}
console.log(answer);