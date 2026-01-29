from itertools import combinations
from collections import deque
from copy import deepcopy
import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/14502

DIR = ((1, 0), (0, -1), (-1, 0), (0, 1))

N, M = [int(_) for _ in input().rstrip().split()]
mapArr = []
for _ in range(N):
    mapArr.append([int(a) for a in input().rstrip().split()])


def bfs(cMap):
    q = deque()
    visit = [[False] * M for _ in range(N)]
    for r in range(N):
        for c in range(M):
            if cMap[r][c] == 2:
                q.append((r, c))
                visit[r][c] = True
    while q:
        r, c = q.popleft()

        for (
            dr,
            dc,
        ) in DIR:
            if r + dr < 0 or r + dr >= N or c + dc < 0 or c + dc >= M:
                continue
            if cMap[r + dr][c + dc] != 0 or visit[r + dr][c + dc]:
                continue
            cMap[r + dr][c + dc] = 2
            q.append((r + dr, c + dc))
            visit[r + dr][c + dc] = True


answer = 0
for l1, l2, l3 in combinations(range(N * M), 3):
    l1r, l1c, l2r, l2c, l3r, l3c = l1 // M, l1 % M, l2 // M, l2 % M, l3 // M, l3 % M
    if mapArr[l1r][l1c] != 0 or mapArr[l2r][l2c] != 0 or mapArr[l3r][l3c] != 0:
        continue
    copiedMap = deepcopy(mapArr)
    copiedMap[l1r][l1c] = 1
    copiedMap[l2r][l2c] = 1
    copiedMap[l3r][l3c] = 1

    bfs(copiedMap)

    count = 0
    for r in copiedMap:
        for c in r:
            if c == 0:
                count += 1
    answer = max(count, answer)

print(answer)
