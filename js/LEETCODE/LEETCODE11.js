/**
 * [LeetCode 11] Container With Most Water
 * 
 * 양의 정수 배열 height가 주어진다.
 * height[i]는 i번째 위치의 수직선 높이를 나타낸다.
 * 두 개의 선을 선택하여 x축과 함께 가장 많은 물을 담을 수 있는 컨테이너를 만들어라.
 * 최대 물의 양을 반환하라.
 * 
 * 제한사항:
 * n == height.length
 * 2 <= n <= 10^5
 * 0 <= height[i] <= 10^4
 * 
 * 풀이:
 * Two Pointer (투 포인터)
 * - 양 끝에서 시작하여 안쪽으로 이동
 * - 현재 면적 = min(height[left], height[right]) * (right - left)
 * - 더 낮은 높이의 포인터를 이동 (더 높은 높이를 찾기 위해)
 * - 시간복잡도: O(n), 공간복잡도: O(1)
 */

/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let left = 0, right = height.length - 1;

    let maxWater = 0;
    
    // 두 포인터가 만날 때까지 반복
    while (left < right) {
        // 더 낮은 높이가 물의 높이를 결정
        if (height[left] < height[right]) {
            // 왼쪽이 더 낮으면 왼쪽 높이 * 너비로 계산
            maxWater = Math.max(maxWater, height[left] * (right - left));
            left++; // 더 높은 왼쪽 기둥을 찾기 위해 이동
        } else {
            // 오른쪽이 더 낮거나 같으면 오른쪽 높이 * 너비로 계산
            maxWater = Math.max(maxWater, height[right] * (right - left));
            right--; // 더 높은 오른쪽 기둥을 찾기 위해 이동
        }
    }
    
    return maxWater;
};

/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let length = height.length;
    let L=0, R=length-1;
    let max = Math.min(height[L],height[R])*(R-L);

    let i=0, j=length-1;
    while(i<j){
        let curHeight = Math.min(height[i],height[j])
        let cur = curHeight*(j-i);
        if(cur > max){
            max = cur;
            L = i;
            R = j;
        }
        if(curHeight==height[i])i++;
        else j--;
    }
    return max;
};