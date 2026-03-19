/**
 * [BOJ 15684] 사다리 조작
 *
 * N개의 세로선과 H개의 가로 위치가 있는 사다리가 주어진다.
 * 현재 놓여 있는 가로선을 기준으로, 각 세로선 i에서 출발했을 때 최종적으로도 i로 도착해야 한다.
 * 가로선은 최대 3개까지만 추가할 수 있으며, 서로 인접한 위치에는 놓을 수 없다.
 * 조건을 만족시키기 위한 최소 추가 개수를 구하고, 불가능하면 -1을 출력한다.
 *
 * 제한사항:
 * 2 <= N <= 10
 * 0 <= M <= 30
 * 1 <= H <= 300
 *
 * 풀이:
 * DFS(백트래킹)로 가로선을 0개, 1개, 2개, 3개 추가하는 경우를 차례로 탐색한다.
 * - 목표 개수만큼 가로선을 추가한 뒤에만 사다리 결과를 검증한다.
 * - 현재 열에 가로선을 하나 놓아봤다면, 같은 열에서 바로 다음 후보들을 건너뛰어 중복 탐색을 줄인다.
 * - 이미 더 작은 답을 찾은 경우는 바로 가지치기한다.
 */

const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').toString().trim().split('\n');

// N: 세로선 개수, M: 이미 존재하는 가로선 개수, H: 가로선을 놓을 수 있는 행 개수
const [N, M, H] = input[0].split(' ').map(Number);

// 가로선이 하나도 없으면 모든 세로선은 자기 자신으로 끝난다.
if (M === 0) {
  console.log(0);

  return;
}

// ladderGrid[row][col] = true이면 row행의 col번 세로선과 col + 1번 세로선이 연결됨을 의미한다.
const ladderGrid = Array.from({ length: H + 1 }, () => Array.from({ length: N + 1 }, () => false));

// 입력으로 주어진 기존 가로선을 사다리 배열에 기록한다.
for (let rowIndex = 1; rowIndex < 1 + M; rowIndex += 1) {
  const [row, col] = input[rowIndex].split(' ').map(Number);
  ladderGrid[row][col] = true;
}

// 현재 사다리 상태가 조건을 만족하는지 검사한다.
const isValidLadder = () => {
  // 모든 시작 세로선에 대해 끝 위치가 자기 자신인지 확인한다.
  for (let startCol = 1; startCol <= N; startCol += 1) {
    let currentCol = startCol;

    // 위에서 아래로 내려가며 왼쪽 또는 오른쪽 연결선을 따라 이동한다.
    for (let row = 1; row <= H; row += 1) {
      if (ladderGrid[row][currentCol - 1]) {
        currentCol -= 1;
      }
      else if (ladderGrid[row][currentCol]) {
        currentCol += 1;
      }
    }

    if (startCol !== currentCol) {
      return false;
    }
  }

  return true;
};

// answer가 4라는 것은 아직 0~3개 추가로 가능한 해를 찾지 못했다는 뜻이다.
let answer = 4;

/**
 * 목표 개수만큼 가로선을 추가하는 DFS
 * @param {number} addedLineCount - 현재까지 추가한 가로선 개수
 * @param {number} targetLineCount - 이번 탐색에서 맞춰야 하는 가로선 개수
 */
const dfs = (addedLineCount, targetLineCount) => {
  // 이미 더 좋은 답을 찾았으면 현재 목표 개수는 볼 필요가 없다.
  if (answer <= targetLineCount) {
    return;
  }

  // 목표 개수만큼 가로선을 추가했으면 사다리를 검사한다.
  if (addedLineCount >= targetLineCount) {
    if (isValidLadder()) {
      answer = targetLineCount;
    }

    return;
  }

  // 모든 위치를 순회하며 추가 가능한 가로선을 하나 놓아본다.
  for (let col = 1; col < N; col += 1) {
    for (let row = 1; row <= H; row += 1) {
      // 현재 위치와 양옆에 가로선이 없어야 새 가로선을 놓을 수 있다.
      if (!ladderGrid[row][col] && !ladderGrid[row][col - 1] && !ladderGrid[row][col + 1]) {
        ladderGrid[row][col] = true;
        dfs(addedLineCount + 1, targetLineCount);
        ladderGrid[row][col] = false;

        // 같은 열에서 연속으로 가능한 위치들을 건너뛰어 중복 탐색을 줄인다.
        while (row <= H && !ladderGrid[row][col - 1] && !ladderGrid[row][col + 1]) {
          row += 1;
        }
      }
    }
  }
};

// 가로선을 0개부터 3개까지 추가하는 경우를 순서대로 시도한다.
for (let targetLineCount = 0; targetLineCount <= 3; targetLineCount += 1) {
  dfs(0, targetLineCount);
}

console.log(answer > 3 ? -1 : answer);