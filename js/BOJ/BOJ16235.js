const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ16235.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

let [N, M, K] = input[0].split(" ").map(Number);

/**
 * [BOJ 16235] 나무 재테크
 * K년 동안 봄-여름-가을-겨울 순서로 시뮬레이션한 뒤, 살아있는 나무 수를 출력한다.
 *
 * 구현 포인트:
 * - 칸마다 영양분과 나무 나이 배열을 관리
 * - 봄/여름: 어린 나무부터 양분 섭취, 실패한 나무는 나이/2만큼 양분으로 환원
 * - 가을: 나이가 5의 배수인 나무가 인접 8칸에 번식
 * - 겨울: 입력으로 주어진 양분을 각 칸에 추가
 */

const DIRS = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

const nutrientMap = Array.from({length: N + 1}, () => new Array(N + 1).fill(5));
const treeMap = Array.from({length: N + 1}, () => Array.from({length: N + 1}, () => []));
const winterNutrients = input.slice(1, 1 + N).map(line => line.split(" ").map(Number));

input.slice(1 + N)
    .map(line => line.split(" ").map(Number))
    .sort((a, b) => b[2] - a[2])
    .forEach(([x, y, z]) => {
        // pop()으로 작은 나이부터 처리하기 위해 내림차순으로 넣는다.
        treeMap[x][y].push(z);
    })

while (K-- > 0) {
    afterYear();
}

let answer = 0;
for (let r = 1; r <= N; r++) {
    for (let c = 1; c <= N; c++) {
        answer += treeMap[r][c].length;
    }
}
console.log(answer);

function afterYear() {
    // 봄 + 여름 + 겨울: 칸별로 함께 처리
    for (let r = 1; r <= N; r++) {
        for (let c = 1; c <= N; c++) {
            let addedNutrient = winterNutrients[r - 1][c - 1]; // 겨울에 추가될 양분
            const survivedTrees = []; // 봄이 끝난 뒤 살아남은 나무 목록
            const trees = treeMap[r][c];
            while (trees.length) {
                const age = trees.pop();
                if (age <= nutrientMap[r][c]) {
                    survivedTrees.push(age + 1);
                    nutrientMap[r][c] -= age;
                } else {
                    // 현재 나무와 남은 나무들은 모두 죽고, 나이/2만큼 양분이 된다.
                    addedNutrient += ~~(age / 2);
                    trees.forEach(treeAge => addedNutrient += ~~(treeAge / 2));
                    trees.length = 0;
                }
            }
            // 다음 해에도 어린 나무부터 처리되도록 오름차순 상태를 유지한다.
            treeMap[r][c] = survivedTrees.reverse();
            nutrientMap[r][c] += addedNutrient;
        }
    }

    // 가을: 번식
    for (let r = 1; r <= N; r++) {
        for (let c = 1; c <= N; c++) {
            const trees = treeMap[r][c];
            trees.forEach(age => {
                if (age % 5 === 0) spreadTree(r, c);
            });
        }
    }
}

function spreadTree(r, c) {
    for (const dir of DIRS) {
        const nr = r + dir[0];
        const nc = c + dir[1];
        if (nr < 1 || nr > N || nc < 1 || nc > N) continue;
        treeMap[nr][nc].push(1);
    }
}