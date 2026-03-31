/**
 * [LeetCode 129] Sum Root to Leaf Numbers
 *
 * 0~9 숫자를 값으로 가지는 이진 트리의 루트 root가 주어진다.
 * 루트에서 리프까지의 각 경로는 하나의 숫자를 만들며,
 * 모든 루트→리프 숫자의 합을 반환하라.
 *
 * 제한사항:
 * 노드 수: [1, 1000]
 * 0 <= Node.val <= 9
 * 트리 깊이 <= 10
 *
 * 풀이:
 * DFS
 * - 현재까지 만든 숫자(currentNumber)를 인자로 내려보내며 탐색
 * - 다음 노드로 갈 때 currentNumber = currentNumber * 10 + node.val
 * - 리프 노드에 도달하면 완성된 숫자를 누적 합(totalSum)에 더함
 * - 시간복잡도: O(N)
 * - 공간복잡도: O(H) (H: 트리 높이, 재귀 스택)
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
 * @return {number}
 */
var sumNumbers = function(root) {
    let totalSum = 0;
    dfs(root, 0);
    return totalSum;

    function dfs(node, currentNumber) {
        // 부모 경로 숫자 뒤에 현재 자릿수를 붙여 새로운 숫자를 만든다.
        currentNumber *= 10;
        currentNumber += node.val;

        // 리프면 하나의 완성된 숫자이므로 최종 합에 누적한다.
        if (!node.left && !node.right) return totalSum += currentNumber;

        // 좌/우 서브트리로 완성 중인 숫자를 그대로 전달한다.
        node.left && dfs(node.left, currentNumber);
        node.right && dfs(node.right, currentNumber);
    }
};