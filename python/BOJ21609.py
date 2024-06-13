from copy import deepcopy
import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/21609

DIR = ((1, 0), (0, -1), (-1, 0), (0, 1))

N, M = [int(a) for a in input().rstrip().split()]
blockMap = []
for _ in range(N):
    blockMap.append([int(a) for a in input().rstrip().split()])

answer = 0
while True:
    normalBlockVisit = [[False] * N for _ in range(N)]
    maxGroupArr = []
    maxGroupSize = 0
    maxGroupRainbowSize = -1

    # O(V+E) = 2500 + 10000 = 12500
    def dfs(r, c):
        global blockMap
        global normalBlockVisit
        global maxGroupArr
        global maxGroupSize
        global maxGroupRainbowSize
        visit = [[False] * N for _ in range(N)]
        tmpGroupArr = []
        tmpGroupSize = 1
        tmpGroupRainbowSize = 0
        color = blockMap[r][c]
        stack = []
        stack.append((r, c))
        tmpGroupArr.append((r, c))
        visit[r][c] = True
        normalBlockVisit[r][c] = True

        while stack:
            cr, cc = stack.pop()

            for dr, dc in DIR:
                nr, nc = cr + dr, cc + dc
                # 그룹이 아닌 경우
                if nr < 0 or nr >= N or nc < 0 or nc >= N:
                    continue
                if visit[nr][nc] or blockMap[nr][nc] < 0:
                    continue
                if blockMap[nr][nc] > 0 and blockMap[nr][nc] != color:
                    continue
                # 그룹이 맞는 경우
                if blockMap[nr][nc] == 0:
                    tmpGroupRainbowSize += 1
                else:
                    normalBlockVisit[nr][nc] = True
                tmpGroupSize += 1
                stack.append((nr, nc))
                tmpGroupArr.append((nr, nc))
                visit[nr][nc] = True

        if tmpGroupSize == 1:
            return
        # 최대 그룹 체크
        # 사이즈가 더 크면 바로 수정
        if tmpGroupSize > maxGroupSize:
            maxGroupArr = tmpGroupArr
            maxGroupSize = tmpGroupSize
        elif tmpGroupSize == maxGroupSize:
            # 사이즈가 같으면 무지개블록 수로 결정
            # 무지개블록 수가 같으면 어짜피 나중에 실행되는 dfs 가
            # 기준 블록이 더 뒤에 있으니 확인안하고 최대그룹으로 수정
            if tmpGroupRainbowSize >= maxGroupRainbowSize:
                maxGroupArr = tmpGroupArr
                maxGroupRainbowSize = tmpGroupRainbowSize

    def deleteGroup():
        global answer
        for r, c in maxGroupArr:
            blockMap[r][c] = -2
        answer += maxGroupSize**2

    # O(N^2) = 2500
    def applyGravityForce():
        global blockMap
        for c in range(N):
            moveLength = 0
            for r in range(N)[-1::-1]:
                if blockMap[r][c] == -2:
                    moveLength += 1
                elif blockMap[r][c] == -1:
                    moveLength = 0
                elif blockMap[r][c] >= 0 and moveLength:
                    blockMap[r + moveLength][c] = blockMap[r][c]
                    blockMap[r][c] = -2

    def rotateBlockMap():
        global blockMap
        afterMap = [[0] * N for _ in range(N)]

        for i in range(N):
            for j in range(N):
                afterMap[N - j - 1][i] = blockMap[i][j]

        blockMap = afterMap

    for r in range(N):
        for c in range(N):
            # 방문하지 않은 일반 블록인 경우에만 블록 찾기 수행
            if blockMap[r][c] > 0 and not normalBlockVisit[r][c]:
                dfs(r, c)

    if maxGroupSize == 0:
        break
    deleteGroup()
    applyGravityForce()
    rotateBlockMap()
    applyGravityForce()

    for r in blockMap:
        print(r)
    print("=================")

print(answer)
