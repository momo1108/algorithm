/**
 * [LeetCode 207] Course Schedule
 * 
 * 수강할 과목의 총 개수 numCourses와 선행 과목 정보 prerequisites가 주어진다.
 * prerequisites[i] = [ai, bi]는 과목 ai를 들기 위해 먼저 과목 bi를 들어야 함을 의미한다.
 * 모든 과목을 수강할 수 있으면 true, 불가능하면(사이클이 있으면) false를 반환하라.
 * 
 * 제한사항:
 * 1 <= numCourses <= 2000
 * 0 <= prerequisites.length <= 5000
 * prerequisites[i].length == 2
 * 0 <= ai, bi < numCourses
 * ai != bi (자신을 선행 과목으로 가질 수 없음)
 * 같은 선행 관계는 중복되지 않음
 * 
 * 풀이:
 * DFS를 이용한 사이클 탐지 (Cycle Detection)
 * - 지향 그래프에서 사이클이 존재하면 모든 과목을 수강할 수 없음
 * - 3가지 상태로 노드를 추적:
 *   0: 미방문 (unvisited)
 *   1: 방문 중 (visiting) - 현재 DFS 경로 위의 노드
 *   2: 방문 완료 (visited) - DFS 완료
 * - 방문 중인 상태에서 다시 만난 노드가 있으면 사이클 존재
 * - 시간복잡도: O(numCourses + prerequisites.length)
 * - 공간복잡도: O(numCourses + prerequisites.length)
 */

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
    // 각 과목의 상태 추적
    // 0: 미방문, 1: 방문 중 (현재 DFS 경로상), 2: 방문 완료
    const courseState = new Array(numCourses).fill(0);

    // 인접 리스트: 각 과목을 들기 위해 선행으로 들어야 할 과목들의 목록
    // adjList[b] = [a1, a2, ...] : 과목 b를 들기 위해 과목 a1, a2... 선행 필요
    const adjList = Object.fromEntries(
        Array.from({ length: numCourses }, (_, i) => [i, []])
    );

    // prerequisites를 통해 인접 리스트 구성
    // prerequisites[i] = [a, b]: 과목 a를 들기 위해 과목 b를 먼저 들어야 함
    // -> 과목 b의 선행 과목 목록에 a 추가
    for (let [course, prerequisite] of prerequisites) {
        adjList[prerequisite].push(course);
    }

    // 모든 과목에 대해 DFS 실행하면서 사이클 검사
    for (let course = 0; course < numCourses; course++) {
        // 미방문 과목만 DFS 시작
        if (courseState[course] === 0) {
            // 사이클이 감지되면 즉시 false 반환
            if (!dfs(course)) return false;
        }
    }

    // 모든 과목에서 사이클이 없으면 true 반환
    return true;

    /**
     * DFS를 이용한 사이클 감지
     * @param {number} course - 현재 탐색 중인 과목
     * @return {boolean} - 사이클이 없으면 true, 있으면 false
     */
    function dfs(course) {
        // 현재 과목을 방문 중으로 표시
        courseState[course] = 1;

        // 현재 과목의 선행 과목들을 탐색
        for (let prerequisite of adjList[course]) {
            // 선행 과목의 상태 확인
            if (courseState[prerequisite] === 0) {
                // 미방문: 재귀적으로 DFS 진행
                if (!dfs(prerequisite)) return false;
            }
            else if (courseState[prerequisite] === 1) {
                // 방문 중: 현재 DFS 경로에서 다시 만난 노드 = 사이클 감지
                return false;
            }
            // 방문 완료(2): 이미 처리된 부분이므로 무시
        }

        // 현재 과목의 모든 선행 과목 탐색 완료
        // 현재 과목을 방문 완료로 표시
        courseState[course] = 2;

        return true;
    }
};