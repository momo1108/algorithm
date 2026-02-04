const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ1747.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

N = parseInt(input[0]);

// 소수 판별 함수
function isPrime(num) {
    if (num === 1) return false; // 1은 소수가 아님
    if (num === 2) return true;  // 2는 소수
    // 2부터 √num까지 나눠보면서 소수 판별
    for (let divider = 2; divider <= Math.floor(Math.sqrt(num)); divider++) {
        if (num % divider === 0) return false; // 나누어떨어지면 소수가 아님
    }
    return true;
}

// 팰린드롬 판별 함수 (앞뒤로 읽어도 같은 수)
function isPalindrome(num) {
    const numberString = String(num);
    // 문자열의 앞과 뒤를 비교
    for (let index = 0; index < numberString.length; index++) {
        if (numberString[index] !== 
            numberString[numberString.length - index - 1]) return false;
    }
    return true;
}

// N 이상의 수 중에서 팰린드롬이면서 소수인 가장 작은 수 찾기
let answer = N;
while (!isPalindrome(answer) || !isPrime(answer)) {
    answer++;
}
console.log(answer);