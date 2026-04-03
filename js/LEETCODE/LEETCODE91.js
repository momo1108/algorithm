/**
 * [LeetCode 91] Decode Ways
 *
 * 숫자로만 이루어진 문자열 s가 주어질 때,
 * "1" -> 'A', ..., "26" -> 'Z' 규칙으로 해석 가능한 모든 경우의 수를 구한다.
 * 유효하지 않은 전체 문자열이면 0을 반환한다.
 *
 * 핵심 포인트:
 * - '0'은 단독으로 해석할 수 없다.
 * - 두 자리 해석은 11~26 범위만 허용된다. (10, 20은 별도 처리)
 *
 * 풀이:
 * - dp[i]: s[0..i]까지 해석하는 경우의 수
 * - 현재 문자가 '0'이면 이전 한 자리 해석은 불가하므로 dp[i - 2]만 가능
 * - 현재 문자가 '0'이 아니면 dp[i - 1]을 더하고,
 *   두 자리 해석이 가능하면 dp[i - 2]를 추가한다.
 * - 시간복잡도: O(n), 공간복잡도: O(n)
 */

/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function(s) {
    // 어느 위치에서든 '0'이 단독으로 등장하면 해석이 불가능하다.
    for (let i = 0; i < s.length; i++) {
        const prevChar = s[i - 1];
        const currentChar = s[i];
        if (currentChar === "0" && (prevChar !== "1" && prevChar !== "2")) return 0;
    }

    const dp = new Array(s.length).fill(0);

    // 길이 1인 접두 문자열의 기본 경우의 수
    dp[0] = 1;

    // 길이 2인 접두 문자열의 기본 경우의 수
    dp[1] = 1;
    if (s[1] !== "0" && canUseTwoDigits(1)) dp[1]++;

    for (let i = 2; i < s.length; i++) {
        const currentChar = s[i];

        if (currentChar === "0") {
            // 현재 문자가 0이면 직전 한 자리 사용은 불가능하고, 두 자리 해석만 가능
            dp[i] = dp[i - 2];
        } else {
            // 한 자리 해석
            dp[i] += dp[i - 1];

            // 두 자리 해석이 가능하면 추가
            if (canUseTwoDigits(i)) dp[i] += dp[i - 2];
        }
    }

    console.log(dp[s.length - 1]);
    return dp[s.length - 1];

    function canUseTwoDigits(index) {
        const twoDigitNumber = Number(s.substring(index - 1, index + 1));
        if (twoDigitNumber > 10 && twoDigitNumber < 27) return true;
        else return false;
    }
};

numDecodings("207");