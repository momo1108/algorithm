/**
 * [LeetCode 2519] Count the Number of Good Nodes
 * 
 * 트리를 구성하는 엣지들이 주어진다.
 * Good Node는 모든 자식 서브트리의 크기가 동일한 노드이다.
 * 트리에서 Good Node의 개수를 반환하라.
 * 
 * 예:
 * edges = [[0,1],[1,2],[1,3],[1,4],[0,5],[5,6],[6,7],[7,8],[0,9],[9,10],[9,12],[10,11]]
 * - 노드 1은 3개의 자식(2, 3, 4)을 가지며, 각 서브트리의 크기가 1로 모두 같으므로 good node
 * - 노드 0은 여러 자식을 가지지만 서브트리 크기가 다르므로 good node 아님
 * 
 * 제한사항:
 * 1 <= edges.length <= 10^5
 * 0 <= edges[i][0], edges[i][1] < edges.length + 1
 * 
 * 풀이:
 * DFS를 이용한 서브트리 크기 계산 및 Good Node 카운팅
 * - 루트(0)에서 시작하여 DFS로 전체 트리 탐색
 * - 각 노드에서 모든 자식 서브트리 크기를 확인
 * - 자식 서브트리들의 크기가 모두 같으면 good node로 카운팅
 * - 현재 노드 기준 서브트리 전체 크기 반환
 * - 시간복잡도: O(N) - 각 노드 한 번씩 방문
 * - 공간복잡도: O(N) - 인접 리스트, 방문 배열, 재귀 스택
 */

/**
 * @param {number[][]} edges
 * @return {number}
 */
var countGoodNodes = function(edges) {
    // 트리를 인접 리스트로 표현
    const adjacencyList = new Map();
    const visited = new Array(edges.length + 1).fill(false);

    // 인접 리스트 구성 (무방향 그래프)
    for (let [node1, node2] of edges) {
        if (!adjacencyList.has(node1)) adjacencyList.set(node1, []);
        if (!adjacencyList.has(node2)) adjacencyList.set(node2, []);
        
        adjacencyList.get(node1).push(node2);
        adjacencyList.get(node2).push(node1);
    }

    let goodNodeCount = 0;
    dfs(0);

    return goodNodeCount;

    /**
     * DFS를 이용하여 각 노드를 방문하고 good node 여부 판단
     * @param {number} node - 현재 방문 중인 노드
     * @return {number} - 현재 노드 기준 서브트리의 크기
     */
    function dfs(node) {
        visited[node] = true;

        let currentSubtreeSize = 1; // 현재 노드 포함
        let firstChildSubtreeSize = undefined; // 첫 번째 자식 서브트리 크기 (기준값)
        let isGoodNode = true; // 현재 노드가 good node인지 여부

        // 현재 노드의 모든 자식 노드 방문
        const children = adjacencyList.get(node) || [];
        for (let child of children) {
            if (visited[child]) continue; // 이미 방문한 노드는 건너뛰기 (부모)

            const childSubtreeSize = dfs(child);
            currentSubtreeSize += childSubtreeSize;

            // 첫 자식의 서브트리 크기를 기준값으로 설정
            if (firstChildSubtreeSize === undefined) {
                firstChildSubtreeSize = childSubtreeSize;
            } 
            // 이후 자식들의 서브트리 크기가 기준값과 다르면 good node가 아님
            else if (childSubtreeSize !== firstChildSubtreeSize) {
                isGoodNode = false;
            }
        }

        // 현재 노드가 good node이면 카운팅
        if (isGoodNode) goodNodeCount++;

        return currentSubtreeSize;
    }
};


console.log(countGoodNodes([[0,1],[1,2],[1,3],[1,4],[0,5],[5,6],[6,7],[7,8],[0,9],[9,10],[9,12],[10,11]]));