/**
 * [LeetCode 113] Path Sum II
 *
 * 이진 트리의 루트 root와 정수 targetSum이 주어진다.
 * 루트에서 리프까지의 경로 중, 경로 상의 노드 값의 합이 targetSum과 같은
 * 모든 경로를 반환하라. 각 경로는 노드 값의 리스트로 반환한다.
 *
 * 제한사항:
 * 트리의 노드 수: [0, 5000]
 * -1000 <= Node.val <= 1000
 * -1000 <= targetSum <= 1000
 *
 * 풀이:
 * DFS + 백트래킹
 * - path 배열로 현재 루트→노드 경로를 유지하며 DFS 탐색
 * - 리프 노드 도달 시 누적 합(sum)이 targetSum과 같으면 경로를 결과에 추가
 * - 재귀 반환 전 path.pop()으로 백트래킹하여 다른 경로 탐색
 * - 시간복잡도: O(N^2) - 각 노드 방문 O(N), 경로 복사 O(N)
 * - 공간복잡도: O(N) - 재귀 스택 및 경로 배열
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
 * @param {number} targetSum
 * @return {number[][]}
 */
var pathSum = function(root, targetSum) {
    const answer = [];
    const path = []; // 현재 루트→노드까지의 경로
    if (root) dfs(root, 0);
    return answer;
    
    function dfs(node, sum) {
        sum += node.val;
        path.push(node.val);
        
        // 리프 노드이고 누적 합이 targetSum과 같으면 현재 경로를 결과에 추가
        if (node.left === null && node.right === null && sum === targetSum) answer.push([...path]);
        node.right && dfs(node.right, sum);

        path.pop();
    }
};

const root = new TreeNode(1, new TreeNode(-2, new TreeNode(1, new TreeNode(-1, null, null), null), new TreeNode(3, null, null)), new TreeNode(-3, new TreeNode(-2, null, null), null));
console.log(pathSum(root, -1));

function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}