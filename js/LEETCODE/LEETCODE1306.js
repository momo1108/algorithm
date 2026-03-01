/**
 * [LeetCode 1306] Jump Game III
 * 
 * 양의 정수 배열 arr과 시작 인덱스 start가 주어진다.
 * 인덱스 i에 있을 때, arr[i]만큼 왼쪽(i - arr[i]) 또는 오른쪽(i + arr[i])으로 점프할 수 있다.
 * 점프를 통해 값이 0인 인덱스에 도달할 수 있으면 true, 없으면 false를 반환하라.
 * 
 * 제한사항:
 * 1 <= arr.length <= 5 * 10^4
 * 0 <= arr[i] < arr.length
 * 0 <= start < arr.length
 * 
 * 풀이 1: DFS (깊이 우선 탐색)
 * - 현재 인덱스에서 양방향(+arr[i], -arr[i])으로 점프 가능한 모든 경로 탐색
 * - 방문한 인덱스는 -1로 표시하여 무한 루프 방지
 * - 값이 0인 인덱스를 찾으면 즉시 true 반환
 * - 시간복잡도: O(n) - 각 인덱스는 최대 한 번씩만 방문
 * - 공간복잡도: O(n) - 재귀 호출 스택
 * 
 * 풀이 2: 간결한 재귀 DFS
 * - 풀이 1과 동일한 알고리즘을 더 간결하게 구현
 * - 논리 연산자(||)를 활용하여 한 줄로 처리
 * - 시간복잡도: O(n)
 * - 공간복잡도: O(n)
 */

/**
 * 풀이 1: DFS를 명시적으로 사용
 * @param {number[]} arr
 * @param {number} start
 * @return {boolean}
 */
var canReach = function(arr, start) {
    return dfs(start);

    /**
     * 주어진 인덱스에서 DFS 탐색 수행
     * @param {number} currentIndex - 현재 탐색 중인 인덱스
     * @return {boolean} - 0에 도달 가능하면 true
     */
    function dfs(currentIndex) {
        // 목표 달성: 현재 위치의 값이 0
        if (arr[currentIndex] === 0) return true;

        // 현재 위치에서 점프할 수 있는 거리
        let jumpDistance = arr[currentIndex];
        // 방문 표시: 무한 루프 방지를 위해 -1로 설정
        arr[currentIndex] = -1;

        // 양방향(왼쪽, 오른쪽)으로 점프 시도
        for (let nextIndex of [currentIndex + jumpDistance, currentIndex - jumpDistance]) {
            // 배열 범위를 벗어나면 건너뛰기
            if (nextIndex < 0 || nextIndex >= arr.length) continue;
            // 이미 방문한 인덱스면 건너뛰기
            if (arr[nextIndex] < 0) continue;
            // 재귀적으로 다음 인덱스 탐색
            if (dfs(nextIndex)) return true;
        }

        // 모든 경로를 탐색했지만 0을 찾지 못함
        return false;
    }
};

console.log(canReach([4,2,3,0,3,1,2], 0));




/**
 * 풀이 2: 간결한 재귀 DFS (논리 연산자 활용)
 * @param {number[]} arr
 * @param {number} start
 * @return {boolean}
 */
var canReach = function(arr, start) {
    // 현재 위치의 점프 거리 (값)
    const jumpDistance = arr[start];
    
    // 기본 케이스 1: 목표 도달 (값이 0)
    if (jumpDistance === 0) return true;
    
    // 기본 케이스 2: 이미 방문한 인덱스 (-1로 표시됨)
    if (jumpDistance === -1) return false;
    
    // 현재 인덱스를 방문 완료로 표시
    arr[start] = -1;
    
    // 왼쪽(start - jumpDistance) 또는 오른쪽(start + jumpDistance)으로 점프
    // 범위 체크 후 재귀 호출, 둘 중 하나라도 true면 true 반환
    return (start - jumpDistance >= 0 && canReach(arr, start - jumpDistance)) || 
           (start + jumpDistance < arr.length && canReach(arr, start + jumpDistance));
};