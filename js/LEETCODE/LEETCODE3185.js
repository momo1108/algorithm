/**
 * [LeetCode 3185] Count Pairs That Form a Complete Day II
 * 
 * 정수 배열 hours가 주어진다.
 * i < j이고 hours[i] + hours[j]가 24의 배수인 페어 (i, j)의 수를 반환하라.
 * 
 * 예시 1:
 * Input: hours = [12,12,30,24,24]
 * Output: 2 (페어: (0,1), (3,4))
 * 
 * 예시 2:
 * Input: hours = [72,48,24,3]
 * Output: 3 (페어: (0,1), (0,2), (1,2))
 * 
 * 제한사항:
 * 1 <= hours.length <= 5 * 10^5
 * 1 <= hours[i] <= 10^9
 * 
 * 풀이: 나머지(mod 24) 기반 해시 카운팅
 * - hours[i] + hours[j]가 24의 배수 <=> (hours[i] % 24) + (hours[j] % 24) ≡ 0 (mod 24)
 * - 나머지별 등장 횟수를 remainCountMap에 저장
 * - remain == 0 : 0 + 0 ≡ 0 (mod 24) → 같은 그룹끼리 페어 → C(count, 2)
 * - remain == 12: 12 + 12 ≡ 0 (mod 24) → 같은 그룹끼리 페어 → C(count, 2)
 * - remain == 1~11: r + (24-r) ≡ 0 (mod 24) → 서로 다른 그룹끼리 페어 → count_r * count_(24-r)
 * - 시간복잡도: O(n)
 * - 공간복잡도: O(1) (나머지 0~23, 고정 24개 버킷)
 */

/**
 * @param {number[]} hours
 * @return {number}
 */
var countCompleteDayPairs = function(hours) {
    // 나머지(0~23)별 등장 횟수를 저장하는 맵
    const remainCountMap = Object.fromEntries(Array.from({length: 24}, (_, i) => [i, 0]));
    
    // 각 시간을 24로 나눈 나머지로 분류해 카운트
    for (const h of hours) remainCountMap[h % 24]++;
    
    /**
     * 나머지가 0인 경우 > 본인 그룹끼리만 페어 가능
     * 나머지가 12인 경우 > 본인 그룹끼리만 페어 가능
     * 그 외 > (24 - 본인) 나머지 그룹과 페어 가능
     */
    // 나머지 0 그룹: 같은 그룹 내 조합 수 C(n, 2) = n*(n-1)/2
    let answer = remainCountMap[0] * (remainCountMap[0] - 1) / 2;
    // 나머지 12 그룹: 같은 그룹 내 조합 수
    answer += remainCountMap[12] * (remainCountMap[12] - 1) / 2;
    
    // 나머지 r(1~11)과 나머지 (24-r) 그룹의 곱
    for (let remain = 1; remain < 12; remain++) {
        answer += (remainCountMap[remain] * remainCountMap[24 - remain]);
    }

    return answer;
};

console.log(countCompleteDayPairs([72,48,24,3]))