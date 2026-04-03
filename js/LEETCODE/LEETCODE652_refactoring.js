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
 * @return {TreeNode[]}
 */
var findDuplicateSubtrees = function(rt) {
    const mp = new Map();
    const count = new Map();
    let id = 1;
    const result = [];

    function traverasl(root){
        if(root == null) {
            return 0;
        }

        const lId = traverasl(root.left);
        const rId =  traverasl(root.right);

        const serialize = `${root.val}(${lId}${rId})`;

        if(!mp.has(serialize)) {
            mp.set(serialize, id++);
        }
        
        let currentId = mp.get(serialize);
        count.set(currentId, (count.get(currentId) || 0) + 1);
        
        if(count.get(currentId) == 2){
            result.push(root);
        }
        

        return currentId;
    }

    traverasl(rt);

    return result;
};