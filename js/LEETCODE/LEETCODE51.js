/**
 * [LeetCode 51] N-Queens
 *
 * n x n 체스판에 n개의 퀸을 서로 공격하지 못하게 배치하는 모든 경우를 구한다.
 * 각 해답은 문자열 배열 형태의 보드로 반환한다.
 *
 * 풀이 요약:
 * - 백트래킹으로 행(row)을 한 줄씩 내려가며 퀸 위치를 결정한다.
 * - 이전 행들에 놓인 퀸 기준으로 현재 행에서 놓을 수 없는 열을 표시한다.
 * - 가능한 열에 퀸을 놓고 재귀 호출한 뒤, 원상복구(pop)하며 다음 경우를 탐색한다.
 */
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
    const solutions = [];
    backtrack(0, []);
    return solutions;
    
    // queenColsByRow[r] = r행에 놓인 퀸의 열 인덱스
    function backtrack(row, queenColsByRow){
        // n개를 모두 배치했다면 현재 배치를 보드 문자열로 변환해 저장
        if (queenColsByRow.length === n) {
            solutions.push(queenColsByRow.map(col => {
                const boardRow = new Array(n).fill(".");
                boardRow[col] = "Q";
                return boardRow.join("");
            }))
        }
        // 현재 row에서 공격받는 열을 표시
        const blockedCols = new Array(n).fill(false);
        for (let distance = 1; distance <= queenColsByRow.length; distance++) {
            const placedCol = queenColsByRow[queenColsByRow.length - distance];
            blockedCols[placedCol] = true;
            if (placedCol + distance < n) blockedCols[placedCol + distance] = true;
            if (placedCol - distance >= 0) blockedCols[placedCol - distance] = true;
        }
        for (let col = 0; col < n; col++) {
            if (blockedCols[col]) continue;
            queenColsByRow.push(col);
            backtrack(row + 1, queenColsByRow);
            queenColsByRow.pop();
        }
    }
};

console.log(solveNQueens(4))