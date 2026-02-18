/**
 * [LeetCode 70] Climbing Stairs
 *
 * n번째 계단에 도달하는 방법의 수를 구하라.
 * 한 번에 1칸 또는 2칸씩 오를 수 있다.
 *
 * 풀이: DP
 * dp[i] = dp[i - 1] + dp[i - 2]
 * 시간복잡도 O(n), 공간복잡도 O(n)
 *
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    // dp[i]: i번째 계단까지 도달하는 방법 수
    const dp = new Array(n + 1).fill(1);

    let step = 2;
    while (step <= n) {
        // 바로 앞/앞앞 계단에서 오는 경우의 합
        dp[step] = dp[step - 1] + dp[step - 2];
        step++;
    }

    return dp[n];
};