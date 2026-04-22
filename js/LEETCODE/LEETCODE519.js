/**
 * [LeetCode 519] Random Flip Matrix
 *
 * m x n 크기의 0/1 행렬이 있고, 처음에는 모든 칸이 0이다.
 * flip()은 아직 0인 칸 중 하나를 균등한 확률로 뽑아 1로 바꾸고 [row, col]을 반환한다.
 * reset()은 모든 칸을 다시 0으로 되돌린다.
 *
 * 제한사항:
 * 1 <= m, n <= 10^4
 * flip() 호출 시, 뒤집지 않은(0인) 칸이 최소 1개 보장됨
 * flip() + reset() 호출 횟수는 최대 1000
 *
 * 풀이:
 * "남은 구간에서 랜덤 추출 + 해시 맵 스왑" 아이디어
 * - 전체 칸을 1차원 인덱스 [0..m*n-1]로 본다.
 * - 아직 선택되지 않은 구간의 크기를 remain이라 할 때, [0..remain-1]에서 랜덤 인덱스를 뽑는다.
 * - 뽑힌 인덱스의 실제 값은 swapMap에서 조회(없으면 자기 자신).
 * - 뽑힌 자리는 구간의 마지막 원소와 스왑 처리하여 다음 추첨에서 제외한다.
 * - 실제 배열을 만들지 않고 Map으로 필요한 치환 정보만 저장하므로 효율적이다.
 */

/**
 * @param {number} m
 * @param {number} n
 */
var Solution = function(m, n) {
    this.m = m;
    this.n = n;
    this.size = m * n;
    this.swapMap = new Map();
    this.flipCount = 0;
};

/**
 * @return {number[]}
 */
Solution.prototype.flip = function() {
    // 아직 선택되지 않은 구간 [0..remain-1]에서 랜덤 인덱스를 하나 뽑는다.
    const remain = this.size - this.flipCount;
    const tailIndex = remain - 1;
    const randomIndex = parseInt(remain * Math.random());

    this.flipCount++;

    // randomIndex가 가리키는 실제 1차원 인덱스(치환 이력이 없으면 자기 자신)
    const actualIndex = this.swapMap.get(randomIndex) ?? randomIndex;

    // randomIndex 자리를 현재 구간 끝(tailIndex)의 실제 값으로 교체해 다음 추첨에서 제외
    this.swapMap.set(randomIndex, this.swapMap.get(tailIndex) ?? tailIndex);

    // 1차원 인덱스를 [row, col]로 복원
    const flipRow = parseInt(actualIndex / this.n);
    const flipCol = actualIndex % this.n;

    console.log([flipRow, flipCol]);
    return [flipRow, flipCol];
};

/**
 * @return {void}
 */
Solution.prototype.reset = function() {
    // 모든 치환 이력을 지우고, 선택 횟수를 초기화
    this.swapMap.clear();
    this.flipCount = 0;
};

/** 
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(m, n)
 * var param_1 = obj.flip()
 * obj.reset()
 */

var obj = new Solution(3, 1);
var param_1 = obj.flip();
var param_1 = obj.flip();
var param_1 = obj.flip();
obj.reset();