/**
 * [LeetCode 76] Minimum Window Substring
 * 
 * 길이 m의 문자열 s, 길이 n의 문자열 t가 주어진다.
 * s의 부분 문자열 중 t의 모든 문자(중복도 포함해서 개수 맞추기)를 포함하면서,
 * 가장 짧은 부분 문자열을 반환하라.
 * 만약 그런 문자열이 없다면 빈 문자열 ""를 반환하라.
 * 
 * 테스트케이스의 정답은 모두 유일한 값이다.
 * 
 * 제한사항:
 * 1 <= m, n <= 10^5
 * 문자열 s와 t는 대문자와 소문자를 구분한다.
 * 
 * 풀이:
 * 슬라이딩 윈도우 (Sliding Window) + Two Pointer
 * - targetMap: t의 각 문자 개수 저장
 * - windowMap: 현재 윈도우의 각 문자 개수 저장
 * - right 포인터를 늘려가며 조건을 만족하는 윈도우 찾기
 * - 조건 만족 시 left 포인터를 늘려가며 최소 윈도우 찾기
 * - 시간복잡도: O(m + n), 공간복잡도: O(1) (문자 종류는 최대 128개)
 */

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
    const m = s.length;
    const n = t.length;

    // t의 각 문자 개수를 저장하는 맵
    const targetMap = new Map();
    // 현재 윈도우의 각 문자 개수를 저장하는 맵
    const windowMap = new Map();
    
    for (let ch of t) {
        targetMap.set(ch, (targetMap.get(ch) || 0) + 1);
        if (!windowMap.get(ch)) windowMap.set(ch, 0);
    }

    // 현재 윈도우가 t의 모든 문자를 포함하는지 확인
    function hasAllChars() {
        for (let [key, _] of targetMap) {
            if (windowMap.get(key) < targetMap.get(key)) return false;
        }
        return true;
    }

    /**
     * 슬라이딩 윈도우 알고리즘:
     * 1. right 포인터를 늘려가며 t의 모든 문자를 포함하는 윈도우 찾기
     * 2. 조건 만족 시 left 포인터를 늘려가며 최소 윈도우 찾기
     * 3. 더 이상 조건을 만족하지 않으면 다시 right 포인터 증가
     */
    const validWindows = [];
    let left = 0, right = 1;
    
    // 첫 번째 문자 초기화
    if (windowMap.get(s[0]) !== undefined) windowMap.set(s[0], 1);
    // 슬라이딩 윈도우 탐색
    while (right < m) {
        const rightChar = s[right];
        
        // right 포인터의 문자가 t에 포함된 문자라면 윈도우에 추가
        if (windowMap.get(rightChar) !== undefined) {
            windowMap.set(rightChar, windowMap.get(rightChar) + 1);

            // 현재 윈도우가 t의 모든 문자를 포함하는지 확인
            if (hasAllChars()) {
                // 조건을 만족하면 left 포인터를 늘려가며 최소 윈도우 찾기
                while (true) {
                    const leftChar = s[left];
                    
                    if (windowMap.get(leftChar) !== undefined) {
                        // left 문자를 윈도우에서 제거해보고
                        windowMap.set(leftChar, windowMap.get(leftChar) - 1);
                        
                        // 여전히 조건을 만족하면 left 증가
                        if (hasAllChars()) {
                            left++;
                        } else {
                            // 조건을 만족하지 않으면 다시 추가하고 중단
                            windowMap.set(leftChar, windowMap.get(leftChar) + 1);
                            break;
                        }
                    } else {
                        // t에 없는 문자는 건너뛰기
                        left++;
                    }
                }
                // 유효한 윈도우 저장
                validWindows.push(s.slice(left, right + 1));
            }
        }
        right++;
    }

    // 가장 짧은 윈도우 반환
    validWindows.sort((a, b) => a.length - b.length);

    return validWindows.length ? validWindows[0] : "";
};

// 테스트
minWindow("ADOBECODEBANC", "ABC"); // "BANC"

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
    if (!s || !t || s.length < t.length) return "";

    const freq = new Array(128).fill(0);
    for (const c of t) freq[c.charCodeAt(0)]++;

    let required = t.length;
    let left = 0, minLen = Infinity, start = 0;

    for (let right = 0; right < s.length; right++) {
        if (freq[s.charCodeAt(right)]-- > 0) required--;

        while (required === 0) {
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                start = left;
            }

            if (++freq[s.charCodeAt(left)] > 0) required++;
            left++;
        }
    }

    return minLen === Infinity ? "" : s.substr(start, minLen);
};