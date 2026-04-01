/**
 * [BOJ 14002] 가장 긴 증가하는 부분 수열 4
 *
 * 수열 A가 주어졌을 때, 가장 긴 증가하는 부분 수열(LIS)의 길이와
 * 실제 수열을 출력하라. 정답이 여러 가지인 경우 아무거나 출력한다.
 *
 * 제한:
 * 1 ≤ N ≤ 1,000
 * 1 ≤ Ai ≤ 1,000
 * 시간: 1초 / 메모리: 256MB
 *
 * 풀이:
 * DP를 이용한 LIS 계산 + 역추적
 * - dp[i]: numbers[i]를 마지막 원소로 하는 LIS의 길이
 * - i보다 앞선 모든 j에 대해 numbers[j] < numbers[i]이면
 *   dp[i] = max(dp[i], dp[j] + 1) 로 갱신
 * - parent[i]: dp[i]를 갱신한 직전 인덱스를 저장해 경로 역추적
 * - 시간복잡도: O(N²)
 * - 공간복잡도: O(N)
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ14002.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

const N = +input[0];

const numbers = input[1].split(" ").map(Number);

// dp[i]: numbers[i]를 끝 원소로 하는 LIS 길이 (초기값 1: 자기 자신)
const dp = new Array(N).fill(1);
// parent[i]: dp[i] 갱신 시 참조한 직전 인덱스 (undefined이면 LIS의 시작점)
const parent = new Array(N);

for (let i = 0; i < N; i++) {
    for (let j = 0; j < i; j++) {
        // numbers[j]가 numbers[i]보다 작고, j를 통해 더 긴 LIS를 만들 수 있으면 갱신
        if (numbers[i] > numbers[j] && dp[j] + 1 > dp[i]) {
            dp[i] = dp[j] + 1;
            parent[i] = j;
        }
    }
}

// LIS 길이가 최대인 마지막 원소의 인덱스 탐색
let lisEndIndex = 0;
for (let i = 0; i < N; i++) {
    if (dp[i] > dp[lisEndIndex]) {
        lisEndIndex = i;
    }
}
console.log(dp[lisEndIndex]);

// parent를 역추적하여 LIS 원소 복원
const lis = [numbers[lisEndIndex]];
while (Number.isInteger(parent[lisEndIndex])) {
    lisEndIndex = parent[lisEndIndex];
    lis.push(numbers[lisEndIndex]);
}

lis.reverse();
console.log(lis.join(" "));