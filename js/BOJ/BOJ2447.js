/**
 * [BOJ 2447] 별 찍기 - 10
 *
 * N(=3^k) 크기의 정사각형에 별 패턴을 출력한다.
 * 전체를 3x3으로 나눴을 때 가운데 블록은 공백이고,
 * 나머지 8개 블록에는 같은 패턴이 재귀적으로 반복된다.
 *
 * 제한사항:
 * N은 3의 거듭제곱이며, 1 <= N <= 3^8
 *
 * 풀이:
 * 단계별(블록 크기 1, 3, 9, ...)로 가운데 공백 영역을 표시한 뒤,
 * 마지막에 공백 표시 여부를 기준으로 문자열을 만들어 출력한다.
 * - 시간복잡도: O(N^2)
 * - 공간복잡도: O(N^2)
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/mom/Desktop/algorithm/data/BOJ2447.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

const N = +input[0];

// blankMask[row][col] === true 이면 해당 위치는 공백이어야 함
const blankMask = Array.from({ length: N }, () => Array(N).fill(false));

for (let level = 0; level <= 8; level++) {
    if (3 ** level >= N) break;

    const blockStep = 3 ** (level + 1);
    const blankSize = 3 ** level;
    const firstBlankStart = 3 ** level;

    // 각 단계에서 3x3 블록의 중앙 영역들을 공백으로 마킹
    for (let row = firstBlankStart; row < N; row += blockStep) {
        for (let col = firstBlankStart; col < N; col += blockStep) {
            for (let fillRow = row; fillRow < row + blankSize; fillRow++) {
                for (let fillCol = col; fillCol < col + blankSize; fillCol++) {
                    blankMask[fillRow][fillCol] = true;
                }
            }
        }
    }
}

const board = Array.from({ length: N }, () => Array(N).fill("*"));
const outputLines = [];

for (let row = 0; row < N; row++) {
    for (let col = 0; col < N; col++) {
        if (blankMask[row][col]) board[row][col] = " ";
    }
    outputLines.push(board[row].join(""));
}

console.log(outputLines.join("\n"));