/**
 * [BOJ 1922] 네트워크 연결
 * 
 * N개의 컴퓨터와 M개의 연결 비용이 주어진다.
 * 모든 컴퓨터를 연결하는데 필요한 최소 비용을 구하라.
 * 
 * 제한사항:
 * 1 <= N <= 1,000 (컴퓨터의 수)
 * 1 <= M <= 100,000 (연결선의 수)
 * 연결 비용은 1 이상 10,000 이하
 * 
 * 풀이:
 * 크루스칼(Kruskal) 알고리즘 - 최소 신장 트리(MST)
 * - 모든 간선을 가중치 기준 오름차순으로 정렬
 * - 사이클을 형성하지 않는 간선부터 하나씩 선택 (Union-Find 활용)
 * - N-1개의 간선이 선택되면 모든 노드가 연결됨
 * - 시간복잡도: O(M log M) - 간선 정렬
 * - 공간복잡도: O(N + M)
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ1922.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

const N = parseInt(input[0]);

// Union-Find를 위한 부모 배열 초기화 (각 노드의 부모는 자기 자신)
const parentArray = Array.from({length: N + 1}, (_, i) => i);

// 모든 간선 정보를 저장 [노드1, 노드2, 비용]
const edges = []
for (const line of input.slice(2)) {
    const edge = line.split(" ").map(Number);
    edges.push(edge);
}

// 간선을 비용 기준 오름차순으로 정렬 (크루스칼 알고리즘의 핵심)
edges.sort((edge1, edge2) => edge1[2] - edge2[2]);

let totalCost = 0;
let node1, node2, cost;

// 비용이 적은 간선부터 확인하며 사이클을 만들지 않으면 선택
for (const edge of edges) {
    node1 = edge[0];
    node2 = edge[1];
    cost = edge[2];

    union(node1, node2, cost);
}

console.log(totalCost);

/**
 * 두 노드를 연결하는 함수 (Union 연산)
 * @param {number} node1 - 첫 번째 노드
 * @param {number} node2 - 두 번째 노드
 * @param {number} cost - 연결 비용
 */
function union(node1, node2, cost) {
    // 각 노드가 속한 집합의 루트를 찾음
    const parent1 = findParent(node1);
    const parent2 = findParent(node2);

    // 이미 같은 집합에 속해있으면 연결하지 않음 (사이클 방지)
    if (parent1 === parent2) return;

    // 두 집합을 합침 (작은 번호를 부모로 설정)
    if (parent1 < parent2) parentArray[parent2] = parent1;
    else parentArray[parent1] = parent2;
    
    // 간선을 선택했으므로 비용 추가
    totalCost += cost;
}

/**
 * 노드의 루트(부모)를 찾는 함수 (Find 연산)
 * 경로 압축(Path Compression) 최적화 적용
 * @param {number} node - 루트를 찾을 노드
 * @return {number} - 노드의 루트
 */
function findParent(node) {
    // 경로 압축: 루트까지 가는 모든 노드의 부모를 루트로 직접 연결
    if (parentArray[node] !== node) {
        parentArray[node] = findParent(parentArray[node]);
    }
    return parentArray[node];
}
