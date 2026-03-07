/**
 * [BOJ 11657] 타임머신
 * 
 * N개의 도시와 M개의 버스 노선이 주어진다.
 * A번 도시에서 B번 도시로 가는데 걸리는 시간이 C(음수 가능)라고 할 때,
 * 1번 도시에서 나머지 도시로 가는 가장 빠른 시간을 구하라.
 * 만약 시간을 무한히 오래 전으로 되돌릴 수 있다면 -1을 출력한다.
 * 
 * 제한사항:
 * 2 <= N <= 500 (도시의 개수)
 * 1 <= M <= 6,000 (버스 노선의 개수)
 * -10,000 <= C <= 10,000 (걸리는 시간, 음수 가능)
 * 
 * 풀이:
 * 벨만-포드(Bellman-Ford) 알고리즘
 * - 음수 가중치가 있는 그래프에서 최단 경로를 찾는 알고리즘
 * - N-1번 반복하며 모든 간선을 완화(relaxation)
 * - N번째 반복에서도 거리가 갱신되면 음수 사이클 존재
 * - 시간복잡도: O(N * M)
 * - 공간복잡도: O(N + M)
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ11657.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

const [N, ] = input[0].split(" ").map(Number);
// 각 도시까지의 최단 거리를 저장하는 배열
const distanceArray = new Array(N + 1).fill(Number.MAX_SAFE_INTEGER);

// 모든 간선 정보를 저장 [출발 도시, 도착 도시, 소요 시간]
const edges = input.slice(1).map(line => line.split(" ").map(Number));

// 1번 도시에서 시작하여 벨만-포드 알고리즘 실행
const hasNegativeCycle = bellmanFord(1);

// 음수 사이클이 존재하면 -1 출력
if (hasNegativeCycle) console.log(-1);
else {
    // 2번부터 N번 도시까지의 최단 거리 출력
    const answer = [];
    for (let dest = 2; dest <= N; dest++) {
        // 도달할 수 없는 도시는 -1
        if (distanceArray[dest] === Number.MAX_SAFE_INTEGER) answer.push(-1);
        else answer.push(distanceArray[dest])
    }
    console.log(answer.join("\n"));
}

/**
 * 벨만-포드 알고리즘을 이용한 최단 경로 탐색
 * @param {number} start - 시작 도시 번호
 * @return {boolean} - 음수 사이클이 존재하면 true, 아니면 false
 */
function bellmanFord(start) {
    // 시작 도시의 거리는 0으로 초기화
    distanceArray[start] = 0;

    let fromNode, toNode, travelTime;
    
    // N번 반복 (N-1번은 최단 경로 갱신, N번째는 음수 사이클 확인)
    for (let round = 0; round < N; round++) {
        // 모든 간선에 대해 완화(relaxation) 수행
        for (const edge of edges) {
            fromNode = edge[0];  // 출발 도시
            toNode = edge[1];    // 도착 도시
            travelTime = edge[2]; // 소요 시간

            // 출발 도시에 도달 가능하고, 더 짧은 경로를 발견한 경우
            if (
                distanceArray[fromNode] < Number.MAX_SAFE_INTEGER && 
                distanceArray[toNode] > distanceArray[fromNode] + travelTime
            ) {
                // 최단 거리 갱신
                distanceArray[toNode] = distanceArray[fromNode] + travelTime;

                // N번째 반복에서도 갱신이 일어나면 음수 사이클 존재
                if (round === N - 1) return true;
            }
        }
    }

    // 음수 사이클이 없음
    return false;
}