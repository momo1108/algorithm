/**
 * 정수 배열 num
 * 아래의 작업을 더이상 불가능할때까지 반복한다
 * - 인접한 두 요소가 동일한 경우, 가장 왼쪽부터 하나로 합친다.(오른쪽 값은 지워짐)
 * - 합친 값은 두 요소를 더한 값이다.
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var mergeAdjacent = function(nums) {
    let hasEqual;

    while(true) {
        hasEqual = false;

        let current, next;
        for (let i = 0; i < nums.length - 1; i++) {
            current = nums[i];
            next = nums[i + 1];

            if (current === next) {
                hasEqual = true;
                nums.splice(i, 2, current * 2);
                break;
            }
        }

        if (hasEqual) continue;
        else break;
    }

    return nums;
};