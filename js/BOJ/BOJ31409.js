const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ31409.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

/**
 * 착식 전환이란, 단방향 연결을 뜻한다.
 * 따라서 먹통을 만들기 위해서는 단방향으로 모든 노드들이 어떻게든 서로 착신전환으로 연결되어 있어야 한다.
 * 
 * 첫번째 전화기부터 순회하며 착신전환이 되어있지 않은 경우,
 * 바로 다음 전화기로 착신전환 하도록 설정한다.
 * 
 * 주의해야 할 점은 착신전환이 되어있지 않은 전화기가 마지막 전화기인 경우,
 * 다음 전화기가 없으므로 간단하게 첫번째 전하기로 착신전환시킨다.
 */
const N = parseInt(input[0]);
const A = [0] // 1번부터 사용할 수 있도록 0번 자리에 미리 값을 대입해놓고 그 뒤로 데이터를 push 한다.
A.push(...input[1].split(" ").map(value => parseInt(value)));

let count = 0;
for (let aIndex = 1; aIndex <= N; aIndex++) {
    if (A[aIndex] === (aIndex)) {
        A[aIndex] = aIndex < N ? aIndex + 1 : 1;
        count++;
    }
}

console.log(count);
console.log(A.slice(1).join(" "));