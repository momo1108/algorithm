/**
 * [BOJ 1629] 곱셈
 * 
 * 자연수 A를 B번 곱한 수를 C로 나눈 나머지를 구하는 문제이다.
 * 
 * 입력:
 * - 첫째 줄: 공백으로 구분된 세 자연수 A, B, C
 * - A, B, C는 모두 2,147,483,647 이하의 자연수
 * 
 * 출력:
 * - A를 B번 곱한 수를 C로 나눈 나머지
 * 
 * 풀이:
 * 분할정복을 이용한 분할 지수 계산 (Exponentiation by Squaring)
 * - 지수를 절반으로 나누어 문제 크기를 로그적으로 감소
 * - A^B 계산 시 모듈로 연산을 각 단계에서 적용하여 오버플로우 방지
 * - BigInt 사용으로 JavaScript의 정수 범위 문제 해결
 * - 시간복잡도: O(log B)
 * - 공간복잡도: O(log B) (재귀 스택)
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/mom/Desktop/algorithm/data/BOJ1629.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

// 입력 파싱: A (밑), B (지수), C (나눗수)
const [baseNum, exponent, modulo] = input[0].split(" ").map(BigInt);

// 분할정복으로 baseNum^exponent mod modulo 계산
const answer = calculatePower(baseNum, exponent, modulo);

/**
 * 분할정복을 이용하여 base^exponent mod modulo를 계산
 * A^B = (A^(B/2))^2 의 성질을 이용하여 지수를 절반씩 감소
 * @param {BigInt} base - 밑 (A)
 * @param {BigInt} exponent - 지수 (B)
 * @param {BigInt} modulo - 나눗수 (C)
 * @return {BigInt} base^exponent mod modulo의 결과
 */
function calculatePower(base, exponent, modulo) {
    // 기저 사례: 지수가 1이면 base mod modulo 반환
    if (exponent === 1n) return base % modulo;
    
    // 분할: 지수를 반으로 줄여서 재귀 계산
    // halfResult = base^(exponent/2) mod modulo
    const halfResult = calculatePower(base, exponent / 2n, modulo);
    
    // 결합: (base^(exponent/2))^2 = base^exponent 계산
    let result = (halfResult * halfResult) % modulo;
    
    // 지수가 홀수이면 base를 한 번 더 곱하기
    // base^(2k+1) = base^(2k) * base
    if (exponent % 2n === 1n) {
        result = (result * base) % modulo;
    }
    
    return result;
}

console.log(parseInt(answer));