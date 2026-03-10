/**
 * [BOJ 9019] DSLR
 *
 * 0 이상 9999 이하의 정수를 저장하는 레지스터 A에 대해 4가지 연산이 있다.
 *   D: A를 2배한다. 결과가 10000 이상이면 10000으로 나눈 나머지를 저장.
 *   S: A에서 1을 뺀다. A가 0이면 9999가 된다.
 *   L: A의 각 자릿수를 왼쪽으로 한 칸씩 회전한다. (1000의 자리 → 1의 자리)
 *   R: A의 각 자릿수를 오른쪽으로 한 칸씩 회전한다. (1의 자리 → 1000의 자리)
 *
 * 초기값 A를 목표값 B로 바꾸는 최소 연산 문자열을 구하라.
 *
 * 제한사항:
 * - 테스트 케이스 T (1 ≤ T ≤ 100)
 * - 0 ≤ A, B ≤ 9999
 *
 * 풀이:
 * BFS (너비 우선 탐색) + 경로 역추적
 * - 0~9999 사이의 모든 숫자를 노드로, 4가지 연산을 간선으로 보는 그래프
 * - BFS로 start에서 end까지 최단 경로를 탐색
 * - parent[next] = [cur, command] 에 직전 노드와 사용한 명령어를 기록하여
 *   도착 후 end에서 start까지 역추적하는 방식으로 경로를 복원
 * - 그래프(각 노드의 인접 노드)를 미리 전처리하여 탐색 속도 향상
 * - 시간복잡도: O(T × 10000)
 * - 공간복잡도: O(10000)
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ9019.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

// 전처리: 각 숫자에 D, S, L, R 연산을 적용한 결과를 인접 리스트로 저장
// graph[n][0] = D 결과, [1] = S 결과, [2] = L 결과, [3] = R 결과
const graph = Array.from({length: 10001}, () => []);
for (let n = 0; n < 10000; n++) {
    graph[n].push((n * 2) % 10000);                                      // D
    graph[n].push((n + 9999) % 10000);                                   // S
    graph[n].push((n * 10) % 10000 + Math.floor(n / 1000));              // L
    graph[n].push(parseInt(n / 10) + (n % 10) * 1000);                  // R
}

let parent;
for (const line of input.slice(1)) {
    const [start, end] = line.split(" ").map(Number);

    // var를 사용하는 이유: bfs()가 모듈 스코프 함수이므로
    // for-loop 블록 내 let/const에는 접근할 수 없기 때문
    parent = new Array(10001);

    bfs(start, end);

    // end에서 start까지 parent 배열을 역추적하며 명령어 복원
    let answer = "";
    let cur = end;
    while (cur !== start) {
        answer += parent[cur][1];
        cur = parent[cur][0];
    }
    // 역순으로 쌓인 명령어를 뒤집어 출력
    console.log(answer.split("").reverse().join(""));
}

function bfs(start, end) {
    const COMMAND = "DSLR";
    const visited = new Array(10001).fill(false);
    visited[start] = true;
    const queue = [start];
    let qHead = 0;

    while (qHead < queue.length) {
        const cur = queue[qHead++];

        for (let i = 0; i < 4; i++) {
            const next = graph[cur][i];
            if (next === cur || visited[next]) continue;
            visited[next] = true;
            queue.push(next);
            // 직전 노드와 사용한 명령어를 기록 (경로 역추적용)
            parent[next] = [cur, COMMAND[i]];
            if (next === end) return;
        }
    }
}