/**
 * LeetCode Two Sum (문제 1)
 * 주어진 정수 배열 nums와 정수 target이 주어졌을 때,
 * nums의 서로 다른 두 개의 인덱스 i와 j를 찾아서
 * nums[i] + nums[j] == target을 만족하는 배열 [i, j]를 반환한다.
 * 
 * 예시:
 * Input: nums = [2,7,11,15], target = 9
 * Output: [0,1]
 * Explanation: nums[0] + nums[1] == 9이므로 [0, 1]을 반환한다.
 */

/**
 * 문제: 배열에서 합이 target이 되는 두 수의 인덱스를 찾는다.
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const indexByNeeded = {};

    // 현재 값 num을 만들기 위해 필요한 값(needed = target - num)을 인덱스로 저장한다.
    // 이후 num이 필요한 값으로 등장하면 즉시 정답을 반환한다.
    let num;
    for (let i = 0; i < nums.length; i++) {
        num = nums[i];
        if (!isNaN(indexByNeeded[num])) return [indexByNeeded[num], i];
        indexByNeeded[target - num] = i;
    }
};
twoSum([2,7,11,15], 9);