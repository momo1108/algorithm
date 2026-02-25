/**
 * [LeetCode 12] Integer to Roman
 *
 * 1~3999 범위의 정수 num이 주어진다.
 * 해당 숫자를 로마 숫자 문자열로 변환하여 반환하라.
 *
 * 로마 숫자 규칙:
 * I=1, V=5, X=10, L=50, C=100, D=500, M=1000
 * 뺄셈 표기: IV=4, IX=9, XL=40, XC=90, CD=400, CM=900
 *
 * 제한사항:
 * 1 <= num <= 3999
 *
 * 풀이:
 * 그리디 (Greedy) - 큰 값부터 탐욕적으로 빼기
 * - 로마 숫자 값을 내림차순으로 정렬한 규칙 테이블을 만든다.
 * - num이 0이 될 때까지, 현재 num보다 작거나 같은 가장 큰 값을 찾아
 *   해당 로마 문자를 결과에 추가하고 그 값을 num에서 뺀다.
 * - 시간복잡도: O(1) - num의 범위가 고정되어 있어 반복 횟수에 상한이 있음
 * - 공간복잡도: O(1)
 */

/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function(num) {
    let answer = "";

    // 로마 숫자 규칙 테이블 (값 내림차순 정렬)
    // 뺄셈 표기(CM, CD 등)도 하나의 단위로 포함
    const rules = [
        [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
        [100, "C"],  [90, "XC"],  [50, "L"],  [40, "XL"],
        [10, "X"],   [9, "IX"],   [5, "V"],   [4, "IV"],
        [1, "I"]
    ];

    // 현재 num 이하의 가장 큰 값을 찾아 처리
    for (let [value, roman] of rules) {
        while (num >= value) {
            answer += roman; // 해당 로마 문자를 결과에 추가
            num -= value;    // num에서 해당 값만큼 차감
        }
    }

    return answer;
};

console.log(intToRoman(3749)) // "MMMDCCXLIX"