/**
 * [LeetCode 3112] Minimum Time to Visit Disappearing Nodes
 *
 * 무방향 가중치 그래프에서 0번 노드에서 출발해 각 노드까지의 최소 도달 시간을 구한다.
 * 단, 노드 i는 disappear[i] 시각에 사라지므로 도착 시간이 disappear[i]보다 작아야 방문 가능하다.
 * 도달 불가능한 노드는 -1로 반환한다.
 *
 * 풀이 아이디어:
 * - 우선순위 큐(최소 힙)를 이용한 다익스트라 변형
 * - 더 짧은 시간으로 도달 가능하고, 해당 노드가 사라지기 전이면 거리 갱신
 */

/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} disappear
 * @return {number[]}
 */
var minimumTime = function(n, edges, disappear) {
    // minTime[i]: 0번 노드에서 i번 노드까지의 현재까지 알려진 최소 도달 시간
    const minTime = new Array(n).fill(Number.MAX_SAFE_INTEGER);
    minTime[0] = 0;

    // [from, to, weight] 형태의 간선을 기준으로 weight가 작은 순으로 꺼내기 위한 최소 힙
    const minHeap = new Heap((e1, e2) => e1[2] > e2[2]);

    // 인접 리스트 구성 (무방향 그래프이므로 양방향으로 저장)
    const graph = new Map();
    for (let i = 0; i < edges.length; i++) {
        const edge = edges[i];
        graph.get(edge[0])?.push(edge) || graph.set(edge[0], [edge]);
        graph.get(edge[1])?.push([edge[1], edge[0], edge[2]]) || graph.set(edge[1], [[edge[1], edge[0], edge[2]]]);
    }

    // 시작 노드(0)에서 나가는 간선들을 초기 후보로 삽입
    graph.get(0).forEach(edge => minHeap.insert(edge));

    while (!minHeap.isEmpty()) {
        const edge = minHeap.pop();
        const start = edge[0];
        const dest = edge[1];
        const edgeWeight = edge[2];
        const arriveTime = minTime[start] + edgeWeight;
        
        // 더 빠르게 도착 가능하고, 도착 시점에 목적지 노드가 아직 사라지지 않았다면 갱신
        if (arriveTime < minTime[dest] && arriveTime < disappear[dest]) {
            minTime[dest] = arriveTime;
            graph.get(dest).forEach(edge => minHeap.insert(edge));
        }
    }

    console.log(minTime);
    return minTime.map(time => time === Number.MAX_SAFE_INTEGER ? -1 : time);
};

minimumTime(3, [[0,1,2],[1,2,1],[0,2,4]], [1,3,5]);