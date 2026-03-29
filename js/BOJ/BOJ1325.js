/**
 * [BOJ 1325] 효율적인 해킹
 *
 * N개의 컴퓨터로 이루어진 회사가 있고, A가 B를 신뢰하면 B를 해킹할 때 A도 해킹 가능하다.
 * 한 번에 가장 많은 컴퓨터를 해킹할 수 있는 컴퓨터의 번호를 오름차순으로 출력하라.
 *
 * 제한사항:
 * 1 ≤ N ≤ 10,000
 * 1 ≤ M ≤ 100,000
 *
 * 풀이:
 * BFS - 각 노드를 시작점으로 도달 가능한 컴퓨터 수 계산
 * - "A가 B를 신뢰한다"는 B를 해킹하면 A도 해킹됨을 의미하므로 역방향 그래프로 구성
 *   즉, graph[B].push(A) 형태로 저장
 * - 각 노드에서 BFS를 수행해 방문 가능한 노드 수가 최대인 노드들을 답으로 선택
 * - 시간복잡도: O(N * (N + M))
 * - 공간복잡도: O(N + M)
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ1325.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

const [N, M] = input[0].split(" ").map(Number);

// 역방향 인접 리스트: graph[B] = [A1, A2, ...] (B를 신뢰하는 컴퓨터들의 목록)
const graph = Object.fromEntries(Array.from({length: N}, (_, i) => [i + 1, []]));

for (let i = 1; i <= M; i++) {
    // A가 B를 신뢰 → B 해킹 시 A도 해킹 가능 → 역방향 간선: graph[B].push(A)
    const [A, B] = input[i].split(" ").map(Number);
    graph[B].push(A);
}

let maxCount = -1;
const answer = [];
let visited;

// 각 노드를 시작점으로 BFS를 수행해 도달 가능한 컴퓨터 수를 집계
for (let node = 1; node <= N; node++) {
    visited = new Array(N + 1).fill(false);
    visited[node] = true;
    const result = bfs(node);
    if (result > maxCount) {
        maxCount = result;
        answer.length = 0;
        answer.push(node);
    } else if (result === maxCount) answer.push(node);
}

console.log(answer.join(" "));

/**
 * BFS를 이용해 startNode에서 도달 가능한 컴퓨터 수를 반환
 * @param {number} startNode - BFS 시작 노드
 * @return {number} - 방문한 노드 수 (시작 노드 포함)
 */
function bfs(startNode) {
    let nodeCount = 0;
    const queue = [startNode];
    visited[startNode] = true;
    let queueHead = 0;

    while (queueHead < queue.length) {
        const current = queue[queueHead++];
        nodeCount++;

        let next;
        for (let i = 0; i < graph[current].length; i++) {
            next = graph[current][i];
            if (visited[next]) continue;
            visited[next] = true;
            queue.push(next);
        }
    }

    return nodeCount;
}