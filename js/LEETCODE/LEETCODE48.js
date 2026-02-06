/**
 * 2차원 정사각형 행렬을 시계방향으로 90도 회전시킵니다.
 * 
 * 예시)
 *   1 2 3       7 4 1
 *   4 5 6  -->  8 5 2
 *   7 8 9       9 6 3
 * 
 * 제약: 추가 메모리 사용 없이 원본 배열을 직접 수정해야 합니다.
 * 
 * 알고리즘: 바깥쪽부터 안쪽으로 층(layer)을 처리합니다.
 * 각 층의 모서리 요소 4개를 동시에 회전시킵니다.
 * 
 * @param {number[][]} matrix - n x n 정사각형 행렬
 * @return {void} 입력 배열을 직접 수정
 */
var rotate = function(matrix) {
    const n = matrix.length;
    
    // 바깥쪽부터 안쪽으로 층을 처리합니다 (n/2개의 층까지만 필요)
    // 예: 4x4 행렬이면 row = 0, 1 (2개 층)
    //     5x5 행렬이면 row = 0, 1 (2.5 -> 2개 층; 2번 행은 정가운데 요소이므로 제외)
    for (let row = 0; row < n / 2; row++) {
        // 각 층에서 오른쪽 끝을 제외한 모든 요소를 처리합니다.
        // 오른쪽 끝은 아래쪽에서 처리되므로 중복을 피하기 위해 제외합니다.
        for(let col = row; col < n - row - 1; col++) {
            rotateElementRecursive(row, col);
        }
    }

    /**
     * 한 위치의 요소를 우측, 하측, 좌측, 상측 4개 위치로 순환시킵니다.
     * 
     * 예: (row, col) 위치에서 시계방향 90도 회전의 좌표 변환:
     *     (row, col)           -> (col, n-1-row)      [상단에서 우측]
     *     (col, n-1-row)       -> (n-1-row, n-1-col)  [우측에서 하단]
     *     (n-1-row, n-1-col)   -> (n-1-col, row)      [하단에서 좌측]
     *     (n-1-col, row)       -> (row, col)          [좌측에서 상단]
     */
    function rotateElementRecursive(row, col) {
        let originalValue = matrix[row][col];  // 원본값 저장
        let nextRow, nextCol, nextValue;

        // 4번 회전하면 원래 자리로 돌아옵니다
        for (let rotateCount = 1; rotateCount <= 4; rotateCount++) {
            // 시계방향 90도 회전 공식: (r, c) -> (c, n-1-r)
            nextRow = col;
            nextCol = n - 1 - row;
            
            // 다음 위치의 값을 임시 저장
            nextValue = matrix[nextRow][nextCol];
            
            // 현재값을 다음 위치에 배치
            matrix[nextRow][nextCol] = originalValue;
            
            // 한 단계 이동
            row = nextRow;
            col = nextCol;
            originalValue = nextValue;
        }
    }
};