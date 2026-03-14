/**
 * [BOJ 2470] 두 용액
 *
 * N개의 용액이 있으며 각 용액은 정수값(산성: 양수, 알칼리성: 음수)을 가진다.
 * 두 용액을 섞었을 때 합의 절댓값이 0에 가장 가까운 쌍을 구하여라.
 *
 * 제한사항:
 * 2 <= N <= 100,000
 * -1,000,000,000 <= 용액 값 <= 1,000,000,000
 *
 * 풀이: 정렬 + 이진 탐색 (Binary Search)
 * - 용액을 오름차순 정렬한 뒤, 각 용액 fluid에 대해 합이 0이 되는 반대값(-fluid)을 이진 탐색.
 * - 정확히 -fluid가 존재하면 합이 0인 쌍이므로 즉시 출력.
 * - 없으면 이진 탐색이 멈춘 위치 주변(±1)을 확인하여 절댓값 합이 가장 작은 쌍을 갱신.
 * - 시간복잡도: O(N log N)
 * - 공간복잡도: O(N)
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ2470.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

const fluids = input[1].split(" ").map(Number);
// 이진 탐색을 위해 오름차순 정렬
fluids.sort((n1, n2) => n1 - n2);

let minAbsSum = Number.MAX_SAFE_INTEGER;
let pair = [-1, -1];
for (const fluid of fluids) {
    // 현재 용액 fluid와 합이 0이 되는 반대값(-fluid)을 이진 탐색
    const nearestIdx = binarySearch(fluid);
    if (fluids[nearestIdx] === -fluid) {
        // 합이 정확히 0인 쌍 발견 → 즉시 출력
        console.log(fluid, -fluid);
        return;
    } else {
        // 정확한 반대값이 없으므로 이진 탐색 도달 위치 주변(±1)에서 절댓값 합 최솟값 탐색
        [nearestIdx - 1, nearestIdx, nearestIdx + 1]
        .filter(v => v >= 0 && v < fluids.length && fluids[v] !== fluid)
        .forEach(v => {
            let absSum = Math.abs(fluids[v] + fluid);
            if (absSum < minAbsSum) {
                minAbsSum = absSum;
                pair = fluids[v] < fluid ? [fluids[v], fluid] : [fluid, fluids[v]];
            }
        });
    }
}
console.log(pair.join(" "));

/**
 * 이진 탐색으로 target(-fluid)에 가장 가까운 인덱스를 반환
 * 정확히 찾으면 해당 인덱스, 못 찾으면 탐색 종료 시점의 middle 인덱스 반환
 * @param {number} fluid - 현재 용액 값 (탐색 기준: -fluid를 찾음)
 * @return {number} - target에 가장 가까운 인덱스
 */
function binarySearch(fluid) {
    let left = 0, right = fluids.length - 1, middle;
    let target = -fluid;

    while (left <= right) {
        middle = parseInt((left + right) / 2);

        if (fluids[middle] < target) left = middle + 1;
        else if (fluids[middle] > target) right = middle - 1;
        else return middle; // 정확한 반대값 발견
    }

    // target을 찾지 못한 경우 마지막 탐색 위치 반환
    return middle;
}