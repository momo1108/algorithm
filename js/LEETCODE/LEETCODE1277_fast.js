/**
 * [LeetCode 1277 - Fast Version] 원본 풀이 대비 성능 차이 설명
 *
 * 원본(LEETCODE1277.js)의 핵심 방식:
 * - size = 2..min(rows, cols) 를 바깥 루프로 돌면서
 *   모든 좌상단 좌표에서 "이 size 정사각형이 가능한지"를 반복 검사한다.
 * - 즉, 같은 셀/영역을 size가 바뀔 때마다 다시 확인한다.
 * - 시간복잡도는 O(rows * cols * min(rows, cols)).
 *   (최대 300x300에서는 대략 300배 추가 반복이 붙을 수 있음)
 *
 * fast(현재 파일)의 핵심 방식:
 * - DP를 한 번의 행렬 순회로 계산한다.
 * - dp[i][j]를 "(i, j)를 우하단으로 하는 all-1 정사각형의 최대 변 길이"로 본다.
 * - 점화식:
 *   matrix[i][j] === 1 이면
 *   dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1
 *   (코드에서는 별도 dp 배열 없이 matrix를 제자리 갱신)
 * - 각 칸의 dp값은 해당 칸을 우하단으로 하는 정사각형 개수(1..dp[i][j])와 동일하므로,
 *   순회 중에 누적합 count += dp[i][j] 하면 정답이 된다.
 *
 * 왜 훨씬 빠른가?
 * 1) 중복 검사 제거
 * - 원본은 size별로 같은 위치를 여러 번 본다.
 * - fast는 각 셀을 사실상 1회 처리하며, 상수 시간 연산만 수행한다.
 *
 * 2) 루프 차원 축소
 * - 원본: 3중 구조(size, row, col)
 * - fast: 2중 구조(row, col)
 *
 * 3) 분기/비교 횟수 감소
 * - 원본은 size마다 경계 break + 4개 이웃 비교를 반복한다.
 * - fast는 조건 충족 시 min(3개) + 1 계산으로 끝난다.
 *
 * 4) 메모리 접근 지역성
 * - fast는 행 우선 순회로 바로 인접한 이전 값(상/좌/좌상)만 읽어
 *   CPU 캐시 친화적인 패턴을 만든다.
 *
 * 복잡도 비교:
 * - 원본: O(rows * cols * min(rows, cols)), O(1)
 * - fast: O(rows * cols), O(1)
 */

/**
 * @param {number[][]} matrix
 * @return {number}
 */
var countSquares = function(matrix) {
    let count = 0;
    const rows = matrix.length;
    const cols = matrix[0].length;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (matrix[i][j] === 1) {
                if (i > 0 && j > 0) {
                    matrix[i][j] = Math.min(matrix[i - 1][j], matrix[i][j - 1], matrix[i - 1][j - 1]) + 1;
                }
                count += matrix[i][j];
            }
        }
    }
    return count;
};