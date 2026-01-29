const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/mom/Desktop/algorithm/data/BOJ15117.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

/**
 * 첫번째 행과 첫번째 열을 가장 먼저 체크한다.
 * 그 이후 나머지 행과 열을 체크한다.
 * 
 * 체크하는 로직은 다음과 같다.
 * 먼저 0~9, "A" ~ "Z" 까지 개수를 카운팅하는 객체를 생성한다.
 * 1. 행 또는 열의 각 글자를 체크하면서 두번 카운팅되는 경우, 정답은 "No"
 * 2. 1번에 해당하지 않는 경우, 첫번째 행과 첫번째 열이 0~9, "A" ~ "Z" 순으로 작성되어 있으면 정답은 "Reduced"
 * 3. 1번과 2번 모두 해당하지 않는 경우, "Not Reduced"
 */

function solve() {
    const increasingForm = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    const n = parseInt(input[0]);
    const checkStartIndex = increasingForm.indexOf(input[1][0]);
    const reducedChecker = increasingForm.substring(checkStartIndex, checkStartIndex + n);
    
    
    let answer = "Reduced";
    
    if (input[1] !== reducedChecker) answer = "Not Reduced";
    
    for (let row = 0; row < n; row++) {
        const charCountMap = Object.fromEntries(Array.from(increasingForm, (v) => [v, 0]));
        for (let col = 0; col < n; col++) {
            const c = input[row + 1][col];
            if (charCountMap[c] === 1) {
                answer = "No";
                return answer;
            } else charCountMap[c]++;
        }
    }
    
    if (input.slice(1).reduce((prev, cur) => prev + cur[0], "") !== reducedChecker) answer = "Not Reduced";
    
    for (let col = 0; col < n; col++) {
        const charCountMap = Object.fromEntries(Array.from(increasingForm, (v) => [v, 0]));
        const columnString = input.slice(1).reduce((prev, cur) => prev + cur[col], "");
        
        for (const c in columnString) {
            if (charCountMap[c] === 1) {
                answer = "No";
                return answer;
            } else charCountMap[c]++;
        }
    }

    return answer;
}

console.log(solve());