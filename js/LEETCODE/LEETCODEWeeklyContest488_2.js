/**
 * 정수 배열 num
 * 아래의 작업을 더이상 불가능할때까지 반복한다
 * - 인접한 두 요소가 동일한 경우, 가장 왼쪽부터 하나로 합친다.(오른쪽 값은 지워짐)
 * - 합친 값은 두 요소를 더한 값이다.
 */

/**
 * 인접한 동일한 요소들을 반복적으로 병합하는 함수
 * 스택을 사용하여 왼쪽부터 순회하며, 스택의 top과 현재 값이 같으면 병합
 * 
 * @param {number[]} nums - 입력 정수 배열
 * @return {number[]} - 병합 완료 후 최종 배열
 */
var mergeAdjacent = function(nums) {
    const stack = [];

    let currentValue;
    for (let i = 0; i < nums.length; i++) {
        currentValue = nums[i];
        
        // 스택의 top과 현재 값이 같으면 계속 병합 (2배씩 증가)
        while (stack.length && stack[stack.length - 1] === currentValue) {
            currentValue *= 2;  // 두 값을 합침 (동일한 값이므로 2배)
            stack.pop();        // 스택에서 병합된 값 제거
        }
        
        // 병합된 최종 값을 스택에 추가
        stack.push(currentValue);
    }

    return stack;
};

mergeAdjacent([3, 7, 5])