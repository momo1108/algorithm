const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ2133.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

const N = +input[0];

/**
 * [BOJ 2133] 타일 채우기
 * 3 x N 보드를 2 x 1, 1 x 2 타일로 채우는 경우의 수를 구한다.
 *
 * 왜 짝수 N만 가능한가?
 * - 전체 칸 수는 3N이고, 타일 하나는 항상 2칸을 덮는다.
 * - 따라서 3N이 짝수여야 하므로 N은 반드시 짝수여야 한다.
 *
 * 점화식 유도:
 * 1) 맨 오른쪽 2열만 보면 기본 배치가 3가지 존재한다.
 *    -> dp[n - 2] * 3
 * 2) 그 외에 4열 이상에서만 등장하는 "돌출(특수) 모양"이 있다.
 *    이 특수 모양은 오른쪽 끝 기준으로 항상 2가지 방향(좌/우 대칭)이다.
 *    너비 4를 쓰면 dp[n - 4] * 2, 너비 6을 쓰면 dp[n - 6] * 2 ...
 *
 * 최종 점화식(짝수 n):
 * dp[n] = dp[n - 2] * 3 + dp[n - 4] * 2 + dp[n - 6] * 2 + ... + dp[0] * 2
 *
 * 초기값:
 * dp[0] = 1 (아무 것도 놓지 않는 1가지)
 * dp[2] = 3
 *
 * 예시:
 * dp[4] = dp[2] * 3 + dp[0] * 2 = 3 * 3 + 1 * 2 = 11
 * dp[6] = dp[4] * 3 + dp[2] * 2 + dp[0] * 2 = 11 * 3 + 3 * 2 + 1 * 2 = 41
 */

const tileWaysByWidth = new Array(31).fill(2);
tileWaysByWidth[2] = 3;

const dp = new Array(31).fill(0);
dp[0] = 1;
dp[2] = 3;
dp[4] = 11;

for (let i = 6; i <= 30; i += 2) {
    for (let j = 2; j <= i; j += 2) {
        // i 너비를 j 너비 블록으로 분해해 누적
        dp[i] += (dp[i - j] * tileWaysByWidth[j]);
    }
}

console.log(dp[N]);