/**
 * [BOJ 16948] 데스 나이트
 * https://www.acmicpc.net/problem/16948
 * 
 * 문제:
 * 게임을 좋아하는 큐브러버가 체스에서 사용할 새로운 말 "데스 나이트"를 만들었다.
 * 데스 나이트가 있는 곳이 (r, c)라면, 다음 6가지 방향으로 이동할 수 있다:
 * - (r-2, c-1): 위로 2칸, 왼쪽으로 1칸
 * - (r-2, c+1): 위로 2칸, 오른쪽으로 1칸
 * - (r, c-2): 왼쪽으로 2칸
 * - (r, c+2): 오른쪽으로 2칸
 * - (r+2, c-1): 아래로 2칸, 왼쪽으로 1칸
 * - (r+2, c+1): 아래로 2칸, 오른쪽으로 1칸
 * 
 * 크기가 N×N인 체스판과 두 칸 (r1, c1), (r2, c2)가 주어질 때,
 * 데스 나이트가 (r1, c1)에서 (r2, c2)로 이동하는 최소 이동 횟수를 구하라.
 * (데스 나이트는 체스판 밖으로 이동할 수 없다)
 * 
 * 입력:
 * - 첫째 줄: 체스판의 크기 N (5 ≤ N ≤ 200)
 * - 둘째 줄: r1, c1, r2, c2 (0 ≤ r, c < N)
 * 
 * 출력:
 * - 최소 이동 횟수, 또는 이동 불가능하면 -1
 * 
 * 제한사항:
 * - 시간 제한: 2초
 * - 메모리 제한: 512MB
 * 
 * 풀이:
 * BFS를 이용한 최단 경로 탐색
 * - 그래프의 각 간선 가중치가 1이므로 BFS로 최단 경로 구현 가능
 * - 시간복잡도: O(N² × 6) = O(N²)
 * - 공간복잡도: O(N²)
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ16948.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

// 데스 나이트가 이동 가능한 6가지 방향
// [행 변화, 열 변화]
const DIRECTIONS = [[-2, -1], [-2, 1], [0, -2], [0, 2], [2, -1], [2, 1]];
const N = parseInt(input[0]);
const [startRow, startCol, endRow, endCol] = input[1].split(" ").map(Number);

// 방문 여부를 추적하는 2D 배열
const visited = Array.from({ length: N }, () => Array(N).fill(false));

console.log(bfs());

/**
 * BFS를 이용한 최단 경로 탐색
 * @return {number} 최소 이동 횟수 (불가능하면 -1)
 */
function bfs() {
    // 큐: [행, 열, 이동 횟수] 형태로 저장
    const queue = [];
    let queueHead = 0;
    
    queue.push(startRow);
    queue.push(startCol);
    queue.push(0);
    visited[startRow][startCol] = true;

    while (queue.length > queueHead) {
        // 큐에서 현재 위치와 이동 횟수 추출
        const row = queue[queueHead++];
        const col = queue[queueHead++];
        const moves = queue[queueHead++];
        
        // 목표 위치 도달
        if (row === endRow && col === endCol) {
            return moves;
        }

        // 6가지 방향 중 이동 가능한 모든 위치 탐색
        for (const [nextRow, nextCol] of getNextPositions(row, col)) {
            // 이미 방문한 위치는 스킵
            if (visited[nextRow][nextCol]) continue;
            
            // 목표 위치 수확적으로 발견 (이동 횟수 +1)
            if (nextRow === endRow && nextCol === endCol) {
                return moves + 1;
            }
            
            // 큐에 새로운 위치와 이동 횟수 추가
            queue.push(nextRow);
            queue.push(nextCol);
            queue.push(moves + 1);
            visited[nextRow][nextCol] = true;
        }
    }

    // BFS가 끝났는데 목표에 도달하지 못함
    return -1;
}

/**
 * 현재 위치에서 이동 가능한 모든 다음 위치를 반환
 * @param {number} row - 현재 행
 * @param {number} col - 현재 열
 * @return {Array<Array<number>>} 이동 가능한 [행, 열] 배열의 배열
 */
function getNextPositions(row, col) {
    const nextPositions = [];

    for (const [dRow, dCol] of DIRECTIONS) {
        const nextRow = row + dRow;
        const nextCol = col + dCol;

        // 체스판 범위 내에 있는지 확인
        if (nextRow < 0 || nextRow >= N || nextCol < 0 || nextCol >= N) continue;
        
        nextPositions.push([nextRow, nextCol]);
    }

    return nextPositions;
}