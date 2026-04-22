/**
 * [LeetCode 2352] Equal Row and Column Pairs
 *
 * n x n 정수 행렬 grid가 주어질 때,
 * row i와 column j의 원소가 순서까지 완전히 같은 (i, j) 쌍의 개수를 구한다.
 *
 * 제한사항:
 * n == grid.length == grid[i].length
 * 1 <= n <= 200
 * 1 <= grid[i][j] <= 10^5
 *
 * 풀이:
 * 행/열 배열을 문자열 키로 직렬화해서 빈도를 센다.
 * - 같은 키에 대해 [rowCount, colCount]를 누적
 * - 최종적으로 각 키마다 rowCount * colCount를 더하면 정답
 * - 시간복잡도: O(n^2)
 * - 공간복잡도: O(n^2)
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var equalPairs = function(grid) {
    // key: 직렬화된 배열, value: [해당 배열과 같은 행 개수, 열 개수]
    const frequencyBySignature = new Map();

    for (let i = 0; i < grid.length; i++) {
        const rowSignature = JSON.stringify(grid[i]);
        if (frequencyBySignature.has(rowSignature)) frequencyBySignature.get(rowSignature)[0]++;
        else frequencyBySignature.set(rowSignature, [1, 0]);
        
        const colSignature = JSON.stringify(grid.map(row => row[i]));
        if (frequencyBySignature.has(colSignature)) frequencyBySignature.get(colSignature)[1]++;
        else frequencyBySignature.set(colSignature, [0, 1]);
    }

    let answer = 0;
    // 같은 시그니처를 가진 행/열 조합 수를 누적
    for (const [rowCount, colCount] of frequencyBySignature.values()) {
        answer += rowCount * colCount;
    }

    return answer;
};

equalPairs([[3,1,2,2],[1,4,4,5],[2,4,2,2],[2,4,2,2]])