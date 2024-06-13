from collections import deque
import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/17086

DIR = ((1, 0), (1, -1), (0, -1), (-1, -1), (-1, 0), (-1, 1), (0, 1), (1, 1))
N, M = [int(a) for a in input().rstrip().split()]
sharkMap = []
safeDistanceMap = [[99] * M for _ in range(N)]

for _ in range(N):
    sharkMap.append([int(a) for a in input().rstrip().split()])


def checkDistance(r, c):
    """
    BFS 를 활용해서 각각의 상어들이 갈 수 있는 모든 곳의 거리를 계산한다.
    """
    q = deque()
    q.append((r, c, 0))

    while q:
        # 안전거리 체크할 행, 열, 이동거리
        cr, cc, cd = q.popleft()

        for dr, dc in DIR:
            # 밖으로 벗어나는 경우
            if cr + dr < 0 or cr + dr >= N or cc + dc < 0 or cc + dc >= M:
                continue
            # 상어가 있는 자리 이거나 이미 더 짧은 안전거리가 있는경우
            if (
                sharkMap[cr + dr][cc + dc]
                or (cd + 1) >= safeDistanceMap[cr + dr][cc + dc]
            ):
                continue

            safeDistanceMap[cr + dr][cc + dc] = cd + 1
            q.append((cr + dr, cc + dc, cd + 1))


for r in range(N):
    for c in range(M):
        if sharkMap[r][c]:
            checkDistance(r, c)

print(max(filter(lambda d: d < 99, sum(safeDistanceMap, []))))
