/**
 * [LeetCode 890] Find and Replace Pattern
 *
 * words와 pattern이 주어졌을 때, pattern과 같은 구조(일대일 대응, bijection)를 갖는 단어만 골라 반환한다.
 * 즉 pattern의 서로 다른 문자는 단어의 서로 다른 문자에 매핑되어야 한다.
 *
 * 제한사항:
 * 1 <= pattern.length <= 20
 * 1 <= words.length <= 50
 * words[i].length == pattern.length
 * pattern, words[i]는 소문자 영어 문자
 *
 * 풀이:
 * 각 단어에 대해 "단어 문자 -> pattern 문자" 매핑을 만든다.
 * - 이미 매핑된 문자가 현재 pattern 문자와 다르면 실패
 * - 아직 매핑이 없으면 새로 등록
 * 마지막에 매핑 개수와 pattern의 고유 문자 개수가 같아야 bijection이 성립한다.
 */

/**
 * @param {string[]} words
 * @param {string} pattern
 * @return {string[]}
 */
var findAndReplacePattern = function(words, pattern) {
    const patternUniqueCount = new Set(pattern).size;
    const matchedWords = [];

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        // 현재 단어의 문자 -> pattern 문자 매핑
        const wordToPatternMap = new Map();

        let isMatch = true;
        for (let j = 0; j < pattern.length; j++) {
            const mappedPatternChar = wordToPatternMap.get(word[j]);
            if (mappedPatternChar && mappedPatternChar !== pattern[j]) {
                isMatch = false;
                break;
            } else if (!mappedPatternChar) {
                wordToPatternMap.set(word[j], pattern[j]);
            }
        }

        // 고유 문자 수가 같아야 서로 다른 pattern 문자가 같은 문자로 합쳐지는 경우를 배제할 수 있음
        if (isMatch && patternUniqueCount === wordToPatternMap.size) matchedWords.push(word);
    }

    console.log(matchedWords);
    return matchedWords;
};

findAndReplacePattern(["badc","abab","dddd","dede","yyxx"], "abab");