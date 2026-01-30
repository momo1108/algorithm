/**
 * 개구리가 강가의 마지막 돌까지 점프를 할수있는가?
 * 강가에 존재하는 돌들은 양의 정수 좌표들로 이루어진 배열로 주어진다.
 * 시작 위치는 0, 첫 점프를 한 돌 위치는 1 로 고정된다.
 * 
 * 개구리가 k 거리만큼 점프를 한 후 다음 점프는 
 * 무조건 k-1, k, k+1 중 하나의 거리만큼 점프할 수 있다.
 * 뒤로는 점프할 수 없다.
 */

/**
 * @param {number[]} stones
 * @return {boolean}
 */
var canCross = function(stones) {
    /**
     * 가장 간단한 결과 산출 방식은
     * 재귀적으로 점프가 가능한 위치를 계산하여 재귀가 종료되었을 때,
     * 마지막 돌에 점프가 되었는가를 체크하면 된다.
     */
    let answer = false;
    const destination = stones[stones.length - 1];
    if(stones[1] !== 1) return answer;

    const visitedMap = new Map();

    const checkIsVisited = (stone, jumpDistance) => {
        const stoneSet = visitedMap.get(stone);

        if (stoneSet) {
            if (stoneSet.has(jumpDistance)) return true;
            else {
                stoneSet.add(jumpDistance);
                return false;
            }
        } else {
            visitedMap.set(stone, new Set());
        }
    }
    
    const jump = (stone, distance) => {
        if (answer) return;
        else if (stone === destination) {
            answer = true;
            return;
        }

        const possibleDistance = 
        [distance - 1, distance, distance + 1].filter(d => d > 0);

        
        for (const d of possibleDistance) {
            const jumpLoc = stone + d;
            if (checkIsVisited(stone, d)) continue;
            if (stones.includes(jumpLoc)) jump(jumpLoc, d);
        }
    }
    jump(1, 1);

    return answer;
};