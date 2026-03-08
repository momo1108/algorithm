/**
 * [BOJ 6588] 골드바흐의 추측
 *
 * 4 이상 1,000,000 이하의 짝수 n이 주어질 때,
 * n = a + b (a, b는 홀수 소수, a <= b)를 만족하는 가장 작은 a를 사용한 식을 출력한다.
 * 0이 입력되면 종료한다.
 *
 * 풀이:
 * 에라토스테네스의 체로 입력값 중 최댓값(max)까지의 소수를 구한 뒤,
 * 각 n에 대해 소수 p를 오름차순으로 순회하며 n - p도 소수인지 확인한다.
 * 처음 발견된 (p, n - p) 쌍이 p <= n - p (= a <= b)를 만족하므로 바로 출력한다.
 */
const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ6588.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

let max = 0;
const numbers = [];
// 0이 나올 때까지 입력값을 수집하고 최댓값(max) 기록
for (const line of input) {
    const n = parseInt(line);
    if (n === 0) continue;
    numbers.push(n);
    max = Math.max(max, n);
}

// 에라토스테네스의 체: max 이하의 소수 판별 및 소수 목록 구성
const isPrime = new Array(max + 1).fill(true);
const primes = [];

for (let i = 2; i <= max - 2; i++) {
    if (!isPrime[i]) continue;
    primes.push(i);

    for (let j = i * 2; j <= max; j += i) {
        isPrime[j] = false;
    }
}

/**
 * n을 두 홀수 소수의 합으로 나타내는 식을 반환한다.
 * 소수 p를 오름차순으로 순회하며 n - p도 소수인 첫 번째 쌍을 반환한다.
 */
function solve(n){
    for (const p of primes) {
        if (p >= max / 2) break;
        if (isPrime[n - p]) {
            return `${n} = ${p} + ${n - p}`;
        }
    }
    return "Goldbach's conjecture is wrong.";
}

const answer = [];
for (const n of numbers) {
    answer.push(solve(n));
}

console.log(answer.join("\n"));