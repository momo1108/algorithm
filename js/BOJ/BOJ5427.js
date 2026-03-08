/**
 * [BOJ 5427] 불
 *
 * 건물의 지도가 주어지고, 불('*')과 상근이('@')의 위치가 주어진다.
 * 불은 1초마다 상하좌우로 번지고, 상근이도 1초에 한 칸 이동할 수 있다.
 * 상근이가 건물 밖(지도 경계 너머)으로 탈출하는 최소 시간을 구해라.
 * 탈출이 불가능하면 IMPOSSIBLE을 출력한다.
 *
 * 타일: '#' 벽, '.' 빈 공간, '@' 상근이 시작 위치, '*' 불
 *
 * 풀이:
 * 멀티 소스 BFS를 두 번 실행한다.
 * 1. 불 BFS: 각 칸에 불이 도달하는 시간을 map에 기록한다.
 * 2. 상근이 BFS: 불이 자신보다 먼저 도달한 칸은 진입 불가.
 *    지도의 경계 칸에 도달하면 탈출 성공.
 * map의 값 자체를 "해당 칸에 불이 도달하는 시간"으로 활용하므로
 * 별도의 visited 배열이 필요 없다.
 */
const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ5427.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

let T = parseInt(input[0]);

let inputHead = 1;
// 각 타일의 초기 값 (= 해당 칸에 불이 도달하는 시간)
// '.' / '@' : 999999 — 미방문 (충분히 큰 값, BFS로 갱신됨)
// '#'        : -1     — 벽 (진입/갱신 불가)
// '*'        : 0      — 이미 불이 붙어 있음 (시간 0)
const tileValueMap = {
    "." : 999999,
    "#" : -1,
    "@" : 999999,
    "*" : 0
}
const DIR = [[1, 0], [0, 1], [-1, 0], [0, -1]];
while (T-- > 0) {
    const [col, row] = input[inputHead++].split(" ").map(Number);
    const map = [];
    // 큐를 평탄 배열(flat array)로 관리: [위치, 시간, 위치, 시간, ...] 형태
    // 객체 생성 비용을 줄이기 위한 최적화
    const personQ = [];
    const fireQ = [];
    for (let i = 0; i < row; i++) {
        const r = [];
        for (let j = 0; j < col; j++) {
            const ch = input[inputHead][j];
            r.push(tileValueMap[ch]);
            if (ch === "*") {
                fireQ.push([i, j]);
                fireQ.push(0);
            }
            else if (ch === "@") {
                personQ.push([i, j]);
                personQ.push(0);
            }
        }
        map.push(r);
        inputHead++;
    }
    // 1. 불 BFS: map에 각 칸에 불이 도달하는 시간 기록
    bfs(fireQ, map);
    // 2. 상근이 BFS: 불보다 먼저 도달 가능한 칸만 탐색하며 탈출 경로 탐색
    const answer = bfs(personQ, map, true);
    console.log(answer || "IMPOSSIBLE");
}

/**
 * BFS 탐색
 * @param {Array} q          - 초기 큐 (평탄 배열: [위치, 시간, 위치, 시간, ...] 순서)
 * @param {number[][]} map   - 각 칸에 불이 도달하는 시간이 기록된 지도
 * @param {boolean} isPersonBFS - true면 상근이 BFS (탈출 경로 탐색), false면 불 BFS
 * @return {number} - 탈출 시간 (isPersonBFS가 false이거나 탈출 불가인 경우 0)
 */
function bfs(q, map, isPersonBFS = false) {
    let qHead = 0;
    while (qHead < q.length) {
        const location = q[qHead++];
        const time = q[qHead++];
        // 상근이 BFS에서 경계 칸에 도달하면 탈출 성공
        if (isPersonBFS && (location[0] === 0 || location[1] === 0 || location[0] === map.length - 1 || location[1] === map[0].length - 1)) {
            return time + 1;
        }
        for (const d of DIR) {
            const nr = location[0] + d[0];
            const nc = location[1] + d[1];
            if (nr < 0 || nc < 0 || nr >= map.length || nc >= map[0].length) continue;
            // map[nr][nc] <= time + 1 이면: 벽(-1)이거나 이미 같은 시간 이하에 방문/불 도달한 칸
            if (map[nr][nc] <= time + 1) continue;
            map[nr][nc] = time + 1;
            q.push([nr, nc]);
            q.push(time + 1);
        }
    }
    return 0;
}