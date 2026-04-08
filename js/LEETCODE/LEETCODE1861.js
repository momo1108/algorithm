/**
 * [LeetCode 1861] Rotating the Box
 *
 * boxGrid는 박스의 옆면 상태를 나타낸다.
 * - '#' : 돌
 * - '*' : 장애물
 * - '.' : 빈칸
 *
 * 박스를 시계 방향으로 90도 회전하면 돌은 중력 방향(아래)으로 떨어진다.
 * 회전 후 상태를 반환한다.
 *
 * 풀이:
 * 1) 회전 전에 각 행에서 장애물('*') 단위 구간마다 돌을 오른쪽으로 몰아 정리
 * 2) 정리된 격자를 시계 방향 90도 회전
 *
 * 시간복잡도: O(m * n)
 * 공간복잡도: O(m * n)
 */
/**
 * @param {character[][]} boxGrid
 * @return {character[][]}
 */
var rotateTheBox = function(boxGrid) {
    const m = boxGrid.length;
    const n = boxGrid[0].length;

    const settledGrid = [];
    for (const row of boxGrid) {
        const settledRow = [];
        let segmentSize = 0;
        let rockCount = 0;

        // 장애물을 기준으로 구간을 끊어, 각 구간 안에서 돌을 오른쪽 끝으로 모은다.
        for (const cell of row) {
            if (cell === "*") {
                appendSettledSegment(settledRow, segmentSize, rockCount);
                settledRow.push("*");
                segmentSize = 0;
                rockCount = 0;
            } else {
                if (cell === "#") rockCount++;
                segmentSize++;
            }
        }

        if (segmentSize > 0) appendSettledSegment(settledRow, segmentSize, rockCount);
        settledGrid.push(settledRow);
    }
    
    const rotatedGrid = Array.from({length: n}, () => new Array(m));
    for (let row = 0; row < m; row++) {
        for (let col = 0; col < n; col++) {
            rotatedGrid[col][m - row - 1] = settledGrid[row][col];
        }
    }
    
    return rotatedGrid;

    function appendSettledSegment(settledRow, segmentSize, rockCount) {
        while (segmentSize > 0) {
            settledRow.push(segmentSize > rockCount ? "." : "#");
            segmentSize--;
        }
    }
};

console.log(rotateTheBox([["#","#","*",".","*","."],
              ["#","#","#","*",".","."],
              ["#","#","#",".","#","."]]));