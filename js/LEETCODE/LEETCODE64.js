/**
 * [LeetCode 64] Minimum Path Sum
 * 
 * m x n 크기의 음이 아닌 정수가 채워진 grid가 주어진다.
 * 좌상단(0, 0)에서 우하단(m-1, n-1)까지 이동하는 경로 중
 * 경로 위 숫자의 합이 최소인 값을 반환하라.
 * 이동은 오른쪽 또는 아래쪽으로만 가능하다.
 * 
 * 예시 1:
 * Input: grid = [[1,3,1],[1,5,1],[4,2,1]]
 * Output: 7 (경로: 1 → 3 → 1 → 1 → 1)
 * 
 * 예시 2:
 * Input: grid = [[1,2,3],[4,5,6]]
 * Output: 12
 * 
 * 제한사항:
 * m == grid.length
 * n == grid[i].length
 * 1 <= m, n <= 200
 * 0 <= grid[i][j] <= 200
 * 
 * 풀이: 2D DP (Bottom-Up)
 * - DP[i][j] = (0,0)에서 (i,j)까지 도달하는 최소 경로 합
 * - 첫 번째 행/열: 한 방향에서만 진입 가능하므로 누적합으로 초기화
 * - 나머지 셀: 위쪽(DP[i-1][j])과 왼쪽(DP[i][j-1]) 중 작은 값 + grid[i][j]
 * - 시간복잡도: O(m * n)
 * - 공간복잡도: O(m * n)
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
    const m = grid.length;
    const n = grid[0].length;

    // DP[i][j]: (0,0)에서 (i,j)까지의 최소 경로 합
    const DP = Array.from({length: m}, () => new Array(n).fill(9999999));
    DP[0].fill(0); // 첫 번째 행 초기화 (이후 누적합으로 재설정)

    DP[0][0] = grid[0][0];
    // 첫 번째 열: 위에서만 진입 가능하므로 순차 누적
    for (let row = 1; row < m; row++) DP[row][0] = DP[row - 1][0] + grid[row][0];
    // 첫 번째 행: 왼쪽에서만 진입 가능하므로 순차 누적
    for (let col = 1; col < n; col++) DP[0][col] = DP[0][col - 1] + grid[0][col];

    for (let row = 1; row < m; row++) {
        for (let col = 1; col < n; col++) {
            // 위쪽과 왼쪽 중 최솟값을 선택해 현재 셀 값 더함
            DP[row][col] = grid[row][col] + Math.min(DP[row - 1][col], DP[row][col - 1]);
        }
    }

    return DP[m - 1][n - 1];
};

console.log(minPathSum([[1,3,1],[1,5,1],[4,2,1]]));