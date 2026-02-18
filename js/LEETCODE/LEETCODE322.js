/**
 * [LeetCode 322] Coin Change
 *
 * 동전 종류 coins와 목표 금액 amount가 주어진다.
 * amount를 만들 수 있는 최소 동전 개수를 반환하라.
 * 만들 수 없으면 -1을 반환한다.
 *
 * 풀이 1: BFS (최소 동전 개수 우선)
 * - 합계와 사용 개수를 큐로 관리
 * - 같은 합계에 대해 더 큰 개수는 스킵
 * 시간복잡도: O(amount * coins.length)
 *
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
    // minCountBySum[x]: 합계 x를 만들 때의 최소 동전 개수
    const minCountBySum = new Array(amount + 1).fill(99999);
    if (amount === 0) return 0;

    // 초기 큐: 각 동전을 한 번 사용한 합계
    let queue = coins.filter(c => c <= amount).map(c => [c, 1]);
    let head = 0;
    while (head < queue.length) {
        const [sum, count] = queue[head++];
        if (sum === amount) return count;
        // 이미 더 적은 개수로 방문한 합계라면 스킵
        if (count >= minCountBySum[sum]) continue;

        minCountBySum[sum] = count;
        coins.forEach(c => {
            if (sum + c > amount) return;
            // 다음 합계를 큐에 추가
            queue.push([sum + c, count + 1]);
        });
    }

    return minCountBySum[amount] > 10000 ? -1 : minCountBySum[amount];
};


/**
 * 풀이 2: DP (Bottom-up)
 * dp[x] = 금액 x를 만들기 위한 최소 동전 개수
 *
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
    // dp[x]: 금액 x를 만들기 위한 최소 동전 개수
    const dp = new Array(amount + 1).fill(amount + 1);
    dp[0] = 0;

    for (let i = 0; i < coins.length; i++) {
        const coin = coins[i];

        for (let j = coin; j <= amount; j++) {
            // 현재 동전을 사용한 경우의 후보
            const candidate = dp[j - coin] + 1;

            if (candidate < dp[j]) {
                dp[j] = candidate;
            }
        }
    }

    return dp[amount] > amount ? -1 : dp[amount];
};