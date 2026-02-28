/**
 * [LeetCode 1047] Remove All Adjacent Duplicates In String
 *
 * 소문자 영어 알파벳으로 구성된 문자열 s가 주어진다.
 * 인접한 두 문자가 같으면 제거하는 작업을 더 이상 제거할 수 없을 때까지 반복한 후,
 * 최종 문자열을 반환하라. 정답은 유일함이 보장된다.
 *
 * 제한사항:
 * - 1 <= s.length <= 10^5
 * - s는 소문자 영어 알파벳으로만 구성됨
 *
 * 풀이:
 * 스택(Stack)을 이용한 시뮬레이션
 * - 문자를 하나씩 순회하며 스택의 top과 현재 문자를 비교한다.
 * - 같으면 스택에서 pop(인접 중복 제거), 다르면 push한다.
 * - 모든 문자를 처리한 후 스택에 남은 문자들이 최종 결과이다.
 * - 시간복잡도: O(n)
 * - 공간복잡도: O(n)
 */

/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicates = function(s) {
    // 처리된 문자들을 순서대로 쌓아두는 스택
    const charStack = [];

    for (let ch of s) {
        // 스택 top과 현재 문자가 같으면 인접 중복이므로 제거
        if (charStack.length && charStack[charStack.length - 1] === ch) {
            charStack.pop();
        } else {
            // 다르면 스택에 추가
            charStack.push(ch);
        }
    }

    // 스택에 남은 문자들을 합쳐 최종 문자열 반환
    return charStack.join("");
};

console.log(removeDuplicates("aaaaaaa"));