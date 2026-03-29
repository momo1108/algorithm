/**
 * [BOJ 1915] 가장 큰 정사각형
 *
 * n×m의 0, 1로 된 배열이 있다. 1로 된 가장 큰 정사각형의 넓이를 구하라.
 *
 * 제한사항:
 * 1 ≤ n, m ≤ 1,000
 *
 * 풀이:
 * DP (오른쪽 하단에서 왼쪽 상단 방향으로 순회)
 * - DP[i][j]: (i, j)를 왼쪽 상단 꼭짓점으로 하는 정사각형의 최대 한 변의 길이
 * - 점화식: DP[i][j] = min(DP[i+1][j], DP[i][j+1], DP[i+1][j+1]) + 1
 *   오른쪽, 아래, 오른쪽 아래 세 방향이 모두 k짜리 정사각형을 이룰 수 있어야
 *   현재 위치에서 k+1짜리 정사각형이 가능하다
 * - 경계(가장 오른쪽 열, 가장 아래 행)는 확장 불가하므로 변의 길이 그대로 유지
 * - 넓이 = 변의 길이^2 이므로 최대 변의 길이의 제곱을 출력
 * - 시간복잡도: O(n * m)
 * - 공간복잡도: O(n * m) (입력 배열을 DP 테이블로 재사용)
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ1915.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

const [n, m] = input[0].split(" ").map(Number);

// 입력 배열을 DP 테이블로 재사용 (DP[i][j]: (i,j)를 좌상단으로 하는 최대 정사각형의 변의 길이)
const DP = input.slice(1).map(line => line.split("").map(Number));

let maxArea = 0;

// 오른쪽 하단에서 왼쪽 상단 방향으로 순회하며 점화식 적용
for (let row = n - 1; row >= 0; row--) {
    for (let col = m - 1; col >= 0; col--) {
        if (DP[row][col] === 0) continue;
        // 우측, 하단, 우측 하단 이웃 셀 중 최소 변의 길이 (경계 셀은 확장 불가하므로 0)
        let minNeighborSide = 0;
        if (row < n - 1 && col < m - 1) {
            minNeighborSide = 1000;
            minNeighborSide = Math.min(minNeighborSide, DP[row + 1][col]);
            minNeighborSide = Math.min(minNeighborSide, DP[row][col + 1]);
            minNeighborSide = Math.min(minNeighborSide, DP[row + 1][col + 1]);
        }
        DP[row][col] += minNeighborSide;
        maxArea = Math.max(maxArea, DP[row][col] ** 2);
    }
}

console.log(maxArea);