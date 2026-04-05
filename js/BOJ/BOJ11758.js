/**
 * [BOJ 11758] CCW
 *
 * 2차원 좌표 평면 위의 점 3개 P1, P2, P3가 순서대로 주어진다.
 * P1 → P2 → P3 를 순서대로 이었을 때 어떤 방향을 이루는지 구하라.
 *
 * 제한사항:
 * -10,000 ≤ x1, y1, x2, y2, x3, y3 ≤ 10,000
 * 모든 좌표는 정수이며, P1, P2, P3의 좌표는 서로 다르다.
 *
 * 출력:
 * 반시계 방향(Counter-ClockWise)이면 1
 * 시계 방향(ClockWise)이면 -1
 * 일직선이면 0
 *
 * 풀이:
 * 기울기 비교를 이용한 방향 판별
 * - P1→P2 직선의 기울기를 구해 직선 방정식을 세운다.
 * - P3의 x 좌표를 직선 방정식에 대입한 y값(calcY)과 실제 P3의 y값을 비교한다.
 * - P3가 직선보다 위에 있는지 아래에 있는지와 P1→P2의 진행 방향을 함께 고려해 결정한다.
 * - 기울기가 0(수평선) 또는 ±Infinity(수직선)인 경우는 별도로 처리한다.
 * - 시간복잡도: O(1)
 * - 공간복잡도: O(1)
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ11758.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

// P1, P2, P3 좌표 입력 (변수명은 0-based 인덱스 기준)
const [x0, y0] = input[0].split(" ").map(Number); // P1
const [x1, y1] = input[1].split(" ").map(Number); // P2
const [x2, y2] = input[2].split(" ").map(Number); // P3

// P1→P2 직선의 기울기
let answer;
const slope = (y1 - y0) / (x1 - x0);

if (slope === 0) {
    // P1→P2가 수평선인 경우 (y0 === y1)
    if (y2 === y1) answer = 0;                     // P3도 같은 y → 일직선
    else if (x1 > x0) answer = y2 > y1 ? 1 : -1;  // 오른쪽 진행: P3가 위면 반시계
    else answer = y2 > y1 ? -1 : 1;                // 왼쪽 진행: P3가 위면 시계
} else if (slope === Infinity || slope === -Infinity) {
    // P1→P2가 수직선인 경우 (x0 === x1)
    if (x2 === x1) answer = 0;                     // P3도 같은 x → 일직선
    else if (y1 > y0) answer = x2 > x1 ? -1 : 1;  // 위쪽 진행: P3가 오른쪽이면 시계
    else answer = x2 > x1 ? 1 : -1;               // 아래쪽 진행: P3가 오른쪽이면 반시계
} else {
    // 일반 기울기인 경우
    if ((y2 - y1) / (x2 - x1) === slope) answer = 0; // P2→P3 기울기가 같으면 일직선
    else {
        const constant = y0 - (x0 * slope);    // P1→P2 직선의 y절편 (y = slope*x + constant)
        const calcY = x2 * slope + constant;    // P3의 x를 직선 방정식에 대입한 y값
        // P3가 직선보다 위(y2 > calcY)인지와 P1→P2의 진행 방향(x1 > x0)을 함께 고려
        if (y2 > calcY) answer = x1 > x0 ? 1 : -1;  // P3가 직선 위: 오른쪽 진행이면 반시계
        else answer = x1 > x0 ? -1 : 1;              // P3가 직선 아래: 오른쪽 진행이면 시계
    }
}

console.log(answer);