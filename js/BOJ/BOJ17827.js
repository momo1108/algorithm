const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ17827.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

const [N, M, V] = input[0].split(" ").map(value => parseInt(value));
const values = [0, ...input[1].split(" ").map(value => parseInt(value))];

/**
 * N번 노드가 연결된 노드 V 부터는, 고리형으로 순환하게 된다.
 * 따라서 이동 횟수 K 가 (V - 1) 이상인 경우, 
 * 도착 노드의 위치는 (K - V + 1) % (N - V + 1) + V 가 된다.
 */
const answer = [];
for (const line of input.slice(2)) {
    const K = parseInt(line);
    const dest = K > V - 1 ? (K - V + 1) % (N - V + 1) + V : K + 1;
    answer.push(values[dest]);
}
console.log(answer.join("\n"));