const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ11068.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

/**
 * 각 숫자가 회문인 수인지 확인하는 문제
 * 
 * 회문인 수 - 앞으로 읽든 뒤로 읽든 똑같은 숫자
 * 
 * 회문인 수는 진법의 종류(2진법, 16진법, 10진법 등)와 상관없이 하나만 해당되면 된다.
 */

/**
 * 숫자를 N진법으로 변환하여 자릿수별로 배열에 저장하는 함수.
 * 실제 배열에는 로직 상 역순으로 숫자가 저장이 된다.
 * @param {*} number N진법으로 변환할 숫자
 * @param {*} N 진법의 종류
 * @param {*} digitArray 변환된 숫자를 저장할 배열(역순으로 저장됨)
 */
const toNthDigit = (number, N, digitArray) => {
    if (number < N) digitArray.push(number);
    else {
        const [Q, R] = [Math.floor(number / N), number % N];
        digitArray.push(R);
        toNthDigit(Q, N, digitArray);
    }
}

/**
 * 원본 숫자를 입력받아 진법의 수를 변경해가며 회문인수가 가능한지 체크한다.
 * @param {*} number 원본 숫자
 */
const checkCircular = (number) => {
    for(let N = 2; N <= 64; N++){
        const digitArray = [];
        toNthDigit(number, N, digitArray);
        
        let isCircular = true;
        // 대칭인지 앞뒤로 확인하기 때문에 중간지점까지만 반복을 돌려도 된다.
        for(let digit = 0; digit < Math.floor(digitArray.length - 1) / 2; digit++){
            if (digitArray[digit] !== digitArray[digitArray.length - 1 - digit]) {
                isCircular = false;
                break;
            }
        }

        // 한번이라도 회문인이면 1을 리턴한다.
        if (isCircular) return 1;
    }
    // 반복이 모두 끝난경우 회문인이 되지 못했다는 뜻
    return 0;
}

for(let line of input.slice(1)){
    const number = parseInt(line);
    console.log(checkCircular(number));
}