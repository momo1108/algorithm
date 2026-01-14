const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ32200.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

const [N, X, Y] = input[0].split(" ").map(value => parseInt(value));

const sandwichArray = input[1].split(" ").map(value => parseInt(value));

let count = 0;
let rest = 0;

/**
 * 각각의 샌드위치에 대해서 다음 작업을 수행한다.
 * 1. 가장 여러번 잘라 먹을 수 있게 최소 길이로 샌드위치를 분리한다.
 *    - 먼저 먹을 수 있는 최대 개수를 만들어냄
 * 2. 남은 샌드위치 길이가 있는 경우, 잘라 먹은 한 입 마다 추가 길이를 붙일 수 있다.
 *    - 추가 길이는 한입 먹을 때 (최대 길이 - 최소 길이) 만큼 적용이 가능하다.
 * 3. 2번 과정을 수행해도 남는 샌드위치 길이가 있는 경우, 최종 버리는 샌드위치 길이에 추가한다.
 */
const additionalBite = Y - X;
for (let sandwich of sandwichArray) {
    const biteCount = Math.floor(sandwich / X);
    count += biteCount;

    const restAfterBite = sandwich - (biteCount * X);
    if (restAfterBite > additionalBite * biteCount) rest += (restAfterBite - additionalBite * biteCount);
}

console.log(count);
console.log(rest);