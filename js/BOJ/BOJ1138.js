/**
 * [BOJ 1138] 한 줄로 서기
 *
 * N명의 사람이 한 줄로 서있다. 사람들의 키는 1부터 N까지 모두 다르다.
 * 각 사람은 자신보다 키가 큰 사람이 자신의 왼쪽에 몇 명 있었는지 기억한다.
 * i번째 수(0-indexed)는 키 (i+1)인 사람의 왼쪽에 자신보다 큰 사람이 몇 명인지를 나타낸다.
 * 이 정보를 바탕으로 원래 줄 서있던 순서를 출력하라.
 *
 * 제한사항:
 * 1 ≤ N ≤ 10
 * info[i]는 0 이상 N-i-1 이하
 *
 * 풀이:
 * 그리디 - 키 작은 사람부터 순서대로 자리 배치
 * - 키가 작은 사람부터 배치하면, 아직 채워지지 않은 빈 자리는
 *   "나중에 더 큰 사람이 채울 자리"로 볼 수 있다.
 * - 따라서 키 (p+1)인 사람을 배치할 때, 왼쪽의 빈 자리를 info[p]개 건너뛴
 *   다음 비어있는 자리에 배치하면 된다.
 * - 시간복잡도: O(N^2)
 * - 공간복잡도: O(N)
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ1138.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

const N = +input[0];
// info[p]: 키 (p+1)인 사람의 왼쪽에 자신보다 큰 사람이 몇 명인지
const info = input[1].split(" ").map(Number);
// position[i]: i번 자리에 배치된 사람의 키 (-1이면 아직 빈 자리)
const position = new Array(N).fill(-1);

// 키가 작은 사람(1)부터 큰 사람(N) 순서대로 배치
for (let p = 0; p < N; p++) {
    let i = 0;
    // 왼쪽에서부터 빈 자리를 info[p]개 건너뜀
    // 빈 자리(-1)는 나중에 더 큰 사람이 올 자리 = 현재 사람보다 키가 큰 사람
    // 이미 채워진 자리는 현재 사람보다 키가 작으므로 카운트하지 않음
    while (info[p] > 0) {
        if (position[i] < 0) {
            i++;
            info[p]--;
        } else {
            i++;
        }
    }

    // info[p]개를 건너뛴 이후, 다음 빈 자리에 현재 사람을 배치
    while (position[i] >= 0) i++;
    position[i] = p + 1;
}

console.log(position.join(" "));