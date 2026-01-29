const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ6144.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

/**
 * 팔찌에 장식품들을 달 수 있다.
 * 각 장식품은 W (무게 1 ~ 400) 와 D (선호도 1 ~ 100) 를 가지며 한번만 장식이 가능하다.
 * 팔찌에 달 수 있는 총 무게 M 은 1 ~ 12880 이다.
 * 팔찌를 무게 M 이내로 장식하는 모든 경우의 수 중 가장 높은 선호도의 값을 출력한다.
 * 
 * 전형적인 Dynamic Programming 중 
 * 배낭 채우기 문제(Knapsack Problem)이다.
 */
const [N, M] = input[0].split(" ").map(value => parseInt(value));

const charmArray = [];
for (let lineIndex = 1; lineIndex <= N; lineIndex++) {
    const [W, D] = input[lineIndex].split(" ").map(value => parseInt(value));
    charmArray.push([W, D]);
}

const DP = new Array(M + 1).fill(0);

for (const [charmW, charmD] of charmArray){
    for (let currentW = M; currentW >= 0; currentW--){
        if (charmW <= currentW) {
            DP[currentW] = Math.max(
                DP[currentW - charmW] + charmD,
                DP[currentW]
            )
        }
    }
}

console.log(DP[M]);