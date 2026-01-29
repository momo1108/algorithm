const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ5426.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

/**
 * 정사각형 형태의 편지지에 격자마다 문자를 적은 편지가 90도 돌려서 암호화되었다.
 * 원본의 메세지를 구해야한다.
 * 
 * 아래의 과정을 반복하면 된다.
 * 1. 마지막 열로 간다.
 * 2. 해당 열의 행을 순서대로 읽는다.
 * 3. 직전 열로 간다.
 * 4. 해당 열의 행을 순더대로 읽는다.
 * 5. 3~4번 과정을 모든 열에 대해 반복한다.
 */

for (const line of input.slice(1)) {
    const lengthOfSquare = Math.sqrt(line.length);

    // 원본 편지의 알파벳을 순서대로 저장할 배열
    const originalLetterArray = [];

    // 1~5 번 과정을 코드로 구현
    for (let col = lengthOfSquare - 1; col >= 0; col--){
        for (let row = 0; row < lengthOfSquare; row++) {
            const alphabet = line[lengthOfSquare * (row + 1) - (lengthOfSquare - col)];
            originalLetterArray.push(alphabet);
        }
    }
    console.log(originalLetterArray.join(""));
}
