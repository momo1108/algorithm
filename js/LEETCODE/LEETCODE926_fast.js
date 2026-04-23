/**
 * @param {string} s
 * @return {number}
 */
var minFlipsMonoIncr = function(s) {
    /**
     * 아이디어)
     * 문자열을 왼쪽에서 오른쪽으로 보면서, 현재 위치까지를 단조 증가(000..111..)로 만들기 위한 최소 뒤집기 횟수를 누적한다.
     *
     * 상태 정의)
     * ones  = 지금까지 등장한 '1'의 개수
     * flips = 지금까지 본 접두사를 단조 증가로 만들기 위한 최소 뒤집기 횟수
     *
     * 전이)
     * 1) 현재 문자가 '1'이면:
     *    단조 증가를 깨지 않으므로 ones만 증가한다.
     *
     * 2) 현재 문자가 '0'이면 두 선택지가 있다.
     *    A. 이 '0'을 '1'로 뒤집는다  -> flips + 1
     *    B. 이전에 나온 모든 '1'을 '0'으로 뒤집는다 -> ones
     *    둘 중 더 작은 값을 새로운 flips로 둔다.
     *    flips = min(flips + 1, ones)
     *
     * 정답)
     * 모든 문자를 순회한 뒤 flips가 최소 뒤집기 횟수이다.
     *
     * 복잡도)
     * 시간복잡도 O(N), 공간복잡도 O(1)
     */
    let ones = 0;
    let flips = 0;
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '1') {
            ones++;
        } else {
            flips = Math.min(flips + 1, ones);
        }
    }
    return flips;
};