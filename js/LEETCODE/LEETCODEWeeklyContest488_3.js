/**
 * 정수배열 nums, 정수 k
 * 부분 배열 nums[l..r] = nums.slice(l, r + 1);
 * 각 부분 배열의 cost 는 아래와 같다.
 * cost = (max(nums[l..r]) - min(nums[l..r])) * (r - l + 1)
 * 
 * k 이하의 cost 를 가진 부분 배열의 개수를 반환하라
 * 빈 배열은 부분배열이 아니다.
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countSubarrays = function(nums, k) {
    let answer = 0;

    for (let left = 0; left < nums.length; left++) {
        let right = left;
        let min = nums[left];
        let max = nums[left];
        let cost;

        while (true) {
            cost = (max - min) * (right - left + 1);
            if (cost > k) {
                right--;
                break;
            } else if (right === nums.length - 1) break;
            else {
                right++;
                min = Math.min(min, nums[right]);
                max = Math.max(max, nums[right]);
            }
        }

        answer += (right - left + 1);
    }

    return answer;
};

console.log(countSubarrays([1, 2, 3], 0));