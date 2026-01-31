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
    };

    let maxArea = 0;

    for (let row = 0; row < sizeMap.row; row++) {
        for (let col = 0; col < sizeMap.col; col++) {
            const maxX = sizeMap.col - col;
            const maxY = sizeMap.row - row;
            const possibleCurrentMaxArea = Math.min(maxX, maxY) ** 2;
            if (possibleCurrentMaxArea <= maxArea) continue;            
            maxArea = Math.max(maxArea, getArea(matrix, row, col));
        }
    }

    return maxArea;
};

var getArea = function(matrix, r, c) {
    const sizeMap = {
        row: matrix.length,
        col: matrix[0].length
    };

    let area = 0;
    let length = 0;
    while (r + length < sizeMap.row && c + length < sizeMap.col) {
        let isValidSqaure = true;
        
        // 1. row + length 행의 col 열 ~ col + length 열
        for (let col = c; col <= c + length; col++) {
            if (matrix[r + length][col] !== "1") {
                isValidSqaure = false
                break;
            }
        }
        if (!isValidSqaure) break;
        
        // 2. col + length 열의 row 행 ~ row + length - 1 행
        // row + length 행은 1번 과정에서 체크됐으니 제외
        for (let row = r; row < r + length; row++) {
            if (matrix[row][c + length] !== "1") {
                isValidSqaure = false
                break;
            }
        }
        if (!isValidSqaure) break;

        area += ((++length) * 2 - 1);
    }

    return area;
}