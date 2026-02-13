/**
 * [LeetCode 297] Serialize and Deserialize Binary Tree
 * 
 * 이진 트리를 문자열로 직렬화(serialize)하고,
 * 그 문자열을 다시 원래의 트리 구조로 역직렬화(deserialize)하는 알고리즘을 작성하라.
 * 
 * 풀이:
 * - 각 노드의 인덱스를 배열 표현처럼 사용 (부모: i, 왼쪽: 2i+1, 오른쪽: 2i+2)
 * - "부모인덱스/자식인덱스/자식값" 형태로 문자열화
 * - DFS로 순회하며 정보를 수집/복원
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
    if (!root) return root;
    
    // 루트 노드의 값을 먼저 저장
    const arr = [root.val];
    
    /**
     * DFS로 트리를 순회하며 각 간선 정보를 문자열로 저장
     * 형식: "부모인덱스/자식인덱스/자식값"
     * 왼쪽 자식 우선 탐색 후 오른쪽 자식 탐색
     */
    function dfs(node, nodeIndex) {
        if (node.left) {
            const leftIndex = nodeIndex * 2n + 1n;
            arr.push(`${nodeIndex}/${leftIndex}/${node.left.val}`);
            dfs(node.left, leftIndex);
        }
        if (node.right) {
            const rightIndex = nodeIndex * 2n + 2n;
            arr.push(`${nodeIndex}/${rightIndex}/${node.right.val}`);
            dfs(node.right, rightIndex);
        }
    }
    
    dfs(root, 0n);
    
    // "%" 구분자로 하나의 문자열로 합치기
    return arr.join("%");
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
    if (!data) return data;

    // 직렬화된 문자열을 "%"로 분리
    const arr = data.split("%");
    let currentIndex = 1; // 현재 처리 중인 배열 인덱스 (0은 루트값)
    
    const root = new TreeNode(parseInt(arr[0]));
    dfs(root, 0n);

    return root;

    /**
     * DFS로 트리를 재구성
     * 각 노드에서 왼쪽 자식, 오른쪽 자식 순서로 확인하며 연결
     */
    function dfs(node, nodeIndex) {
        // 왼쪽 자식 처리
        if (currentIndex >= arr.length) return;
        let [parentIdx, childIdx, childVal] = arr[currentIndex].split("/").map(v => BigInt(v));
        if (parentIdx !== nodeIndex) return;

        if (childIdx === (parentIdx * 2n) + 1n) {
            const leftNode = new TreeNode(parseInt(childVal));
            node.left = leftNode;
            currentIndex++;
            dfs(leftNode, childIdx);
        }
        
        // 오른쪽 자식 처리
        if (currentIndex >= arr.length) return;
        [parentIdx, childIdx, childVal] = arr[currentIndex].split("/").map(v => BigInt(v));
        if (parentIdx !== nodeIndex) return;

        if (childIdx === (parentIdx * 2n) + 2n) {
            const rightNode = new TreeNode(parseInt(childVal));
            node.right = rightNode;
            currentIndex++;
            dfs(rightNode, childIdx);
        }
    }
};

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

console.log(deserialize(serialize( {
  val: 1,
  left:  { 
    val: 2, 
    left: null,
    right: null },
  right:  {
    val: 3,
    left:  { val: 4, left: null, right: null },
    right:  { val: 5, left: null, right: null }
  }
})))