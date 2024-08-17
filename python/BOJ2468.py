import sys

sys.setrecursionlimit(10**4)

input = sys.stdin.readline
# https://www.acmicpc.net/problem/2468

N = int(input())
DIR = ((-1, 0), (0, 1), (1, 0), (0, -1))

heightMap = []
maxHeight = -1
for _ in range(N):
    row = [int(a) for a in input().rstrip().split()]
    heightMap.append(row)
    maxHeight = max(maxHeight, max(row))

visit = [[False] * N for _ in range(N)]


def getNextNode(row, col):
    nextNodes = []
    for dr, dc in DIR:
        if (0 <= row + dr < N) and (0 <= col + dc < N):
            nextNodes.append([row + dr, col + dc])
    return nextNodes


def dfs(row, col, height):
    visit[row][col] = True
    for nr, nc in getNextNode(row, col):
        if (heightMap[nr][nc] <= height) or (visit[nr][nc]):
            continue
        dfs(nr, nc, height)


answer = 1
for h in range(1, maxHeight):
    count = 0
    visit = [[False] * N for _ in range(N)]
    for r in range(N):
        for c in range(N):
            if (heightMap[r][c] <= h) or (visit[r][c]):
                continue
            count += 1
            dfs(r, c, h)
    answer = max(answer, count)

print(answer)
