const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ23037.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const n = input[0];

/*
각 자리수를 분리한 후 숫자로 변환하고 모두 5제곱을 하여 더합니다.
*/

const numberArray = n.split("").map((num)=>parseInt(num));
const answer = numberArray.reduce((prev, cur)=> prev + cur ** 5, 0);

console.log(answer);