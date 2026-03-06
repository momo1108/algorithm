/**
 * [BOJ 11722] 가장 긴 감소하는 부분 수열
 * 
 * 수열이 주어졌을 때, 가장 긴 감소하는 부분 수열(LDS: Longest Decreasing Subsequence)의 길이를 구하라.
 * 부분 수열은 원래 수열에서 0개 이상의 원소를 제거한 수열이다.
 * 감소하는 부분 수열이란 각 원소가 그 앞의 원소보다 작은 부분 수열이다.
 * 
 * 제한사항:
 * 1 <= n <= 1000
 * -100000 <= arr[i] <= 100000
 * 
 * 풀이:
 * 동적계획법 (Dynamic Programming)
 * - dp[i] = i번째 원소로 끝나는 가장 긴 감소 부분 수열의 길이
 * - 점화식: dp[i] = 1 + max(dp[j]) for all j < i where arr[j] > arr[i]
 *           (i 이전의 모든 원소 j 중에서 arr[j] > arr[i]인 것들 중 dp[j]의 최댓값)
 * - 초기값: dp[i] = 1 (모든 원소는 혼자만 있어도 길이 1)
 * - 최종 답: max(dp) (모든 위치에서 끝나는 감소 수열 중 최댓값)
 * - 시간복잡도: O(n²) (이중 for 루프)
 * - 공간복잡도: O(n)
 * 
 * 예시:
 * 입력: [10, 30, 10, 20, 20, 10]
 * dp: [1, 1, 2, 2, 2, 3]
 * - dp[2]=2: 10 이전에 30(>10)이 있음 -> 30->10 길이 2
 * - dp[5]=3: 10 이전에 20(>10), 20(>10), 30(>10)이 있음 -> 30->20->10 길이 3
 * 답: 3
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ11722.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

const n = parseInt(input[0]);
const arr = input[1].split(" ").map(Number);

// dp[i] = i번째 원소로 끝나는 가장 긴 감소 부분 수열의 길이
const dp = new Array(n).fill(1);

// 각 위치 i에 대해 DP 계산
for (let i = 1; i < n; i++) {
    // i 이전의 모든 위치 j를 확인
    for (let j = 0; j < i; j++) {
        // arr[j] > arr[i]인 경우, arr[j]로 끝나는 수열에 arr[i]를 추가 가능
        if (arr[j] > arr[i]) {
            dp[i] = Math.max(dp[i], 1 + dp[j]);
        }
    }
}

// 모든 위치에서 끝나는 감소 수열 중 최댓값 출력
console.log(Math.max(...dp));