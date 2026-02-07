/**
 * m x n 사이즈의 배열이 문자 배열과, 특정 문자열이 주어진다.
 * 문자 배열 내에 특정 문자열의 존재 여부를 true/false 로 리턴한다.
 * 
 * 단어의 연속적으로 인접한 칸들로 구성할 수 있다.
 * 인접한 칸은 수평 혹은 수직으로 붙어있는 칸을 의미한다.
 * 각 칸은 단어 구성에 한 번만 사용할 수 있다.
 */

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    // 가지치기 1. Frequency check) 각 문자의 개수가 동일한지 체크
    const boardCharCountMap = new Map();
    const wordCharCountMap = new Map();
    
    // 하는김에 시작 위치도 첫글자, 마지막 글자별 저장
    const startLocationMap = {
        forwards: [],
        backwards: []
    };
    
    const M = board.length;
    const N = board[0].length;
    let ch;
    for (let row = 0; row < M; row++) {
        for(let col = 0; col < N; col++) {
            ch = board[row][col];
            boardCharCountMap[ch] = (boardCharCountMap[ch] || 0) + 1;

            if (ch === word[0]) 
                startLocationMap.forwards.push([row, col]);
            else if (ch === word[word.length - 1]) 
                startLocationMap.backwards.push([row, col]);
        }
    }
    for (let ch of word) {
        wordCharCountMap[ch] = (wordCharCountMap[ch] || 0) + 1;
    }

    for (let ch in wordCharCountMap) {
        if (boardCharCountMap[ch] < wordCharCountMap[ch]) return false;
    }

    // 가지치기 2. Reverse by rarity) 정순, 역순 중 시작 문자가 더 적은 순서 체크
    let direction = 'forwards';
    if (boardCharCountMap[word[0]] > boardCharCountMap[word[word.length - 1]]) {
        direction = 'backwards';
        const wordArray = word.split("");
        let temp;
        for (let i = 0; i < wordArray.length / 2; i++) {
            temp = wordArray[i];
            wordArray[i] = wordArray[wordArray.length - 1 - i];
            wordArray[wordArray.length - 1 - i] = temp;
        }
        word = wordArray.join("");
    }

    // 가지치기 3. Bigram adjacency) 모든 2글자 부분문자열이 존재하는지 체크
    // word 나 board 가 매우 작은 경우가 아니면 거의 항상 이득
    const dr = [1, 0, -1, 0];
    const dc = [0, 1, 0, -1];
    let hasBigram, nextCh, nr, nc;
    for (let i = 0; i < word.length - 1; i++) {
        hasBigram = false;
        for (let row = 0; row < M; row++) {
            for(let col = 0; col < N; col++) {
                if (board[row][col] === word[i]) {
                    for (let d = 0; d < 4; d++){
                        nr = row + dr[d];
                        nc = col + dc[d];
                        if (nr < 0 || nr >= M || nc < 0 || nc >= N) continue;
                        nextCh = board[nr][nc];
                        if (nextCh && nextCh === word[i + 1]) hasBigram = true;
                        if (hasBigram) break;
                    }
                }
                if (hasBigram) break;
            }
            if (hasBigram) break;
        }
        if (!hasBigram) return false;
    }

    // dfs
    function dfs(row, col, index) {
        if (index === word.length) return true;
        if (row < 0 || row >= M || col < 0 || col >= N) return false;
        
        let ch = board[row][col];
        if (ch !== word[index]) return false;
        board[row][col] = ".";
        
        
        let result = dfs(row + 1, col, index + 1) ||
            dfs(row-1, col, index + 1) ||
            dfs(row, col + 1, index + 1) ||
            dfs(row, col - 1, index + 1);

        board[row][col] = ch;

        return result;
    }

    for (let [r, c] of startLocationMap[direction]) {
        if (dfs(r, c, 0)) return true;
    }

    return false;
};