/**
 * [LeetCode 329] Longest Increasing Path in a Matrix
 * 
 * m x n 크기의 정수 행렬 matrix가 주어진다.
 * 행렬의 어느 한 셀에서 시작하여 상하좌우로 이동하면서
 * 엄격하게 증가하는 값들을 따라가는 최장 경로의 길이를 반환하라.
 * 
 * 제약사항:
 * - 상하좌우로만 이동 가능 (대각선 불가)
 * - 경로 상의 값들은 엄격하게 증가해야 함 (같은 값 불가)
 * 
 * 제한사항:
 * m == matrix.length
 * n == matrix[i].length
 * 1 <= m, n <= 200
 * 0 <= matrix[i][j] <= 2^31 - 1
 * 
 * 풀이:
 * DP + DFS (메모이제이션 + 깊이 우선 탐색)
 * - dp[r][c] = 셀 (r,c)에서 시작하는 최장 증가 경로의 길이
 * - 각 셀에서 4방향 탐색하며 더 큰 값으로만 이동
 * - 이미 계산한 셀의 값은 재사용 (메모이제이션)
 * - visiting 배열로 현재 DFS 경로상의 중복 방문 체크
 * - 시간복잡도: O(m * n) (각 셀 최대 1번 계산)
 * - 공간복잡도: O(m * n)
 */

/**
 * @param {number[][]} matrix
 * @return {number}
 */
var longestIncreasingPath = function(matrix) {
    const m = matrix.length;
    const n = matrix[0].length;
    
    // 4방향: 아래, 오른쪽, 위, 왼쪽
    const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];
    
    // dp[r][c] = 셀 (r,c)에서 시작하는 최장 증가 경로의 길이
    const dp = Array.from({length: m}, () => Array(n).fill(0));
    
    // visiting[r][c] = 현재 DFS 경로에서 (r,c) 방문 중인지 여부
    // 사이클 감지 및 중복 계산 방지
    const visiting = Array.from({length: m}, () => Array(n).fill(false));

    let maxLength = 0;
    
    // 모든 셀에서 시작하여 최장 경로 계산
    for (let r = 0; r < m; r++) {
        for(let c = 0; c < n; c++) {
            // 아직 계산하지 않은 셀이면 DFS로 계산
            if (dp[r][c] === 0) {
                dfs(r, c);
            }
            // 모든 셀 중 최댓값 추적
            maxLength = Math.max(dp[r][c], maxLength);
        }
    }
    
    return maxLength;

    /**
     * DFS로 (r,c)에서 시작하는 최장 증가 경로 길이 계산
     * @param {number} r - 행 인덱스
     * @param {number} c - 열 인덱스
     * @return {number} - (r,c)에서 시작하는 최장 증가 경로의 길이
     */
    function dfs(r, c) {
        // 기본값: 현재 셀 자신만으로 경로 길이 1
        dp[r][c] = 1;
        visiting[r][c] = true;

        // 4방향 이웃 셀 중 더 큰 값으로 이동 가능한 경로 탐색
        let maxFollowingPath = 0;
        
        for (let [nr, nc] of getNextDirections(r, c)) {
            // 현재 경로에서 이미 방문 중이거나 값이 증가하지 않으면 스킵
            if (visiting[nr][nc] || matrix[nr][nc] <= matrix[r][c]) {
                continue;
            }
            
            // 이웃 셀의 최장 경로 길이 계산
            if (dp[nr][nc] === 0) {
                // 아직 계산하지 않음: DFS로 계산
                maxFollowingPath = Math.max(dfs(nr, nc), maxFollowingPath);
            } else {
                // 이미 계산됨: 메모이제이션 값 사용
                maxFollowingPath = Math.max(dp[nr][nc], maxFollowingPath);
            }
        }
        
        // 현재 셀의 경로 길이 = 1 + 이웃 중 최장 경로
        dp[r][c] += maxFollowingPath;
        visiting[r][c] = false; // 이 경로에서 방문 완료

        return dp[r][c];
    }

    /**
     * (row, col)의 유효한 4방향 이웃 셀 좌표 반환
     * @param {number} row - 행 인덱스
     * @param {number} col - 열 인덱스
     * @return {Array<Array<number>>} - 유효한 이웃 셀 좌표 배열
     */
    function getNextDirections(row, col) {
        const neighbors = [];
        
        for (let d = 0; d < 4; d++) {
            const nr = row + directions[d][0];
            const nc = col + directions[d][1];
            
            // 행렬의 범위 내인지 확인
            if (nr < 0 || nr >= m || nc < 0 || nc >= n) {
                continue;
            }
            neighbors.push([nr, nc]);
        }

        return neighbors;
    }
};


/**
 * 풀이 2: 간결한 DFS + 메모이제이션 (화살표 함수 버전)
 * 
 * 첫 번째 풀이와 동일한 알고리즘이지만 더 간결한 코드 스타일
 * - dirs 배열의 순환 구조로 4방향을 효율적으로 표현
 * - 화살표 함수로 간결한 로직 구현
 * - 시간복잡도: O(m * n), 공간복잡도: O(m * n)
 * 
 * @param {number[][]} matrix
 * @return {number}
 */
function longestIncreasingPath(matrix) {
    const m = matrix.length;
    const n = matrix[0].length;
    
    // memo[r][c] = 셀 (r,c)에서 시작하는 최장 증가 경로의 길이
    const memo = Array.from({ length: m }, () => Array(n).fill(0));
    
    // 4방향을 순환 구조로 표현
    // [-1, 0]: 위, [0, 1]: 오른쪽, [1, 0]: 아래, [0, -1]: 왼쪽
    // 마지막 -1은 루프를 다시 처음으로 돌리기 위한 패딩
    const dirs = [-1, 0, 1, 0, -1];
    
    /**
     * (r, c)에서 시작하는 최장 증가 경로의 길이를 DFS로 계산
     * @param {number} r - 행 인덱스
     * @param {number} c - 열 인덱스
     * @return {number} - 최장 증가 경로의 길이
     */
    const dfs = (r, c) => {
        // 이미 계산된 셀이면 메모이제이션 값 반환
        if (memo[r][c] !== 0) return memo[r][c];
        
        // 기본값: 현재 셀만으로 경로 길이 1
        let maxLen = 1;
        
        // 4방향 탐색 (dirs 배열의 순환 구조 이용)
        for (let i = 0; i < 4; i++) {
            // dirs[i], dirs[i+1]은 한 방향의 [행 변화, 열 변화]
            // i=0: dirs[0]=-1, dirs[1]=0 (위)
            // i=1: dirs[1]=0, dirs[2]=1 (오른쪽)
            // i=2: dirs[2]=1, dirs[3]=0 (아래)
            // i=3: dirs[3]=0, dirs[4]=-1 (왼쪽)
            const nr = r + dirs[i];
            const nc = c + dirs[i + 1];
            
            // 범위 내 && 더 큰 값인 경우만 계속 진행
            if (nr >= 0 && nr < m && nc >= 0 && nc < n 
                && matrix[nr][nc] > matrix[r][c]) {
                // 현재 경로의 최댓값 = 1 + 다음 셀에서 시작하는 최장 경로
                maxLen = Math.max(maxLen, 1 + dfs(nr, nc));
            }
        }
        
        // 현재 셀의 최장 경로 길이를 메모에 저장
        memo[r][c] = maxLen;
        return maxLen;
    };
    
    // 모든 셀에서 시작하는 최장 경로 중 최댓값 찾기
    let result = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            result = Math.max(result, dfs(i, j));
        }
    }
    
    return result;
}