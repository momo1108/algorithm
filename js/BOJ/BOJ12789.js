/**
 * [BOJ 12789] 도키도키 간식드리미
 * https://www.acmicpc.net/problem/12789
 *
 * 번호표가 뒤섞인 채로 줄을 서 있는 N명의 학생들을 1번부터 N번까지 순서대로 통과시켜야 한다.
 * 대기열의 왼쪽에는 한 사람씩 들어갈 수 있는 1열 보조 공간(스택 구조)이 있으며,
 * 대기열의 맨 앞 사람만 이 공간으로 이동할 수 있고, 반대 방향은 불가능하다.
 * 모든 학생이 번호 순서대로 통과할 수 있으면 "Nice", 불가능하면 "Sad"를 출력한다.
 *
 * 제한사항:
 * 1 ≤ N ≤ 1,000
 *
 * 풀이:
 * 스택 시뮬레이션
 * - 대기열을 앞에서부터 순회하며 다음 통과 번호(expected)와 일치하면 즉시 통과시킴
 * - 일치하지 않으면 보조 공간(스택)으로 이동
 * - 매 단계마다 스택 맨위가 expected와 같으면 계속 통과 (checkStack)
 * - 최종적으로 스택이 비어있으면 모두 순서대로 통과 → "Nice"
 * - 시간복잡도: O(N)
 * - 공간복잡도: O(N)
 */
const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ12789.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

const N = +input[0];
const students = input[1].split(" ").map(Number);
// 보조 공간: 한쪽으로만 출입 가능한 1열 대기 공간 (스택)
const stack = [];

// 다음에 통과해야 할 학생 번호
let expected = 1;
for (let i = 0; i < N; i++) {
    const student = students[i];

    // 현재 학생이 통과 순서가 아니면 보조 공간으로 이동
    if (student !== expected) stack.push(student);
    else expected++;
    
    // 스택 맨위 학생이 다음 통과 번호와 일치하면 계속 통과
    checkStack();
}

console.log(stack.length ? "Sad" : "Nice");

// 스택 맨위가 expected와 같은 동안 계속 통과시킴
function checkStack() {
    while (stack.length && stack[stack.length - 1] === expected) {
        stack.pop();
        expected++;
    }
}