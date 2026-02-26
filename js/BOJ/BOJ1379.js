/**
 * [BOJ 1379] 강의실 배정
 * 
 * 강의 N개의 시작 시간과 종료 시간이 주어진다.
 * 중복되지 않게 강의를 배정할 때, 필요한 최소 강의실 개수를 구하고,
 * 각 강의를 어느 강의실에 배정할지 결정하는 문제이다.
 * 
 * 입력:
 * - 첫 줄: 강의 개수 N (1 <= N <= 100,000)
 * - 다음 N줄: 강의 ID, 시작 시간, 종료 시간 (0 <= 시작 < 종료 <= 1,000,000)
 * 
 * 출력:
 * - 첫 줄: 필요한 최소 강의실 개수
 * - 다음 N줄: 각 강의 ID 순서대로 배정된 강의실 번호
 * 
 * 풀이 전략:
 * 1. 강의를 종료 시간 순으로 정렬
 * 2. 최소 힙(minEndtimeHeap)을 사용하여 끝나는 시간이 가장 빠른 강의 추적
 * 3. 새로운 강의 시작 시 이전 강의들 중 이미 끝난 것들을 찾아 강의실 회수
 * 4. 사용 가능한 강의실 번호를 최소 힙(availableClassroomHeap)에 관리
 * 5. 각 강의에는 필요시 새 강의실 배정 또는 사용 가능한 강의실 재사용
 * - 시간복잡도: O(N log N)
 * - 공간복잡도: O(N)
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/mom/Desktop/algorithm/data/BOJ1379.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

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
     * @param {number} parentIdx - 부모 노드의 인덱스
     * @param {number} childIdx - 자식 노드의 인덱스
     * @returns {boolean} 교환 필요 여부
     */
    shouldSwap(parentIdx, childIdx) {
        if (this.type === "MAX") return this.heapArray[parentIdx] < this.heapArray[childIdx];
        else if (this.type === "MIN") return this.heapArray[parentIdx] > this.heapArray[childIdx];
        else return this.comparator(this.heapArray[parentIdx], this.heapArray[childIdx]);
    }

    /**
     * 힙 배열의 두 원소를 교환
     * @param {number} idx1 - 첫 번째 인덱스
     * @param {number} idx2 - 두 번째 인덱스
     */
    swapHeapArrayElement(idx1, idx2) {
        const temp = this.heapArray[idx1];
        this.heapArray[idx1] = this.heapArray[idx2];
        this.heapArray[idx2] = temp;
    }

    /**
     * 새로운 원소 삽입 후 힙 속성을 유지하기 위해 상향 조정
     * 삽입된 원소를 부모와 비교하여 힙 조건을 만족할 때까지 위로 이동
     * 시간복잡도: O(log n)
     */
    heapifyUp() {
        let childIdx = this.heapArray.length - 1;
        let parentIdx;

        while (childIdx > 0) {
            parentIdx = Math.floor((childIdx - 1) / 2);

            if (this.shouldSwap(parentIdx, childIdx)) {
                this.swapHeapArrayElement(parentIdx, childIdx);
                childIdx = parentIdx;
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
        let parentIdx = 0;
        let leftChildIdx, rightChildIdx, targetChildIdx;
        
        while (parentIdx * 2 + 1 < heapSize) {
            leftChildIdx = parentIdx * 2 + 1;
            rightChildIdx = parentIdx * 2 + 2;
            targetChildIdx = leftChildIdx;

            // 오른쪽 자식이 존재하면 두 자식 중 교환할 노드 선택
            if (rightChildIdx < heapSize) {
                let shouldPickRight;
                if (this.type === "MAX") shouldPickRight = this.heapArray[leftChildIdx] < this.heapArray[rightChildIdx];
                else if (this.type === "MIN") shouldPickRight = this.heapArray[leftChildIdx] > this.heapArray[rightChildIdx];
                else shouldPickRight = this.comparator(this.heapArray[leftChildIdx], this.heapArray[rightChildIdx]);
                targetChildIdx = shouldPickRight ? rightChildIdx : leftChildIdx;
            }
            
            if (!this.shouldSwap(parentIdx, targetChildIdx)) break;

            this.swapHeapArrayElement(parentIdx, targetChildIdx);
            parentIdx = targetChildIdx;
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

// 강의 개수
const N = Number(input[0]);

// 강의 배열: [강의ID, 시작시간, 종료시간]
let lectures = input.slice(1).map(line => line.split(" ").map(Number));

// 강의를 시작 시간 기준으로 정렬 (시작 시간이 같으면 종료 시간이 빠른 순)
lectures.sort((lecture1, lecture2) => lecture1[1] - lecture2[1]);

// 힙1: 현재 진행 중인 강의들을 종료 시간 기준 최소 힙으로 관리
// 데이터 구조: [강의ID, 시작시간, 종료시간, 할당된강의실번호]
const lecturesByEndTimeHeap = new Heap("custom", (lecture1, lecture2) => lecture2[2] < lecture1[2]);

// 힙2: 사용 가능한 강의실 번호들을 최소 힙으로 관리
const availableClassroomHeap = new Heap("MIN");

// 강의 ID → 배정된 강의실 번호 를 저장하는 맵
const lectureToClassroomMap = {[lectures[0][0]]: 1};

// 첫 번째 강의를 첫 번째 강의실에 배정
lecturesByEndTimeHeap.insert(lectures[0].concat(1));

// 현재 처리 중인 강의의 인덱스
let currentLectureIndex = 1;

// 지금까지 할당된 최대 강의실 번호
let maxClassroomNumber = 1;

// 각 강의에 대해 순서대로 강의실 배정
while (currentLectureIndex < lectures.length) {
    const currentLecture = lectures[currentLectureIndex];
    
    // 현재 강의가 시작하기 전에 끝나는 강의들을 찾아 강의실 회수
    if (!lecturesByEndTimeHeap.isEmpty() && currentLecture[1] >= lecturesByEndTimeHeap.peek()[2]) {
        while (!lecturesByEndTimeHeap.isEmpty() && currentLecture[1] >= lecturesByEndTimeHeap.peek()[2]) {
            // 끝난 강의의 강의실을 사용 가능한 강의실로 복구
            const endedLecture = lecturesByEndTimeHeap.pop();
            availableClassroomHeap.insert(endedLecture[3]);
        }
    }
    
    // 현재 강의를 적절한 강의실에 배정
    assignClassroomToLecture(currentLecture);

    currentLectureIndex++;
}

/**
 * 강의를 강의실에 배정하는 함수
 * - 사용 가능한 강의실이 있으면 재사용
 * - 없으면 새로운 강의실 할당
 * @param {Array} lecture - [강의ID, 시작시간, 종료시간]
 */
function assignClassroomToLecture(lecture) {
    if (availableClassroomHeap.isEmpty()) {
        // 사용 가능한 강의실이 없으면 새로운 강의실 할당
        maxClassroomNumber++;
        lecturesByEndTimeHeap.insert(lecture.concat(maxClassroomNumber));
        lectureToClassroomMap[lecture[0]] = maxClassroomNumber;
    }
    else {
        // 사용 가능한 강의실 중 번호가 가장 작은 것을 재사용
        const classroomNumber = availableClassroomHeap.pop();
        lecturesByEndTimeHeap.insert(lecture.concat(classroomNumber));
        lectureToClassroomMap[lecture[0]] = classroomNumber;
    }
}

// 필요한 최소 강의실 개수 출력
console.log(String(maxClassroomNumber));

// 각 강의(ID 순서로)가 배정된 강의실 번호 출력
const classroomNumberArray = [];
for (let lectureId = 1; lectureId <= N; lectureId++) {
    classroomNumberArray.push(lectureToClassroomMap[lectureId]);
}
console.log(classroomNumberArray.join('\n'));