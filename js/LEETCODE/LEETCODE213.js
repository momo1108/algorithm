/**
 * [LeetCode 213] House Robber II
 *
 * 원형으로 배치된 집들이 주어질 때, 인접한 두 집을 동시에 털 수 없다는 조건에서
 * 훔칠 수 있는 최대 금액을 구하는 문제.
 *
 * 핵심 아이디어:
 * - 0번 집과 마지막 집은 서로 인접하므로 동시에 선택할 수 없다.
 * - 따라서 다음 두 경우로 나눠 선형 DP를 수행하고 더 큰 값을 선택한다.
 *   1) 첫 집을 포함하는 경우: 마지막 집 제외
 *   2) 첫 집을 제외하는 경우: 마지막 집 포함 가능
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    const length = nums.length;

    // 집이 1~2개면 원형 제약을 신경 쓸 필요 없이 최댓값 반환
    if (length < 3) return Math.max(...nums);
    
    // case1: 첫 집을 터는 경우 -> 마지막 집은 제외하고 선형 DP
    const includeFirstDp = new Array(length).fill(0);
    includeFirstDp[0] = nums[0];
    includeFirstDp[1] = nums[0];
    for (let i = 2; i < nums.length - 1; i++) {
        includeFirstDp[i] = Math.max(nums[i] + includeFirstDp[i - 2], includeFirstDp[i - 1]);
    }
    
    // case2: 첫 집을 안 터는 경우 -> 끝 집까지 선형 DP
    const excludeFirstDp = new Array(length).fill(0);
    excludeFirstDp[1] = nums[1];
    for (let i = 2; i < nums.length; i++) {
        excludeFirstDp[i] = Math.max(nums[i] + excludeFirstDp[i - 2], excludeFirstDp[i - 1]);
    }

    return Math.max(...includeFirstDp.slice(0, length - 1), ...excludeFirstDp);
};

console.log(rob([1,3,1,3,100]));