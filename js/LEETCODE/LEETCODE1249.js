/**
 * [LeetCode 1249] Minimum Remove to Make Valid Parentheses
 *
 * '(', ')', 소문자 영어 알파벳으로 구성된 문자열 s가 주어진다.
 * 최소 개수의 괄호를 제거하여 유효한 괄호 문자열로 만든 후 반환하라.
 * 유효한 괄호 문자열의 조건:
 * - 빈 문자열이거나 소문자만 포함하거나
 * - AB 형태(A, B가 각각 유효한 문자열이거나)
 * - (A) 형태(A가 유효한 문자열)
 *
 * 제한사항:
 * - 1 <= s.length <= 10^5
 * - s[i]는 '(', ')', 또는 소문자 영어 알파벳
 *
 * 풀이:
 * 스택(Stack)을 이용한 유효하지 않은 괄호 인덱스 수집
 * 1. 문자열을 순회하며 '('의 인덱스를 스택에 push한다.
 * 2. ')'를 만났을 때 스택이 비어있으면 매칭되는 '('가 없는 것 → 제거 대상으로 기록
 *    스택이 비어있지 않으면 가장 최근의 '('와 매칭 → 스택에서 pop
 * 3. 순회 후 스택에 남은 '('의 인덱스들도 모두 제거 대상
 * 4. 제거 대상 인덱스를 정렬 후, 해당 위치를 건너뛰며 결과 문자열 생성
 * - 시간복잡도: O(n log n)
 * - 공간복잡도: O(n)
 */

/**
 * @param {string} s
 * @return {string}
 */
var minRemoveToMakeValid = function(s) {
    // 아직 닫히지 않은 '('의 인덱스를 쌓는 스택
    const openParenStack = [];
    // 매칭되는 '('가 없는 ')' 인덱스 목록
    const unmatchedCloseIndices = [];

    for (let i = 0; i < s.length; i++) {
        const ch = s[i];
        if (ch === ')') {
            if (openParenStack.length === 0) {
                // 매칭되는 '('가 없는 ')' → 제거 대상
                unmatchedCloseIndices.push(i);
            } else {
                // 가장 최근의 '('와 매칭 → 스택에서 제거
                openParenStack.pop();
            }
        } else if (ch === '(') {
            openParenStack.push(i);
        }
    }

    // 순회 후 스택에 남은 '('는 닫히지 않은 것 → 모두 제거 대상
    // 두 배열을 합쳐 인덱스 오름차순으로 정렬
    const removeIndices = openParenStack.concat(unmatchedCloseIndices);
    removeIndices.sort((a, b) => a - b);

    // 제거 대상 인덱스를 순서대로 가리키는 포인터
    let removePtr = 0;
    let answer = "";
    for (let i = 0; i < s.length; i++) {
        if (i === removeIndices[removePtr]) {
            // 제거 대상 인덱스는 건너뜀
            removePtr++;
            continue;
        }
        answer += s[i];
    }

    return answer;
};

minRemoveToMakeValid(")i()()((fm(((()");