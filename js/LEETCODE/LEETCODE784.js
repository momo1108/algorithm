/**
 * [LeetCode 784] Letter Case Permutation
 *
 * 문자열 s가 주어질 때, 각 영문자를 독립적으로 소문자/대문자로 바꿔
 * 만들 수 있는 모든 문자열을 반환한다. 숫자는 그대로 유지한다.
 * 반환 순서는 아무거나 가능하다.
 *
 * 예시:
 * Input: s = "a1b2"
 * Output: ["a1b2", "a1B2", "A1b2", "A1B2"]
 *
 * 제한사항:
 * 1 <= s.length <= 12
 * s는 영문 대/소문자와 숫자로만 구성된다.
 *
 * 풀이:
 * DFS(백트래킹)로 각 위치를 순회한다.
 * - 숫자면 그대로 다음 인덱스로 진행
 * - 문자면 소문자/대문자 두 갈래로 분기
 * 문자열 끝에 도달하면 현재 조합을 결과에 추가한다.
 *
 * 시간복잡도: O(n * 2^k) (k: 영문자 개수)
 * 공간복잡도: O(n) (재귀 호출 스택, 결과 배열 제외)
 */

/**
 * @param {string} s
 * @return {string[]}
 */
var letterCasePermutation = function(s) {
    const isDigit = (char) => char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57;

    const permutations = [];
    dfs(s.split(""), 0);

    console.log(permutations);
    return permutations;

    /**
     * 현재 인덱스의 문자를 기준으로 가능한 케이스를 모두 탐색한다.
     * @param {string[]} chars
     * @param {number} index
     */
    function dfs(chars, index) {
        // 문자열 끝까지 도달하면 하나의 완성된 순열을 결과에 저장
        if (index >= s.length) {
            permutations.push(chars.join(""));
            return;
        }

        // 숫자는 대소문자 변환 대상이 아니므로 그대로 다음 인덱스로 이동
        if (isDigit(chars[index])) {
            dfs(chars, index + 1);
        } else {
            // 문자는 소문자/대문자 두 경우를 모두 탐색
            chars[index] = chars[index].toLowerCase();
            dfs(chars, index + 1);
            chars[index] = chars[index].toUpperCase();
            dfs(chars, index + 1);
        }
    }
};

letterCasePermutation("3z4");

/**
 * 참고용 대안 풀이 (path 문자열 누적 방식)
 *
 * var letterCasePermutation = function(s) {
 *     const result = [];
 *
 *     function dfs(index, path) {
 *         if (index === s.length) {
 *             result.push(path);
 *             return;
 *         }
 *
 *         const char = s[index];
 *         if (char >= '0' && char <= '9') {
 *             dfs(index + 1, path + char);
 *         } else {
 *             dfs(index + 1, path + char.toLowerCase());
 *             dfs(index + 1, path + char.toUpperCase());
 *         }
 *     }
 *
 *     dfs(0, "");
 *     return result;
 * };
 */