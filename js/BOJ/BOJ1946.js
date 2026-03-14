/**
 * [BOJ 1946] 신입 사원
 *
 * N명의 지원자가 서류 심사와 면접 각각에서 1~N위의 순위를 받는다.
 * 어떤 지원자보다 서류 성적도 좋고 면접 성적도 좋은 지원자가 한 명이라도 있으면 불합격.
 * 최대 합격자 수를 구하여라.
 *
 * 제한사항:
 * 1 <= T <= 20 (테스트 케이스 수)
 * 1 <= N <= 100,000 (지원자 수)
 * 서류 성적과 면접 성적은 동점 없이 1~N위로 주어짐
 *
 * 풀이: 그리디 (Greedy)
 * - 서류 성적 기준으로 오름차순 정렬하면, 이후에 나오는 지원자는 서류 성적이 항상 낮다.
 * - 따라서 서류 1등부터 순서대로 보면서, 현재 지원자의 면접 순위가
 *   지금까지 합격한 지원자 중 가장 높은 면접 순위(가장 낮은 순위 숫자)보다 높으면 합격.
 * - 서류가 자신보다 좋은 사람이 면접도 더 좋으면 반드시 탈락하므로,
 *   지금까지의 최고 면접 순위를 갱신하는 지원자만 합격 가능.
 * - 시간복잡도: O(N log N) - 정렬
 * - 공간복잡도: O(N)
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ1946.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

const T = +input[0];
let i = 1;
const answer = [];
while (i < input.length) {
    const N = +input[i++];
    const applicants = [];
    for (let j = i; j < N + i; j++) {
        applicants.push(input[j].split(" ").map(Number));
    }

    // 서류 성적(순위) 기준 오름차순 정렬 (1위가 가장 앞)
    applicants.sort((appl1, appl2) => appl1[0] - appl2[0]);

    // 서류 1등부터 순차 탐색: 지금까지 합격자 중 가장 높은 면접 순위(가장 낮은 순위 숫자) 추적
    let minInterviewRank = Infinity;
    let passCount = 0;
    for (const applicant of applicants) {
        // 현재 지원자의 면접 순위가 지금까지의 최고 면접 순위보다 높으면(숫자가 작으면) 합격
        // (서류는 정렬 순서상 이미 최선이므로 면접 순위만 비교)
        if (applicant[1] < minInterviewRank) {
            passCount++;
            minInterviewRank = applicant[1];
        }
    }
    answer.push(passCount);

    i += N;
}
console.log(answer.join("\n"));