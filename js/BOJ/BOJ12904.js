const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ12904.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

/**
 * [BOJ 12904] A와 B
 *
 * 문제 요약:
 * 문자열 S를 시작으로 아래 연산만 사용해 문자열 T를 만들 수 있는지 판단한다.
 * 1) 문자열 뒤에 A를 추가
 * 2) 문자열 뒤에 B를 추가한 뒤 문자열을 뒤집기
 *
 * 핵심 아이디어:
 * S -> T로 정방향 탐색하면 경우의 수가 커지므로,
 * T -> S로 역연산을 적용한다.
 * - 끝 문자가 A면 해당 문자 제거
 * - 끝 문자가 B면 해당 문자 제거 후 뒤집기 효과 반영
 *
 * 문자열을 실제로 매번 뒤집지 않고,
 * [left, right] 범위와 reversed 플래그만 갱신해 O(1)로 처리한다.
 */
const S = input[0];
let T = input[1];

if (S === T) console.log(1);
else if (S.length >= T.length) console.log(0);
else {
    // 현재 유효 구간 [left, right]과 뒤집힘 여부를 관리한다.
    let left = 0, right = T.length - 1, reversed = false;

    // T의 길이가 S와 같아질 때까지 역연산을 반복한다.
    while ((right - left + 1) > S.length) {
        // 뒤집힘 여부에 따라 "현재 끝 문자" 위치가 달라진다.
        const tailChar = reversed ? T[left] : T[right];
        const isTailB = tailChar === "B";

        // 끝 문자 제거: 뒤집혀 있으면 left를, 아니면 right를 이동한다.
        if (reversed) left++;
        else right--;

        // 제거한 문자가 B였다면 뒤집기 효과를 토글한다.
        if (isTailB) reversed = !reversed;
    }

    // 남은 구간만 추출하고, 최종 상태가 뒤집힘이면 한 번만 뒤집는다.
    T = T.substring(left, right + 1);
    T = reversed ? T.split("").reverse().join("") : T;

    // 최종적으로 S와 같으면 1, 아니면 0
    if (T === S) console.log(1);
    else console.log(0);
}