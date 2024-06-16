from heapq import *
import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/1261

"""
벽이 있는 곳으로 갈때는 weight 가 1인 다익스트라.
인접배열 형태를 이용한다.
"""
MAX = 10000
DIR = ((1, 0), (0, -1), (-1, 0), (0, 1))


def getNextVertex(r, c):
    next = []
    for dr, dc in DIR:
        if (0 <= r + dr < N) and (0 <= c + dc < M):
            next.append((r + dr, c + dc))
    return next


M, N = [int(a) for a in input().rstrip().split()]
mazeMap = []

for _ in range(N):
    mazeMap.append([int(c) for c in input().rstrip()])

D = [[MAX] * M for _ in range(N)]
D[0][0] = mazeMap[0][0]

minH = [(0, 0, 0)]

while minH:
    w, r, c = heappop(minH)

    if D[r][c] < w:
        continue

    for nr, nc in getNextVertex(r, c):
        if D[nr][nc] <= w + mazeMap[nr][nc]:
            continue
        D[nr][nc] = w + mazeMap[nr][nc]
        heappush(minH, (D[nr][nc], nr, nc))

print(D[N - 1][M - 1])
