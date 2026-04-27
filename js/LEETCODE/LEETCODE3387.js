/**
 * [LeetCode 3387] Maximize Amount After Two Days of Conversions
 *
 * 시작 통화 initialCurrency를 1.0만큼 가지고 시작한다.
 * 1일차에는 pairs1 / rates1의 환율만 사용 가능하고,
 * 2일차에는 pairs2 / rates2의 환율만 사용 가능하다.
 * 각 환전 쌍은 역방향 환전도 가능하며 비율은 1 / rate 이다.
 *
 * 각 날짜마다 환전은 여러 번 할 수 있고, 1일차 환전을 끝낸 뒤 2일차 환전을 진행한다.
 * 최종적으로 initialCurrency를 최대 몇 단위까지 만들 수 있는지 반환하라.
 *
 * 제한사항:
 * 1 <= pairs1.length, pairs2.length <= 10
 * 1.0 <= rates1[i], rates2[i] <= 10.0
 * 각 날짜의 환율 정보에는 모순이 없다.
 *
 * 풀이:
 * DFS 스타일의 완화(갱신) 전파
 * - 각 날짜의 환율을 양방향 그래프로 만든다.
 * - 1일차 그래프에서는 initialCurrency로부터 도달 가능한 각 통화의 최대 금액을 구한다.
 * - 2일차 그래프에서는 1일차에서 얻어둔 각 통화를 시작점으로 다시 최대 금액 갱신을 전파한다.
 * - 어떤 통화의 금액이 더 커질 수 있다면 재귀적으로 다시 탐색해 이득을 전파한다.
 * - 모든 갱신이 끝난 뒤 initialCurrency에 저장된 최대 금액이 정답이다.
 */

/**
 * @param {string} initialCurrency
 * @param {string[][]} pairs1
 * @param {number[]} rates1
 * @param {string[][]} pairs2
 * @param {number[]} rates2
 * @return {number}
 */
var maxAmount = function(initialCurrency, pairs1, rates1, pairs2, rates2) {
    // 각 날짜의 환율 정보를 양방향 그래프로 구성한다.
    const day1Graph = new Map();
    const day2Graph = new Map();

    for (let i = 0; i < pairs1.length; i++) {
        const day1Pair = pairs1[i];

        if (!day1Graph.has(day1Pair[0])) day1Graph.set(day1Pair[0], []);
        if (!day1Graph.has(day1Pair[1])) day1Graph.set(day1Pair[1], []);

        day1Graph.get(day1Pair[0]).push([day1Pair[1], rates1[i]]);
        day1Graph.get(day1Pair[1]).push([day1Pair[0], 1 / rates1[i]]);
    }

    for (let i = 0; i < pairs2.length; i++) {
        const day2Pair = pairs2[i];

        if (!day2Graph.has(day2Pair[0])) day2Graph.set(day2Pair[0], []);
        if (!day2Graph.has(day2Pair[1])) day2Graph.set(day2Pair[1], []);

        day2Graph.get(day2Pair[0]).push([day2Pair[1], rates2[i]]);
        day2Graph.get(day2Pair[1]).push([day2Pair[0], 1 / rates2[i]]);
    }

    // amountByCurrency[currency] = 현재까지 확인된 해당 통화의 최대 금액
    const amountByCurrency = new Map();
    amountByCurrency.set(initialCurrency, 1);

    // 1일차 환전 결과를 먼저 모두 반영한다.
    propagateMaxAmount(initialCurrency, day1Graph, amountByCurrency);

    // 1일차에 도달 가능한 모든 통화를 2일차의 시작점으로 삼아 다시 최대 금액을 전파한다.
    for (const [currency] of amountByCurrency.entries()) {
        propagateMaxAmount(currency, day2Graph, amountByCurrency);
    }

    console.log(amountByCurrency.get(initialCurrency));
    return amountByCurrency.get(initialCurrency);

    function propagateMaxAmount(currency, graph, amountMap) {
        const neighbors = graph.get(currency);
        if (!neighbors) return;

        for (let i = 0; i < neighbors.length; i++) {
            const [nextCurrency, rate] = neighbors[i];
            const savedAmount = amountMap.get(nextCurrency);
            const convertedAmount = amountMap.get(currency) * rate;
            const isFirstVisit = !savedAmount;
            const canIncreaseAmount = savedAmount && convertedAmount > savedAmount;

            // 더 큰 금액을 만들 수 있는 경우에만 갱신하고, 그 이득을 다음 통화들로 전파한다.
            if (isFirstVisit || canIncreaseAmount) {
                amountMap.set(nextCurrency, convertedAmount);
                propagateMaxAmount(nextCurrency, graph, amountMap);
            }
        }
    }
};

maxAmount("USD", [["USD", "EUR"]], [1.0], [["EUR", "JPY"]], [10.0]);