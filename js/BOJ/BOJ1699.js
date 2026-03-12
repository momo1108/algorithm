const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ1699.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

/**
 * [BOJ 1699] 제곱수의 합
 *
 * 자연수 N을 몇 개의 제곱수 합으로 나타낼 때,
 * 필요한 제곱수 개수의 최솟값을 구한다.
 *
 * 풀이:
 * dp[i] = i를 만들기 위한 제곱수 개수의 최솟값
 * 모든 제곱수 j^2 (j^2 <= i)에 대해
 * dp[i] = min(dp[i], dp[i - j^2] + 1)
 *
 * 시간복잡도: O(N * sqrt(N))
 * 공간복잡도: O(N)
 */

const N = parseInt(input[0]);

const dp = new Array(N + 1).fill(9999999);
dp[0] = 0;
dp[1] = 1;

// 작은 수부터 최솟값을 누적해 N까지 확장한다.
for (let i = 2; i <= N; i++) {
    for (let j = 1; j <= i; j++) {
        const square = j ** 2;
        if (square > i) break;
        dp[i] = Math.min(dp[i], 1 + dp[i - square]);
    }
}

console.log(dp[N]);