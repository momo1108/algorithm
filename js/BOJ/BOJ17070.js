/**
 * [BOJ 17070] 파이프 옮기기 1
 *
 * N x N 집에서 길이 2인 파이프가 처음에 (1, 1)~(1, 2)를 가로로 차지하고 있다.
 * 파이프는 가로, 세로, 대각선 3가지 방향으로 놓일 수 있고,
 * 오른쪽, 아래, 오른쪽 아래 방향으로만 밀 수 있다.
 * 벽이 있는 칸은 지나갈 수 없을 때, 파이프의 한쪽 끝을 (N, N)으로 옮기는 방법의 수를 구하는 문제다.
 *
 * 풀이:
 * DP[row][col][direction]에 파이프의 끝이 (row, col)에 도달하는 경우의 수를 저장한다.
 * - 0: 가로, 1: 세로, 2: 대각선
 * - 현재 방향으로 올 수 있는 이전 상태들만 더해 준다.
 * - 대각선 이동은 현재 칸, 위 칸, 왼쪽 칸이 모두 빈 칸이어야 가능하다.
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/mom/Desktop/algorithm/data/BOJ17070.txt";
const inputLines = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());
const houseSize = +inputLines[0];
const board = inputLines.slice(1).map(line => line.split(" "));

// ways[row][col][direction]: 파이프 끝이 (row, col)에 해당 방향으로 도달하는 경우의 수
const ways = Array.from({ length: houseSize }, () => Array.from({ length: houseSize }, () => new Array(3).fill(0)));

// 시작 상태: 파이프는 (0, 0)~(0, 1)을 가로로 차지한다.
ways[0][1][0] = 1;

for (let row = 0; row < houseSize; row++) {
    for (let col = 1; col < houseSize; col++) {
        // 파이프 끝이 놓일 칸이 벽이면 어떤 방식으로도 도달할 수 없다.
        if (board[row][col] === "1") continue;

        // 가로 끝점으로 오는 경우: 왼쪽 칸에서 가로 또는 대각선 상태여야 한다.
        ways[row][col][0] += ways[row][col - 1][0];
        ways[row][col][0] += ways[row][col - 1][2];

        // 세로 끝점으로 오는 경우: 위쪽 칸에서 세로 또는 대각선 상태여야 한다.
        if (row >= 1) {
            ways[row][col][1] += ways[row - 1][col][1];
            ways[row][col][1] += ways[row - 1][col][2];
        }

        // 대각선 끝점으로 오는 경우: 현재 칸 기준 위, 왼쪽 칸도 모두 비어 있어야 한다.
        if (row >= 1 && board[row - 1][col] !== "1" && board[row][col - 1] !== "1") {
            ways[row][col][2] += ways[row - 1][col - 1][0];
            ways[row][col][2] += ways[row - 1][col - 1][1];
            ways[row][col][2] += ways[row - 1][col - 1][2];
        }
    }
}

console.log(ways[houseSize - 1][houseSize - 1].reduce((sum, count) => sum + count, 0));