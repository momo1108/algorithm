/**
 * [BOJ 3085] 사탕 게임
 *
 * N x N 보드에서 인접한 두 칸의 사탕을 한 번 교환한 뒤,
 * 같은 색 사탕이 연속으로 가장 길게 이어지는 개수의 최댓값을 구하는 문제.
 * 연속은 가로 또는 세로 한 줄 기준으로만 센다.
 *
 * 제한사항:
 * 3 <= N <= 50
 * 각 칸에는 C, P, Z, Y 중 하나의 사탕이 존재
 *
 * 풀이:
 * 서로 다른 인접 칸(가로/세로)을 한 번씩 교환해 보고,
 * 매번 전체 보드의 가로/세로 연속 최대 길이를 계산해 정답을 갱신한다.
 * 이후 즉시 원상복구해 다음 경우를 탐색한다.
 * - 시간복잡도: O(N^4)
 * - 공간복잡도: O(1) (입력 보드 제외)
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/mom/Desktop/algorithm/data/BOJ3085.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

const N = +input[0];
const colors = input.slice(1).map(line => line.split(""));

let answer = 0;
// 가로 인접 칸 교환 시도
for (let row = 0; row < N; row++) {
    for (let col = 0; col < N - 1; col++) {
        if (colors[row][col] === colors[row][col + 1]) continue;
        const swapTemp = colors[row][col];
        colors[row][col] = colors[row][col + 1];
        colors[row][col + 1] = swapTemp;
        answer = Math.max(answer, checkMax());
        // 다음 탐색을 위해 원상복구
        colors[row][col + 1] = colors[row][col];
        colors[row][col] = swapTemp;
    }
}

// 세로 인접 칸 교환 시도
for (let col = 0; col < N; col++) {
    for (let row = 0; row < N - 1; row++) {
        if (colors[row][col] === colors[row + 1][col]) continue;
        const swapTemp = colors[row][col];
        colors[row][col] = colors[row + 1][col];
        colors[row + 1][col] = swapTemp;
        answer = Math.max(answer, checkMax());
        // 다음 탐색을 위해 원상복구
        colors[row + 1][col] = colors[row][col];
        colors[row][col] = swapTemp;
    }
}

console.log(answer);

function checkMax() {
    let maxStreak = 0;
    for (let i = 0; i < N; i++) {
        // i번째 행의 연속 길이 계산
        let previousCandy = "X";
        let streakLength = 0;
        colors[i].forEach(candy => {
            if (candy !== previousCandy) {
                streakLength = 1;
                previousCandy = candy;
            } else {
                streakLength++;
            }
            maxStreak = streakLength > maxStreak ? streakLength : maxStreak;
        })

        // i번째 열의 연속 길이 계산
        previousCandy = "X";
        streakLength = 0;
        for (let row = 0; row < N; row++) {
            const candy = colors[row][i];
            if (candy !== previousCandy) {
                streakLength = 1;
                previousCandy = candy;
            } else {
                streakLength++;
            }
            maxStreak = streakLength > maxStreak ? streakLength : maxStreak;
        }
    }
    return maxStreak;
}