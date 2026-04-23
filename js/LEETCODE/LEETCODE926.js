/**
 * @param {string} s
 * @return {number}
 */
var minFlipsMonoIncr = function(s) {
    /**
     * 각 인덱스를 0 -> 1 이 되는 문자의 시작으로 가정했을 때, 맞지않는 개수를 카운트?
     * 브루트포트는 N^2 이니 너무 오래걸리므로, 이 과정을 DP 로 푼다면?
     * 점화식) DP[i] = 특정 인덱스가 0에서 1로 바뀌는 첫번째 문자일 때, 맞지않는(뒤집어야하는) 문자 개수
     * DP[i][0] = i번 인덱스 이전에 0이 아닌 문자의 개수
     * DP[i][1] = i번 인덱스부터 1이 아닌 문자의 개수
     * 
     * DP[0][0] = 0
     * DP[0][1] = 0번 인덱스부터 1이 아닌 문자의 개수
     * 
     * DP[i][0] = DP[i - 1][0] + (s[i - 1] === "0" ? 0 : 1)
     * DP[1][1] = DP[i - 1][1] - (s[i - 1] === "0" ? 1 : 0)
     * ...
     * 
     * 이후 모든 DP[i] 중 가장 낮은 DP[i][0] + DP[i][1] 값이 정답
     * 
     * 주의사항) i 번째 인덱스를 1로 바뀌는 위치로 가정하기 때문에, 
     * 문자 전체가 1로 바뀌지 않는 경우(모두 0이어야 하는 경우)를 고려하기위해 
     * [0, s.length] 를 DP의 범위로 설정 (s.length 를 제외하지 않는다.)
     */
    const DP = Array.from({length: s.length + 1}, () => new Array(2).fill(0));
    for (let i = 0; i < s.length; i++) {
        if (s[i] === "0") DP[0][1]++;
    }

    let answer = DP[0][0] + DP[0][1];
    for (let i = 1; i <= s.length; i++) {
        DP[i][0] = DP[i - 1][0] + (s[i - 1] === "0" ? 0 : 1);
        DP[i][1] = DP[i - 1][1] - (s[i - 1] === "0" ? 1 : 0);
        answer = answer > DP[i][0] + DP[i][1] ? DP[i][0] + DP[i][1] : answer;
    }

    return answer;
};

console.log(minFlipsMonoIncr("11011"))