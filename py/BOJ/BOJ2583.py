from sys import setrecursionlimit
import sys

setrecursionlimit(10**4)
input = sys.stdin.readline
# https://www.acmicpc.net/problem/2583

M, N, K = [int(s) for s in input().strip().split(" ")]

# False : 빈 공간, True : 직사각형이 차지한 공간
area = [[False] * N for _ in range(M)]

# 지도에 직사각형이 차지하는 공간을 체크
for _ in range(K):
    # 순서대로 왼쪽아래 x, y 와 오른쪽 위 x, y
    X1, Y1, X2, Y2 = [int(s) for s in input().strip().split(" ")]
    for x in range(X1, X2):
        for y in range(Y1, Y2):
            area[y][x] = True

# DFS
surface = 0
dir = [[-1, 0], [1, 0], [0, -1], [0, 1]]
def dfs(x, y):
    global surface
    area[y][x] = True
    surface += 1

    for dx, dy in dir:
        nx, ny = x + dx, y + dy
        if nx < 0 or nx >= N or ny < 0 or ny >= M or area[ny][nx]: continue
        dfs(nx, ny)

answer = 0
surfaceArray = []
for x in range(N):
    for y in range(M):
        if not area[y][x]:
            dfs(x, y)
            answer += 1
            surfaceArray.append(surface)
            surface = 0
surfaceArray.sort()

print(answer)
print(" ".join(map(str, surfaceArray)))