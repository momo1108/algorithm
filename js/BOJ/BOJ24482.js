const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ24482.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

/**
 * 시작 정점으로부터 연결된 다음 정점으로 dfs 한다.
 * 연결된 다음 정점들은 내림차순으로 dfs 에 사용된다.
 * 
 * 시작 정점의 깊이를 0이며, 한번 dfs 로 다음 정점으로 갈 때 마다 깊이가 +1 된다.
 * 
 * 간선의 정보를 객체에 { 정점 : [다음 정점들] } 형태로 저장한다.
 * 
 * 각 정점들은 내림차순으로 한번씩만 방문할 수 있도록 visit 배열에 방문 여부를 저장한다.
 * 
 * dfs 를 진행하며 노드 별 깊이를 저장할 depth 배열을 생성하고 값을 -1 로 초기화한다.
 * (아직 방문하지 않았을 때의 값으로 초기화)
 */
const [N, M, R] = input[0].split(" ").map(value => parseInt(value));
const edges = Object.fromEntries(Array.from({length: N}, (_, i) => [i + 1, []]));
const visit = Array(N + 1).fill(false);
const depthArray = Array(N + 1).fill(-1);

// 무방향 그래프이므로, 간선 정보는 양쪽 노드 모두에 추가한다.
for (const line of input.slice(1)) {
    const [start, end] = line.split(" ").map(value => parseInt(value));
    edges[start].push(end);
    edges[end].push(start);
}

// 내림차순으로 방문하기 위해 노드별 저장된 간선 정보를 내림차순 정렬한다.
for (let node = 1; node <= N; node++) {
    edges[node].sort((n1, n2) => n2 - n1);
}

/**
 * 현재 노드와 깊이를 입력받아 방문 정보와 깊이 정보를 갱신한다.
 * 현재 노두와 연결된 다음 노드들을 내림차순으로 체크하고 dfs를 실행한다.
 * @param {*} node 현재 노드 번호
 * @param {*} depth 현재 노드 깊이
 */
const dfs = (node, depth) => {
    visit[node] = true;
    depthArray[node] = depth;

    for (const nextNode of edges[node]) {
        if (visit[nextNode]) continue;
        dfs(nextNode, depth + 1);
    }
}

dfs(R, 0);

const answer = depthArray.slice(1).join("\n");

console.log(answer);