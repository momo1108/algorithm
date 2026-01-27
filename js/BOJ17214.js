const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ17214.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

const firstPoly = input[0];

// 1차항 x 의 존재 유무로 케이스를 나눈다.
let splitPoly = firstPoly.split("x");
if (splitPoly.length === 1) {
    // 1차항이 존재하지 않는 경우, 적분 시 1차항의 계수는 기존 상수항이다.
    let lc = splitPoly[0]; // 1차항 계수
    // 기존 상수항이 1 혹은 -1 인 경우 1을 생략한다.
    lc = lc === "1" ? "" : lc === "-1" ? "-" : lc;
    // 상수항이 0인 경우 따로 적분 결과 W 를 출력한다.
    if (lc === "0") console.log("W");
    else console.log(`${lc}x+W`);
} else {
    // 적분 후 2차항 계수는 적분 전 1차항 계수 / 2 로 구한다.
    let qc = parseInt(splitPoly[0]) / 2; // 2차항 계수
    // 만약 계수가 1 혹은 -1 이면 1을 생략한다.
    qc = qc === 1 ? "" : qc === -1 ? "-" : qc;
    let v = `${qc}xx`;
    let c = "";
    // 만약 상수항이 존재한다면, 그대로 적분 후 1차항의 계수로 사용한다.
    // 만약 1 혹은 -1 이라면 1을 생략한다.
    if (splitPoly[1]) {
        splitPoly[1] = splitPoly[1] === "+1" ? "+" : splitPoly[1] === "-1" ? "-" : splitPoly[1];
        c = splitPoly[1] + "x";
    }
    
    const answer = `${v}${c}+W`;
    console.log(answer);
}
