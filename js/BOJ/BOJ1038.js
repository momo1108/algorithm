const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ1038.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

/**
 * [BOJ 1038] 감소하는 수
 *
 * 각 자릿수가 왼쪽에서 오른쪽으로 갈수록 엄격하게 감소하는 수를 감소하는 수라고 한다.
 * 예를 들어 321, 950, 7은 감소하는 수이고, 322, 123, 11은 감소하는 수가 아니다.
 * 감소하는 수를 오름차순으로 나열했을 때 N번째 수를 구하는 문제이다.
 *
 * 풀이:
 * 모든 감소하는 수를 재귀적으로 생성한 뒤 정렬해서 N번째 값을 꺼낸다.
 * 자릿수를 하나 늘릴 때는 현재 수의 가장 높은 자리 숫자보다 큰 숫자만 앞에 붙일 수 있다.
 * 이렇게 만들면 중복 없이 모든 감소하는 수를 생성할 수 있다.
 * 감소하는 수의 총개수는 1023개이므로 N > 1022이면 답은 -1이다.
 */

const N = +input[0];
if (N > 1022) {
    console.log(-1);
    return;
}

const decreasingNumberArray = [];
generateDecreasingNumbers(0, 0);

/**
 * 감소하는 수를 재귀적으로 생성한다.
 *
 * digitIndex는 현재 새로 붙일 자리의 위치(1의 자리부터 시작),
 * currentNumber는 지금까지 만든 감소하는 수이다.
 * 현재 수의 가장 높은 자리 숫자보다 큰 숫자만 앞에 붙여야 감소 조건이 유지된다.
 *
 * @param {number} digitIndex - 새로 붙일 자리의 위치 (0이면 1의 자리)
 * @param {number} currentNumber - 지금까지 만든 감소하는 수
 */
function generateDecreasingNumbers(digitIndex, currentNumber) {
    const leadingDigit = digitIndex === 0 ? -1 : Math.floor(currentNumber / (10 ** (digitIndex - 1)));

    for (let nextDigit = leadingDigit + 1; nextDigit < 10; nextDigit++) {
        const nextNumber = nextDigit * (10 ** digitIndex) + currentNumber;

        // 더 큰 자릿수의 감소하는 수를 먼저 생성한다.
        generateDecreasingNumbers(digitIndex + 1, nextNumber);
        decreasingNumberArray.push(nextNumber);
    }
}

// 생성된 감소하는 수들을 오름차순으로 정렬한 뒤 N번째 값을 출력한다.
decreasingNumberArray.sort((a, b) => a - b);
console.log(decreasingNumberArray[N]);