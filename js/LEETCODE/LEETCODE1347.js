/**
 * [LeetCode 1347] Minimum Number of Steps to Make Two Strings Anagram
 * 
 * 같은 길이의 두 문자열 s와 t가 주어진다.
 * 한 번의 단계(step)에서 t의 한 문자를 원하는 다른 문자로 바꿀 수 있다.
 * t를 s의 애너그램(anagram)으로 만들기 위한 최소 단계 수를 반환하라.
 * 
 * 제한사항:
 * 1 <= s.length <= 5 * 10^4
 * s.length == t.length
 * s와 t는 소문자 영문자로만 구성됨
 * 
 * 풀이:
 * 문자 빈도 차이 계산
 * - s와 t 각각의 문자 빈도를 계산하여 차이를 구함
 * - s에는 있지만 t에 부족한 문자의 개수를 합산
 * - 차이가 양수인 문자들의 빈도를 모두 더하면 필요한 변경 횟수
 * - 시간복잡도: O(n) - n은 문자열의 길이
 * - 공간복잡도: O(1) - 알파벳 26개 크기의 고정 배열 사용
 */

/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var minSteps = function(s, t) {
    // 알파벳 26개의 빈도 차이를 저장하는 배열
    // s의 문자는 +1, t의 문자는 -1로 카운트
    const charCountDiff = Array(26).fill(0);
    
    // 두 문자열을 동시에 순회하며 빈도 차이 계산
    for (let i = 0; i < s.length; i++) {
        // s의 문자 인덱스 (a=0, b=1, ..., z=25)
        const sCharIndex = s.charCodeAt(i) - 97;
        // t의 문자 인덱스
        const tCharIndex = t.charCodeAt(i) - 97;
        
        // s의 문자는 증가 (필요한 문자)
        charCountDiff[sCharIndex]++;
        // t의 문자는 감소 (현재 있는 문자)
        charCountDiff[tCharIndex]--;
    }

    // 양수인 값들의 합 = s에는 있지만 t에 부족한 문자들의 개수
    // 이 문자들을 t에 추가하기 위해 변경해야 하는 최소 횟수
    let answer = 0;
    for (const count of charCountDiff) {
        if (count > 0) answer += count;
    }

    return answer;
};

minSteps('bab', 'aba')