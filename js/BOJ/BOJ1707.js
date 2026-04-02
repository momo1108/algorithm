/**
 * [BOJ 1707] 이분 그래프
 *
 * 그래프의 정점을 두 집합으로 나눴을 때,
 * 같은 집합에 속한 정점끼리 인접하지 않으면 이분 그래프이다.
 * 각 테스트케이스마다 이분 그래프 여부를 YES/NO로 출력한다.
 *
 * 입력:
 * 첫 줄에 테스트케이스 개수 K
 * 각 테스트케이스 첫 줄에 정점 수 V, 간선 수 E
 * 다음 E줄에 간선 정보 u v (무방향)
 *
 * 출력:
 * 각 테스트케이스가 이분 그래프이면 YES, 아니면 NO
 *
 * 제한:
 * 2 <= K <= 5
 * 1 <= V <= 20,000
 * 1 <= E <= 200,000
 * u != v
 *
 * 풀이:
 * DFS로 연결 요소를 순회하면서 정점을 1, 2 두 색으로 칠한다.
 * - 아직 색이 없는 인접 정점은 반대 색으로 칠하고 재귀 탐색
 * - 인접 정점과 현재 정점의 색이 같아지는 순간 이분 그래프가 아님
 */
const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ1707.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

let testCaseCount = Number(input[0]);

let lineIndex = 1;
const answers = [];
while (testCaseCount-- > 0) {
    const [vertexCount, edgeCount] = input[lineIndex].split(" ").map(Number);
    const graph = Array.from({ length: vertexCount + 1 }, () => []);
    // 0: 미방문, 1/2: 두 그룹(색)
    const colors = new Array(vertexCount + 1);
    const edges = input
        .slice(lineIndex + 1, lineIndex + edgeCount + 1)
        .map(line => line.split(" ").map(Number));

    for (const [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u);
    }

    let isBipartite = "YES";
    for (let node = 1; node <= vertexCount; node++) {
        // 끊어진 그래프일 수 있으므로 모든 정점에서 시작 가능성을 확인한다.
        if (!colors[node]) {
            colors[node] = 1;
            if (!dfs(node, graph, colors)) {
                isBipartite = "NO";
                break;
            }
        }
    }

    answers.push(isBipartite);
    lineIndex += edgeCount + 1;
}
console.log(answers.join("\n"));

function dfs(node, graph, colors) {
    let isValid = true;

    for (const next of graph[node]) {
        if (!colors[next]) {
            colors[next] = colors[node] === 1 ? 2 : 1;
            isValid = dfs(next, graph, colors);
            if (!isValid) break;
        }

        // 인접한 두 정점의 색이 같으면 이분 그래프 조건 위반
        if (colors[next] === colors[node]) {
            isValid = false;
            break;
        }
    }

    return isValid;
}