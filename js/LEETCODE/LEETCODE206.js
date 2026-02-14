/**
 * [LeetCode 206] Reverse Linked List
 * 
 * 링크드 리스트 head가 주어진다.
 * head의 반대 방향의 링크드 리스트를 반환하라.
 * 
 * 풀이:
 * 반복 방식 (Iterative)
 * - 세 개의 포인터 사용: prev, curr, next
 * - 각 노드의 next를 이전 노드로 변경
 * - 시간복잡도: O(n), 공간복잡도: O(1)
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    let prev = null;
    let curr = head;

    // 모든 노드를 순회하며 방향 반전
    while(curr) {
        let next = curr.next; // 다음 노드 저장
        curr.next = prev;      // 현재 노드의 방향 반전
        prev = curr;           // prev를 현재 노드로 이동
        curr = next;           // curr를 다음 노드로 이동
    }

    return prev; // 새로운 head 반환
};

var reverseList_original = function(head) {
    if (!head || !head.next) return head;

    let newHead = head;
    dfs(head, head.next);
    function dfs(parent, child) {
        if (child.next && typeof child.next.val === 'number') dfs(child, child.next);
        else {
            newHead = child;
            child.next = parent;
            return;
        }
        child.next = parent;
    }
    head.next = null;
    
    return newHead;
};