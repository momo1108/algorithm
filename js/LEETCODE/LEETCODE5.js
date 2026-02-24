/**
 * [LeetCode 5] Longest Palindromic Substring
 *
 * 문자열 s가 주어질 때, s에서 가장 긴 팰린드롬 부분 문자열을 반환하라.
 *
 * 제한사항:
 * 1 <= s.length <= 1000
 * s는 영문 소문자와 대문자로만 이루어져 있음
 *
 * 풀이 1: 동적 프로그래밍 (Dynamic Programming)
 * - dp[i][j]: 문자열 s의 i~j 구간이 팰린드롬이면 true
 * - 점화식: dp[i][j] = dp[i+1][j-1] && s[i] === s[j]
 *   (양 끝 문자가 같고, 안쪽 부분 문자열도 팰린드롬이면 팰린드롬)
 * - 길이 1, 2를 먼저 초기화한 뒤, 길이 3부터 순서대로 확장
 * - 시간복잡도: O(n^2)
 * - 공간복잡도: O(n^2)
 *
 * 풀이 2: 중심 확장 (Expand Around Center)
 * - 각 문자(홀수 길이)와 인접한 두 문자(짝수 길이)를 중심으로 좌우로 확장
 * - 양 끝 문자가 같은 동안 확장하며 최대 팰린드롬 범위를 갱신
 * - 시간복잡도: O(n^2)
 * - 공간복잡도: O(1)
 */

/**
 * 풀이 1: 동적 프로그래밍
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    // dp[i][j]: s[i..j]가 팰린드롬이면 true
    const dp = Array.from({ length: s.length }, () => new Array(s.length).fill(false));

    let answer = s[0];

    // 길이 1: 모든 단일 문자는 팰린드롬
    // 길이 2: 두 문자가 같으면 팰린드롬
    for (let i = 0; i < s.length; i++) {
        dp[i][i] = true;
        if (i + 1 < s.length) {
            dp[i][i + 1] = s[i] === s[i + 1];
            if (dp[i][i + 1] && answer.length === 1) answer = s.slice(i, i + 2);
        }
    }

    // 길이 3 이상: 안쪽 부분이 팰린드롬이고 양 끝 문자가 같으면 팰린드롬
    for (let len = 3; len <= s.length; len++) {
        for (let i = 0; i <= s.length - len; i++) {
            const j = i + len - 1;
            dp[i][j] = dp[i + 1][j - 1] && (s[i] === s[j]);
            if (dp[i][j] && len > answer.length) {
                answer = s.slice(i, i + len);
            }
        }
    }

    return answer;
};

/**
 * 풀이 2: 중심 확장
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    // 현재까지 발견한 가장 긴 팰린드롬의 시작 인덱스와 길이
    let start = 0, maxLen = 1;

    /**
     * 주어진 중심에서 좌우로 확장하며 팰린드롬 범위 갱신
     * @param {number} left  - 확장 시작 왼쪽 인덱스
     * @param {number} right - 확장 시작 오른쪽 인덱스
     */
    function expand(left, right) {
        while (left >= 0 && right < s.length) {
            if (s[left] !== s[right]) break;
            const curLen = right - left + 1;
            if (curLen > maxLen) {
                start = left;
                maxLen = curLen;
            }
            left--;
            right++;
        }
    }

    for (let i = 0; i < s.length; i++) {
        // 홀수 길이 팰린드롬: 단일 문자를 중심으로 확장
        expand(i, i);
        // 짝수 길이 팰린드롬: 인접한 두 문자를 중심으로 확장
        if (i + 1 < s.length && s[i] === s[i + 1]) expand(i, i + 1);
    }

    return s.substring(start, start + maxLen);
};

console.log(longestPalindrome("babad"));