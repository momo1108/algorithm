/**
 * [LeetCode 402] Remove K Digits
 *
 * 숫자 문자열 num에서 정확히 k개의 자릿수를 제거하여 만들 수 있는
 * 가장 작은 수를 문자열로 반환한다.
 *
 * 풀이:
 * 단조 증가 스택(Monotonic Increasing Stack)
 * - 앞자리 숫자가 작을수록 전체 수가 작아지므로,
 *   현재 숫자보다 큰 이전 숫자는 제거하는 것이 유리하다.
 * - 스택 top이 현재 숫자보다 크고 아직 제거 가능(k > 0)하면 pop한다.
 * - 순회 후에도 k가 남으면 뒤에서 제거한다.
 * - 마지막으로 선행 0을 제거하고, 빈 문자열이면 "0" 반환.
 * - 시간복잡도: O(num.length)
 * - 공간복잡도: O(num.length)
 */

/**
 * @param {string} num
 * @param {number} k
 * @return {string}
 */
var removeKdigits = function(num, k) {
    if (k === num.length) return "0";

    // 숫자를 앞에서부터 보며 증가 스택을 유지한다.
    const stack = [];

    for (const ch of num) {
        const digit = Number(ch);

        // 현재 digit보다 큰 이전 자릿수는 제거하는 것이 더 작은 수를 만든다.
        while (k > 0 && stack.length && digit < stack[stack.length - 1]) {
            stack.pop();
            k--;
        }

        stack.push(digit);
    }

    // 아직 제거 횟수가 남아 있으면 뒤쪽(덜 중요한 자리)부터 제거한다.
    while (k-- > 0) {
        stack.pop();
    }

    // 선행 0 제거 후, 비어 있으면 "0" 반환
    const result = stack.join('').replace(/^0+/, '');
    return result === "" ? "0" : result;
};