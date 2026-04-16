/**
 * [LeetCode 560] Subarray Sum Equals K
 * 
 * 정수 배열 nums와 정수 k가 주어진다.
 * 합이 정확히 k가 되는 연속 부분 배열의 개수를 반환하라.
 * 
 * 제한사항:
 * 1 <= nums.length <= 2 * 10^4
 * -1000 <= nums[i] <= 1000
 * -10^7 <= k <= 10^7
 * 
 * 풀이:
 * 누적합 + 해시맵
 * - 현재 위치까지의 누적합을 prefixSum이라고 할 때,
 *   이전에 prefixSum - k가 나온 적이 있으면 그 지점부터 현재까지의 구간합은 k가 된다.
 * - 각 누적합이 몇 번 등장했는지를 해시맵에 저장하면서 개수를 누적한다.
 * - 시간복잡도: O(nums.length)
 * - 공간복잡도: O(nums.length)
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
    // 누적합 값별 등장 횟수 저장
    // 0이 1번 등장한 것으로 시작해야, 처음부터의 구간도 올바르게 셀 수 있다.
    const prefixSumCountMap = { "0": 1 };

    let subarrayCount = 0;
    let prefixSum = 0;

    for (const number of nums) {
        // 현재 원소까지의 누적합 계산
        prefixSum += number;

        // prefixSum - k가 이전에 등장한 횟수만큼
        // 현재 위치에서 끝나는 합이 k인 부분 배열이 존재한다.
        if (prefixSumCountMap[prefixSum - k]) {
            subarrayCount += prefixSumCountMap[prefixSum - k];
        }

        // 현재 누적합의 등장 횟수 기록
        prefixSumCountMap[prefixSum] = (prefixSumCountMap[prefixSum] || 0) + 1;
    }

    return subarrayCount;
};