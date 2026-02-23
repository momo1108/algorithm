/**
 * [LeetCode 3] Longest Substring Without Repeating Characters
 *
 * 문자열 s가 주어질 때, 중복 문자 없이 이루어진 가장 긴 부분 문자열의 길이를 반환하라.
 *
 * 제한사항:
 * 0 <= s.length <= 5 * 10^4
 * s는 영문자, 숫자, 기호, 공백으로 이루어져 있음
 *
 * 풀이:
 * 슬라이딩 윈도우 + 해시맵 (Sliding Window with Hash Map)
 * - charIndexMap으로 각 문자의 가장 최근 인덱스를 기록
 * - 현재 윈도우의 시작을 windowStart로 유지
 * - 중복 문자 발견 시, 이전 등장 위치까지의 문자를 맵에서 제거하고 windowStart를 이동
 * - 윈도우 크기(= 맵의 크기)가 최대일 때를 answer에 갱신
 * - 시간복잡도: O(n)  (각 문자를 최대 2번 처리)
 * - 공간복잡도: O(min(n, m))  (m: 문자 집합의 크기)
 */

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    // 각 문자 -> 해당 문자의 현재 윈도우 내 인덱스를 저장하는 맵
    const charIndexMap = {};
    // 현재 윈도우의 시작 인덱스
    let windowStart = 0;

    if (!s) return 0;

    let answer = 0;

    for (let charIndex = 0; charIndex < s.length; charIndex++) {
        const ch = s[charIndex];

        if (ch in charIndexMap) {
            // 중복 문자 발견: 이전 등장 위치까지의 문자를 맵에서 제거
            const prevIndex = charIndexMap[ch];
            for (let i = windowStart; i <= prevIndex; i++) {
                delete charIndexMap[s[i]];
            }
            // 윈도우 시작을 중복 문자 다음 위치로 이동
            windowStart = prevIndex + 1;
        }

        // 현재 문자를 맵에 등록
        charIndexMap[ch] = charIndex;

        // 현재 윈도우 크기(맵의 크기)로 최대값 갱신
        answer = Math.max(Object.keys(charIndexMap).length, answer);
    }

    return answer;
};

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    const alphaIndexMap = {};
    let headPointer = 0;
    if (!s) return 0;
    
    let answer = 0;

    for (let charIndex = 0; charIndex < s.length; charIndex++) {
        ch = s[charIndex];
        if (ch in alphaIndexMap) {
            const duplicateIndex = alphaIndexMap[ch];
            for (let i = headPointer; i <= duplicateIndex; i++) {
                delete alphaIndexMap[s[i]]
            }
            headPointer = duplicateIndex + 1;
        }
        alphaIndexMap[ch] = charIndex;
        answer = Math.max(Object.keys(alphaIndexMap).length, answer);
        console.log(alphaIndexMap)
    }

    return answer;
};

console.log(lengthOfLongestSubstring("aab"));