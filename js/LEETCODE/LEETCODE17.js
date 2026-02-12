/**
 * 2~9 숫자에 옛날 휴대폰 넘버패드처럼 알파벳이 정해져있다.
 * 2 abc
 * 3 def
 * 4 ghi
 * 5 jkl
 * 6 mno
 * 7 pqrs
 * 8 tuv
 * 9 wxyz
 * 
 * 숫자 입력이 주어졌을 때, 가능한 모든 알파벳 조합을 찾아라.
 * 
 * ex. 23 = ad, ae, af, bd, be, bf, cd, ce, cf
 */

/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    // 숫자와 알파벳 매핑 테이블
    const digitAlphaMap = {
        2: "abc",
        3: "def",
        4: "ghi",
        5: "jkl",
        6: "mno",
        7: "pqrs",
        8: "tuv",
        9: "wxyz",
    }

    // 조합 결과를 저장할 배열 (빈 문자열로 시작)
    let combinations = [""];
    function getLetterCombinations (digitIndex) {
        // 재귀 종료 조건: 모든 숫자를 처리했으면 종료
        if (digitIndex >= digits.length) return;
        
        const digit = digits[digitIndex];
        const alphaArray = digitAlphaMap[digit].split("");
        // 기존 조합들에 현재 숫자의 각 알파벳을 붙여서 새로운 조합 생성
        // 예: ["a", "b"] + "d" -> ["ad", "bd"]
        combinations = combinations.map(
            letter => alphaArray.map(a => letter + a)
        ).flat();

        // 다음 숫자로 재귀 호출
        getLetterCombinations(digitIndex + 1);
    }

    getLetterCombinations(0);

    return combinations;
};