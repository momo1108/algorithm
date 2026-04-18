/**
 * [LeetCode 1283] Smallest Divisor Given a Threshold
 * 
 * 정수 배열 nums와 정수 threshold가 주어진다.
 * divisor로 nums의 모든 원소를 나눈 후 올림(ceiling)하여 합한다.
 * 이 합이 threshold 이하가 되는 가장 작은 divisor를 찾아 반환하라.
 * 
 * 예: nums = [1,2,5,9], threshold = 6
 * divisor = 5일 때: ceil(1/5) + ceil(2/5) + ceil(5/5) + ceil(9/5) = 1+1+1+2 = 5 <= 6
 * 따라서 답은 5
 * 
 * 제한사항:
 * 1 <= nums.length <= 50000
 * 1 <= nums[i] <= 10^6
 * 1 <= threshold <= 10^6
 * 
 * 풀이:
 * 이진 탐색(Binary Search)을 이용한 최소값 찾기
 * - divisor의 범위: 1 ~ max(nums)
 * - 특정 divisor에서 합이 threshold 이하인지 확인하는 check 함수로 검증
 * - 조건을 만족하면서 가장 작은 divisor를 찾음
 * - 시간복잡도: O(N * log(max(nums))) = O(50000 * 20) = O(1,000,000)
 * - 공간복잡도: O(1)
 */

/**
 * @param {number[]} nums
 * @param {number} threshold
 * @return {number}
 */
var smallestDivisor = function(nums, threshold) {
    let left = 1;
    let right = Math.max(...nums);
    let answer = right;

    // 이진 탐색: 조건을 만족하는 최소 divisor 찾기
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        // 현재 mid가 조건을 만족하는지 확인
        if (check(mid)) {
            answer = mid;
            right = mid - 1; // 더 작은 divisor 가능성 탐색
        } else {
            left = mid + 1; // 더 큰 divisor 필요
        }
    }

    return answer;

    /**
     * 주어진 divisor로 모든 원소를 나눈 올림값의 합이 threshold 이하인지 확인
     * @param {number} divisor
     * @return {boolean}
     */
    function check(divisor) {
        let sum = 0;

        // 모든 원소를 divisor로 나눈 올림값을 누적
        for (let num of nums) {
            sum += Math.ceil(num / divisor);
            
            // 조기 종료: 이미 threshold를 초과하면 false 반환
            if (sum > threshold) return false;
        }

        return true;
    }
};

smallestDivisor([1,2,5,9], 6);