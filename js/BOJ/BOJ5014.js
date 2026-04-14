/**
 * [BOJ 5014] 스타트링크
 *
 * F층 건물에서 현재 S층에 있고, 목표는 G층이다.
 * 엘리베이터 버튼은 U(위로 U층), D(아래로 D층)만 있다.
 * 목표층까지 가기 위한 버튼 최소 클릭 수를 출력한다.
 * 도달할 수 없으면 "use the stairs"를 출력한다.
 *
 * 풀이:
 * 각 층을 정점으로 보고, U/D 이동을 간선으로 보는 BFS를 수행한다.
 * 처음 도달하는 클릭 수가 최소이므로, 최소 클릭 수 배열을 갱신하며 탐색한다.
 */
const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/mom/Desktop/algorithm/data/BOJ5014.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

const [totalFloors, startFloor, goalFloor, upMove, downMove] = input[0].split(" ").map(Number);

// 내부 계산은 0-index 층 번호로 처리
const minButtonPresses = new Array(totalFloors).fill(Number.MAX_SAFE_INTEGER);
minButtonPresses[startFloor - 1] = 0;

const queue = [];
let queueHead = 0;
queue.push(startFloor - 1);

while (queueHead < queue.length) {
    const currentFloorIndex = queue[queueHead++];
    const currentPressCount = minButtonPresses[currentFloorIndex];

    // 위로 이동 가능한 경우
    if (currentFloorIndex + upMove < totalFloors && currentPressCount + 1 < minButtonPresses[currentFloorIndex + upMove]) {
        minButtonPresses[currentFloorIndex + upMove] = currentPressCount + 1;
        queue.push(currentFloorIndex + upMove);
    }

    // 아래로 이동 가능한 경우
    if (currentFloorIndex - downMove >= 0 && currentPressCount + 1 < minButtonPresses[currentFloorIndex - downMove]) {
        minButtonPresses[currentFloorIndex - downMove] = currentPressCount + 1;
        queue.push(currentFloorIndex - downMove);
    }
}

console.log(minButtonPresses[goalFloor - 1] > 1000000 ? "use the stairs" : minButtonPresses[goalFloor - 1]);