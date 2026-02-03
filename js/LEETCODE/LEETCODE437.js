/**
 * 숫자로 이루어진 이진 트리가 루트 노드 기준으로 TreeNode 객체 형태로 주어진다.
 * 이진 트리의 모든 path(반드시 위에서 아래로 향하는 방향, 노드 갯수는 마음대로)들 중
 * path 상의 숫자들의 합이 targetSum 과 같은 값을 가지는 path들의 개수를 리턴한다.
 */

/**
 * 이진 트리의 구조 정의
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number}
 */
var pathSum = function(root, targetSum) {
    let count = 0;

    // DFS로 모든 경로의 합들을 구하고 targetSum과 일치하는 경우를 카운트
    function dfs(node) {
        // 현재 노드부터 시작하는 경로의 합들을 저장
        const pathSums = [node.val];

        // 왼쪽 자식이 있으면 왼쪽 서브트리의 모든 경로 합에 현재 노드값을 더하기
        if (node.left) {
            const leftPathSums = dfs(node.left);
            pathSums.push(...leftPathSums.map(sum => sum + node.val));
        }
        // 오른쪽 자식이 있으면 오른쪽 서브트리의 모든 경로 합에 현재 노드값을 더하기
        if (node.right) {
            const rightPathSums = dfs(node.right);
            pathSums.push(...rightPathSums.map(sum => sum + node.val));
        }

        // targetSum과 일치하는 경로 개수 세기
        pathSums.forEach(pathSum => {
            if (pathSum === targetSum) count++;
        })

        // 부모 노드에서 사용할 수 있도록 모든 경로 합 반환
        return pathSums;
    }

    // 입력값에 트리가 없는 경우는 제외하도록 예외처리
    if (root !== null) dfs(root);

    return count;
};