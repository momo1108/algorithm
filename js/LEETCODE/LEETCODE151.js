/**
 * [LeetCode 151] Reverse Words in a String
 *
 * 문자열 s가 주어진다. s 안에 있는 단어들의 순서를 뒤집어 반환하라.
 * 단어는 공백이 아닌 문자들의 연속으로 정의되며, 하나 이상의 공백으로 구분된다.
 * s에는 앞뒤 공백이나 단어 사이에 여러 개의 공백이 포함될 수 있다.
 * 반환하는 문자열은 단어들을 단일 공백으로 이어 붙여야 하며,
 * 앞뒤 공백이나 연속된 공백을 포함하지 않아야 한다.
 *
 * 제한사항:
 * 1 <= s.length <= 10^4
 * s는 영문 대소문자, 숫자, 공백(' ')으로 구성
 * s에는 최소 한 개의 단어가 존재
 *
 * 풀이: trim() + 정규식 split + reverse + join
 * - trim()으로 앞뒤 공백을 제거한 뒤, /\s+/ 정규식으로 split하여
 *   연속된 공백을 처리하면서 단어 배열로 분리한다.
 * - 배열을 reverse()한 뒤 단일 공백으로 join하여 반환한다.
 * - 시간복잡도: O(n)
 * - 공간복잡도: O(n)
 */

/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
    // 앞뒤 공백 제거 후 연속된 공백을 기준으로 단어 배열로 분리
    const words = s.trim().split(/\s+/g);
    // 단어 배열을 뒤집어 단일 공백으로 이어 붙임
    return words.reverse().join(" ");
};

console.log(reverseWords("the sky   is  blue"));