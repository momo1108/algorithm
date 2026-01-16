const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ1263.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

/**
 * 해야할 일들이 N개 주어지고, 일 별로 완료하기까지 걸리는 시간 T, 마감 시간 S 가 주어집니다.
 * 모든 일들을 해결하기 위해 최대한 일을 늦게 시작할수 있는 시간을 구합니다.
 * 일은 동시에 한개만 진행할 수 있습니다.
 * 
 * 일을 최대한 늦게 시작하기 위해서는 일들을 최대한 뒤쪽에서 몰아 실행한다는 뜻이 됩니다.
 * 따라서 마감시간이 가장 늦은 일들부터 가장 늦게 시작할수 있는 시간을 계산합니다.
 * 나머지 일들에 대해서도 마감이 가장 늦은 일과 남은 시간을 기준으로
 * 가장 늦은 시작 시간을 계산하다보면 최종 경과가 정답이 됩니다.
 */
const taskArray = [];

for (const line of input.slice(1)) {
    const [taskT, taskS] = line.split(" ").map(value => parseInt(value));
    taskArray.push([taskT, taskS]);
}

// 마감시간이 늦은 순서대로 일을 정렬합니다.
taskArray.sort((task1, task2) => task2[1] -task1[1]);

// 일을 시작하는 시간을 가장 늦은 마감시간으로 초기화합니다.
let startTime = taskArray[0][1];
for (const [taskT, taskS] of taskArray) {
    // 일의 마감시간이 시작할 수 있는 시간보다 빠른 경우 시작시간을 마감시간에 맞게 당깁니다.
    if (taskS < startTime) startTime = taskS;

    startTime -= taskT; // 일을 완수하는데 걸리는 시간만큼 시작시간을 앞으로 당깁니다.

}

// 최종적으로 시작 시간이 0시 이전이면 -1, 0시 이후면 그대로 정답을 출력합니다.
console.log(startTime < 0 ? -1 : startTime);