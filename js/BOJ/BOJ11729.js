/**
 * [BOJ 11729] 하노이 탑 이동 순서
 *
 * 1번 장대의 원판 n개를 3번 장대로 옮기는 최소 이동 횟수와
 * 실제 이동 순서를 출력하는 문제.
 * 규칙:
 * 1) 한 번에 원판 1개만 이동 가능
 * 2) 큰 원판 위에 작은 원판만 올릴 수 있음
 *
 * 입력:
 * - 첫 줄: 원판 개수 N (1 <= N <= 20)
 *
 * 출력:
 * - 첫 줄: 최소 이동 횟수 K
 * - 다음 K줄: "A B" (A번 장대 맨 위 원판을 B번 장대로 이동)
 *
 * 풀이:
 * 재귀 (분할)
 * - hanoi(size, from, to, via)
 *   1) size-1개를 from -> via 로 이동
 *   2) 가장 큰 원판 1개를 from -> to 로 이동
 *   3) size-1개를 via -> to 로 이동
 *
 * 시간복잡도: O(2^N)
 * 공간복잡도: O(2^N) (출력 저장 + 재귀 스택)
 */
const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ11729.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

const N = +input[0];
const moves = [];
if (N === 1) {
    console.log("1\n1 3");
} else {
    // 1번 장대 -> 3번 장대, 2번 장대를 보조로 사용
    hanoi(N, 1, 3, 2);
    console.log(moves.length);
    console.log(moves.join("\n"));
}

function hanoi(size, from, to, via) {
    if (size === 1) {
        // 가장 작은 단위 문제: 원판 1개를 목적지로 이동
        moves.push(`${from} ${to}`);
    } else {
        // (1) 위의 size-1개를 보조 장대로 옮겨 가장 큰 원판을 드러낸다.
        hanoi(size - 1, from, via, to);
        // (2) 가장 큰 원판 1개를 목적지로 이동
        moves.push(`${from} ${to}`);
        // (3) 보조 장대의 size-1개를 목적지로 옮긴다.
        hanoi(size - 1, via, to, from);
    }
}