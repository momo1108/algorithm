const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ5558.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

/**
 * H 행, W 열(둘다 1~1000)인 격자 내에서 쥐가 한칸씩 이동하며 모든 치즈를 먹어야 한다.
 * 치즈는 경도별(1~N)로 한개씩 존재한다.
 * 시작 시점의 취의 체력은 1이고, 치즈를 먹으면 체력이 1 추가된다.
 * 본인 체력을 초과하는 경도의 치즈는 먹을 수 없다.
 * 따라서 1부터 무게 순서대로 모든 치즈를 먹으면 된다.
 * 
 * 모든 치즈들 사이의 최단 거리를 먼저 저장한다. (N * N 개의 거리 정보)
 * 이후 실제로 쥐가 치즈를 먹는 과정을 BFS 를 돌린다.
 * 
 * BFS 시 필요한 정보들을 정리해보면
 * 현재 좌표, 이동 거리 두가지 정도이고 queue 에서 빼내어진 다음 이동 가능 좌표와 이동 거리 + 1 을
 * queue 에 넣는다. 다음 치즈까지 도착하면 종료하고, 그 다음 치즈에 대해 BFS 를 다시 시작한다.
 */

const [H, W, N] = input[0].split(" ").map(value => parseInt(value));
const MAP = input.slice(1).map(line => line.split(""));

// 시작 지점 및 치즈들의 위치를 초기화
const cheeseLocationMap = Object.fromEntries(
  Array.from({ length: N }, (_, i) => [i + 1, null])
);
for (let r = 0; r < H; r++){
    for (let c = 0; c < W; c++){
        if (MAP[r][c] === "S") cheeseLocationMap[0] = [r, c]; // 시작지점을 0번 치즈로 설정

        const parsedTileToInt = parseInt(MAP[r][c]);
        if (Number.isInteger(parsedTileToInt)) cheeseLocationMap[parsedTileToInt] = [r, c];
    }
}

const DIRS = [[1, 0], [0, 1], [-1, 0], [0, -1]];
const findNextLocation = (r, c) => {
    const nextLocationArray = []
    for (const [dr, dc] of DIRS) {
        const [nr, nc] = [r + dr, c + dc];
        if (nr < 0 || nr >= H || nc < 0 || nc >= W) continue;
        nextLocationArray.push([nr, nc]);
    }

    return nextLocationArray;
}

const getMinDistance = (cheeseNumber) => {
    const visit = Array(H).fill(null).map(()=>Array(W).fill(false));
    const startPoint = cheeseLocationMap[cheeseNumber];
    const queue = [[...startPoint, 0]];
    visit[startPoint[0]][startPoint[1]] = true;
    
    while (queue.length > 0) {
        const [r, c, distance] = queue.shift();
        for (const [nr, nc] of findNextLocation(r, c)) {
            if (MAP[nr][nc] === String(cheeseNumber + 1)) return distance + 1;
            if (visit[nr][nc] || MAP[nr][nc] === "X") continue;
            queue.push([nr, nc, distance + 1]);
            visit[nr][nc] = true;
        }
    }
}

let answer = 0;
for (let cheeseNumber = 0; cheeseNumber < N; cheeseNumber++) {
    answer += getMinDistance(cheeseNumber);
}
console.log(answer);