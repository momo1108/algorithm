/**
 * [BOJ 6603] 로또
 *
 * 독일 로또에서는 {1, 2, ..., 49} 중 6개의 숫자를 선택한다.
 * 크기가 k(6 ≤ k ≤ 13)인 집합 S가 주어질 때, S에서 크기가 6인
 * 모든 부분집합을 오름차순으로 출력하라.
 * 각 테스트 케이스의 결과는 빈 줄로 구분하며, 입력의 마지막 줄은 0이다.
 *
 * 풀이:
 * 백트래킹 (조합 완전 탐색)
 * - S가 이미 오름차순이므로, 인덱스를 앞에서 뒤로 순서대로 선택하면
 *   자동으로 사전순(오름차순) 출력이 보장됨
 * - 가지치기: 남은 원소 수가 부족하면 탐색 중단 (i <= n - 6 + chosen.length)
 * - 시간복잡도: O(C(k, 6)), k ≤ 13이므로 최대 C(13, 6) = 1716
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ6603.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

const answer = [];
for (const line of input) {
    if (line === "0") break;
    const [k, ...S] = line.split(" ").map(Number);
    // 각 테스트 케이스의 모든 조합을 구해 줄 단위로 합쳐서 저장
    answer.push(combination([], 0, k, S, []).join("\n"));
}
// 테스트 케이스 간 빈 줄로 구분
console.log(answer.join("\n\n"));

/**
 * 백트래킹으로 S에서 6개를 선택하는 모든 조합을 생성
 * @param {number[]} chosen - 현재까지 선택된 숫자 목록
 * @param {number} start   - 탐색을 시작할 S의 인덱스
 * @param {number} n       - S의 원소 개수 (= k)
 * @param {number[]} S     - 입력으로 주어진 집합
 * @param {string[]} result - 완성된 조합을 누적하는 배열
 */
function combination(chosen, start, n, S, result) {
    for (let i = start; i <= n - 6 + chosen.length; i++) {
        chosen.push(S[i]);
        if (chosen.length < 6) {
            // 6개를 채울 때까지 재귀적으로 다음 원소 선택
            combination(chosen, i + 1, n, S, result);
        } else {
            // 6개를 모두 선택했으면 결과에 추가
            result.push(chosen.slice().join(" "));
        }
        chosen.pop();
    }

    return result;
}