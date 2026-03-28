/**
 * [BOJ 1647] 도시 분할 계획
 *
 * N개의 집과 M개의 길로 이루어진 마을을 두 개의 분리된 마을로 분할한다.
 * 분할된 각 마을 안에서 임의의 두 집 사이에 경로가 항상 존재해야 하며,
 * 남은 길의 유지비 합을 최소화하는 값을 구하라.
 *
 * 제한사항:
 * 2 <= N <= 100,000 (집의 개수)
 * 1 <= M <= 1,000,000 (길의 개수)
 * 1 <= C <= 1,000 (길의 유지비)
 * 임의의 두 집 사이에 경로가 항상 존재하는 입력만 주어짐
 *
 * 풀이: Kruskal 알고리즘을 이용한 MST 구성 + 최대 간선 제거
 * - 전체에 대해 MST를 구하면 N개의 노드가 N-1개의 간선으로 연결됨
 * - 마을을 두 개로 분리 = MST에서 간선 하나를 제거하는 것과 동일
 * - 트리의 모든 간선은 bridge이므로, 어떤 간선을 제거해도 정확히 두 컴포넌트로 분리됨
 * - 비용을 최소화하려면 MST 내 가장 비싼 간선을 제거하면 됨
 * - 정답 = MST 총 유지비 - MST 내 최대 유지비
 * - 시간복잡도: O(M log M)
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ1647.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

const [N, M] = input[0].split(" ").map(Number);
// Union-Find 부모 배열: 각 노드의 루트를 추적
const parents = Array.from({length: N + 1}, (_, i) => i);
let totalCost = 0; // MST 총 유지비
let maxCost = 0;   // MST 내 최대 유지비 (제거할 간선)

// Kruskal: 유지비 오름차순으로 정렬 후 처리해야 MST가 만들어짐
const edges = input.slice(1).map(line => line.split(" ").map(Number))
                .sort((e1, e2) => e1[2] - e2[2]);
for (const edge of edges) {
    union(...edge);
}
// MST 총합에서 가장 비싼 간선을 제거한 값이 두 마을의 최소 유지비 합
console.log(totalCost - maxCost);

// 경로 압축(Path Compression)을 적용한 Find 연산
function findParent(node) {
    if (parents[node] !== node) parents[node] = findParent(parents[node]);
    return parents[node];
}

// 두 노드를 같은 집합으로 병합; 이미 같은 집합이면 사이클이므로 무시
function union(node1, node2, cost) {
    const p1 = findParent(node1);
    const p2 = findParent(node2);

    // 두 노드의 루트가 같으면 이미 연결됨 (사이클) → MST에 추가하지 않음
    if (p1 === p2) return;

    if (p1 < p2) parents[p2] = p1;
    else parents[p1] = p2;

    totalCost += cost;
    maxCost = Math.max(maxCost, cost);
}