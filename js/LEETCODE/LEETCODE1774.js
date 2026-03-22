/**
 * [LeetCode 1774] Closest Dessert Cost
 *
 * 베이스는 정확히 1개 선택하고, 각 토핑은 0/1/2개 선택 가능하다.
 * 만들 수 있는 디저트 가격 중 target과의 차이가 최소인 값을 구한다.
 * 차이가 같으면 더 작은 가격을 선택한다.
 *
 * 풀이:
 * 백트래킹 + 중복 합계 캐싱
 * - 토핑을 "최대 2개"까지 쓸 수 있도록 toppingCosts를 한 번 더 붙여
 *   각 토핑을 최대 1번 고르는 조합 문제로 바꾼다.
 * - 각 base에서 시작해 토핑 조합을 백트래킹으로 탐색한다.
 * - 이미 계산한 총합은 Set으로 중복 계산을 줄인다.
 * - 시간복잡도(주석 기준 아이디어): 최악 약 10 * 2^20 수준으로 제한 내 가능.
 */

/**
 * @param {number[]} baseCosts
 * @param {number[]} toppingCosts
 * @param {number} target
 * @return {number}
 */
var closestCost = function(baseCosts, toppingCosts, target) {
    // 각 토핑을 최대 2번까지 선택 가능하도록 동일 배열을 한 번 더 이어 붙인다.
    toppingCosts.push(...toppingCosts);

    let exactMatchFound = false;
    const seenTotalCosts = new Set();
    let bestCost = Number.MAX_SAFE_INTEGER;
    let bestGap = Number.MAX_SAFE_INTEGER;

    for (const baseCost of baseCosts) {
        updateBest(baseCost);
        backtrackToppings(baseCost, -1);
        if (exactMatchFound) return bestCost;
    }

    return bestCost;

    // 현재 비용이 기존 정답보다 target에 더 가까운지(또는 같은 차이면 더 작은지) 갱신
    function updateBest(cost) {
        const gap = Math.abs(target - cost);
        if (gap === 0) {
            exactMatchFound = true;
            bestCost = cost;
            bestGap = gap;
        } else if (gap < bestGap || (gap === bestGap && cost < bestCost)) {
            bestCost = cost;
            bestGap = gap;
        }
    }

    // lastIndex 이후 토핑을 선택해 조합을 확장한다(조합 중복 방지)
    function backtrackToppings(totalCost, lastIndex) {
        if (totalCost >= target) return bestCost;

        for (let i = lastIndex + 1; i < toppingCosts.length; i++) {
            const nextCost = totalCost + toppingCosts[i];
            if (!seenTotalCosts.has(nextCost)) {
                updateBest(nextCost);
                seenTotalCosts.add(nextCost);
            }
            backtrackToppings(nextCost, i);
        }
    }
};