/**
 * [LeetCode 1143] Longest Common Subsequence
 * 
 * 두 문자열 text1과 text2가 주어진다.
 * 두 문자열의 가장 긴 공통 부분 수열(LCS)의 길이를 반환하라.
 * 부분 수열은 원래 문자열에서 일부 문자를 삭제하여 만들 수 있다 (순서는 유지).
 * 
 * 제한사항:
 * 1 <= text1.length, text2.length <= 1000
 * text1과 text2는 소문자 영어 알파벳으로 구성됨
 * 
 * 풀이:
 * 동적 프로그래밍 (DP)
 * - dp[i][j] = text1의 첫 i개 문자와 text2의 첫 j개 문자의 LCS 길이
 * - text1[i-1] == text2[j-1]이면: dp[i][j] = dp[i-1][j-1] + 1
 * - 다르면: dp[i][j] = max(dp[i-1][j], dp[i][j-1])
 * - 시간복잡도: O(m * n), 공간복잡도: O(m * n)
 */

/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function(text1, text2) {
    const m = text1.length;
    const n = text2.length;
    
    // dp[i][j]: text1의 첫 i개 문자와 text2의 첫 j개 문자의 LCS 길이
    const dp = Array.from({length: m + 1}, () => Array(n + 1).fill(0));

    // DP 테이블 채우기
    for(let i = 1; i <= m; i++){
        for(let j = 1; j <= n; j++){
            // 현재 문자가 같으면 이전 LCS에 1을 더함
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                // 다르면 한쪽 문자를 제외한 경우 중 최댓값
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    return dp[m][n];
};

// 테스트
longestCommonSubsequence('abcba', 'abcbcba'); // 5 (abcba)