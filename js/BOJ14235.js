const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ14235.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

const N = parseInt(input[0]);

/**
 * 산타가 가지고 있는 선물 정보는 Priority Queue 에 저장한다.
 * 거점에 도착할 때 마다 Priority Queue 에 선물 정보를 삽입한다.
 * 아이에게 도착할 때 마다 Priority Queue 에서 가장 큰 선물 정보를 빼낸다.
 */
class PriorityQueue {
  constructor() {
    this.heap = new Array(64);
    this.size = 0;
  }

  insert(value) {
    const heap = this.heap;
    const size = ++this.size;

    if (size === heap.length) heap.length *= 2;

    heap[size] = value;
    this.percolateUp();
  }

  percolateUp() {
    const heap = this.heap;
    const size = this.size;

    let pos = size;
    const item = heap[pos];

    while (pos > 1) {
      const parent = heap[Math.floor(pos / 2)];
      if (parent <= item) break;
      heap[pos] = parent;
      pos = Math.floor(pos / 2);
    }

    heap[pos] = item;
  }

  shift() {
    const heap = this.heap;
    const value = heap[1];
    if (value === undefined) return undefined;
    const size = --this.size;

    heap[1] = heap[size + 1];
    heap[size + 1] = undefined;
    this.percolateDown();
    return value;
  }

  percolateDown() {
    const heap = this.heap;
    const size = this.size;

    let pos = 1;
    const item = heap[pos];

    while (pos * 2 <= size) {
      let childIndex = pos * 2 + 1;
      if (childIndex > size || heap[pos * 2] < heap[childIndex])
        childIndex = pos * 2;
      const child = heap[childIndex];
      if (item <= child) break;
      heap[pos] = child;
      pos = childIndex;
    }

    heap[pos] = item;
  }
}

const giftPQ = new PriorityQueue();

for (let move = 1; move <= N; move++) {
    const line = input[move];
    if (line === "0") {
        const largestGift = giftPQ.shift();
        console.log(largestGift ? -largestGift : -1);
    } else {
        const giftArray = line.split(" ").map(value => parseInt(value)).slice(1);
        giftArray.forEach(giftValue => giftPQ.insert(-giftValue));
    }
}