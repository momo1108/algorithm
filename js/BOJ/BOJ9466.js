/**
 * [BOJ 9466] 텀 프로젝트
 *
 * n명의 학생이 각자 팀 프로젝트 파트너 한 명을 선택한다.
 * 선택 관계가 사이클을 이루는 학생들끼리 하나의 팀을 구성하며,
 * 어떤 팀에도 속하지 못하는 학생의 수를 구하라.
 *
 * 풀이:
 * 경로 마킹 기반 사이클 탐지 (함수형 그래프)
 * - 각 학생을 노드, 선택 관계를 단방향 간선으로 보면 각 노드의 진출 차수가 1인
 *   함수형 그래프(functional graph)가 된다.
 * - 3가지 상태로 방문 여부를 추적:
 *     0: 미방문
 *     i: 출발 노드 i에서 시작한 경로 위에 있음 (현재 탐색 중)
 *    -1: 처리 완료 (사이클 포함 여부와 무관하게 확인 끝)
 * - 경로를 따라가다 state[cur] === i이면 사이클 발견
 *   → 사이클 내 노드만 -1로 마킹하며 teamCount 증가
 * - state[cur] !== i이고 0이 아니면 이미 처리된 다른 경로이므로 스킵
 * - 시간복잡도: O(n), 공간복잡도: O(n)
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ9466.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

const T = parseInt(input[0]);

const answer = [];
let graph;
for (let t = 0; t < T; t++) {
    const n = +input[t * 2 + 1];
    // 1-indexed로 맞추기 위해 앞에 "0" 패딩
    graph = ("0 " + input[t * 2 + 2]).split(" ").map(Number);

    // 0: 미방문, i: 출발 노드 i의 경로 위에 있음, -1: 처리 완료
    const state = new Int32Array(n + 1);
    let teamCount = 0;

    for (let i = 1; i <= n; i++) {
        if (state[i] !== 0) continue;

        let cur = i;
        // 현재 출발 노드 i의 번호로 경로상 노드를 마킹하며 따라감
        while (state[cur] === 0) {
            state[cur] = i;
            cur = graph[cur];
        }

        if (state[cur] === i) {
            // state[cur] === i → 현재 경로 내 사이클 발견
            // 사이클에 속한 노드만 -1로 마킹하고 팀원 수 합산
            while (state[cur] !== -1) {
                state[cur] = -1;
                teamCount++;
                cur = graph[cur];
            }
        }
        // state[cur] !== i → 이미 처리 완료된 다른 경로에 합류, 사이클 없음
    }

    // 팀에 속하지 못한 학생 수 = 전체 - 팀에 속한 학생 수
    answer.push(n - teamCount);
}

console.log(answer.join("\n"));