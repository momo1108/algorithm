/**
 * [LeetCode 3675] Minimum Operations to Transform String
 *
 * 소문자 문자열 s가 주어진다.
 * 한 번의 연산에서 문자열 내 특정 문자 c를 골라, c의 모든 출현을 다음 알파벳으로 바꿀 수 있다.
 * (알파벳은 순환하므로 z 다음은 a)
 * 문자열을 모두 'a'로 만드는 최소 연산 횟수를 반환한다.
 *
 * 제한사항:
 * 1 <= s.length <= 5 * 10^5
 * s는 소문자 영문자로만 구성
 *
 * 풀이:
 * 그리디
 * - 각 문자를 'a'로 만드는 데 필요한 연산 수는 독립적으로 계산할 수 있다.
 * - 필요한 연산 수: (26 - (code(c) - code('a'))) % 26
 * - 여러 문자를 같은 연산 과정에서 함께 밀어낼 수 있으므로,
 *   전체 최소 연산 수는 문자열 내 문자들 중 필요한 연산 수의 최댓값과 같다.
 * - 시간복잡도: O(n)
 * - 공간복잡도: O(1)
 */

/**
 * @param {string} s
 * @return {number}
 */
var minOperations = function(s) {
    // z 다음 문자의 코드값(= '{')을 기준으로 순환 거리 계산
    const wrapAroundBaseCode = "z".charCodeAt(0) + 1;
    let maxRequiredOperations = 0;

    for (let i = 0; i < s.length; i++) {
        // 현재 문자를 'a'로 바꾸는 데 필요한 연산 수를 계산
        maxRequiredOperations = Math.max(
            maxRequiredOperations,
            (wrapAroundBaseCode - s[i].charCodeAt(0)) % 26
        );
    }

    return maxRequiredOperations;
};