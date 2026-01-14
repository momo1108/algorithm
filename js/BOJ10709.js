const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ10709.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

/**
 * 
 * 구름은 c, 구름없는 하늘은 . 로 표현한다.
 * c . . . c
 * . c . . .
 * . . . c .
 * 
 * 구름이 각 타일에 언제 도착할지 알 수 있는 방법은 두가지가 있다.
 * 1. 전체 타일을 순회하면서 각 타일에서 본인의 왼쪽을 쭉 살펴보고 가장 가까운 구름을 찾아내는 방법
 * 2. 전체 타일을 순회하면서 구름 타일일 경우 오른쪽에 존재하는 모든 타일에 도착 시간을 기록하는 방법
 * 
 * 1번 방식의 경우 구름이 있던 없던 모든 타일에서 다른 타일을 살펴보는 작업이 필요하다.
 * 2번의 경우 구름인 있는 타일에서만 다른 타일을 살펴보면 돼서 1번 방식보다는 경우의 수가 적을 것이다.
 * 따라서 2번 방식을 사용하자
 */

const [H, W] = input[0].split(" ").map(value => parseInt(value));

// 모든 타일의 초기 값을 -1 (구름이 오지 않음) 로 채워넣는다.
const answerArray = Array(H).fill(null).map(() => {
    const rowArr = Array(W).fill(-1);
    return rowArr;
});

/**
 * 구름에 해당되는 타일로부터 오른쪽 타일들에 얼마나 시간이 걸리는지 기록하는 함수
 * @param {*} row 구름 타일의 행
 * @param {*} col 구름 타일의 열
 */
const calcCloudArrivalTime = (row, col) => {
    let time = 1;
    while (++col < W && input[row + 1][col] === "."){
        answerArray[row][col] = time++;
    }
}

for (let row = 0; row < H; row++) {
    for (let col = 0; col < W; col++) {
        const tile = input[row + 1][col];
        if (tile === "c") {
            answerArray[row][col] = 0;
            calcCloudArrivalTime(row, col)
        }
    }
}

for (let row = 0; row < H; row++) {
    console.log(answerArray[row].join(" "));
}