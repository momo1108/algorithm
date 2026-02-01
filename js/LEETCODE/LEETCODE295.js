// 최대/최소 힙을 구현하는 클래스
class Heap {
    constructor(type = "MAX"){
        if (!["MAX", "MIN"].includes(type.toUpperCase())) {
            throw new Error("Parameter type must be 'MAX' or 'MIN'.");
        }
        this.type = type.toUpperCase();
        this.heapArray = [];
    }

    insert(number) {
        this.heapArray.push(number);
        this.heapifyUp();
    }

    pop() {
        if (this.heapArray.length === 0) throw new Error("Can't pop empty Heap");
        if (this.heapArray.length === 1) return this.heapArray.pop();

        const root = this.heapArray[0];
        this.heapArray[0] = this.heapArray.pop();
        this.heapifyDown();

        return root;
    }

    // 부모와 자식 노드를 교환해야 하는지 판단 (MaxHeap: 부모가 더 작으면 교환, MinHeap: 부모가 더 크면 교환)
    shouldSwap(parent, child) {
        const isMaxHeap = this.type === "MAX";
        return isMaxHeap ? 
            this.heapArray[parent] < this.heapArray[child] : 
            this.heapArray[parent] > this.heapArray[child];
    }

    swapHeapArrayElement(node1, node2) {
        const temp = this.heapArray[node1];
        this.heapArray[node1] = this.heapArray[node2];
        this.heapArray[node2] = temp;
    }

    // 새로운 원소를 삽입한 후 힙 속성을 유지하기 위해 상향 조정
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

    // 루트 원소를 제거한 후 힙 속성을 유지하기 위해 하향 조정
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
                const isMax = this.type === "MAX";
                const pickLeft = isMax ? 
                this.heapArray[leftChild] >= this.heapArray[rightChild] :
                this.heapArray[leftChild] <= this.heapArray[rightChild]
                swappingChild = pickLeft ? leftChild : rightChild;
            }
            
            if (!this.shouldSwap(parent, swappingChild)) break;

            this.swapHeapArrayElement(parent, swappingChild);
            parent = swappingChild;
        }
    }

    peek() {
        return this.heapArray[0];
    }

    size() {
        return this.heapArray.length;
    }

    isEmpty() {
        return this.heapArray.length === 0;
    }
}

// 중앙값을 효율적으로 찾기 위해 두 개의 힙을 사용
// maxHeap: 작은 절반의 값들을 저장 (최댓값이 중앙값 후보)
// minHeap: 큰 절반의 값들을 저장 (최솟값이 중앙값 후보)
var MedianFinder = function() {
    this.maxHeap = new Heap("MAX");
    this.minHeap = new Heap("MIN");
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function(num) {
    // 예외1. maxHeap 이 빈 경우(= min, max 둘다 빈 경우)
    if (this.maxHeap.isEmpty()) {
        this.maxHeap.insert(num);
        return;
    } 
    // 예외2. minHeap 만 빈 경우
    else if (this.minHeap.isEmpty()) {
        if (num < this.maxHeap.peek()) {
            this.minHeap.insert(this.maxHeap.pop());
            this.maxHeap.insert(num);
        } else this.minHeap.insert(num);
        return;
    }

    // 1. 개수 동일: maxHeap에 하나 더 추가하도록 조정
    if (this.maxHeap.size() === this.minHeap.size()) {
        const higherMid = this.minHeap.peek();

        if (num <= higherMid) this.maxHeap.insert(num);
        else {
            // num이 크면 minHeap의 최솟값을 maxHeap으로 이동하고 num을 minHeap에 추가
            this.maxHeap.insert(this.minHeap.pop());
            this.minHeap.insert(num);
        }
    }
    // 2. maxHeap이 1개 더 많은 경우: 두 힙의 크기를 동일하게 만듦
    else if (this.maxHeap.size() > this.minHeap.size()) {
        const lowerMid = this.maxHeap.peek();

        if (lowerMid <= num) this.minHeap.insert(num);
        else {
            // num이 작으면 maxHeap의 최댓값을 minHeap으로 이동하고 num을 maxHeap에 추가
            const popped = this.maxHeap.pop();
            this.minHeap.insert(popped);
            this.maxHeap.insert(num);
        }
    }
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {
    const isEven = this.maxHeap.size() === this.minHeap.size();

    // 짝수개: 두 힙의 최상위 값의 평균, 홀수개: maxHeap의 최댓값
    if (isEven) return (this.maxHeap.peek() + this.minHeap.peek()) / 2;
    else return this.maxHeap.peek();
};

/** 
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 * [[],[12],[],[10],[],[13],[],[11],[],[5],[],[15],[],[1],[],[11],[],[6],[],[17],[],[14],[],[8],[],[17],[],[6],[],[4],[],[16],[],[8],[],[10],[],[2],[],[12],[],[0],[]]
 */