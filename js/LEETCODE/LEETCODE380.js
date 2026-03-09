
/**
 * [LeetCode 380] Insert Delete GetRandom O(1)
 *
 * 중복 없는 정수를 저장하는 자료구조를 설계하라.
 * 다음 연산을 평균 O(1) 시간복잡도로 지원해야 한다:
 * - insert(val): val이 없으면 삽입하고 true 반환, 이미 있으면 false 반환
 * - remove(val): val이 있으면 삭제하고 true 반환, 없으면 false 반환
 * - getRandom(): 현재 집합의 원소 중 하나를 균일한 확률로 반환
 *
 * 제한사항:
 * -2^31 <= val <= 2^31 - 1
 * insert, remove, getRandom 호출 시 최소 1개 이상의 원소가 존재함
 * 최대 2 * 10^5번 호출됨
 *
 * 풀이:
 * Map + 배열을 조합한 O(1) 자료구조
 * - Map(indexMap): 값 -> 배열 인덱스 매핑으로 O(1) 존재 확인 및 인덱스 조회
 * - 배열(arr): 실제 값 저장, O(1) 랜덤 접근 지원
 *
 * 핵심 아이디어 (remove):
 * - 배열 중간 원소 삭제는 O(n)이므로, 삭제할 원소를 배열 마지막 원소와 교체 후 pop
 * - 교체된 마지막 원소의 인덱스를 Map에서 업데이트
 *
 * - 시간복잡도: insert / remove / getRandom 모두 O(1)
 * - 공간복잡도: O(n)
 */

var RandomizedSet = function() {
    // 값 -> 배열 인덱스 매핑 (O(1) 존재 확인 및 인덱스 조회)
    this.indexMap = new Map();
    // 실제 값 저장 배열 (O(1) 랜덤 접근)
    this.arr = [];
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function(val) {
    // 이미 존재하면 삽입하지 않고 false 반환
    if (!this.indexMap.has(val)) {
        // 배열 끝에 추가하고 Map에 인덱스 등록
        this.indexMap.set(val, this.arr.length);
        this.arr.push(val);
        return true;
    }
    return false;
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function(val) {
    if (this.indexMap.has(val)) {
        const valIndex = this.indexMap.get(val);
        const lastIndex = this.arr.length - 1;

        // 삭제할 원소 자리에 마지막 원소를 덮어씀 (O(1) 삭제를 위한 swap)
        this.arr[valIndex] = this.arr[lastIndex];
        // Map에서 마지막 원소의 인덱스를 갱신
        this.indexMap.set(this.arr[lastIndex], valIndex);
        // 배열 마지막 원소 제거
        this.arr.pop();
        // Map에서 삭제한 원소 제거
        this.indexMap.delete(val);
        return true;
    }
    return false;
};

/**
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function() {
    // 0 ~ arr.length-1 범위의 정수 인덱스를 균일한 확률로 선택
    const index = Math.floor(Math.random() * this.arr.length);
    return this.arr[index];
};

/** 
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */
var obj = new RandomizedSet()
obj.insert(0)
console.log(obj.arr, obj.indexMap);
obj.insert(1)
console.log(obj.arr, obj.indexMap);
obj.remove(0)
console.log(obj.arr, obj.indexMap);
obj.insert(2)
console.log(obj.arr, obj.indexMap);
obj.remove(1)
console.log(obj.arr, obj.indexMap);
console.log(obj.getRandom())