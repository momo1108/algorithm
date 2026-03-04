/**
 * [LeetCode 1424] Diagonal Traverse II
 * 
 * 2D 배열 nums가 주어진다. (각 행의 길이가 다를 수 있는 jagged array)
 * 대각선 순서로 배열의 모든 원소를 순회하여 반환하라.
 * 대각선은 왼쪽 아래에서 오른쪽 위로 진행한다.
 * 
 * 제한사항:
 * 1 <= nums.length <= 10^5
 * 1 <= nums[i].length <= 10^5
 * 1 <= sum(nums[i].length) <= 10^5
 * 1 <= nums[i][j] <= 10^5
 * 
 * 풀이:
 * 대각선 합(row + col)을 이용한 정렬
 * - 같은 대각선에 있는 원소들은 (row + col) 값이 동일함
 * - 대각선 내에서는 행 번호가 큰 원소부터 출력 (왼쪽 아래 -> 오른쪽 위)
 * - 모든 원소를 [row, col, value] 형태로 저장 후 정렬
 * - 정렬 기준: 1) 대각선 합 오름차순 2) 행 번호 내림차순
 * - 시간복잡도: O(N log N) - N은 전체 원소의 개수
 * - 공간복잡도: O(N) - 모든 원소를 저장
 */

/**
 * @param {number[][]} nums
 * @return {number[]}  */
var findDiagonalOrder = function(nums) {
    // 모든 원소를 [row, col, value] 형태로 저장
    const elements = [];

    for (let row = 0; row < nums.length; row++) {
        for (let col = 0; col < nums[row].length; col++) {
            elements.push([row, col, nums[row][col]]);
        }
    }

    // 대각선 순서로 정렬
    // 1순위: 대각선 합(row + col) 오름차순
    // 2순위: 같은 대각선 내에서는 행 번호 내림차순 (왼쪽 아래부터)
    elements.sort((a, b) => {
        const diagonalSum1 = a[0] + a[1];
        const diagonalSum2 = b[0] + b[1];
        
        if (diagonalSum1 !== diagonalSum2) {
            // 대각선 합이 다르면 오름차순
            return diagonalSum1 - diagonalSum2;
        } else {
            // 같은 대각선이면 행 번호 내림차순
            return b[0] - a[0];
        }
    })

    // 정렬된 원소들에서 값만 추출하여 반환
    const answer = elements.map(element => element[2]);
    
    return answer;
};

findDiagonalOrder([[1,2,3],[4,5,6],[7,8,9]])