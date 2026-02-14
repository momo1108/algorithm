/**
 * [LeetCode 876] Middle of the Linked List
 * 
 * 링크드 리스트의 중간 노드부터 리스트를 반환하라.
 * 만약 중간 노드가 2개인 경우, 오른쪽 중간 노드부터 반환하라.
 * 
 * 풀이:
 * Two-pass 방식
 * - 1번: 리스트 길이 측정
 * - 2번: 중간 위치까지 이동
 * - 시간복잡도: O(n), 공간복잡도: O(1)
 * 
 * 참고: Fast-slow pointer 패턴을 사용하면 one-pass로 해결 가능
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
var middleNode = function(head) {
    // 1단계: 리스트의 길이 계산
    let length = 0;
    let node = head;
    while (node && node.val !== undefined) {
        length++;
        node = node.next;
    }

    // 2단계: 중간 위치 계산 (정수 나누기)
    const middleIndex = parseInt(length / 2);
    
    // 3단계: 중간 노드까지 이동
    let currentIndex = 0;
    node = head;
    while (currentIndex < middleIndex) {
        currentIndex++;
        node = node.next;
    }

    return node;
};

middleNode({
  val: 1,
  next: { val: 2, next: { val: 3, next: {} } }
})