/**
 * [LeetCode 391] Perfect Rectangle
 *
 * rectangles[i] = [xi, yi, ai, bi] 는 축에 평행한 작은 직사각형 하나를 의미한다.
 * (xi, yi)는 좌하단, (ai, bi)는 우상단 좌표다.
 *
 * 모든 작은 직사각형을 합쳤을 때,
 * 빈틈도 겹침도 없이 하나의 큰 직사각형을 정확히 덮으면 true,
 * 아니면 false를 반환한다.
 *
 * 제한사항:
 * 1 <= rectangles.length <= 2 * 10^4
 * rectangles[i].length == 4
 * -10^5 <= xi < ai <= 10^5
 * -10^5 <= yi < bi <= 10^5
 *
 * 풀이 핵심:
 * 1) 각 작은 직사각형의 4개 꼭지점을 Set 토글 방식으로 관리
 *    - 처음 등장: 추가, 다시 등장: 제거
 *    - 내부에서 공유되는 꼭지점은 짝수 번 등장해 사라지고,
 *      최종적으로는 큰 직사각형의 4개 꼭지점만 남아야 한다.
 * 2) 모든 작은 직사각형 면적 합 == 최종 큰 직사각형 면적 이어야 한다.
 *
 * 시간복잡도: O(N)
 * 공간복잡도: O(N)
 */

/**
 * @param {number[][]} rectangles
 * @return {boolean}
 */
var isRectangleCover = function(rectangles) {
    // 홀수 번 등장한 꼭지점만 남기는 토글 Set
    const vertexSet = new Set();
    // 전체를 감싸는 최소/최대 경계: [minX, minY, maxX, maxY]
    const boundingRect = [...rectangles[0]];
    let totalArea = 0;
    for (const rect of rectangles) {
        // 전체 바운딩 직사각형 갱신
        if (rect[0] < boundingRect[0]) boundingRect[0] = rect[0];
        if (rect[1] < boundingRect[1]) boundingRect[1] = rect[1];
        if (rect[2] > boundingRect[2]) boundingRect[2] = rect[2];
        if (rect[3] > boundingRect[3]) boundingRect[3] = rect[3];

        // 작은 직사각형 면적 누적
        totalArea += ((rect[2] - rect[0]) * (rect[3] - rect[1]));

        // 네 꼭지점을 문자열 키로 만들어 토글
        const vertices = [
            `${rect[0]}/${rect[1]}`,
            `${rect[0]}/${rect[3]}`,
            `${rect[2]}/${rect[1]}`,
            `${rect[2]}/${rect[3]}`
        ];
        for (const vertex of vertices) {
            if (vertexSet.has(vertex)) vertexSet.delete(vertex);
            else vertexSet.add(vertex);
        }
    }

    // 정확히 덮였으면 최종적으로 바깥 4개 꼭지점만 남아야 함
    if (vertexSet.size !== 4) return false;

    // 남은 4개 꼭지점으로 큰 직사각형 면적 계산
    const remainingVertices = [...vertexSet].map(vertex => vertex.split("/").map(Number));
    remainingVertices.sort((v1, v2) => v1[0] === v2[0] ? v1[1] - v2[1] : v1[0] - v2[0]);
    const finalArea = (remainingVertices[3][0] - remainingVertices[0][0]) * (remainingVertices[3][1] - remainingVertices[0][1]);

    // 작은 직사각형 면적 총합이 큰 직사각형 면적과 같아야 함
    return totalArea === finalArea;
};

console.log(isRectangleCover([[0,0,1,1],[0,0,2,1],[1,0,2,1],[0,2,2,3]]));