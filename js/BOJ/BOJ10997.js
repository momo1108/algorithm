const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ10997.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

const n = parseInt(input[0]);

// 예외처리) 1일때는 그냥 *만 출력한다.
if (n === 1) console.log("*");
else {
    /**
     * 미리 전체 그림에 맞는 사이즈의 배열을 생성한다.
     * 이후 아래의 절차를 반복한다.
     * 1. (좌 하 우 상) 순으로 방향을 설정한다
     * 2. 시작점으로부터 정해진 방향으로 한칸씩 이동하며 다음칸이 * 인 경우 이전칸까지만 * 로 채워넣는다.
     * 3. 모든 방향의 순회가 끝났을 때, 마지막 위치가 열의 중앙에 있으면 종료한다.
     */
    const starArr = Array(n * 4 - 1).fill(null).map(()=>Array(n * 4 - 3).fill(" "));
    const rowLength = starArr.length;
    const colLength = starArr[0].length;
    
    const DIRS = [[0, -1], [1, 0], [0, 1], [-1, 0]];
    const location = [0, colLength - 1];
    starArr[location[0]][location[1]] = "*"
    
    while (true) {
        for (const [dr, dc] of DIRS) {
            let nr, nc;
            while (true) {
                nr = location[0] + dr;
                nc = location[1] + dc;
                if (nr < 0 || nr >= rowLength || nc < 0 || nc >= colLength) break;
                if (starArr[nr][nc] === "*") {
                    location[0] = location[0] - dr;
                    location[1] = location[1] - dc;
                    break;
                }
                starArr[location[0]][location[1]] = '*';
                location[0] = nr;
                location[1] = nc;
            }
        }
        if(location[1] === (2 * n - 2)) break;
    }
    
    for (const starLine of starArr) {
        console.log(starLine.join("").trim());
    }
}