/**
 * [BOJ 12738] 가장 긴 증가하는 부분 수열 3
 *
 * 길이가 N인 수열 A가 주어질 때, "가장 긴 증가하는 부분 수열(LIS)"의 길이를 구한다.
 *
 * 입력:
 * - 첫째 줄: N (1 <= N <= 1,000,000)
 * - 둘째 줄: A1 ... AN (-1,000,000,000 <= Ai <= 1,000,000,000)
 *
 * 출력:
 * - LIS의 길이
 *
 * 풀이:
 * tails[k]를 "길이 k+1인 증가 부분 수열들 중 마지막 값의 최솟값"으로 유지한다.
 * 각 값을 순회하며 lower bound(처음으로 value 이상이 되는 위치)를 찾아
 * 해당 위치를 치환하거나, 맨 뒤에 붙여 tails를 갱신한다.
 *
 * 시간복잡도: O(N log N)
 * 공간복잡도: O(N)
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ12738.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n").map((line) => line.trim());

const sequenceSize = Number(input[0]);
const sequence = input[1].split(" ").map(Number);

// lisTails[i]: 길이 i+1의 증가 부분 수열이 가질 수 있는 최소 끝값
const lisTails = [];

function findLowerBound(target) {
    let left = 0;
    let right = lisTails.length;

    while (left < right) {
        const middle = Math.floor((left + right) / 2);

        if (lisTails[middle] < target) {
            left = middle + 1;
        } else {
            right = middle;
        }
    }

    return left;
}

for (const value of sequence) {
    // value가 들어갈 첫 위치를 찾아 tails를 갱신한다.
    const insertIndex = findLowerBound(value);

    if (insertIndex === lisTails.length) lisTails.push(value);
    else lisTails[insertIndex] = value;
}

console.log(lisTails.length);