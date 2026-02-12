/**
 * 정수 배열 
 * num1 - 길이 n
 * num2 - 길이 m
 * 
 * 두 배열에서 한 숫자씩 뽑아서 k 개의 쌍을 만들어야 한다.
 * 숫자쌍의 각 요소는 원본 배열에서 다음 숫자쌍의 요소들보다 왼쪽에 존재해야 한다.
 * 
 * 각 숫자쌍의 점수는 숫자의 곱과 같다.
 * 숫자쌍 점수의 총합의 최대값을 구하라.
 */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number}
 */
var maxScore = function(nums1, nums2, k) {
    /**
     * 숫자쌍을 뽑기위해 브루트 포스를 활용하면, 최대 100개 숫자 내에서
     * 원하는 개수만큼의 조합을 모두 찾아봐야한다.
     * Ex. 100개 중 50개 조합 = 100! / (50! * 50!) = 1.0089134e+29
     * 
     * 따라서 DP 를 활용한다.
     * 모든 쌍마다 가능한 위치에서 가장 큰 숫자를 뽑는다.
     * 가능한 위치는 num1 은 [이전 숫자쌍의 위치 + 1, n] 이며,
     * num2 은 [이전 숫자쌍의 위치 + 1, m] 이다.
     * 하지만 두 배열에서 서로 다른 위치를 뽑을수가 있다.
     * DP[p][i][j] = p번째 숫자쌍으로 num1 의 i번째, num2 의 j번째를 뽑는경우 최대 누적합
     */
    const n = nums1.length;
    const m = nums2.length;
    nums1.splice(0,0,0);
    nums2.splice(0,0,0);

    // 문제 1: 선택 불가능한 상태는 -Infinity로 초기화 (음수 곱셈 처리를 위해)
    const DP = Array.from({length: k + 1}, 
        () => Array.from({length: n + 1}, 
            () => Array(m + 1).fill(-Infinity)
    ));

    // 0개의 쌍을 선택한 경우 점수는 0
    DP[0].forEach(num1 => num1.fill(0));
    
    for (let p = 1; p <= k; p++) {
        for (let i = p; i <= n; i++) {
            if (i > n - (k - p)) break;
            for (let j = p; j <= m; j++) {
                if (j > m - (k - p)) break;
                // 문제 2: 이전 상태로부터 최댓값을 가져올 때 모든 유효한 경로 고려
                // DP[p][i-1][j]: i번째를 선택하지 않고 j까지 본 상태
                // DP[p][i][j-1]: j번째를 선택하지 않고 i까지 본 상태
                // DP[p-1][i-1][j-1]: 현재 (i,j)를 p번째 쌍으로 선택
                DP[p][i][j] = Math.max(
                    DP[p][i-1][j-1],
                    DP[p][i-1][j],
                    DP[p][i][j-1],
                    DP[p-1][i-1][j-1] + nums1[i] * nums2[j]
                );
            }
        }
    }

    return DP[k][n][m];
};