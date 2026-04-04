/**
 * [BOJ 1865] 웜홀
 *
 * N개의 지점, M개의 양방향 도로, W개의 단방향 웜홀이 있다.
 * 웜홀은 도착 시 출발 시점보다 시간이 줄어드는 특수한 간선이다(음수 가중치).
 * 어떤 지점에서 출발하여 다시 출발 지점으로 돌아왔을 때 시간이 되돌아가 있는
 * 경우(음수 사이클)가 존재하는지 판별하라.
 *
 * 제한사항:
 * 1 ≤ TC ≤ 5
 * 1 ≤ N ≤ 500, 1 ≤ M ≤ 2500, 1 ≤ W ≤ 200
 * 간선 가중치 T: 1 ≤ T ≤ 10000
 *
 * 풀이:
 * 벨만-포드 알고리즘을 이용한 음수 사이클 탐지
 * - 도로는 양방향이므로 양쪽 방향 모두 간선으로 추가, 웜홀은 음수 가중치로 추가
 * - dist를 0으로 초기화: 어느 지점에서든 출발 가능하므로 가상의 소스에서
 *   모든 노드까지 비용 0인 경로가 존재하는 것으로 처리
 * - N-1번 완화 후에도 N번째 라운드에서 갱신이 발생하면 음수 사이클 존재
 * - 시간복잡도: O(TC × N × (M + W))
 * - 공간복잡도: O(N + M + W)
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ1865.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

let T = +input[0];
let i = 1;

const answer = [];
while (T > 0) {
    const [N, M, W] = input[i].split(" ").map(Number);
    const roads = input.slice(i + 1, i + 1 + M).map(line => line.split(" ").map(Number));
    const wormholes = input.slice(i + 1 + M, i + 1 + M + W).map(line => line.split(" ").map(Number));

    // 모든 간선을 하나의 배열로 통합
    // 도로는 양방향이므로 두 방향 모두 추가, 웜홀은 음수 가중치로 추가
    const edges = [];
    for (const r of roads) {
        edges.push(r);
        edges.push([r[1], r[0], r[2]]);
    }
    for (const w of wormholes) {
        edges.push([w[0], w[1], -w[2]]);
    }

    // dist를 0으로 초기화: 어느 노드에서든 출발 가능하므로 전체 소스로 간주
    const dist = new Array(N + 1).fill(0);
    let hasNegativeCycle = false;

    // 벨만-포드: N번 반복하여 N번째에서도 갱신이 발생하면 음수 사이클 존재
    for (let round = 1; round <= N; round++) {
        for (const e of edges) {
            const start = e[0];
            const end = e[1];
            const cost = e[2];

            if (dist[end] > dist[start] + cost) {
                dist[end] = dist[start] + cost;

                // N번째 라운드에서도 갱신이 발생 = 음수 사이클 존재
                if (round === N) hasNegativeCycle = true;
            }
        }
    }

    answer.push(hasNegativeCycle ? "YES" : "NO");

    i = i + 1 + M + W;
    T--;
}

console.log(answer.join("\n"));