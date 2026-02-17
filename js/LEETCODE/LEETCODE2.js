/**
 * LeetCode 2번 문제: 두 수를 연결 리스트로 나타낼 때 더하기
 * 
 * 문제 설명:
 * 두 개의 음이 아닌 정수가 연결 리스트로 표현되어 있다.
 * 각 노드는 한 자리 숫자를 나타내고, 숫자들은 역순으로 저장되어 있다.
 * 두 수를 더하고, 그 합을 연결 리스트로 반환하시오.
 * 
 * 예시:
 * 입력: l1 = [2,4,3], l2 = [5,6,4]
 * 출력: [7,0,8]
 * 설명: 342 + 465 = 807
 * 
 * 입력: l1 = [0], l2 = [0]
 * 출력: [0]
 * 
 * 입력: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
 * 출력: [8,9,9,9,0,0,0,1]
 * 설명: 9999999 + 9999 = 10009998
 */


/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let carry = 0;
    const base1 = l1;
    const base2 = l2;
    let resultHead = base1;

    let digitSum;
    while (l1 || l2) {
        // 같은 자리 숫자와 carry를 더해 현재 자리 값을 만든다.
        digitSum = (l1?.val || 0) + (l2?.val || 0) + carry;

        if (digitSum >= 10) {
            carry = 1;
            digitSum %= 10;
        } else carry = 0;

        // 더 긴 리스트를 결과 리스트의 헤드로 사용한다.
        if (!l1?.next && l2?.next) resultHead = base2;

        // 값 갱신 후 다음 노드로 이동한다.
        if (l1) {
            l1.val = digitSum;
            l1 = l1.next;
        }
        if (l2) {
            l2.val = digitSum;
            l2 = l2.next;
        }
    }

    // 마지막 carry가 남아 있으면 리스트 끝에 1을 추가한다.
    if (carry) {
        l1 = base1;
        l2 = base2;
        // 각 리스트의 꼬리까지 이동한다.
        while (l1.next) l1 = l1.next;
        l1.next = new ListNode(1, null);
        while (l2.next) l2 = l2.next;
        l2.next = new ListNode(1, null);
    }

    return resultHead;
};

addTwoNumbers(
    { val: 9, next: { val: 9, next: { val: 9, next: { val: 9, next: { val: 9, next: { val: 9, next: { val: 9, next: null } } } } } } },
    { val: 9, next: { val: 9, next: { val: 9, next: { val: 9, next: null } } } }
)


/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let dummyHead = new ListNode(0);
  let current = dummyHead;
  let carry = 0;

  while (l1 !== null || l2 !== null || carry !== 0) {
    let sum = carry;

    if (l1 !== null) {
      sum += l1.val;
      l1 = l1.next;
    }

    if (l2 !== null) {
      sum += l2.val;
      l2 = l2.next;
    }

    carry = Math.floor(sum / 10);
    current.next = new ListNode(sum % 10);
    current = current.next;
  }

  return dummyHead.next;
};