/**
 * [LeetCode 547] Number of Provinces
 * 
 * n개의 도시와 도시 간 직접 연결 관계를 나타내는 인접 행렬 isConnected가 주어진다.
 * isConnected[i][j] = 1이면 도시 i와 도시 j가 직접 연결되어 있다.
 * 연결된 도시들의 그룹(Province)의 개수를 반환하라.
 * 
 * 주의: 연결은 이행적이다. (A-B 연결, B-C 연결이면 A와 C는 같은 Province)
 * 
 * 제한사항:
 * 1 <= n <= 200
 * isConnected[i][i] = 1 (자기 자신과의 연결)
 * isConnected[i][j] = isConnected[j][i] (대칭)
 * 
 * 풀이:
 * DFS (깊이 우선 탐색) / 그래프 연결 요소 찾기
 * - 각 미방문 도시에서 DFS를 시작하면 하나의 Province를 찾을 수 있음
 * - DFS로 연결된 모든 도시를 방문 표시
 * - DFS를 시작한 횟수 = Province 개수
 * - 시간복잡도: O(n^2), 공간복잡도: O(n)
 */

/**
 * @param {number[][]} isConnected
 * @return {number}
 */
var findCircleNum = function(isConnected) {
    const n = isConnected.length;
    const visited = new Array(n).fill(false);

    let provinceCount = 0;
    
    // 각 도시를 순회하면서 미방문 도시가 있으면 새로운 Province 시작
    for (let i = 0; i < n; i++) {
        if (visited[i]) continue; // 이미 방문한 도시는 스킵
        
        // 현재 도시에서 DFS를 시작하여 연결된 모든 도시 방문
        dfs(i);
        provinceCount++; // 하나의 Province 완성
    }

    /**
     * DFS로 현재 도시와 연결된 모든 도시를 방문
     * @param {number} city - 현재 도시 인덱스
     */
    function dfs(city) {
        visited[city] = true;

        // 현재 도시와 연결된 도시들을 확인
        for (let connectedCity = 0; connectedCity < n; connectedCity++) {
            // 자기 자신, 연결 안 됨, 이미 방문한 경우는 스킵
            if (connectedCity === city || !isConnected[city][connectedCity] || visited[connectedCity]) {
                continue;
            }
            // 연결된 도시를 재귀적으로 방문
            dfs(connectedCity);
        }
    }

    return provinceCount;
};