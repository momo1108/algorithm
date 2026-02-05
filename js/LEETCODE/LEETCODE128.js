/**
 * nums 배열에서 값이 연속적으로 가장 길게 이어진 길이를 반환하라
 * 시간복잡도는 O(n) 을 만족해야한다.
 * 즉, 한번의 순회로 끝내야한다.
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
    // 빈 배열인 경우 0 반환
    if (!nums.length) return 0;

    // O(1) 탐색을 위해 Set에 모든 숫자를 저장
    const numSet = new Set();
    for (const num of nums) numSet.add(num);
    
    let maxLength = -1;

    // 각 숫자에 대해 연속 수열의 시작점인지 확인
    for (const currentNum of numSet) {
        // 현재 숫자가 연속 수열의 시작점이 아니라면 건너뛰기
        // (현재 숫자 - 1이 존재하면 시작점이 아님)
        if (numSet.has(currentNum - 1)) continue;

        // 현재 숫자가 시작점이므로 연속 수열의 길이를 계산
        let nextNum = currentNum + 1;
        let currentLength = 1;

        // 연속된 숫자가 존재하는 동안 길이를 증가
        while (numSet.has(nextNum++)) currentLength++;

        // 최대 길이 갱신
        maxLength = Math.max(maxLength, currentLength);
    }

    return maxLength;
};

longestConsecutive([100,4,200,1,3,2]);