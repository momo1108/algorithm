from copy import deepcopy
from itertools import combinations
from collections import deque
import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/17142

"""
멀티 소스 BFS 인듯
"""
N, M = [int(a) for a in input().rstrip().split()]

lab = []

for _ in range(N):
    lab.append([int(a) for a in input().rstrip().split()])

virus = []
emptyCount = 0
for r in range(N):
    for c in range(N):
        if lab[r][c] == 2:
            virus.append((r, c))
        elif lab[r][c] == 0:
            emptyCount += 1


def getNextLocation(r, c):
    return tuple(
        filter(
            lambda loc: 0 <= loc[0] < N and 0 <= loc[1] < N,
            ((r + 1, c), (r, c - 1), (r - 1, c), (r, c + 1)),
        )
    )


def bfs(vArr):
    q = deque()
    tmpLab = deepcopy(lab)
    visit = [[False] * N for _ in range(N)]
    tmpEmptyCount = 0

    for r, c in vArr:
        q.append((r, c, 0))
        visit[r][c] = True

    while q:
        r, c, time = q.popleft()

        for nr, nc in getNextLocation(r, c):
            if visit[nr][nc]:
                continue

            if tmpLab[nr][nc] == 0:
                tmpLab[nr][nc] = time - 1
                tmpEmptyCount += 1
                if tmpEmptyCount == emptyCount:
                    return -tmpLab[nr][nc]
                q.append((nr, nc, time - 1))
                visit[nr][nc] = True
            elif tmpLab[nr][nc] == 2:
                q.append((nr, nc, time - 1))
                visit[nr][nc] = True

    return -1


answer = []
if emptyCount:
    for vArr in combinations(virus, M):
        answer.append(bfs(vArr))
    answer = list(filter(lambda x: x >= 0, answer))
    print(min(answer) if answer else -1)
else:
    print(0)
