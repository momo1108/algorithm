/**
 * [LeetCode 3387] Maximize Amount After Two Days of Conversions
 *
 * 시작 통화 initialCurrency를 1.0만큼 가지고 시작한다.
 * 1일차에는 pairs1 / rates1에 있는 환율만 사용할 수 있고,
 * 2일차에는 pairs2 / rates2에 있는 환율만 사용할 수 있다.
 * 각 환전 정보는 역방향 환전도 가능하며, 그 비율은 1 / rate 이다.
 *
 * 각 날짜마다 환전은 여러 번 할 수 있고, 1일차 환전을 모두 마친 뒤 2일차 환전을 진행한다.
 * 최종적으로 initialCurrency를 최대 몇 단위까지 만들 수 있는지 반환하라.
 *
 * 제한사항:
 * 1 <= pairs1.length, pairs2.length <= 10
 * 1.0 <= rates1[i], rates2[i] <= 10.0
 * 각 날짜의 환율 그래프에는 모순이 없고, 답은 5 * 10^10 이하로 보장된다.
 *
 * 풀이:
 * Bellman-Ford 기반 최댓값 완화
 * - 한 날짜의 환전은 "시작 통화에서 각 통화까지 도달 가능한 최대 금액" 문제로 볼 수 있다.
 * - 간선을 환율(rate)로 두고 Bellman-Ford처럼 여러 번 완화하면 각 통화까지의 최대 금액을 구할 수 있다.
 * - 1일차에는 initialCurrency에서 각 통화까지의 최대 금액을 구한다.
 * - 2일차에는 간선을 뒤집어서, 각 통화에서 initialCurrency로 돌아오는 최대 환전 비율을 구한다.
 * - 임의의 중간 통화 X를 기준으로
 *   (1일차에 initialCurrency -> X 최대 금액) * (2일차에 X -> initialCurrency 최대 비율)
 *   을 계산하고 최댓값을 답으로 선택한다.
 * - 시간복잡도: O((V1 - 1) * E1 + (V2 - 1) * E2)
 * - 공간복잡도: O(V1 + E1 + V2 + E2)
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
    // 각 날짜의 환전 정보를 양방향 간선 목록으로 변환한다.
    const day1Graph = buildEdges(pairs1, rates1);
    const day2Graph = buildEdges(pairs2, rates2);

    // 1일차: 시작 통화에서 각 통화까지 만들 수 있는 최대 금액
    const day1BestAmounts = bellmanFordMaxAmount(initialCurrency, day1Graph.currencies, day1Graph.edges);

    // 2일차: 각 통화에서 시작 통화로 되돌아오는 최대 비율
    // 역간선으로 뒤집으면 "시작 통화에서 각 통화까지" 문제와 같은 형태가 된다.
    const day2BestReturnRates = bellmanFordMaxAmount(
        initialCurrency,
        day2Graph.currencies,
        reverseEdges(day2Graph.edges)
    );

    let maxInitialCurrencyAmount = 1;

    // 중간 통화를 하나 정해 1일차 결과와 2일차 복귀 비율을 곱해본다.
    for (const [currency, amountAfterDay1] of day1BestAmounts) {
        const returnRateOnDay2 = day2BestReturnRates.get(currency) ?? 0;
        maxInitialCurrencyAmount = Math.max(
            maxInitialCurrencyAmount,
            amountAfterDay1 * returnRateOnDay2
        );
    }

    return maxInitialCurrencyAmount;
};

function buildEdges(pairs, rates) {
    const currencies = new Set();
    const edges = [];

    for (let i = 0; i < pairs.length; i++) {
        const [from, to] = pairs[i];
        const rate = rates[i];

        currencies.add(from);
        currencies.add(to);

        // 문제 조건상 역방향 환전도 항상 가능하다.
        edges.push([from, to, rate]);
        edges.push([to, from, 1 / rate]);
    }

    return {
        currencies: [...currencies],
        edges
    };
}

function reverseEdges(edges) {
    // 각 통화에서 시작 통화로 돌아오는 최대 비율을 구하기 위해 간선 방향을 뒤집는다.
    return edges.map(([from, to, rate]) => [to, from, rate]);
}

function bellmanFordMaxAmount(startCurrency, currencies, edges) {
    // startCurrency를 1.0만큼 가진 상태에서 출발한다.
    const bestAmounts = new Map();
    bestAmounts.set(startCurrency, 1);

    // Bellman-Ford와 동일하게 정점 수 - 1번까지 완화를 시도한다.
    const maxRelaxations = Math.max(currencies.length - 1, 0);
    for (let i = 0; i < maxRelaxations; i++) {
        let hasUpdate = false;

        for (let j = 0; j < edges.length; j++) {
            const [from, to, rate] = edges[j];
            const currentAmount = bestAmounts.get(from);
            if (currentAmount === undefined) continue;

            const nextAmount = currentAmount * rate;
            const bestKnownAmount = bestAmounts.get(to) ?? 0;

            // 더 큰 금액으로 도달할 수 있으면 갱신한다.
            if (nextAmount > bestKnownAmount) {
                bestAmounts.set(to, nextAmount);
                hasUpdate = true;
            }
        }

        // 더 이상 갱신이 없다면 남은 완화는 의미가 없으므로 종료한다.
        if (!hasUpdate) break;
    }

    return bestAmounts;
}

console.log(maxAmount("USD", [["USD", "EUR"]], [1.0], [["EUR", "JPY"]], [10.0]));