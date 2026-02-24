/**
 * [LeetCode 8] String to Integer (atoi)
 *
 * 문자열 s를 정수로 변환하는 myAtoi 함수를 구현하라.
 * 변환 규칙은 다음과 같다:
 *  1. 앞쪽 공백을 무시한다.
 *  2. '+' 또는 '-' 부호가 있으면 읽어 부호를 결정한다. (없으면 양수)
 *  3. 이후 연속된 숫자 문자를 읽어 정수로 변환한다.
 *  4. 숫자가 아닌 문자를 만나면 중단한다.
 *  5. 변환된 값이 32비트 정수 범위를 벗어나면 INT_MAX 또는 INT_MIN으로 클램핑한다.
 *
 * 제한사항:
 * 0 <= s.length <= 200
 * s는 영문자, 숫자, 공백, '+', '-', '.'으로 이루어져 있음
 *
 * 풀이:
 * 문자열을 순서대로 파싱 (Linear Scan / Simulation)
 * - 앞쪽 공백, 부호, 앞쪽 '0'을 순서대로 건너뜀
 * - 이후 숫자 문자를 하나씩 읽어 배열에 누적
 * - 10자리 초과 시 즉시 오버플로우 처리 (32비트 정수 최대 10자리)
 * - 10자리 도달 시 현재 숫자와 클램프 경계값을 비교하여 오버플로우 여부 판단
 * - 시간복잡도: O(n)
 * - 공간복잡도: O(n)  (숫자 문자 저장 배열)
 */

/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function(s) {
    let idx = 0;
    let isPositive = true;
    const INT_MAX = 2 ** 31 - 1;   // 2147483647
    const INT_MIN = -(2 ** 31);    // -2147483648
    const digits = [];

    // 1단계: 앞쪽 공백 건너뜀
    while (s[idx] === " ") idx++;

    // 2단계: 부호 결정
    if (s[idx] === "+" || s[idx] === "-") {
        isPositive = s[idx] === "+";
        idx++;
    }

    // 3단계: 앞쪽 '0' 건너뜀 (불필요한 선행 0 제거)
    while (s[idx] === "0") idx++;

    // 4단계: 숫자 문자 누적 및 오버플로우 사전 검사
    let digitCount = 0;
    while ("0123456789".includes(s[idx])) {
        digits.push(s[idx++]);
        digitCount++;

        // 10자리 초과: 32비트 정수 범위를 반드시 벗어남
        if (digitCount > 10) return isPositive ? INT_MAX : INT_MIN;

        // 10자리 도달: 실제 값과 클램프 경계값 비교
        if (digitCount === 10) {
            const num = Number(digits.join(""));
            if (isPositive && num >= INT_MAX) return INT_MAX;
            // 음수의 절댓값이 2^31 이상이면 INT_MIN으로 클램핑
            if (!isPositive && num >= -INT_MIN) return INT_MIN;
        }
    }

    // 5단계: 최종 변환 및 반환
    if (digits.length === 0) return 0;
    const num = Number(digits.join(""));
    return isPositive ? num : -num;
};

console.log(myAtoi("words and 987"));