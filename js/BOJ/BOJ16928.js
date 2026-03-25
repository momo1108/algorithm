/**
 * [BOJ 16928] 뱀과 사다리 게임
 * https://www.acmicpc.net/problem/16928
 *
 * N개의 사다리와 M개의 뱀이 있는 1~100 크기의 보드에서 뱀과 사다리 게임을 진행한다.
 * 1번 칸에서 시작하여 100번 칸에 도착하는 것이 목표이며,
 * 주사위(1~6)는 원하는 수로 자유롭게 선택할 수 있다.
 * 사다리가 있는 칸에 도착하면 위 칸으로, 뱀이 있는 칸에 도착하면 아래 칸으로 강제 이동한다.
 * 100번 칸에 도달하기 위한 최소 주사위 횟수를 구하라.
 *
 * 제한사항:
 * 1 ≤ N, M ≤ 15
 * 1번 칸과 100번 칸은 뱀/사다리의 시작 또는 끝이 아님
 * 항상 100번 칸에 도달 가능한 입력만 주어짐
 *
 * 풀이:
 * BFS를 이용한 최소 주사위 횟수 탐색
 * - graph[i]: 칸 i에서 이동 가능한 칸들의 목록
 *   - 일반 칸: [i+1, ..., i+6] (주사위 6면에 해당하는 6가지 이동)
 *   - 사다리/뱀 칸: [도착지] (강제 이동이므로 주사위를 소모하지 않음)
 * - 사다리/뱀 칸(이웃이 1개)에서는 주사위 횟수를 증가시키지 않음
 * - 시간복잡도: O(100) = O(1)
 * - 공간복잡도: O(100) = O(1)
 */
const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ16928.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

// graph[i]: 칸 i에서 이동 가능한 칸들의 목록
// 초기값: 일반 칸은 주사위 눈 수(1~6)만큼 이동한 칸들
const graph = Array.from({length : 101}, (_, i1) => Array.from({length: 6}, (_, i2) => i1 + i2 + 1));

// 사다리/뱀이 있는 칸은 도착지가 유일한 이웃으로 설정 (강제 이동)
for (const line of input.slice(1)) {
    const [start, end] = line.split(" ").map(Number);
    graph[start] = [end];
}

// minMoves[i]: 칸 i에 도달하기 위한 최소 주사위 횟수
const minMoves = new Array(101).fill(999);
const queue = [];
let queueHead = 0;
queue.push(1);
minMoves[1] = 0;

while (queueHead < queue.length) {
    const pos = queue[queueHead++];

    // 사다리/뱀 칸(이웃이 1개)은 주사위를 굴리지 않으므로 횟수를 증가시키지 않음
    const nextMoves = graph[pos].length === 1 ? minMoves[pos] : minMoves[pos] + 1;
    for (const next of graph[pos]) {
        if (next > 100 || minMoves[next] <= nextMoves) continue;
        queue.push(next);
        minMoves[next] = nextMoves;
    }
}

console.log(minMoves[100]);