/**
 * [BOJ 30089 - 새로운 문자열 만들기]
 *
 * 영어 대문자로 이루어진 문자열 S가 주어질 때,
 * 아래 조건을 모두 만족하는 가장 짧은 문자열 X를 구하라.
 *
 * 조건:
 * 1. X는 S로 시작한다.
 * 2. X를 뒤집은 문자열 X'도 S로 시작한다.
 * 3. 위 두 조건을 만족하는 문자열 중 길이가 가장 짧은 것이 X이다.
 *
 * 제한사항:
 * - 1 ≤ T ≤ 100
 * - 각 S의 길이는 1 이상 20 이하
 *
 * 풀이:
 * X = S + t 로 놓으면, X를 뒤집으면 reverse(t) + reverse(S) 이다.
 * 이것이 S로 시작하려면 reverse(t)가 S의 앞부분과 맞아야 한다.
 * t를 최소화하려면 S의 접미사 중 팰린드롬인 가장 긴 것을 찾고,
 * 그 앞의 접두사를 뒤집어 S 뒤에 붙이면 된다.
 * (팰린드롬 접미사는 뒤집어도 동일하여 추가 문자가 필요 없다.)
 */
const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ30089.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

const answer = [];
for (let S of input.slice(1)) {
    // 팰린드롬인 접미사 중 가장 긴 것의 길이
    let maxPalindromeLen = 0;

    // 길이 1부터 순서대로 접미사를 잘라 팰린드롬 여부 확인
    for (let suffixLen = 1; suffixLen <= S.length; suffixLen++) {
        const suffix = S.substring(S.length - suffixLen);

        // 접미사의 앞뒤 문자를 대칭 비교하여 팰린드롬인지 확인
        let isPalindrome = true;
        for (let i = 0; i < parseInt(suffix.length / 2); i++) {
            if (suffix[i] !== suffix[suffix.length - 1 - i]) {
                isPalindrome = false;
                break;
            }
        }
        if (isPalindrome) maxPalindromeLen = suffixLen;
    }

    // 팰린드롬 접미사를 제외한 앞쪽 접두사
    const nonPalindromePrefix = S.substring(0, S.length - maxPalindromeLen);

    // 접두사를 뒤집어 S 뒤에 붙이면 전체 문자열이 팰린드롬이 됨
    for (let i = nonPalindromePrefix.length - 1; i >= 0; i--) S += nonPalindromePrefix[i];
    answer.push(S);
}
console.log(answer.join('\n'));