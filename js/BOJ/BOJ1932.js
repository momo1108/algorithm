/**
 * [BOJ 1932] 정수 삼각형
 *
 * 맨 위에서 시작해 아래층으로 내려가며 수를 하나씩 선택할 때,
 * 선택된 수의 합이 최대가 되는 값을 구하는 문제.
 * 현재 위치에서 다음 층의 대각선 왼쪽/오른쪽으로만 이동할 수 있다.
 *
 * 입력:
 * - 첫 줄: 삼각형 크기 n (1 <= n <= 500)
 * - 다음 n줄: 삼각형 값 (각 값은 0 <= value <= 9999)
 *
 * 출력:
 * - 가능한 경로 합의 최댓값
 *
 * 풀이:
 * DP
 * - dp[level][idx]: level층 idx 위치까지 내려왔을 때 만들 수 있는 최대 합
 * - 점화식: dp[level][idx] = triangle[level][idx] + max(dp[level-1][idx-1], dp[level-1][idx])
 * - 경계는 없는 값을 0으로 처리해 같은 형태로 계산
 *
 * 시간복잡도: O(n^2)
 * 공간복잡도: O(n^2)
 */
const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ1932.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

const n = +input[0];

const triangle = input.slice(1).map(line => line.split(" ").map(Number));

const dp = Array.from({ length: n }, (_, level) => new Array(level + 1).fill(0));
dp[0][0] = triangle[0][0];

for (let level = 1; level < n; level++) {
    for (let index = 0; index <= level; index++) {
        // 위층의 두 후보(좌상단, 우상단) 중 가능한 최대 합을 이어받는다.
        const bestPrev = Math.max(dp[level - 1][index] || 0, dp[level - 1][index - 1] || 0);
        dp[level][index] = bestPrev + triangle[level][index];
    }
}

console.log(Math.max(...dp[n - 1]));