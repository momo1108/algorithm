/**
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation
 * function NestedInteger() {
 *
 *     Return true if this NestedInteger holds a single integer, rather than a nested list.
 *     @return {boolean}
 *     this.isInteger = function() {
 *         ...
 *     };
 *
 *     Return the single integer that this NestedInteger holds, if it holds a single integer
 *     Return null if this NestedInteger holds a nested list
 *     @return {integer}
 *     this.getInteger = function() {
 *         ...
 *     };
 *
 *     Return the nested list that this NestedInteger holds, if it holds a nested list
 *     Return null if this NestedInteger holds a single integer
 *     @return {NestedInteger[]}
 *     this.getList = function() {
 *         ...
 *     };
 * };
 */

/**
 * @constructor
 * @param {NestedInteger[]} nestedList
 */
var NestedIterator = function(nestedList) {
    /**
     * 순회에서 요소가 정수가 아닌 리스트일 때, 스프레드 연산자로 분해하여 리스트에
     * 추가하는것보다 리스트를 인자로 다시 재귀함수를 실행해 정수일때만
     * 리스트에 추가하는것이 더 빠르다.
     */
    const flattenedList = [];
    const flatten = (nl) => {
        for (const ni of nl) {
            if (ni.isInteger()) flattenedList.push(ni.getInteger());
            else flatten(ni.getList());
        }
    }
    flatten(nestedList);

    this.flattenedList = flattenedList;
    this.index = 0;
    this.listLength = this.flattenedList.length;
};


/**
 * @this NestedIterator
 * @returns {boolean}
 */
NestedIterator.prototype.hasNext = function() {
    return this.index < this.listLength;
};

/**
 * @this NestedIterator
 * @returns {integer}
 */
NestedIterator.prototype.next = function() {
    return this.flattenedList[this.index++];
};

/**
 * Your NestedIterator will be called like this:
 * var i = new NestedIterator(nestedList), a = [];
 * while (i.hasNext()) a.push(i.next());
*/
var i = new NestedIterator([1,2,[1,2]]);
while (i.hasNext()) {
    console.log(i.next());
}