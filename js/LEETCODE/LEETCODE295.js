class Heap {
    constructor(type = "MAX"){
        if (!["MAX", "MIN"].includes(type.toUpperCase())) {
            throw new Error("Parameter type must be 'MAX' or 'MIN'.");
        }
        this.type = type;
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

    heapifyUp() {
        let child = this.heapArray.length - 1;
        let parent;

        while (child > 0) {
            parent = Math.ceil(child / 2) - 1;

            if (this.shouldSwap(parent, child)) {
                this.swapHeapArrayElement(parent, child);
                child = parent;
            } else break;
        }
    }

    heapifyDown() {
        let parent = 0;
        let leftChild, rightChild, swappingChild;
        
        while (parent * 2 + 1 < this.heapArray.length) {
            leftChild = parent * 2 + 1;
            rightChild = parent * 2 + 2;

            // console.log(parent, leftChild, rightChild);

            if (this.heapArray[rightChild]) {
                const isMax = this.type === "MAX";
                const isLeft = isMax ? 
                this.heapArray[leftChild] >= this.heapArray[rightChild] :
                this.heapArray[leftChild] <= this.heapArray[rightChild]
                swappingChild = isLeft ? leftChild : rightChild;
            } else swappingChild = leftChild;
            
            if (this.shouldSwap(parent, swappingChild)) {
                this.swapHeapArrayElement(parent, swappingChild);
                parent = swappingChild;
                continue;
            }

            break;
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

    // 1. 개수 동일
    if (this.maxHeap.size() === this.minHeap.size()) {
        const higherMid = this.minHeap.peek();

        if (num <= higherMid) this.maxHeap.insert(num);
        else {
            this.maxHeap.insert(this.minHeap.pop());
            this.minHeap.insert(num);
        }
    }
    // 2. maxHeap 이 1개 더 많은 경우
    else if (this.maxHeap.size() > this.minHeap.size()) {
        const lowerMid = this.maxHeap.peek();

        if (lowerMid <= num) this.minHeap.insert(num);
        else {
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

    if (isEven) return (this.maxHeap.peek() + this.minHeap.peek()) / 2;
    else return this.maxHeap.peek();
};

// const mh = new Heap(type='MIN');
// mh.insert(6)
// mh.insert(10)
// mh.insert(6)
// mh.insert(6)
// mh.insert(2)
// mh.insert(9)
// mh.insert(5)
// console.log(mh)

/** 
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 * [[],[12],[],[10],[],[13],[],[11],[],[5],[],[15],[],[1],[],[11],[],[6],[],[17],[],[14],[],[8],[],[17],[],[6],[],[4],[],[16],[],[8],[],[10],[],[2],[],[12],[],[0],[]]
 */
var obj = new MedianFinder()
obj.addNum(12)
obj.addNum(10)
obj.addNum(13)
obj.addNum(11)
obj.addNum(5)
obj.addNum(15)
obj.addNum(1)
obj.addNum(11)
obj.addNum(6)
obj.addNum(17)
obj.addNum(14)
obj.addNum(8)
obj.addNum(17)
obj.addNum(6)
obj.addNum(4)
obj.addNum(16)
obj.addNum(8)
obj.addNum(10)
obj.addNum(2)
obj.addNum(12)
obj.addNum(0)