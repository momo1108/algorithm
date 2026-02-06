/**
 * 이진 트리 root 가 TreeNode 형태로 입력된다.
 * root node 부터 모든 leaf node 까지의 경로를 모두 출력해야한다.
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {string[]}
 */
var binaryTreePaths = function(root) {
    // 모든 경로를 저장할 배열
    const answerArray = [];
    
    // 현재 경로를 추적하는 배열
    // 예: [1, 2, 5]
    const nodeArray = [];

    /**
     * 깊이 우선 탐색(DFS)으로 모든 경로를 찾습니다
     * 각 노드를 방문할 때마다 경로에 추가하고,
     * leaf 노드에 도달하면 경로를 결과에 저장합니다
     */
    function dfs(node) {
        // 1. 현재 노드값을 경로에 추가
        nodeArray.push(node.val);
        
        // 2. 왼쪽 자식이 있으면 재귀적으로 탐색
        if (node.left) dfs(node.left);
        
        // 3. 오른쪽 자식이 있으면 재귀적으로 탐색
        if (node.right) dfs(node.right);
        
        // 4. leaf 노드 도달 시 경로를 결과 배열에 저장
        if (!node.left && !node.right) {
            answerArray.push(nodeArray.join("->"));
        }

        // 5. 백트래킹: 현재 노드를 경로에서 제거
        //    다른 경로를 탐색할 수 있도록 준비합니다
        nodeArray.pop();
    }

    // 루트에서 시작하여 DFS 실행
    dfs(root);

    // 모든 경로를 반환
    return answerArray;
};