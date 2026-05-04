/**
 * [LeetCode 3799] Word Squares (4x4)
 *
 * 길이가 4인 단어들이 주어졌을 때, 4개의 단어를 순서대로 배치해
 * 가로로 읽은 문자열과 세로로 읽은 문자열이 같은 4x4 워드 스퀘어를 모두 구한다.
 *
 * 이 코드의 핵심 조건은 다음과 같다:
 * - 첫 번째 단어의 첫 글자 == 두 번째 단어의 첫 글자
 * - 첫 번째 단어의 마지막 글자 == 세 번째 단어의 첫 글자
 * - 두 번째 단어의 마지막 글자 == 네 번째 단어의 첫 글자
 * - 세 번째 단어의 마지막 글자 == 네 번째 단어의 마지막 글자
 *
 * 풀이:
 * 백트래킹(DFS)으로 단어 4개를 중복 없이 뽑아 배치한다.
 * 각 단계에서 워드 스퀘어 조건을 미리 검사해 가지치기(pruning) 하여 탐색량을 줄인다.
 */

/**
 * @param {string[]} words
 * @return {string[][]}
 */
var wordSquares = function(words) {
    // 각 단어를 이미 사용했는지 체크
    const isUsed = new Array(4).fill(false);
    // 현재 구성 중인 워드 스퀘어
    const currentSquare = [];
    // 완성된 워드 스퀘어 결과 목록
    const resultSquares = [];

    dfs();

    // 결과를 사전순으로 정렬
    resultSquares.sort((squareA, squareB) => {
        for (let row = 0; row < 4; row++) {
            if (squareA[row] !== squareB[row]) return squareA[row].localeCompare(squareB[row]);
        }
    });

    return resultSquares;

    function dfs() {
        // 단어 4개를 모두 배치하면 정답으로 저장
        if (currentSquare.length === 4) {
            resultSquares.push([...currentSquare]);
            return;
        }

        for (let i = 0; i < words.length; i++) {
            if (isUsed[i]) continue;

            // 현재 깊이에 맞는 워드 스퀘어 조건을 만족하지 않으면 가지치기
            if (currentSquare.length === 1 && currentSquare[0][0] !== words[i][0]) continue;
            if (currentSquare.length === 2 && currentSquare[0][3] !== words[i][0]) continue;
            if (currentSquare.length === 3 && (currentSquare[1][3] !== words[i][0] || currentSquare[2][3] !== words[i][3])) continue;
            
            currentSquare.push(words[i]);
            isUsed[i] = true;
            dfs();
            currentSquare.pop();
            isUsed[i] = false;
        }
    }
};

wordSquares(["able","area","echo","also"])