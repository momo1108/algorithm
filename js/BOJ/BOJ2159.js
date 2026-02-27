const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ2159.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

/**
 * [BOJ 2159 - 케이크 배달]
 *
 * N개의 배달 장소가 순서대로 주어지고, 배달원은 각 장소에서
 * 정확한 위치 또는 인접한 4방향 중 한 곳에 설 수 있다 (총 5가지).
 * 출발 위치에서 시작하여 모든 배달 장소를 순서대로 방문할 때
 * 누적 이동 거리(맨해튼 거리)의 합을 최소화한다.
 *
 * [풀이 방법 - DP]
 * dp[i][dir] = i번째 배달 장소에서 dir 방향 오프셋 위치에 서 있을 때의 최소 누적 이동 거리
 *
 * 전이식: dp[i][dir] = min(dp[i-1][prevDir] + dist(prevPos, curPos))
 *   - prevPos: (i-1)번째 배달 위치 + prevDir 오프셋
 *   - curPos :  i번째 배달 위치 + dir 오프셋
 *
 * DIR[0] = 제자리, DIR[1~4] = 우/상/좌/하 방향 오프셋
 */
const N = parseInt(input[0]);
const startPos = input[1].split(" ").map(Number);
const deliveries = input.slice(2).map(line => line.split(" ").map(Number));

// dp[i][dir]: i번째 배달 장소에서 dir번째 위치에 섰을 때의 최소 누적 이동 거리
const dp = Array.from({length: N}, () => new Array(5).fill(Number.MAX_SAFE_INTEGER));

// 5가지 위치 오프셋: [제자리, 오른쪽, 위, 왼쪽, 아래]
const DIR = [[0, 0], [1, 0], [0, 1], [-1, 0], [0, -1]];

// 첫 번째 배달 장소 초기화: 출발 위치에서 5가지 서는 위치까지의 맨해튼 거리
const [x0, y0] = deliveries[0];
for (let dir = 0; dir < 5; dir++) {
    const [dx, dy] = DIR[dir];
    const nx = x0 + dx, ny = y0 + dy;
    // 좌표 범위를 벗어나면 해당 위치 사용 불가
    if (!isInBounds(nx, ny)) continue;
    dp[0][dir] = getManhattanDistance(startPos, [nx, ny]);
}

// 두 번째 배달 장소부터 순서대로, 이전 장소의 모든 경우를 고려하여 최솟값 갱신
for (let i = 1; i < deliveries.length; i++) {
    const [cx, cy] = deliveries[i];

    for (let dir = 0; dir < 5; dir++) {
        // 현재 배달 위치에서 dir 방향 오프셋에 선 좌표
        const nx = cx + DIR[dir][0], ny = cy + DIR[dir][1];
        if (!isInBounds(nx, ny)) continue;

        for (let prevDir = 0; prevDir < 5; prevDir++) {
            if (dp[i - 1][prevDir] === Number.MAX_SAFE_INTEGER) continue;
            // 이전 배달 위치에서 prevDir 방향 오프셋에 선 좌표
            const px = deliveries[i - 1][0] + DIR[prevDir][0];
            const py = deliveries[i - 1][1] + DIR[prevDir][1];
            const distance = getManhattanDistance([px, py], [nx, ny]);
            dp[i][dir] = Math.min(dp[i][dir], dp[i - 1][prevDir] + distance);
        }
    }
}

// N번째 배달 장소의 5가지 위치 중 최솟값 출력
console.log(Math.min(...dp[N - 1]));

/**
 * 두 좌표 사이의 맨해튼 거리를 반환한다.
 * @param {number[]} pos1 - [x1, y1]
 * @param {number[]} pos2 - [x2, y2]
 * @returns {number} 맨해튼 거리
 */
function getManhattanDistance(pos1, pos2) {
    return Math.abs(pos1[0] - pos2[0]) + Math.abs(pos1[1] - pos2[1]);
}

/**
 * 좌표가 유효한 범위(1 이상 100000 이하) 내에 있는지 확인한다.
 */
function isInBounds(x, y) {
    return x > 0 && x <= 100000 && y > 0 && y <= 100000;
}