const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ16988.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

const [N, M] = input[0].split(" ").map(value => parseInt(value));
const map = [];

for (const line of input.slice(1)) {
    map.push(line.split(" ").map(value => parseInt(value)));
}

/**
 * 결국 dfs 로 상대 돌의 영역을 찾아내는 문제이다.
 * 다만 상대 돌의 영역을 찾아낼 때, 영역 내의 돌 각각 상하좌우로 빈곳이 있는지 체크한다.
 * 결과적으로 한 영역의 각 돌에대한 빈곳의 개수의 총 합이 2개 이하여야만 
 * 죽일 수 있는 돌의 개수로서 카운팅할 수 있다.
 * 
 * 백돌 1개로 흑돌을 먹을 수 있는 경우, 백돌 2개로 흑돌을 먹을 수 있는 경우의 정보를
 * 2개의 배열로 나누어 저장한다.
 */

let visitEnemyStone = Array(N).fill(null).map(()=>Array(M).fill(false));
let visitEmpty = Array(N).fill(null).map(()=>Array(M).fill(false));

const DIRS = [[-1, 0], [0, -1], [1, 0], [0, 1]];
// 영역의 다음 위치를 찾아주는 함수
const getNextLocation = (row, col) => {
    const nextLocation = [];
    
    for (const [dr, dc] of DIRS) {
        const [nr, nc] = [row + dr, col + dc];
        if (nr >= N || nr < 0 || nc >= M || nc < 0) continue;
        nextLocation.push([nr, nc]);
    }

    return nextLocation;
}

let stoneCount = 0;
let emptyLocations = [];
const dfs = (row, col) => {
    if (map[row][col] === 0) {
        visitEmpty[row][col] = true;
        emptyLocations.push([row, col]);
        return; // 빈칸인 경우 개수만 확인 후 다음 영역은 볼필요없음.
    }
    else {
        visitEnemyStone[row][col] = true;
        stoneCount++;
    }

    for (const [nr, nc] of getNextLocation(row, col)) {
        if (visitEnemyStone[nr][nc] || visitEmpty[nr][nc]) continue;
        if (map[nr][nc] !== 1) dfs(nr, nc)
    }
}

let answer = 0;
const oneEmptyCountArray = Array(N * M).fill(0);
const twoEmptyCountArray = Array(N * M).fill(null)
                            .map(() => Array(N * M).fill(0));

for (let row = 0; row < N; row++) {
    for (let col = 0; col < M; col++) {
        if (map[row][col] === 2 && !visitEnemyStone[row][col]) {
            // 카운팅 관련 정보 초기화
            stoneCount = 0;
            emptyLocations = [];
            // 빈 공간은 다른 영역에서도 다시 사용될 수 있으니 초기화
            visitEmpty = Array(N).fill(null).map(()=>Array(M).fill(false));

            // 카운팅 실행
            dfs(row, col);

            // 돌 영역 주위에 빈칸이 0개인 경우, 정답에 바로 누적
            if (emptyLocations.length === 0) answer += stoneCount;
            // 빈칸이 1개인 경우, 빈칸 1개 전용 배열에 흑돌 영역 크기 저장
            else if (emptyLocations.length === 1) {
                const [er, ec] = emptyLocations[0];
                oneEmptyCountArray[er * M + ec] += stoneCount;
            } 
            // 빈칸이 2개인 경우, 빈칸 2개 전용 배열에 흑돌 영역 크기 저장
            else if (emptyLocations.length === 2) {
                const [er1, ec1] = emptyLocations[0];
                const [er2, ec2] = emptyLocations[1];
                twoEmptyCountArray[er1 * M + ec1][er2 * M + ec2] += stoneCount;
                twoEmptyCountArray[er2 * M + ec2][er1 * M + ec1] += stoneCount;
            }
        }
    }
}

/**
 * 1. 이제 모든 위치에서 빈칸을 채울 위치 2개를 고른다.
 * 2. 고른 위치에 돌을 놓으면 몇개의 흑돌을 먹을 수 있는지 배열 2개를 확인해본다.
 * 
 * 위 과정을 빈칸 2개를 고를 수 있는 모든 경우의 수에 대해 반복한다.
 */
let count = 0;

// 예외처리) 빈칸이 1개밖에 없는 경우는 먼저 계산한다.
for (let location1 = 0; location1 < N * M - 1; location1++) {
    const [row, col] = [Math.floor(location1 / M), location1 % M];
    if (map[row][col] !== 0) continue;
    count = Math.max(count, oneEmptyCountArray[location1]);
}

for (let location1 = 0; location1 < N * M - 1; location1++) {
    const [row1, col1] = [Math.floor(location1 / M), location1 % M];
    if (map[row1][col1] !== 0) continue;

    for (let location2 = location1 + 1; location2 < N * M; location2++) {
        const [row2, col2] = [Math.floor(location2 / M), location2 % M];
        if (map[row2][col2] !== 0) continue;

        const oneEmptyCount = 
            oneEmptyCountArray[location1] + oneEmptyCountArray[location2];
        const twoEmptyCount = twoEmptyCountArray[location1][location2];
        count = Math.max(count, oneEmptyCount + twoEmptyCount);
    }
}

answer += count;
console.log(answer);