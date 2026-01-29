const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ20003.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

/**
 * ### 기약분수 : 분모와 분자의 공약수가 1뿐인 분수
 * 
 * 모든 분수들을 입력받은 뒤, 각 분수에 대해 기약분수화 하는 작업을 선행한다.
 * 분자, 분모 를 최대 공약수로 나누면 기약분수가 된다.
 * 최대 공약수는 유클리드 호제법으로 구할 수 있다.
 * 
 * 유클리드 호제법)
 * 양의 정수 n1, n2 를 가정했을 때 최대 공약수 GCD 에 대해 아래가 성립한다.
 * GCD(n1, n2) = GCD(n2, n1 % n2)
 * 위 과정을 반복하다가 n1 % n2 = 0 이 될 때, n2 가 최대공약수이다.
 * 
 * 최소 공배수 LCM 는 아래의 공식을 사용하면 구할 수 있다.
 * n1 * n2 = GCD * LCM
 * LCM = n1 * n2 / GCD
 * 
 * 이후 기약분수들을 처음부터 순서대로 순회하며 분모들의 최소 공배수(LCM)를 찾는다.
 * 이후 분모에 맞게 기약분수들을 변환해주고, 변환된 분수들을 순회하며 분자들의 최대 공약수(GCD)를 찾는다.
 * 최종 정답은 GCD / LCM 을 기약분수화 하면 구할 수 있다.
 */


// 양의 정수 2개 n1, n2 를 유클리드 호제법을 재귀함수로 호출하여 최대 공약수를 찾는 함수.
const findGCD = (n1, n2) => n1 % n2 === 0 ? n2 : findGCD(n2, n1 % n2);
// GCD 를 이용하여 LCM 을 구하는 함수.
const findLCM = (n1, n2) => n1 * n2 / findGCD(n1, n2);

N = parseInt(input[0]);

const solution = () => {
    const fractionArray = [];
    for (let lineIndex = 1; lineIndex <= N; lineIndex++) {
        let [n, d] = input[lineIndex].split(" ").map(value => parseInt(value));
    
        const gcd = findGCD(n, d);
        fractionArray.push([n / gcd, d / gcd]);
    }

    if (N === 1) {
        console.log(fractionArray[0][0], fractionArray[0][1]);
        return;
    }
    
    // 전체 분모의 최소 공배수를 구한다.
    let LCM = 1;
    for (const [, d] of fractionArray) {
        LCM = findLCM(LCM, d);
    }
    
    // 분수들이 최소 공배수를 분모로 가지도록 변환한다.
    for (let fIndex = 0; fIndex < fractionArray.length; fIndex++) {
        let [n, d] = fractionArray[fIndex];
        const multiplier = LCM / d;
        fractionArray[fIndex] = [n * multiplier, LCM]
    }
    
    let GCD;
    for (let fIndex = 1; fIndex < fractionArray.length; fIndex++) {
        GCD = GCD ? findGCD(GCD, fractionArray[fIndex][0]) : findGCD(fractionArray[fIndex-1][0], fractionArray[fIndex][0]);
    }
    
    // 마지막으로 정답을 기약분수화 하기위해 분자와 분모의 gcd 를 다시 구합니다.
    const finalGCD = findGCD(GCD, LCM);
    
    if (finalGCD === 1) console.log(GCD, LCM);
    else console.log(GCD / finalGCD, LCM / finalGCD);
}

solution();