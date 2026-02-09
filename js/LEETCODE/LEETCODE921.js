/**
 * 괄호 문자열이 유효(valid)하려면 다음 조건을 만족해야 한다.
 * 1) 빈 문자열이거나,
 * 2) 두 유효한 문자열 A, B를 이어 붙인 AB 형태이거나,
 * 3) 유효한 문자열 A를 괄호로 감싼 (A) 형태이다.
 *
 * 문자열 s가 주어졌을 때, 임의 위치에 '(' 또는 ')'를 하나씩 삽입할 수 있다.
 * s를 유효한 괄호 문자열로 만들기 위해 필요한 최소 삽입 횟수를 구한다.
 *
 * 예: s = "()))" 이면 "(()))" 처럼 '('를 넣거나 "())))" 처럼 ')'를 넣을 수 있다.
 */

/**
 * @param {string} s
 * @return {number}
 */
var minAddToMakeValid = function(s) {
    if (!s) return 0;
    // 아직 매칭되지 않은 '(' 개수
    let openCount = 0;
    // '(' 과 매칭되지 못한 ')' 개수
    let closeCount = 0;

    for (let ch of s) {
        if (ch === '(') {
            // 여는 괄호는 누적
            openCount++;
        } else {
            // 닫는 괄호가 나왔을 때 매칭 가능한 '('가 있으면 소모
            if (openCount > 0) openCount--;
            // 없으면 매칭되지 못한 개수를 하나 추가해야 함
            else closeCount++;
        }
    }

    // 매칭되지 않은 '(', ')' 개수를 더해서 총 필요 괄호 개수를 구한다
    return openCount + closeCount;
};