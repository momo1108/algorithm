/**
 * [BOJ 16234] 인구 이동
 *
 * N x N 격자에서 인접한 두 나라의 인구 차이가 [L, R] 범위면 국경을 연다.
 * 연결된 나라(연합)의 인구를 평균(내림)으로 다시 분배하는 과정을
 * 더 이상 인구 이동이 없을 때까지 반복하고, 총 며칠이 걸리는지 구한다.
 *
 * 풀이:
 * - 하루 단위로 모든 칸을 순회하며 DFS로 연합을 찾는다.
 * - 연합의 총 인구와 칸 수를 이용해 평균 인구를 계산해 한 번에 반영한다.
 * - 하루 동안 단 한 칸이라도 인구가 바뀌면 다음 날을 진행한다.
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ16234.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

const [N, L, R] = input[0].split(" ").map(Number);

const population = input.slice(1).map(line => line.split(" ").map(Number));
let visited = Array.from({ length: N }, () => new Array(N).fill(false));

const DIRECTIONS = [[-1, 0], [0, -1], [1, 0], [0, 1]];
let unionPopulationSum = 0;
let unionCountryCount = 0;
let nextPopulation = 0;
const unionCells = [];
let hasMovement = false;
let days = 0;
while (true) {
    // 새로운 하루 시작: 방문 배열과 상태값 초기화
    unionPopulationSum = 0;
    unionCountryCount = 0;
    hasMovement = false;
    visited = Array.from({ length: N }, () => new Array(N).fill(false));

    // 모든 칸을 돌며 아직 방문하지 않은 칸에서 연합 탐색 시작
    for (let row = 0; row < N; row++) {
        for (let col = 0; col < N; col++) {
            if (visited[row][col]) continue;
            unionCells.length = 0;
            dfs(row, col);
            // 현재 연합의 평균 인구(내림) 계산 후 일괄 반영
            nextPopulation = Math.floor(unionPopulationSum / unionCountryCount);
            applyPopulation(nextPopulation);
            unionPopulationSum = 0;
            unionCountryCount = 0;
        }
    }
    // 하루 동안 인구 이동이 있었으면 날짜 +1, 없으면 종료
    if (hasMovement) days++;
    else break;
}
console.log(days);

function dfs(row, col) {
    const currentPopulation = population[row][col];
    visited[row][col] = true;
    unionCells.push([row, col]);
    unionPopulationSum += currentPopulation;
    unionCountryCount++;

    // 상하좌우 인접 국가를 보며 연합에 포함 가능한지 확인
    for (const [dr, dc] of DIRECTIONS) {
        const nr = row + dr;
        const nc = col + dc;
        if (nr < 0 || nc < 0 || nr >= N || nc >= N || visited[nr][nc]) continue;
        const nextPopulation = population[nr][nc];
        const diff = Math.abs(currentPopulation - nextPopulation);
        if (diff >= L && diff <= R) dfs(nr, nc);
    }
}

function applyPopulation(avgPopulation) {
    // 연합 칸들을 평균 인구로 갱신하고, 실제 변화 여부를 기록
    for (const [r, c] of unionCells) {
        if (population[r][c] !== avgPopulation) hasMovement = true;
        population[r][c] = avgPopulation;
    }
}