/**
 * [BOJ 15684] 사다리 조작
 * 
 * N개의 세로선과 H개의 가로선으로 이루어진 사다리가 있다.
 * i번 세로선을 타면 i번으로 끝나야 한다.
 * 현재 M개의 가로선이 놓여있고, 최대 3개까지만 가로선을 추가할 수 있다.
 * 모든 세로선이 자신의 번호로 끝나도록 하는 최소 가로선 추가 개수를 구하라.
 * 3개 이내로 불가능하면 -1을 출력한다.
 * 
 * 제한사항:
 * 2 <= N <= 10
 * 0 <= M <= 30
 * 1 <= H <= 300
 * 가로선은 인접하지 않아야 함 (같은 행의 n-1, n, n+1 중복 불가)
 * 
 * 풀이:
 * 백트래킹을 이용한 가로선 조합 탐색
 * - 0개, 1개, 2개, 3개 순서로 가로선을 추가하면서 탐색
 * - 각 단계에서 모든 세로선이 자신의 번호로 끝나는지 검증
 * - 첫 번째로 유효한 상태에서 최솟값 발견
 * - 중복 조합 방지: (row, col) 기준으로 앞으로만 진행
 * - 가로선 충돌 회피: 인접한 위치에 가로선 추가 금지
 * - 시간복잡도: O(가능한 가로선 조합 * H * N)로 제한적이지만 최악의 경우 탐색
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ15684.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

// N: 세로선 개수, M: 현재 가로선 개수, H: 사다리 높이
const [N, M, H] = input[0].split(" ").map(Number);

// grid[row][col] = true: row행의 col~col+1 사이에 가로선이 존재
const grid = Array.from({length: H + 1}, ()=>new Array(N + 1).fill(false));

// 입력된 기존 가로선 정보를 grid에 반영
for (const line of input.slice(1)) {
    const [a, b] = line.split(" ").map(Number);
    grid[a][b] = true;
}

// 최소 가로선 추가 개수를 저장할 변수
let answer = 999;

// 초기 상태에서 이미 유효하면 0 출력, 아니면 백트래킹으로 1~3개 추가 시도
if (isValid()) {
    console.log(0);
} else {
    backTrack(1, 0, 1);
    console.log(answer > 3 ? -1 : answer);
}

/**
 * 백트래킹으로 최소 개수의 가로선을 찾는 함수
 * @param {number} startRow - 탐색을 시작할 행 (중복 조합 방지)
 * @param {number} startCol - startRow에서 탐색을 시작할 열 (중복 조합 방지)
 * @param {number} addedCount - 현재까지 추가한 가로선 개수
 */
function backTrack(startRow, startCol, addedCount) {
    // 가지치기: 추가 개수가 3을 초과하거나 이미 발견한 답보다 크면 종료
    if (addedCount > 3 || addedCount >= answer) return;

    // 시작행부터 마지막 행까지 탐색
    for (let row = startRow; row <= H; row++) {
        // 각 행에서 열을 순회
        for (let col = 1; col <= N; col++) {
            // 중복 조합 방지: 같은 행에서는 이전 탐색한 열 위치보다 뒤로만 진행
            if (row === startRow && col <= startCol) continue;

            // 가로선 추가 가능 여부 확인
            // col, col-1, col+1 위치에 가로선이 없어야 추가 가능 (인접 가로선 금지)
            if (grid[row][col] 
            || grid[row][col - 1]
            || (col + 1 <= N && grid[row][col + 1])) {
                continue;
            }

            // 가로선 추가
            grid[row][col] = true;

            // 유효성 검사: 모든 세로선이 자신의 번호로 끝나는지 확인
            if (isValid()) {
                // 현재까지의 추가 개수를 최솟값으로 업데이트
                answer = Math.min(answer, addedCount);
            } else {
                // 아직 유효하지 않으면 가로선을 추가하여 계속 탐색
                backTrack(row, col, addedCount + 1);
            }

            // 가로선 제거 (백트래킹)
            grid[row][col] = false;
        }
    }
}

/**
 * 현재 사다리 상태에서 모든 세로선이 자신의 번호로 올바르게 도착하는지 검증
 * @return {boolean} 모든 세로선이 정상 도착하면 true, 아니면 false
 */
function isValid() {
    // 각 세로선 1~N에 대해 검증
    for (let startLine = 1; startLine <= N; startLine++) {
        let currentLine = startLine;

        // 사다리를 타고 내려가면서 가로선을 만나면 이동
        for (let row = 1; row <= H; row++) {
            // 현재 위치의 왼쪽에 가로선이 있으면 왼쪽으로 이동
            if (grid[row][currentLine - 1]) {
                currentLine--;
            }
            // 현재 위치의 오른쪽에 가로선이 있으면 오른쪽으로 이동
            else if (grid[row][currentLine]) {
                currentLine++;
            }
        }

        // 시작한 번호와 도착한 번호가 다르면 유효하지 않음
        if (currentLine !== startLine) {
            return false;
        }
    }

    // 모든 세로선이 정상 도착하면 유효함
    return true;
}