const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ22352.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

const [N, M] = input[0].split(" ").map(value => parseInt(value));

const mapBefore = input.slice(1, 1 + N).map(line => 
                        line.split(" ").map(value => parseInt(value)));
const mapAfter = input.slice(1 + N).map(line => 
                        line.split(" ").map(value => parseInt(value)));
                        
/**
 * 1. 백신을 맞은 이후의 격자를 순서대로 순회하며, 원본과 달라진 첫 지점(x, y)을 저장한다.
 * 2. 달라진 후의 값을 updatedValue 에 저장한다.
 * 3. 원본 격자의 x, y 좌표로부터 dfs 를 실행하여 같은 값을 가진 인접 격자들을 
 *    모두 찾아서 전부 updatedValue 로 값을 변경한다.
 * 4. 원본 격자와 백신을 맞은 이후의 격자의 동일 여부를 "YES" 혹은 "NO" 로 출력한다.
 */
const DIRS = [[-1, 0], [1, 0], [0, -1], [0, 1]];
const getNextLocation = (row, col) => {
    const nextLocationArray = [];
    
    for (const [dr, dc] of DIRS) {
        const nr = row + dr;
        const nc = col + dc;
        if (nr < 0 || nr >= N || nc < 0 || nc >= M) continue;
        nextLocationArray.push([nr, nc]);
    }

    return nextLocationArray;
}

let x, y, updatedValue;
for (let row = 0; row < N; row++) {
    for (let col = 0; col < M; col++) {
        if (mapAfter[row][col] !== mapBefore[row][col]) {
            x = row;
            y = col;
            updatedValue = mapAfter[row][col];
            break;
        }
    }
    if (updatedValue) break;
}

if (updatedValue) {
    let originalValue = mapBefore[x][y];
    
    const dfs = (row, col) => {
        mapBefore[row][col] = updatedValue;
    
        for (const [nr, nc] of getNextLocation(row, col)) {
            if (mapBefore[nr][nc] !== originalValue) continue;
            dfs(nr, nc);
        }
    }
    
    dfs(x, y);
}

let answer = "YES";
for (let row = 0; row < N; row++) {
    for (let col = 0; col < M; col++) {
        if (mapAfter[row][col] !== mapBefore[row][col]) {
            answer = "NO";
            break;
        }
    }
    if (answer === "NO") break;
}

console.log(answer);