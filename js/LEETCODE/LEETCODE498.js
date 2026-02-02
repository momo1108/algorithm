/**
 * m행 x n열 사이즈의 숫자 배열이 주어졌을 때,
 * 이 배열을 대각선 방향으로 순회했을 때의 결과를 배열로 리턴한다.
 * 
 * 첫번째 행, 첫번째 열에서 시작하며 오른쪽위 방향으로 출발한다.
 * 막히면 다음 칸으로 이동해 반대방향으로 출발한다.
 * 
 * 오른쪽 위 방향이 막히는 경우 가능한 다음 칸
 * (r, c) -> (r, c + 1) 최우선
 *           (r + 1, c) 차선
 * 
 * 왼쪽 아래 방향이 막히는 경우 가능한 다음 칸
 * (r, c) -> (r + 1, c) 최우선
 *           (r, c + 1) 차선
 */

/**
 * @param {number[][]} mat
 * @return {number[]}
 */
var findDiagonalOrder = function(mat) {
    // === 초기화 섹션 ===
    // 배열의 행(m)과 열(n) 크기 저장
    let m = mat.length;
    let n = mat[0].length;

    // 현재 위치를 나타내는 행(r), 열(c) 인덱스 (시작: 좌측 상단)
    let r = 0;
    let c = 0;

    // === 방향 관련 설정 ===
    // 현재 진행 중인 대각선 방향 ("rightTop" 또는 "leftBottom")
    let diagonal = "rightTop";
    
    // 각 대각선 방향에 따른 행/열 이동값 [행 변화량, 열 변화량]
    // rightTop: 오른쪽 위로 이동 (행 -1, 열 +1)
    // leftBottom: 왼쪽 아래로 이동 (행 +1, 열 -1)
    let diagonalMap = {
        "rightTop" : [-1, 1],
        "leftBottom" : [1, -1]
    }

    // === 헬퍼 함수: 방향 전환 ===
    // 대각선 방향을 반대로 전환 (오른쪽위 ↔ 왼쪽아래)
    function switchDiagonal() {
        if (diagonal === "rightTop") diagonal = "leftBottom";
        else diagonal = "rightTop";
    }

    // === 헬퍼 함수: 막혔을 때 다음 위치로 이동 ===
    // 대각선이 막혔을 때 규칙에 따라 다음 시작점을 찾고 방향을 전환
    function goNextLocationAndSwitch() {
        const nextLocation = [r, c];

        // 오른쪽 위 방향이 막혔을 때: 오른쪽 이동 우선, 불가능하면 아래 이동
        if (diagonal === "rightTop") {
            if (c + 1 < n) nextLocation[1] = c + 1;
            else nextLocation[0] = r + 1;
        } 
        // 왼쪽 아래 방향이 막혔을 때: 아래 이동 우선, 불가능하면 오른쪽 이동
        else {
            if (r + 1 < m) nextLocation[0] = r + 1;
            else nextLocation[1] = c + 1;
        }

        // 방향을 반대로 전환
        switchDiagonal();

        // 새로운 위치로 이동
        r = nextLocation[0];
        c = nextLocation[1];
    }

    // === 메인 로직: 대각선 순회 ===
    const answer = [];
    
    // 배열의 모든 원소를 방문할 때까지 반복
    while (r < m && c < n) {
        // 현재 위치의 값을 결과 배열에 추가
        answer.push(mat[r][c]);
        
        // 현재 대각선 방향으로 계속 이동 가능한지 확인
        // (다음 위치가 배열 범위 내에 있는지 체크)
        if (
            r + diagonalMap[diagonal][0] < m &&
            r + diagonalMap[diagonal][0] >= 0 &&
            c + diagonalMap[diagonal][1] < n &&
            c + diagonalMap[diagonal][1] >= 0
        ) {
            // 가능하면 대각선 방향으로 계속 진행
            r = r + diagonalMap[diagonal][0];
            c = c + diagonalMap[diagonal][1];
        } else {
            // 막혔으면 다음 대각선 시작점으로 이동하고 방향 전환
            goNextLocationAndSwitch();
        }
    }

    return answer;
};