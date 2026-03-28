/**
 * [BOJ 1926] 그림
 *
 * n × m 크기의 도화지에 1(칠해진 부분)과 0(칠해지지 않은 부분)으로 이루어진 그림이 있다.
 * 상하좌우로 연결된 1들의 집합을 하나의 그림으로 볼 때,
 * 그림의 수와 가장 넓은 그림의 넓이를 출력하라.
 *
 * 제한사항:
 * 1 <= n, m <= 500
 * 도화지의 각 칸의 값은 0 또는 1
 *
 * 풀이: DFS를 이용한 연결 컴포넌트 탐색
 * - 아직 방문하지 않은 1을 발견할 때마다 새로운 그림 발견 → count 증가
 * - DFS로 상하좌우 인접한 1들을 모두 방문하며 넓이를 누적
 * - 방문한 셀은 -1로 마킹하여 재방문 방지
 * - 시간복잡도: O(n * m)
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ1926.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

const [n, m] = input[0].split(" ").map(Number);
const DIRS = [[-1, 0], [1, 0], [0, 1], [0, -1]]; // 상하우좌
const paint = [];
for (const line of input.slice(1)) {
    paint.push(line.split(" ").map(Number));
}

let count = 0;   // 그림의 수
let maxArea = 0; // 가장 넓은 그림의 넓이
for (let row = 0; row < n; row++) {
    for (let col = 0; col < m; col++) {
        // 아직 방문하지 않은 칠해진 셀 발견 → 새로운 그림
        if (paint[row][col] > 0) {
            maxArea = Math.max(maxArea, dfs(row, col, 0));
            count++;
        }
    }
}
console.log(`${count}\n${maxArea}`);

// DFS로 현재 그림에 속한 모든 셀을 방문하고 넓이를 반환
function dfs(row, col, area) {
    paint[row][col] = -1; // 방문 처리 (재방문 방지)
    area++;

    for (const [dr, dc] of DIRS) {
        const nr = row + dr;
        const nc = col + dc;
        if (nr < 0 || nc < 0 || nr >= n || nc >= m) continue; // 범위 초과
        if (paint[nr][nc] !== 1) continue; // 빈 칸(0) 또는 이미 방문한 칸(-1) 제외
        area = dfs(nr, nc, area);
    }

    return area;
}