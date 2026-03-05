/**
 * [LeetCode 1481] Least Number of Unique Integers after K Removals
 * 
 * 정수 배열 arr과 정수 k가 주어진다.
 * 배열에서 정확히 k개의 원소를 제거한 후, 남은 배열에서 유일한 정수의 최소 개수를 반환하라.
 * 
 * 예시:
 * arr = [4,3,1,1,3,3,2], k = 3
 * - 각 숫자의 출현 빈도: 4(1번), 2(1번), 1(2번), 3(3번)
 * - 빈도가 낮은 순서대로 제거: 4(1개), 2(1개), 1(1개) 제거 = 총 3개
 * - 남은 유일한 정수: 1(1개), 3(3개) -> 유일한 정수는 2개
 * 결과: 2
 * 
 * 제한사항:
 * 1 <= arr.length <= 10^5
 * 1 <= arr[i] <= 10^9
 * 0 <= k <= arr.length
 * 
 * 풀이:
 * 그리디 알고리즘
 * - 각 숫자의 출현 빈도를 계산
 * - 빈도가 낮은 숫자부터 제거하는 것이 유일한 정수의 개수를 최소화
 * - 빈도를 오름차순으로 정렬한 후, k개를 제거할 때까지 순회
 * - 시간복잡도: O(n log n) - 정렬
 * - 공간복잡도: O(n)
 */

/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var findLeastNumOfUniqueInts = function(arr, k) {
    // 각 숫자의 출현 빈도를 저장하는 맵
    const frequencyMap = {};
    for (const num of arr) {
        if (frequencyMap[num] !== undefined) frequencyMap[num]++;
        else frequencyMap[num] = 1;
    }

    // 빈도만 추출하여 배열로 변환
    const frequencies = Object.values(frequencyMap);
    // 빈도를 오름차순으로 정렬 (빈도가 낮은 숫자부터 제거하기 위해)
    frequencies.sort((a, b) => a - b);

    // 제거할 수 있는 유일한 정수의 개수
    let removedUniqueCount = 0;
    
    // 빈도가 낮은 숫자부터 제거
    for (let i = 0; i < frequencies.length; i++) {
        // 현재 숫자를 완전히 제거할 수 있는 경우
        if (k >= frequencies[i]) {
            removedUniqueCount = i + 1;
            k -= frequencies[i]; // 제거한 원소 개수만큼 k 감소
        } else break; // k가 부족하면 더 이상 제거 불가
    }

    // 전체 유일한 정수 개수 - 제거된 유일한 정수 개수
    return frequencies.length - removedUniqueCount;
};

findLeastNumOfUniqueInts([4,3,1,1,3,3,2], 3);