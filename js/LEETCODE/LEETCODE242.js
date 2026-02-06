/**
 * 두 문자열 s, t 가 주어집니다.
 * 두 문자열은 서로의 anagram 인지 true/false 로 리턴합니다.
 * anagram : 문자열의 각 문자들의 순서를 재배치해서 새로운 문자열을 만드는 개념
 */

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean} s와 t가 anagram이면 true, 아니면 false
 */
var isAnagram = function(s, t) {
    // 기본 검증: 길이가 다르면 anagram이 될 수 없음
    if (s.length !== t.length) return false;

    // Map을 사용하여 s의 각 문자 개수를 저장
    // 예: s = "abc" → Map { a: 1, b: 1, c: 1 }
    const charCountMap = new Map();

    // Step 1: 첫 번째 문자열 s의 문자 개수를 카운트
    for (const ch of s) {
        if (charCountMap[ch]) {
            // 이미 존재하는 문자면 개수 증가
            charCountMap[ch]++;
        } else {
            // 새로운 문자면 개수를 1로 초기화
            charCountMap[ch] = 1;
        }
    }
    
    // Step 2: 두 번째 문자열 t의 각 문자를 검증
    for (const ch of t) {
        if (!charCountMap[ch]) { // t에 s에 없는 문자가 있으면 anagram 아님
            return false;
        } else if (charCountMap[ch] <= 0) { // 문자 개수가 동일하지 않으면 anagram 아님
            return false;
        } else { // 위에 해당되지 않을 경우, 검증된 문자 개수 차감
            charCountMap[ch]--;
        }
    }

    // Step 3: 모든 검증을 통과하면 anagram입니다
    return true;
};