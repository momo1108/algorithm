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
    const M = board.length;
    const N = board[0].length;
    const DIRECTIONS = [[1, 0], [0, 1], [-1, 0], [0, -1]];
    const bigramSet = new Set();
    
    // 보드와 단어의 문자 빈도수 및 시작 위치 수집
    const boardCharCount = {};
    const startPositions = {
        forwards: [],
        backwards: []
    };
    
    const firstChar = word[0];
    const lastChar = word[word.length - 1];
    
    for (let row = 0; row < M; row++) {
        for (let col = 0; col < N; col++) {
            const char = board[row][col];
            boardCharCount[char] = (boardCharCount[char] || 0) + 1;
            
            // 시작 위치 저장
            if (char === firstChar || char === lastChar) {
                if (!startPositions[char]) {
                    startPositions[char] = [[row, col]];
                } else {
                    startPositions[char].push([row, col]);
                }
            }

            // bigram 정보 저장
            for (let [dr, dc] of DIRECTIONS) {
                let nr = row + dr;
                let nc = col + dc;
                if (isInBounds(nr, nc, M, N)) bigramSet.add(char + board[nr][nc]);
            }
        }
    }
    
    // 최적화 1: 문자 빈도수 체크 - 보드에 단어를 구성할 충분한 문자가 있는지 확인
    const wordCharCount = {};
    for (const char of word) {
        wordCharCount[char] = (wordCharCount[char] || 0) + 1;
    }

    for (const char in wordCharCount) {
        if ((boardCharCount[char] || 0) < wordCharCount[char]) {
            return false;
        }
    }
    
    // 최적화 2: 희귀 문자부터 시작 - 시작 문자가 적은 방향으로 탐색
    const firstCharCount = boardCharCount[firstChar] || 0;
    const lastCharCount = boardCharCount[lastChar] || 0;
    
    // 마지막 문자가 더 희귀하면 단어를 뒤집어서 탐색
    if (firstCharCount > lastCharCount) {
        const wordArray = word.split("");
        let temp;
        for (let i = 0; i < word.length / 2; i++) {
            temp = wordArray[i];
            wordArray[i] = wordArray[word.length - 1 - i];
            wordArray[word.length - 1 - i] = temp;
        }
        word = wordArray.join("");
    }
    
    // 최적화 3: Bigram 인접성 체크 - 연속된 두 문자가 인접한 칸에 존재하는지 확인
    for (let i = 0; i < word.length - 1; i++) {
        if (!bigramSet.has(word.substring(i, i + 2))) return false;
    }

    
    // DFS로 단어 탐색
    for (const [row, col] of startPositions[word[0]]) {
        if (searchByDFS(board, word, row, col, 0, M, N)) {
            return true;
        }
    }
    
    return false;
};

// 좌표가 보드 범위 내에 있는지 확인
function isInBounds(row, col, rows, cols) {
    return row >= 0 && row < rows && col >= 0 && col < cols;
}

// DFS로 단어 탐색
function searchByDFS(board, word, row, col, index, rows, cols) {
    // 단어를 모두 찾음
    if (index === word.length) return true;
    
    // 범위를 벗어남
    if (!isInBounds(row, col, rows, cols)) return false;
    
    // 현재 문자가 일치하지 않음
    const currentChar = board[row][col];
    if (currentChar !== word[index]) return false;
    
    // 현재 칸을 사용 중으로 표시
    board[row][col] = ".";
    
    // 4방향으로 재귀 탐색
    const found = searchByDFS(board, word, row + 1, col, index + 1, rows, cols) ||
                  searchByDFS(board, word, row - 1, col, index + 1, rows, cols) ||
                  searchByDFS(board, word, row, col + 1, index + 1, rows, cols) ||
                  searchByDFS(board, word, row, col - 1, index + 1, rows, cols);
    
    // 백트래킹: 원래 문자로 복구
    board[row][col] = currentChar;
    
    return found;
}