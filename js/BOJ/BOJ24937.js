const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ24937.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

N = parseInt(input[0]);

/**
 * 단순히 한글자씩 잘라내서 뒤로 붙이는 과정을 N 번 반복하는 경우 O(N) 의 시간 복잡도를 가진다.
 * N 이 최대 10^9 이므로 시간이 모자란다.
 * 
 * 중요한 것은 완료됐을 때 결과이기 때문에, 문자열의 길이 L 을 기준으로
 * L 회 반복할 때 마다 같은 결과가 나온다.
 * 즉 Result(N) = Result(N % L);
 * 
 * 또한 결과를 구하기 위해서는 문자열 S 의 떼어낸 부분과 그렇지 않은 부분을 붙인다.
 */

const S = "SciComLove";
const answer = S.substring(N % S.length) + S.substring(0, N % S.length);

console.log(answer);