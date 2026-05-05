/**
 * [LeetCode 1277] Count Square Submatrices with All Ones
 *
 * 0과 1로 이루어진 2차원 배열 matrix가 주어진다.
 * 모든 원소가 1인 정사각형 부분 행렬의 개수를 구해 반환하라.
 *
 * 제한사항:
 * 1 <= matrix.length <= 300
 * 1 <= matrix[0].length <= 300
 * matrix[i][j]는 0 또는 1
 *
 * 풀이:
 * 누적 정보를 matrix 자체에 덮어쓰며 정사각형 개수를 센다.
 * - size = 2부터 가능한 최대 변 길이까지 순회
 * - (r, c)를 size 정사각형의 좌상단으로 볼 때,
 *   (r, c), (r+1, c), (r, c+1), (r+1, c+1)이 모두 (size - 1) 이상이면
 *   size 정사각형이 하나 더 가능하므로 matrix[r][c]를 1 증가시킨다.
 * - 마지막에 matrix의 모든 값을 더하면 가능한 정사각형 총 개수가 된다.
 *
 * 시간복잡도: O(rows * cols * min(rows, cols))
 * 공간복잡도: O(1) (입력 배열 제자리 갱신)
 */

/**
 * @param {number[][]} matrix
 * @return {number}
 */
var countSquares = function(matrix) {
    const rowCount = matrix.length;
    const colCount = matrix[0].length;

    // 변 길이 2 이상의 정사각형을 가능한지 순차적으로 검사
    for (let size = 2; size <= Math.min(rowCount, colCount); size++) {
        for (let startRow = 0; startRow < rowCount; startRow++) {
            if (startRow + size - 1 >= rowCount) break;
            for (let startCol = 0; startCol < colCount; startCol++) {
                if (startCol + size - 1 >= colCount) break;

                // size-1 정사각형 누적 정보가 2x2 블록에 모두 있으면
                // 현재 좌상단에서 size 정사각형 1개를 더 만들 수 있다.
                if (matrix[startRow][startCol] < size - 1) continue;
                if (matrix[startRow + 1][startCol] < size - 1) continue;
                if (matrix[startRow][startCol + 1] < size - 1) continue;
                if (matrix[startRow + 1][startCol + 1] < size - 1) continue;
                matrix[startRow][startCol]++;
            }
        }
    }

    let answer = 0;

    // 각 칸에는 해당 칸을 좌상단으로 하는 가능한 정사각형 개수가 누적됨
    matrix.forEach(matrixRow => matrixRow.forEach(cellValue => answer += cellValue));
    return answer;
};

console.log(countSquares([[0,1,1,1],[1,1,1,1],[0,1,1,1]]))