/**
 * Heap 클래스: 최대/최소 힙(Max/Min Heap)을 구현한 클래스
 * - 최대 힙: 부모 노드가 자식 노드보다 크거나 같음
 * - 최소 힙: 부모 노드가 자식 노드보다 작거나 같음
 * 배열 기반 완전 이진 트리 구조로 구현됨
 */
class Heap {
    /**
     * Heap 생성자
     * @param {string} type - "MAX" (최대 힙) 또는 "MIN" (최소 힙), 혹은 "CUSTOM" (비교 함수 지정) 기본값은 "MAX"
     * @param {function} comparator - (a, b) => b 가 a 보다 우선이면 true, 아니면 false 를 반환하는 함수
     */
    constructor(type = "MAX", comparator){
        if (!["MAX", "MIN", "CUSTOM"].includes(type.toUpperCase())) {
            throw new Error("Parameter type must be 'MAX' or 'MIN' or 'CUSTOM'.");
        }
        if (type === 'CUSTOM') {
            if (!comparator) throw new Error("Parameter comparator is needed.");
            if (typeof comparator !== "function") throw new Error("Parameter comparator must be function.");
        }
        this.type = type.toUpperCase();
        this.comparator = comparator;
        this.heapArray = [];
    }

    /**
     * 새로운 원소를 힙에 삽입
     * @param {number} number - 삽입할 값
     */
    insert(number) {
        this.heapArray.push(number);
        this.heapifyUp();
    }

    /**
     * 루트(최상단) 원소를 제거하고 반환
     * @returns {number} 제거된 최상단 원소 (최대값 또는 최소값)
     */
    pop() {
        if (this.heapArray.length === 0) throw new Error("Can't pop empty Heap");
        if (this.heapArray.length === 1) return this.heapArray.pop();

        const root = this.heapArray[0];
        this.heapArray[0] = this.heapArray.pop();
        this.heapifyDown();

        return root;
    }

    /**
     * 부모 노드와 자식 노드를 비교하여 교환이 필요한지 판단
     * - MaxHeap: 부모 < 자식이면 true (교환 필요)
     * - MinHeap: 부모 > 자식이면 true (교환 필요)
     * @param {number} parent - 부모 노드의 인덱스
     * @param {number} child - 자식 노드의 인덱스
     * @returns {boolean} 교환 필요 여부
     */
    shouldSwap(parent, child) {
        if (this.type === "MAX") return this.heapArray[parent] < this.heapArray[child];
        else if (this.type === "MIN") return this.heapArray[parent] > this.heapArray[child];
        else return this.comparator(this.heapArray[parent], this.heapArray[child]);
    }

    /**
     * 힙 배열의 두 원소를 교환
     * @param {number} node1 - 첫 번째 인덱스
     * @param {number} node2 - 두 번째 인덱스
     */
    swapHeapArrayElement(node1, node2) {
        const temp = this.heapArray[node1];
        this.heapArray[node1] = this.heapArray[node2];
        this.heapArray[node2] = temp;
    }

    /**
     * 새로운 원소 삽입 후 힙 속성을 유지하기 위해 상향 조정
     * 삽입된 원소를 부모와 비교하여 힙 조건을 만족할 때까지 위로 이동
     * 시간복잡도: O(log n)
     */
    heapifyUp() {
        let child = this.heapArray.length - 1;
        let parent;

        while (child > 0) {
            parent = Math.floor((child - 1) / 2);

            if (this.shouldSwap(parent, child)) {
                this.swapHeapArrayElement(parent, child);
                child = parent;
            } else break;
        }
    }

    /**
     * 루트 원소 제거 후 힙 속성을 유지하기 위해 하향 조정
     * 마지막 원소를 루트로 옮긴 후, 자식 노드들과 비교하여 적절한 위치까지 아래로 이동
     * 시간복잡도: O(log n)
     */
    heapifyDown() {
        let heapSize = this.heapArray.length;
        let parent = 0;
        let leftChild, rightChild, swappingChild;
        
        while (parent * 2 + 1 < heapSize) {
            leftChild = parent * 2 + 1;
            rightChild = parent * 2 + 2;
            swappingChild = leftChild;

            // 오른쪽 자식이 존재하면 두 자식 중 교환할 노드 선택
            if (rightChild < heapSize) {
                let pickRight;
                if (this.type === "MAX") pickRight = this.heapArray[leftChild] < this.heapArray[rightChild];
                else if (this.type === "MIN") pickRight = this.heapArray[leftChild] > this.heapArray[rightChild];
                else pickRight = this.comparator(this.heapArray[leftChild], this.heapArray[rightChild]);
                swappingChild = pickRight ? rightChild : leftChild;
            }
            
            if (!this.shouldSwap(parent, swappingChild)) break;

            this.swapHeapArrayElement(parent, swappingChild);
            parent = swappingChild;
        }
    }

    /**
     * 힙의 최상단 원소를 제거하지 않고 조회
     * @returns {number} 최상단 원소 (최대값 또는 최소값)
     */
    peek() {
        return this.heapArray[0];
    }

    /**
     * 힙에 저장된 원소의 개수 반환
     * @returns {number} 원소 개수
     */
    size() {
        return this.heapArray.length;
    }

    /**
     * 힙이 비어있는지 판단
     * @returns {boolean} 비어있으면 true, 아니면 false
     */
    isEmpty() {
        return this.heapArray.length === 0;
    }
}