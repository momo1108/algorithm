/**
 * [LeetCode 100] Same Tree
 * 
 * 두 트리가 주어진다.
 * 두 트리가 같은 트리인지 반환하는 함수를 만들어라.
 * 
 * 풀이:
 * 트리 직렬화 (Tree Serialization) 방식
 * - 각 트리를 DFS로 순회하며 문자열로 직렬화
 * - null 노드는 "#"로 표현
 * - 두 직렬화된 문자열을 비교
 * - 시간복잡도: O(n), 공간복잡도: O(n)
 * 
 * 참고: 재귀적으로 각 노드를 직접 비교하는 방식도 가능
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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
    // 두 트리를 각각 직렬화
    const serializedP = serializeTree(p, []).join(",");
    const serializedQ = serializeTree(q, []).join(",");

    // 직렬화된 문자열 비교
    return serializedP === serializedQ;

    /**
     * DFS로 트리를 순회하며 직렬화
     * null 노드는 "#"로 표현
     */
    function serializeTree(tree, arr) {
        if (tree === null) {
            arr.push("#");
            return arr;
        }

        arr.push(tree.val);
        serializeTree(tree.left, arr);  // 왼쪽 서브트리 직렬화
        serializeTree(tree.right, arr); // 오른쪽 서브트리 직렬화

        return arr;
    }
};