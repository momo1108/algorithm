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
    let i = 0;

    const decode = () => {
        let number = 0;
        let currentStr = "";

        while (i < s.length) {
            const ch = s[i];
            if (ch >= "0" && ch <= "9") {
                i++;
                number = number * 10 + parseInt(ch);
            } else if (ch === "[") {
                i++;
                currentStr += decode().repeat(number);
                number = 0;
            } else if (ch === "]") {
                i++;
                return currentStr;
            } else {
                i++;
                currentStr += ch;
            }
        }

        return currentStr;
    }

    return decode();
};

console.log(decodeString("3[a]2[bc]"));