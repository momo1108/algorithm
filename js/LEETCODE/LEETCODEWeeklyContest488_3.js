/**
 * 정수배열 nums, 정수 k
 * 부분 배열 nums[l..r] = nums.slice(l, r + 1);
 * 각 부분 배열의 cost 는 아래와 같다.
 * cost = (max(nums[l..r]) - min(nums[l..r])) * (r - l + 1)
 * 
 * k 이하의 cost 를 가진 부분 배열의 개수를 반환하라
 * 빈 배열은 부분배열이 아니다.
 */

/**
 * 슬라이딩 윈도우와 모노토닉 덱을 사용하여 k 이하의 cost를 가진 부분배열 개수를 계산
 * 
 * 알고리즘:
 * 1. 두 개의 덱으로 구간의 최솟값과 최댓값을 O(1)에 추적
 * 2. 오른쪽 포인터를 확장하며 cost가 k를 초과하면 왼쪽 포인터를 이동
 * 3. 각 right 위치에서 [left, right] 범위의 모든 부분배열이 유효 (right - left + 1개)
 * 
 * @param {number[]} nums - 입력 정수 배열
 * @param {number} k - cost의 최댓값
 * @return {number} - k 이하의 cost를 가진 부분배열의 개수
 */
var countSubarrays = function(nums, k) {
    let answer = 0;
    
    // 모노토닉 덱: 최솟값과 최댓값의 인덱스를 추적
    const minDeque = [];  // 최솟값을 위한 증가 덱
    const maxDeque = [];  // 최댓값을 위한 감소 덱
    let minDequeHead = 0; // 헤드 포인터로 pollFirst 를 대체
    let maxDequeHead = 0; // 헤드 포인터로 pollFirst 를 대체
    
    let cost = 0;
    let left = 0;
    
    for (let right = 0; right < nums.length; right++) {
        // 최솟값 덱 유지: 현재 값보다 큰 값들을 제거하여 증가 순서 유지
        while (minDeque.length > minDequeHead && 
               nums[minDeque[minDeque.length - 1]] > nums[right]) {
            minDeque.pop();
        }
        minDeque.push(right);
        
        // 최댓값 덱 유지: 현재 값보다 작은 값들을 제거하여 감소 순서 유지
        while (maxDeque.length > maxDequeHead && 
               nums[maxDeque[maxDeque.length - 1]] < nums[right]) {
            maxDeque.pop();
        }
        maxDeque.push(right);

        // 현재 윈도우의 cost 계산
        cost = (nums[maxDeque[maxDequeHead]] - nums[minDeque[minDequeHead]]) * (right - left + 1);
        
        // cost가 k를 초과하면 왼쪽 포인터 이동
        while (cost > k) {
            // 왼쪽 포인터가 덱의 front를 벗어나면 head 이동
            if (minDeque[minDequeHead] === left) minDequeHead++;
            if (maxDeque[maxDequeHead] === left) maxDequeHead++;
            left++;
            
            // cost 재계산
            cost = (nums[maxDeque[maxDequeHead]] - nums[minDeque[minDequeHead]]) * (right - left + 1);
        }
        
        // [left, right] 범위에서 right를 끝으로 하는 모든 부분배열 추가
        // left부터 right까지 시작점을 선택할 수 있으므로 (right - left + 1)개
        answer += (right - left + 1);
    }

    return answer;
};

console.log(countSubarrays([1,3,2], 4));