/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * [LeetCode 652] Find Duplicate Subtrees
 *
 * 이진 트리 root가 주어졌을 때, 동일한 구조와 동일한 노드 값을 가지는
 * 중복 서브트리들의 루트 노드를 반환한다.
 * 같은 형태의 중복 서브트리마다 한 개의 루트만 반환하면 된다.
 *
 * 풀이:
 * - DFS 후위 순회로 각 서브트리를 문자열로 직렬화한다.
 * - 이미 본 직렬화 문자열이면 중복 후보이고,
 *   결과 배열에는 동일 직렬화당 한 번만 추가한다.
 * - 시간복잡도: O(n) (문자열 생성 비용 제외 관점), 공간복잡도: O(n)
 */

/**
 * @param {TreeNode} root
 * @return {TreeNode[]}
 */
var findDuplicateSubtrees = function(root) {
    const duplicates = [];
    const serializedSubtrees = new Set();
    const recordedDuplicates = new Set();

    dfs(root);

    return duplicates;

    function dfs(node) {
        let leftSerialized, rightSerialized;

        if (node.left) leftSerialized = dfs(node.left);
        else leftSerialized = "x";

        if (node.right) rightSerialized = dfs(node.right);
        else rightSerialized = "x";

        // 현재 노드를 루트로 하는 서브트리의 고유 직렬화 문자열
        const serialized = `(${node.val}/${leftSerialized}/${rightSerialized})`;
        
        if (serializedSubtrees.has(serialized) && !recordedDuplicates.has(serialized)) {
            duplicates.push(node);
            recordedDuplicates.add(serialized);
        } else {
            serializedSubtrees.add(serialized);
        }
        
        return serialized;
    }
};

const root = {
    val: 0,
    left: { 
        val: 0, 
        left: { 
            val: 0, 
            left: null, 
            right: null 
        }, 
        right: null 
    },
    right: {
        val: 0,
        left: null,
        right: { 
            val: 0, 
            left: null, 
            right: { 
                val: 0, 
                left: null, 
                right: null 
            } 
        },
    },
};
findDuplicateSubtrees(root);