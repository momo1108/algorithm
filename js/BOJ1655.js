const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ1655.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

const N = parseInt(input[0])
/**
 * 백준이가 말하는 숫자들을 Priority Queue 에 저장한다.
 * 큐는 중간값 이상을 저장할 큐, 중간값 이하를 저장할 큐 주개로 나눈다.
 * 숫자 개수가 짝수일 경우 중앙 2개 중 작은 값이기 때문에
 * 숫자 개수가 홀수일 때 중간값 이하를 저장할 큐가 
 * 항상 중간값 이상을 저장할 큐보다 길이가 1 더 길도록 설정한다.
 * 
 * 최종적으로 중간값 이하를 저장한 PQ 의 최대값은 정답을 가리킨다.
 */
class MaxHeap {
  constructor(isMax = true) {
    this.heap = [];
    this.heap.push(1e9);
  }
 
  insert(val) {
    this.heap.push(val);
    this.heapUp(this.heap.length - 1);
  }
 
  heapUp(pos) {
    let tmp = this.heap[pos];
    while (tmp > this.heap[Math.floor(pos / 2)]) {
      this.heap[pos] = this.heap[Math.floor(pos / 2)];
      pos = Math.floor(pos / 2);
    }
    this.heap[pos] = tmp;
  }
 
  pop() {
    if (this.heap.length === 2) return this.heap.pop();
    if (this.heap.length === 1) return false;

    let res = this.heap[1];

    this.heap[1] = this.heap.pop();
    this.heapDown(1, this.heap.length - 1);
    return res;
  }
 
  heapDown(pos, len) {
    let tmp = this.heap[pos], child;
    while (pos <= Math.floor(len / 2)) {
      child = pos * 2;
      if (this.heap[child] < this.heap[child + 1]) child++;
      if (tmp >= this.heap[child]) break;
      this.heap[pos] = this.heap[child];
      pos = child;
    }
    this.heap[pos] = tmp;
  }

  size() {
    return this.heap.length - 1;
  }
 
  top() {
    return this.heap[1];
  }
}

const minHeap = new MaxHeap();
const maxHeap = new MaxHeap();
const answer = [];

for (let line of input.slice(1)) {
    const number = parseInt(line);

    if (!minHeap.size() && !maxHeap.size()) {
        maxHeap.insert(number);
        answer.push(maxHeap.top());
        continue;
    }

    /**
     * 두 힙 크기가 같은 경우, maxHeap 이 1개 더 많게 조정되어야한다. 입력 숫자가
     * maxHeap 의 top 보다 작거나 같으면 그냥 maxHeap 에 insert
     * maxHeap 의 top 보다 클때는 minHeap 의 top 보다 큰지 체크 후
     * 더 크면 minHeap 에 insert 후 minHeap 의 top을 빼내 maxHeap 에 insert
     * 작거나 같으면 maxHeap 에 그냥 insert
     */
    if (maxHeap.size() === minHeap.size()){
        if (number <= maxHeap.top()) maxHeap.insert(number);
        else {
            if (number > -minHeap.top()) {
                minHeap.insert(-number);
                maxHeap.insert(-minHeap.pop());
            } else maxHeap.insert(number);
        }
    }
    /**
     * 두 힙의 크기가 다른 경우는 maxHeap 이 무조건 1개 더 많은 경우이다. 
     * 입력 숫자가 maxHeap 의 top 보다 작으면,
     *  maxHeap 에 insert 후 maxHeap 의 top 을 pop 해 minHeap 에 넣는다.
     * 입력 숫자가 maxHeap 의 top 보다 크거나 같으면 minHeap 에 insert 한다.
     */
    else {
        if (number < maxHeap.top()) {
            maxHeap.insert(number);
            minHeap.insert(-maxHeap.pop());
        } else minHeap.insert(-number);
    }

    answer.push(maxHeap.top());
}

console.log(answer.join('\n'));