/**
 * [BOJ 10819] 차이를 최대로
 *
 * 길이가 N인 수열이 주어질 때, 원소를 재배열한 순열 B를 만든다.
 * 식 |B1-B2| + |B2-B3| + ... + |B(N-1)-BN| 의 최댓값을 구하는 문제.
 *
 * 제한사항:
 * 3 <= N <= 8
 * 수열의 각 원소는 정수
 *
 * 풀이:
 * 백트래킹으로 가능한 모든 순열을 생성하고,
 * 각 순열의 인접 원소 차이 절댓값 합을 계산해 최댓값을 갱신한다.
 * - 시간복잡도: O(N! * N)
 * - 공간복잡도: O(N)
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/mom/Desktop/algorithm/data/BOJ10819.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

const N = +input[0];
const numbers = input[1].split(" ").map(Number);

// 순열에 이미 사용한 인덱스인지 체크
const used = new Array(N).fill(false);
let answer = -1;
buildPermutation([]);
console.log(answer);

// 백트래킹으로 길이 N의 순열을 모두 생성
function buildPermutation(permutation) {
    if (permutation.length === N) {
        answer = Math.max(answer, calculateScore(permutation));
        return;
    }

    for (let i = 0; i < numbers.length; i++) {
        if (used[i]) continue;
        permutation.push(numbers[i]);
        used[i] = true;
        buildPermutation(permutation);
        permutation.pop();
        used[i] = false;
    }
}

// 현재 순열의 인접 원소 차이 절댓값 합 계산
function calculateScore(permutation) {
    let sum = 0;
    for (let i = 0; i < N - 1; i++) {
        sum += Math.abs(permutation[i] - permutation[i + 1]);
    }
    return sum;
}