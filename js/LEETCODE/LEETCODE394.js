// https://leetcode.com/problems/decode-string/description/

/**
인코딩된 문자열을 받아서 디코딩된 문자열을 반환하자.

인코딩 규칙 : k[인코딩된문자열] = 인코딩된문자열이 k번 반복된다.
k 는 양의 정수이다.

주어지는 문자열에는 공백이 존재하지 않고 대괄호 또한 완벽하게 작성되어있다.
또한 원본 문자열에서 숫자는 오직 인코딩 규칙의 k 로서만 쓰여진다.
3a 나 2[4] 같은 입력은 주어지지 않는다.

Example 1:

Input: s = "3[a]2[bc]"
Output: "aaabcbc"


Example 2:

Input: s = "3[a2[c]]"
Output: "accaccacc"


Example 3:

Input: s = "2[abc]3[cd]ef"
Output: "abcabccdcdcdef"
 
제한사항:
- 1 <= s.length <= 30
- s 는 오직 소문자 영문, 숫자, 대괄호 '[]' 로만 이루어져있다.
- s 는 무조건 유효한 입력값임이 보장된다.
- s 내부의 숫자는 [1, 300] 의 범위를 가진다. (1 이상 300 이하)
 */

/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function(s) {
    /**
     * 기본적인 구현 컨셉
     * 문자열을 앞에서부터 차례대로 읽어가면서 아래와 같이 디코딩 해야한다.
     * 만약 인코딩 정보가 중첩되어있는 경우, 재귀를 활용해서 단계별로 저장한다
     * 스택에서 인코딩 정보를 빼낼 때, 문자열 - 숫자 순으로 빠질 것이다.
     * 문자열을 숫자만큼 반복한 뒤 만약 또 인코딩 정보가 있다면 다음 문자열의 뒤로 붙인다.
     * 
     * 예외처리
     * - 인코딩 정보가 중첩된 경우, 현재 문자열과 다음 인코딩 정보의 숫자가 붙어있을 수 있다.
     *   "3[a2[c]]"
     */
    let returnString = "";

    let isEncoding = false;
    let isNumbering = false;
    let numberString = "";
    let encodedString = "";
    let depth = 0;

    for (let sIndex = 0; sIndex < s.length; sIndex++) {
        const ch = s[sIndex];
        if (isEncoding) {
            if (isNumbering) {
                if (ch >= "0" && ch <= "9") numberString += ch;
                else {
                    isNumbering = false;
                    encodedString += ch;
                    depth++;
                }
            } else {
                encodedString += ch;
                if (ch === "[") {
                    depth++;
                } else if (ch === "]") {
                    if(--depth === 0) {
                        isEncoding = false;
                        const innerEncodedString = encodedString
                                         .slice(1, encodedString.length - 1);
                        const decodedString = decodeString(innerEncodedString);
                        returnString += decodedString.repeat(parseInt(numberString));
                        numberString = "";
                        encodedString = "";
                    }
                }
            }
        } else {
            if (ch >= "0" && ch <= "9") {
                numberString += ch;
                isEncoding = true;
                isNumbering = true;
            } else {
                returnString += ch;
            }
        }
    }

    return returnString;
};

console.log(decodeString("3[a2[c]]"));