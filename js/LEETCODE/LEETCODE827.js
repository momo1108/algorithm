/**
 *  n x n 크기의 이진 행렬이 주어진다. 
 * 최대 한개의 0 를 1 로 바꿀 수 있다.
 * 
 * 변환 후 가장 큰 섬의 크기를 반환하라
 * 섬은 4방향으로 연결된 숫자 1의 그룹이다.
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var largestIsland = function(grid) {
    const n = grid.length;
    const islandSizes = [];  // 각 섬의 크기 저장
    const sizeMapByZero = Array.from({length: n}, () => new Array(n).fill(0));  // 각 0을 1로 바꿨을 때 연결되는 섬의 총 크기
    const DIRS = [[1, 0], [0, 1], [-1, 0], [0, -1]];  // 상하좌우 방향

    // Step 1: 각 섬을 DFS로 탐색하고 크기 계산
    for (let row = 0; row < n; row++) {
        for(let col = 0; col < n; col++) {
            if (grid[row][col] === 1) {
                const adjacentZeros = new Set();  // 이 섬에 인접한 0의 위치들
                const islandSize = dfs(row, col, adjacentZeros);
                islandSizes.push(islandSize);
                
                // Step 2: 이 섬과 인접한 각 0에 대해 섬의 크기를 누적
                for (let zeroLocation of adjacentZeros.values()) {
                    const [zRow, zCol] = zeroLocation.split(",").map(v => parseInt(v));
                    sizeMapByZero[zRow][zCol] += islandSize;
                }
            }
        }
    }

    // 엣지 케이스: 섬이 없거나 1개만 있는 경우
    if (islandSizes.length === 0) return 1;
    if (islandSizes.length === 1) 
        return Math.min(islandSizes[0] + 1, n * n);

    // Step 3: 각 0을 1로 바꿨을 때의 최대 섬 크기 찾기
    let maxSize = 0;
    for (let row = 0; row < n; row++) {
        for(let col = 0; col < n; col++) {
            maxSize = Math.max(maxSize, sizeMapByZero[row][col]);
        }
    }

    return Math.min(maxSize + 1, n * n);

    // DFS로 섬의 크기를 계산하고, 인접한 0의 위치를 수집
    function dfs(row, col, adjacentZeros) {
        grid[row][col] = -1;  // 방문 표시
        let islandSize = 1;

        // 4방향 탐색
        for (let [deltaRow, deltaCol] of DIRS) {
            const nextRow = row + deltaRow;
            const nextCol = col + deltaCol;

            // 범위 벗어난 경우 건너뛰기
            if (nextRow < 0 || nextRow >= n || nextCol < 0 || nextCol >= n) continue;
            
            // 인접한 0인 경우 기록하고 건너뛰기
            if (grid[nextRow][nextCol] === 0) {
                adjacentZeros.add(`${nextRow},${nextCol}`);
                continue;
            } 
            // 1인 경우만 재귀적으로 탐색 (방문한 섬은 -1이므로 제외됨)
            else if (grid[nextRow][nextCol] === 1) {
                islandSize += dfs(nextRow, nextCol, adjacentZeros);
            }
        }

        return islandSize;
    }
};