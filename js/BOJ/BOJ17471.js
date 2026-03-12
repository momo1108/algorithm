const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ17471.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

/**
 * [BOJ 17471] 게리맨더링
 *
 * 구역을 두 선거구로 나누되,
 * 각 선거구는 연결되어 있어야 한다.
 * 두 선거구 인구 차이의 최솟값을 구하고,
 * 불가능하면 -1을 출력한다.
 *
 * 풀이:
 * 1번 구역이 포함된 부분집합만 생성해 중복 분할을 제거한다.
 * 각 분할에 대해 두 그룹이 각각 연결 그래프인지 BFS로 확인한다.
 * 연결이면 인구 합을 계산해 차이의 최솟값을 갱신한다.
 */

const N = parseInt(input[0]);
const populations = [0].concat(input[1].split(" ").map(Number));
const graph = [[]];
for (const line of input.slice(2)) {
    graph.push(line.split(" ").slice(1).map(Number));
}

// 1번 구역을 고정해 그룹1/그룹2 쌍을 생성한다.
const group1Candidates = [[1]];
const group2Candidates = [Array.from({length: N - 1}, (_, i) => i + 2)];

function buildGroupsIncludingOne(currentGroup, otherGroupSet) {
    if (currentGroup.length === N - 1) return;
    
    const lastCity = currentGroup[currentGroup.length - 1];
    for (let city = lastCity + 1; city <= N; city++) {
        currentGroup.push(city);
        otherGroupSet.delete(city);
        buildGroupsIncludingOne(currentGroup, otherGroupSet);
        group1Candidates.push(currentGroup.slice());
        group2Candidates.push(Array.from(otherGroupSet));
        currentGroup.pop();
        otherGroupSet.add(city);
    }
}
buildGroupsIncludingOne([1], new Set(group2Candidates[0]));

let answer = -1;
// 각 후보 분할에 대해 두 그룹의 연결성 + 인구 합을 확인한다.
for (let i = 0; i < group1Candidates.length; i++) {
    const group1Population = getConnectedPopulation(group1Candidates[i]);
    if (group1Population < 0) continue;
    
    const group2Population = getConnectedPopulation(group2Candidates[i]);
    if (group2Population < 0) continue;

    const diff = Math.abs(group1Population - group2Population);
    if (answer < 0) answer = diff;
    else answer = Math.min(answer, diff);
}
console.log(answer);

function getConnectedPopulation(group) {
    const groupSet = new Set(group);
    const queue = [group[0]];
    let queueHead = 0;
    groupSet.delete(group[0]);
    
    let population = 0;
    while (queueHead < queue.length) {
        const currentCity = queue[queueHead++];
        population += populations[currentCity];

        for (const nextCity of graph[currentCity]) {
            if (!groupSet.has(nextCity)) continue;
            queue.push(nextCity);
            groupSet.delete(nextCity);
        }
    }

    if (groupSet.size === 0) return population;
    else return -1;
}