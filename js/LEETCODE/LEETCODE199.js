/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * 트리 정보가 주어졌을 때, 오른쪽에서 트리를 바라봤을 때 보이는 값들의 배열을 리턴
 * = 깊이별로 가장 오른쪽에 존재하는 요소들을 배열로 리턴
 */

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function(root) {
    // 빈 트리인 경우 빈 배열 반환
    if (!root) return [];

    // 각 깊이별 가장 오른쪽 노드의 값을 저장할 배열
    // 초기값을 -1000으로 설정해서 아직 방문하지 않은 깊이임을 표시
    const rightMostValues = new Array(100).fill(-1000);
    
    // DFS로 트리를 순회하면서 각 깊이의 가장 오른쪽 노드를 기록
    // 오른쪽 자식을 먼저 방문하므로 각 깊이에서 처음 만나는 노드가 가장 오른쪽
    function dfs(node, depth) {
        if (rightMostValues[depth] < -100) 
            rightMostValues[depth] = node.val;

        // 오른쪽 자식부터 방문 (오른쪽이 더 오른쪽에 보임)
        if (node.right !== null) dfs(node.right, depth + 1);
        if (node.left !== null) dfs(node.left, depth + 1);
    }

    // DFS 순회 시작
    dfs(root, 0);

    // 저장된 값 중 실제로 방문한 깊이의 값들만 결과 배열에 추가
    const result = [];
    for (const val of rightMostValues) {
        if (val < -100) break;
        result.push(val);
    }

    return result;
};

// const a = {
//     val: 37,
//     left: { val: -34, left: { val: 4, left: { val: 5, left: null, right: null }, right: null }, right: null },
//   right: { val: -48, left: null, right: null },
// };
// console.log(rightSideView(a));