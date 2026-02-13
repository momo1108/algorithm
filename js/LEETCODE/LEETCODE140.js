/**
 * [LeetCode 140] Word Break II
 * 
 * 문자열 s 와 문자열 배열 wordDict 가 주어진다.
 * 문자열 s 에 스페이스를 삽입하여 단어들로 이루어진 문장으로 만든다.
 * 문장의 각 단어는 모두 wordDict 에 해당되는 단어들이어야 한다.
 * 가능한 모든 문장을 배열 형태로 반환하라.
 * 
 * 제한:
 * 1 <= s.length <= 20
 * 1 <= wordDict.length <= 1000
 * 1 <= wordDict[i].length <= 10
 * s 와 wordDict[i] 소문자 영어로 구성됨
 * wordDict 의 요소들은 unique 한 값들
 * 입력값은 정답의 개수가 10^5 개를 넘지 않게 제공된다.
 */

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
var wordBreak = function(s, wordDict) {
    /**
     * 풀이: 동적 프로그래밍 (DP)
     * 
     * 단순 재귀는 시간복잡도 O(1000^20)로 불가능
     * 
     * DP[i] = 문자열의 i번째 위치까지 만들 수 있는 모든 문장 배열
     * DP[0] = [""] (빈 문자열)
     * 
     * 각 위치 i에서:
     * - DP[i-1]이 비어있지 않으면 (이전까지 문장 생성이 가능하면)
     * - i 위치부터 시작하는 매칭 가능한 단어들을 찾아
     * - 이전 문장들에 해당 단어를 이어붙여 DP에 추가
     */
    // DP 배열 초기화
    const DP = Array.from({length: 21}, ()=>[]);
    DP[0].push("");

    // 문자열의 각 위치에 대해 순회
    for (let i = 1; i <= s.length; i++) {
        // 이전 위치까지 만들 수 있는 문장이 없으면 스킵
        if (DP[i - 1].length === 0) continue;
        
        // 현재 위치부터 시작하는 매칭 가능한 단어들 찾기
        const matchingWords = wordDict.filter(w => s.substring(i - 1).startsWith(w));
        
        // 각 매칭된 단어를 이전 문장들에 이어붙임
        for (let word of matchingWords) {
            const endPos = i + word.length - 1;
            DP[endPos].push(
                ...DP[i - 1].map(prevSentence => {
                    const newSentence = prevSentence + " " + word;
                    return newSentence.trim();
                })
            )
        }
    }

    return DP[s.length];
};

wordBreak("pineapplepenapple", ["apple","pen","applepen","pine","pineapple"])