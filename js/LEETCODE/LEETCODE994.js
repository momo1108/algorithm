/**
 * M x N 사이즈의 배열이 주어진다.
 * 배열의 요소는 다음 3가지의 값 중 하나를 가진다.
 * 0 : 빈 값
 * 1 : 신선한 오렌지
 * 2 : 썩은 오렌지
 * 
 * 매 분마다 썩은 오렌지와 인접한 신선한 오렌지도 썩게된다.
 * 최소 몇분이 지나야 신선한 오렌지가 없어지는지 반환한다.
 * 신선한 오렌지를 없앨 수 없는 경우 -1 을 출력한다
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function(grid) {
    const M = grid.length;
    const N = grid[0].length;
    
    // 신선한 오렌지 개수와 BFS 큐 초기화
    let freshOrangeCount = 0;
    const queue = [];
    let queueHead = 0; // 포인터 기반 큐로 O(1) 성능 유지

    // 1단계: grid 순회하며 신선한 오렌지 개수 세기 및 초기 썩은 오렌지 위치 수집
    let value;
    for (let row = 0; row < M; row++) {
        for (let col = 0; col < N; col++) {
            value = grid[row][col]
            if (value === 1) freshOrangeCount++;
            else if (value === 2) {
                // 썩은 오렌지를 큐에 추가 (row, col, 시간)
                queue.push(row);
                queue.push(col);
                queue.push(0);
            };
        }
    }

    // 2단계: BFS로 썩은 오렌지 전파 시뮬레이션
    let answer = 0;
    const DR = [1, 0, -1, 0];  // 상하좌우 방향 row 오프셋
    const DC = [0, 1, 0, -1];  // 상하좌우 방향 col 오프셋
    let r, c, nr, nc, minute;
    
    while(queueHead < queue.length) {
        // 큐에서 현재 썩은 오렌지 정보 꺼내기 (포인터 증가로 O(1))
        r = queue[queueHead++];
        c = queue[queueHead++];
        minute = queue[queueHead++];

        // 최대 시간 업데이트
        answer = Math.max(answer, minute);
        
        // 상하좌우 4방향 인접 셀 확인
        for (let d = 0; d < 4; d++) {
            nr = r + DR[d];
            nc = c + DC[d];

            // 범위 내이고 신선한 오렌지인 경우, 썩힘
            if (nr >= 0 && nr < M && nc >= 0 && nc < N 
                && grid[nr][nc] === 1) {
                grid[nr][nc] = 2;              // 오렌지 썩히기
                freshOrangeCount--;            // 신선한 오렌지 감소
                queue.push(nr);                // 새로 썩은 오렌지를 큐에 추가
                queue.push(nc);
                queue.push(minute + 1);        // 다음 분에 전파
            }
        }
    }

    // 3단계: 결과 반환
    // 남은 신선한 오렌지가 있으면 -1 (모두 썩힐 수 없음)
    // 아니면 최소 필요 시간 반환
    return freshOrangeCount > 0 ? -1 : answer;
};