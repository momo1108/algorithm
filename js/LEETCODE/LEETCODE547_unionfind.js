/**
 * [LeetCode 547] Number of Provinces - Union Find (Disjoint Set Union)
 * 
 * n개의 도시와 도시 간 직접 연결 관계를 나타내는 인접 행렬 isConnected가 주어진다.
 * isConnected[i][j] = 1이면 도시 i와 도시 j가 직접 연결되어 있다.
 * 연결된 도시들의 그룹(Province)의 개수를 반환하라.
 * 
 * 주의: 연결은 이행적이다. (A-B 연결, B-C 연결이면 A와 C는 같은 Province)
 * 
 * 제한사항:
 * 1 <= n <= 200
 * isConnected[i][i] = 1 (자기 자신과의 연결)
 * isConnected[i][j] = isConnected[j][i] (대칭)
 * 
 * 풀이:
 * Union Find (Disjoint Set Union) - 분리 집합 자료구조
 * - 각 도시를 독립적인 집합으로 초기화
 * - 연결된 도시들을 union 연산으로 같은 집합으로 합치기
 * - 최종적으로 남은 분리 집합의 개수 = Province 개수
 * - 시간복잡도: O(n^2 * α(n)) ≈ O(n^2), 공간복잡도: O(n)
 *   (α는 역 애커만 함수로 매우 작은 값)
 */

/**
 * @param {number[][]} isConnected
 * @return {number}
 */
var findCircleNum = function(isConnected) {
    const n = isConnected.length;
    
    // ===== Union Find 클래스 정의 =====
    class UnionFind {
        /**
         * Union Find 초기화
         * @param {number} size - 원소의 개수
         */
        constructor(size) {
            // parent[i]: 원소 i의 부모 노드
            // 초기에는 각 원소가 자기 자신이 부모 (각각 독립적인 집합)
            this.parent = Array.from({length: size}, (_, i) => i);
            
            // rank[i]: 트리의 높이 (최적화를 위해 사용)
            // rank가 낮은 트리를 rank가 높은 트리 아래에 붙여서 트리 높이 최소화
            this.rank = Array(size).fill(0);
        }

        /**
         * 경로 압축(Path Compression)을 포함한 Find 연산
         * 원소 x가 속한 집합의 대표(root) 찾기
         * 
         * 경로 압축: 찾는 과정에서 방문한 모든 노드를 root 아래에 직접 연결
         * -> 나중의 find/union 연산을 빠르게 함
         * 
         * @param {number} x - 찾을 원소
         * @return {number} - x가 속한 집합의 대표(root)
         */
        find(x) {
            // 자신이 root가 아니면 (부모가 자신이 아니면)
            if (this.parent[x] !== x) {
                // 재귀적으로 root를 찾으면서 경로 압축 적용
                // parent[x]를 직접 root로 설정 (중간 노드들 생략)
                this.parent[x] = this.find(this.parent[x]);
            }
            return this.parent[x];
        }

        /**
         * Union by Rank를 포함한 Union 연산
         * 두 원소 x, y가 속한 집합을 합치기
         * 
         * Union by Rank: rank가 작은 트리를 rank가 큰 트리 아래에 붙임
         * -> 트리의 높이를 최소화하여 find 연산의 성능 향상
         * 
         * @param {number} x - 첫 번째 원소
         * @param {number} y - 두 번째 원소
         * @return {boolean} - 새로운 union이 발생했는지 여부
         */
        union(x, y) {
            // 각 원소의 root 찾기
            const rootX = this.find(x);
            const rootY = this.find(y);

            // 이미 같은 집합에 속해 있으면 union 불필요
            if (rootX === rootY) {
                return false;
            }

            // Union by Rank: rank가 작은 root를 큰 root 아래에 붙임
            if (this.rank[rootX] < this.rank[rootY]) {
                // rootX의 rank가 더 작으면 rootX를 rootY 아래에 붙임
                this.parent[rootX] = rootY;
            } else if (this.rank[rootX] > this.rank[rootY]) {
                // rootY의 rank가 더 작으면 rootY를 rootX 아래에 붙임
                this.parent[rootY] = rootX;
            } else {
                // rank가 같으면 일단 rootY를 rootX 아래에 붙이고 rootX의 rank 증가
                this.parent[rootY] = rootX;
                this.rank[rootX]++;
            }

            return true;
        }

        /**
         * 현재 분리된 집합의 개수 반환
         * @return {number} - 서로 다른 root의 개수 = 집합의 개수
         */
        getComponentCount() {
            // 각 원소가 자신의 root를 가지고 있으므로
            // find 후 고유한 root의 개수를 세면 됨
            const roots = new Set();
            for (let i = 0; i < this.parent.length; i++) {
                roots.add(this.find(i));
            }
            return roots.size;
        }
    }

    // ===== 메인 풀이 시작 =====
    
    // Union Find 객체 생성 (n개의 도시를 관리)
    const uf = new UnionFind(n);

    // 인접 행렬을 순회하면서 연결된 도시들을 union
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            // 도시 i와 j가 연결되어 있으면
            if (isConnected[i][j] === 1) {
                // 두 도시를 같은 집합으로 합치기
                uf.union(i, j);
            }
        }
    }

    // 최종 분리된 집합의 개수 = Province의 개수
    return uf.getComponentCount();
};

// ===== 테스트 케이스 =====

console.log("테스트 1:");
const test1 = [[1,1,0],[1,1,0],[0,0,1]];
console.log(`입력: ${JSON.stringify(test1)}`);
console.log(`출력: ${findCircleNum(test1)}`); // 2
console.log(`설명: 도시 0-1이 연결, 도시 2는 독립 -> 2개의 Province`);
console.log();

console.log("테스트 2:");
const test2 = [[1,0,0],[0,1,0],[0,0,1]];
console.log(`입력: ${JSON.stringify(test2)}`);
console.log(`출력: ${findCircleNum(test2)}`); // 3
console.log(`설명: 모두 독립적 -> 3개의 Province`);
console.log();

console.log("테스트 3:");
const test3 = [[1,1,1],[1,1,1],[1,1,1]];
console.log(`입력: ${JSON.stringify(test3)}`);
console.log(`출력: ${findCircleNum(test3)}`); // 1
console.log(`설명: 모두 연결됨 -> 1개의 Province`);
