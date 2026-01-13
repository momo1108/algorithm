const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ13192.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");

/**
 * Input 노드 N개, Output 노드 N개, Internal 노드 K개가 존재한다.
 * Input - 1 ~ N
 * Output - N+1 ~ 2N
 * Internal - 2N+1 ~ 2N+K
 * Input 노드의 데이터 전송 - 자신 / Output 노드
 * Output 노드의 데이터 전송 - 자신
 * X -> Y 노드의 데이터 전송은 일방향이다.
 * X -> Z -> Y 중간에 다른 노드를 통해서도 데이터를 전송할 수 있다.
 * 
 * 각각의 Input 노드는 모든 Output 노드로 데이터 전송이 가능해야한다.
 * 
 * X 노드를 실행하기 위한 전력은 P(X) = IN(X) * OUT(X)
 * IN(X) => X 노드로 데이터 전송이 가능한 Input 노드
 * OUT(X) => X 노드로부터 데이터를 받을 수 있는 Output 노드
 * 
 * 최대 M 개의 일방 연결이 가능
 * 최대 P 의 전력이 사용 가능
 * 
 * 연결 개수를 줄이기 위해서는 Internal 노드에 Input, Output 노드들을 연결해야한다.
 * 전력을 줄이기 위해서는 Internal 노드에 연결되는 Input, Output 노드를 줄여야한다.
 * 
 * 최대 노드 개수는 500000개(2N + K)
 * 최대 전력 Plim = 1000000
 * 최대 연결 수 Mlim = 1000000
 * 
 * Input, Output 이 각각 최대치인 250000 개로 가정
 * Input 노드들의 데이터를 받기위한 Internal 노드 1 - 최대 Input 노드 250000개 연결해도 전력 문제는 없음
 * Output 노드에 데이터를 전송하기 위한 Internal 노드 2 - 최대 Output 노드 250000개 연결해도 전력 문제 없음
 */

const [N, Mlim, Plim] = input[0].split(" ").map(num => parseInt(num));

const Ntot = 2*N + 2;
console.log(Ntot, N*2 + 1);

// Input 노드들과 Internal 노드 1 을 연결
for(let inputNode = 1; inputNode <= N; inputNode++) {
    console.log(inputNode, N*2 + 1);
}

// Internal 노드 1, 2 연결
console.log(N*2 + 1, N*2 + 2);

// Internal 노드 2 와 Output 노드들을 연결
for(let outputNode = N + 1; outputNode <= N * 2; outputNode++) {
    console.log(N*2 + 2, outputNode);
}