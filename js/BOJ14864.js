const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ14864.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

/**
 * 1 번 학생부터 N 번 학생까지 각각 본인 번호와 동일한 숫자 카드를 들고있다고 가정한다
 * 이후 순서쌍에 따라 n1, n2 학생이 주어지면 
 * n1 학생의 숫자카드는 +1 n2 학생의 숫자카드는 -1 을 한다.
 * 
 * 끝나고 나서 중복된 숫자가 있는 경우 -1 을 출력한다.
 */
const [N, ] = input[0].split(" ").map(value => parseInt(value));

const cardArray = Array.from({length: N + 1}, (_, i)=>i);
const countArray = Array(N+1).fill(0);

for (const line of input.slice(1)) {
    const [n1, n2] = line.split(" ").map(value => parseInt(value));
    cardArray[n1]++;
    cardArray[n2]--;
}
let answer = cardArray.slice(1).join(" ");

// 중복된 값이 있으면 -1 을 정답으로 설정
for (const cardNumber of cardArray.slice(1)) {
    if (countArray[cardNumber] > 0) {
        answer = "-1";
        break
    }
    countArray[cardNumber]++;
}
console.log(answer);