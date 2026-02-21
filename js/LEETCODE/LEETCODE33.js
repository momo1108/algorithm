/**
 * [LeetCode 33] Search in Rotated Sorted Array
 * 
 * 회전된 정렬 배열 nums에서 target을 찾아 인덱스를 반환하라.
 * 찾을 수 없으면 -1을 반환한다.
 * 
 * 배열은 정렬되어 있었고 어느 한 점에서 회전되었다.
 * 예: [0,1,2,4,5,6,7] -> [4,5,6,7,0,1,2]
 * 
 * 제한사항:
 * 1 <= nums.length <= 5000
 * -10^4 <= nums[i] <= 10^4
 * 모든 값이 유니크함
 * 배열은 정렬되고 회전됨
 * 
 * 풀이:
 * 이분탐색의 변형 (Binary Search Modified)
 * - 회전된 배열에서 반은 항상 정렬되어 있음
 * - 마지막 원소를 기준으로 target이 정렬된 쪽에 있는지 판단
 * - target <= nums[n-1]: target은 오른쪽 정렬 구간에 있음
 * - target > nums[n-1]: target은 왼쪽 정렬 구간에 있음
 * - 시간복잡도: O(log n)
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    const lastValue = nums[nums.length - 1];

    let left = 0, right = nums.length - 1, mid;
    
    // 경우 1: target이 오른쪽 정렬 구간에 있음 (target <= 마지막 원소)
    if (target <= lastValue) {
        while (left <= right) {
            mid = Math.floor((left + right) / 2);
            
            // 현재 위치가 왼쪽 정렬 구간 (회전됨)이면 오른쪽으로 이동
            if (nums[mid] > lastValue) {
                left = mid + 1;
            } else {
                // 오른쪽 정렬 구간에 있음
                if (nums[mid] < target) {
                    left = mid + 1;
                } else if (nums[mid] > target) {
                    right = mid - 1;
                } else {
                    return mid;
                }
            }
        }
        return -1;
    } 
    // 경우 2: target이 왼쪽 정렬 구간에 있음 (target > 마지막 원소)
    else {
        while (left <= right) {
            mid = Math.floor((left + right) / 2);
            
            // 현재 위치가 오른쪽 정렬 구간이면 왼쪽으로 이동
            if (nums[mid] <= lastValue) {
                right = mid - 1;
            } else {
                // 왼쪽 정렬 구간에 있음
                if (nums[mid] < target) {
                    left = mid + 1;
                } else if (nums[mid] > target) {
                    right = mid - 1;
                } else {
                    return mid;
                }
            }
        }
        return -1;
    }
};

// 테스트
console.log(search([1], 1)); // 0
console.log(search([4,5,6,7,0,1,2], 0)); // 4
console.log(search([4,5,6,7,0,1,2], 3)); // -1