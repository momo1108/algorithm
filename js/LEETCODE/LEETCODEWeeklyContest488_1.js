/**
 * n 길이의 숫자 배열 nums
 * 만약 nums[i] 가 아래의 조건을 만족하면 dominant 이다.
 * nums[i] > average(nums[i + 1], nums[i + 2], ..., nums[n - 1]
 * 숫자 > 오른쪽 숫자들의 평균
 * dominant 인 i 의 개수를 구하라.
 * 가장 오른쪽 숫자는 dominant 가 아니다.
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var dominantIndices = function(nums) {
    let answer = 0;

    let sum = 0;
    let count = 0;
    for (let i = nums.length - 1; i >= 0; i--) {
        if (count > 0 && nums[i] > (sum / count)) answer++;
        sum += nums[i];
        count++;
    }

    return answer;
};

console.log(dominantIndices([1,2]))