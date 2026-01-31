/**
 * m x n 사이즈의 이진 행렬이 주어졌을 때, 
 * 1 로만 구성된 정사각형 중 가장 넓은 것의 넓이를 구하시오.
 * 
 * 제한:
 * - m == matrix.length
 * - n == matrix[i].length
 * - 1 <= m, n <= 300
 * - matrix[i][j] 의 값은 '0' 또는 '1'.
 */

/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function(matrix) {
    const sizeMap = {
        row: matrix.length,
        col: matrix[0].length
    }
    const DP = new Array(sizeMap.row + 1).fill(null)
               .map(()=>new Array(sizeMap.col + 1).fill(0));
    
    let answer = 0;
    for (let row = 1; row <= sizeMap.row; row++) {
        for (let col = 1; col <= sizeMap.col; col++) {
            const left = DP[row][col - 1];
            const top = DP[row - 1][col];
            const diagonal = DP[row - 1][col - 1];

            if (matrix[row - 1][col - 1] === "1") DP[row][col] = Math.min(left, top, diagonal) + 1;
            else DP[row][col] = 0;

            answer = Math.max(answer, DP[row][col]);
        }
    }

    return answer ** 2;
};