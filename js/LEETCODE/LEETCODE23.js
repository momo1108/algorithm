/**
 * [LeetCode 23] Merge k Sorted Lists
 * 
 * 값의 오름차순으로 연결된 링크드 리스트가 k개 저장된 lists가 주어진다.
 * lists 내의 모든 링크드 리스트를 하나의 오름차순 링크드 리스트로 병합하라.
 * 
 * 제한사항:
 * k == lists.length
 * 0 <= k <= 10^4
 * 0 <= lists[i].length <= 500
 * -10^4 <= lists[i][j] <= 10^4
 * lists[i] is sorted in ascending order.
 * 모든 리스트의 원소 개수의 합은 10^4 이하이다.
 * 
 * 풀이:
 * Divide and Conquer (분할 정복) 방식
 * - 두 개씩 페어로 묶어서 병합하고, 결과를 lists에 추가
 * - lists의 길이가 1이 될 때까지 반복
 * - 시간복잡도: O(N * log k), N은 전체 노드 수, k는 리스트 개수
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
    if (!lists.length) return null;

    // 현재 라운드에서 처리해야 할 마지막 인덱스
    let endIndex = lists.length;
    
    // 두 개씩 묶어서 병합
    for (let i = 0; i < endIndex; i+=2) {
        if (i + 1 >= lists.length) break;
        
        let headNode = null;
        let tailNode = null;
        let node1 = lists[i];
        let node2 = lists[i + 1];

        // 두 리스트 중 하나 또는 둘 다 비어있는 경우 처리
        if (!node1 && !node2) continue;
        else if (!node1) headNode = node2;
        else if (!node2) headNode = node1;
        else {
            // 두 리스트를 병합 (Merge two sorted lists)
            while (node1 && node2) {
                let minNode;
                if (node1.val <= node2.val) {
                    minNode = node1;
                    node1 = node1.next;
                } else {
                    minNode = node2;
                    node2 = node2.next;
                }
    
                // 병합된 리스트에 노드 추가
                if (!tailNode) {
                    headNode = minNode;
                    tailNode = minNode;
                } else {
                    tailNode.next = minNode;
                    tailNode = minNode;
                }
            }
    
            // 남은 노드들 연결
            tailNode.next = node1 ? node1 : node2;
        }
        
        // 병합된 리스트를 lists에 추가
        lists.push(headNode);
        endIndex++;
    }

    return lists[lists.length - 1];
};

// var mergeKLists_answer = function(lists) {
//     const heap = [];

//     // Comparator check for Min-Heap based on Node Value
//     const push = (node) => {
//         heap.push(node);
//         let idx = heap.length - 1;
//         while (idx > 0) {
//             let parent = Math.floor((idx - 1) / 2);
//             if (heap[idx].val < heap[parent].val) {
//                 [heap[idx], heap[parent]] = [heap[parent], heap[idx]];
//                 idx = parent;
//             } else break;
//         }
//     };

//     const pop = () => {
//         if (heap.length === 0) return null;
//         if (heap.length === 1) return heap.pop();
//         const min = heap[0];
//         heap[0] = heap.pop();
//         let idx = 0;
//         while (true) {
//             let left = 2 * idx + 1;
//             let right = 2 * idx + 2;
//             let smallest = idx;
//             if (left < heap.length && heap[left].val < heap[smallest].val) smallest = left;
//             if (right < heap.length && heap[right].val < heap[smallest].val) smallest = right;
//             if (smallest !== idx) {
//                 [heap[idx], heap[smallest]] = [heap[smallest], heap[idx]];
//                 idx = smallest;
//             } else break;
//         }
//         return min;
//     };

//     // Step 1: Push heads
//     for (let l of lists) {
//         if (l) push(l);
//     }

//     let dummy = new ListNode(0);
//     let tail = dummy;

//     // Step 2: Merge
//     while (heap.length > 0) {
//         let minNode = pop();
//         tail.next = minNode;
//         tail = tail.next;
//         if (minNode.next) push(minNode.next);
//     }

//     return dummy.next;
// };