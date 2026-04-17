/**
 * [LeetCode 2799] Count Complete Subarrays in an Array
 *
 * 양의 정수 배열 nums가 주어질 때,
 * 부분 배열의 서로 다른 원소 개수가 전체 배열의 서로 다른 원소 개수와 같으면
 * 그 부분 배열을 complete subarray 라고 한다.
 * complete subarray의 개수를 반환한다.
 *
 * 제한사항:
 * 1 <= nums.length <= 1000
 * 1 <= nums[i] <= 2000
 *
 * 풀이:
 * 슬라이딩 윈도우(투 포인터)
 * - 전체 배열의 서로 다른 원소 수를 targetDistinctCount로 둔다.
 * - right를 늘리며 윈도우 빈도를 갱신한다.
 * - 윈도우가 complete가 되는 순간,
 *   현재 right에서 끝나는 경우뿐 아니라 오른쪽으로 더 확장한 모든 경우도 complete이므로
 *   nums.length - right 개를 한 번에 더한다.
 * - 이후 left를 줄여 다음 시작점 후보를 탐색한다.
 * - 시간복잡도: O(n)
 * - 공간복잡도: O(k) (k = 전체 서로 다른 원소 수)
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var countCompleteSubarrays = function(nums) {
    // 전체 배열의 서로 다른 원소 수 (complete 판정 기준)
    const distinctInWholeArray = new Set(nums);
    // 현재 윈도우 [left, right]의 원소 빈도
    const windowFreq = new Map();
    
    let answer = 0;
    let left = 0;
    
    for(let right = 0; right < nums.length; right++) {
        windowFreq.set(nums[right], (windowFreq.get(nums[right]) || 0) + 1);

        // complete가 되면 right를 고정한 채 가능한 모든 끝점을 한 번에 카운트
        while (left <= right && windowFreq.size === distinctInWholeArray.size) {
            answer += nums.length - right;

            // 시작점을 오른쪽으로 옮기기 위해 left 원소의 빈도 감소
            windowFreq.set(nums[left], windowFreq.get(nums[left]) - 1);
            if (windowFreq.get(nums[left]) === 0) windowFreq.delete(nums[left]);
            left++;
        }

    }

    return answer;
};