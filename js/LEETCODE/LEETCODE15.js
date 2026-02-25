/**
 * [LeetCode 15] 3Sum
 *
 * 정수 배열 nums가 주어진다.
 * 합이 0이 되는 서로 다른 세 원소의 조합을 모두 반환하라.
 * 결과에 중복 삼중쌍이 포함되어선 안 된다.
 *
 * 제한사항:
 * 3 <= nums.length <= 3000
 * -10^5 <= nums[i] <= 10^5
 *
 * 풀이:
 * 정렬 + 투 포인터 (Sort + Two Pointer)
 * - 배열을 오름차순 정렬한 뒤, 첫 번째 원소를 고정(fixed)하며 순회한다.
 * - 나머지 두 원소는 fixed 오른쪽 구간에서 투 포인터(left, right)로 탐색한다.
 *   - sum < 0: 합이 작으므로 left를 오른쪽으로 이동
 *   - sum > 0: 합이 크므로 right를 왼쪽으로 이동
 *   - sum == 0: 정답 추가 후 양쪽 포인터 모두 이동
 * - 중복 삼중쌍 제거를 위해 fixed 값이 이전과 같으면 건너뛴다.
 *   (left/right 중복은 Set을 이용해 처리)
 * - 시간복잡도: O(n^2)
 * - 공간복잡도: O(n) - 결과 저장용 Set
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    // 투 포인터 적용을 위해 오름차순 정렬
    nums.sort((a, b) => a - b);

    // 문자열 키로 중복 삼중쌍을 제거
    const answerSet = new Set();

    for (let i = 0; i < nums.length - 2; i++) {
        // 정렬된 배열에서 fixed 값이 이전과 같으면 중복 삼중쌍이 생기므로 건너뜀
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        const fixed = nums[i];
        let left = i + 1;
        let right = nums.length - 1;

        // 투 포인터로 나머지 두 원소 탐색
        while (left < right) {
            const leftVal = nums[left];
            const rightVal = nums[right];
            const sum = fixed + leftVal + rightVal;

            if (sum === 0) {
                // 합이 0인 삼중쌍 발견: 문자열로 변환하여 중복 제거
                answerSet.add(`${fixed},${leftVal},${rightVal}`);
                left++;
                right--;
            } else if (sum < 0) {
                // 합이 0보다 작으므로 더 큰 값이 필요 → left 오른쪽으로 이동
                left++;
            } else {
                // 합이 0보다 크므로 더 작은 값이 필요 → right 왼쪽으로 이동
                right--;
            }
        }
    }

    // Set에 저장된 문자열을 숫자 배열로 변환하여 반환
    return Array.from(answerSet).map(s => s.split(",").map(Number));
};

console.log(threeSum([-1, 0, 1, 2, -1, -4])) // [[-1,-1,2],[-1,0,1]]