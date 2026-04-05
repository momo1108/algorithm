/**
 * [BOJ 2580] 스도쿠
 *
 * 9x9 스도쿠 판이 주어진다. 0이 적힌 칸이 빈 칸이다.
 * 다음 규칙에 따라 빈 칸을 채워 완성된 스도쿠 판을 출력하라.
 *   1. 각 가로줄에 1~9가 한 번씩 등장해야 한다.
 *   2. 각 세로줄에 1~9가 한 번씩 등장해야 한다.
 *   3. 굵은 선으로 구분된 3x3 구역 9개 각각에 1~9가 한 번씩 등장해야 한다.
 *
 * 제한사항:
 * 입력으로 규칙대로 채울 수 없는 경우는 주어지지 않는다.
 * 채우는 방법이 여럿인 경우 그 중 하나만 출력한다.
 *
 * 풀이:
 * 백트래킹 (Backtracking)
 * - 빈 칸의 위치를 먼저 수집한다.
 * - 각 빈 칸에 1~9 숫자를 시도하며, 현재 행/열/3x3 구역에 중복 숫자가 없으면 배치한다.
 * - 배치 후 다음 빈 칸으로 재귀 진행, 실패 시 원상복구(백트래킹)한다.
 * - 모든 빈 칸을 채우면 정답으로 기록하고 탐색을 중단한다.
 * - 행/열/구역 사용 여부를 boolean 배열로 관리해 O(1)로 유효성 검사한다.
 * - 시간복잡도: 최악 O(9^빈칸수) (실제로는 가지치기로 훨씬 빠름)
 * - 공간복잡도: O(81)
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ2580.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());
const sudokuMap = input.map(line => line.split(" ").map(Number));

// 각 행/열/3x3 구역에서 숫자 사용 여부 추적 ([행/열/구역 인덱스][숫자 1~9])
const rowUsedArray = Array.from({length: 9}, () => new Array(10).fill(false));
const colUsedArray = Array.from({length: 9}, () => new Array(10).fill(false));
const gridUsedArray = Array.from({length: 9}, () => new Array(10).fill(false));

// 초기 숫자들을 기반으로 사용 여부 초기화, 빈 칸 위치 수집
const blankLocationArray = [];
for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
        if (sudokuMap[row][col] > 0) {
            // 이미 채워진 칸: 해당 행/열/구역에 숫자 사용 표시
            rowUsedArray[row][sudokuMap[row][col]] = true;
            colUsedArray[col][sudokuMap[row][col]] = true;
            const gridIndex = parseInt(row / 3) * 3 + parseInt(col / 3);
            gridUsedArray[gridIndex][sudokuMap[row][col]] = true;
        } else blankLocationArray.push([row, col]); // 빈 칸 위치 기록
    }
}

// 정답이 발견되면 저장 (sentinel 값으로 미발견 상태 구분)
let answer = "IMPOSSIBLE";
backtracking(0);

/**
 * 백트래킹으로 빈 칸을 순서대로 채워나가는 함수
 * @param {number} blankIndex - 현재 채울 빈 칸의 인덱스
 */
function backtracking(blankIndex) {
    if (answer !== "IMPOSSIBLE") return; // 이미 정답을 찾았으면 탐색 중단
    if (blankIndex === blankLocationArray.length) {
        // 모든 빈 칸을 채웠으면 정답 저장
        answer = sudokuMap.map(row => row.join(" ")).join("\n");
        return;
    }
    const [row, col] = blankLocationArray[blankIndex];
    // 3x3 구역 인덱스: 0~8 (행 3개, 열 3개씩 묶어 총 9구역)
    const gridIndex = parseInt(row / 3) * 3 + parseInt(col / 3);

    for (let num = 1; num <= 9; num++) {
        // 현재 행/열/구역에서 이미 사용 중인 숫자는 건너뜀
        if (rowUsedArray[row][num]) continue;
        if (colUsedArray[col][num]) continue;
        if (gridUsedArray[gridIndex][num]) continue;

        // 숫자 배치 및 사용 표시
        rowUsedArray[row][num] = true;
        colUsedArray[col][num] = true;
        gridUsedArray[gridIndex][num] = true;
        sudokuMap[row][col] = num;
        backtracking(blankIndex + 1); // 다음 빈 칸으로 재귀
        // 백트래킹: 숫자 원상복구
        rowUsedArray[row][num] = false;
        colUsedArray[col][num] = false;
        gridUsedArray[gridIndex][num] = false;
        sudokuMap[row][col] = 0;
    }
}

console.log(answer);