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
    const n = stones.length;
    if (n < 2 || stones[0] !== 0 || stones[1] !== 1) return false;

    const stoneSet = new Set(stones);
    const last = stones[n - 1];

    const dp = new Map(); // pos -> Set of jump sizes that can land here
    for (const s of stones) dp.set(s, new Set());
    dp.get(0).add(0);

    for (const pos of stones) {
        const ks = dp.get(pos);
        for (const k of ks) {
        for (let nk = k - 1; nk <= k + 1; nk++) {
            if (nk <= 0) continue;
            const next = pos + nk;
            if (next === last) return true;
            if (stoneSet.has(next)) dp.get(next).add(nk);
        }
        }
    }

    return false;
};