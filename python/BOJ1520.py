import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/1520

M, N = [int(a) for a in input().rstrip().split()]

myMap = []

for _ in range(M):
    myMap.append([int(a) for a in input().rstrip().split()])

visit = [[False] * N for _ in range(M)]


def getNextLocation(r, c):
    return tuple(
        filter(
            lambda loc: 0 <= loc[0] < M and 0 <= loc[1] < N,
            ((r + 1, c), (r, c - 1), (r - 1, c), (r, c + 1)),
        )
    )


answer = 0
stack = []
if (
    myMap[M - 1][N - 1] < myMap[M - 2][N - 1]
    or myMap[M - 1][N - 1] < myMap[M - 1][N - 2]
):
    stack.append((0, 0))

while stack:
    cr, cc = stack.pop()
    visit[cr][cc] = True
    for nr, nc in getNextLocation(cr, cc):
        if visit[nr][nc] or myMap[nr][nc] >= myMap[cr][cc]:
            continue
        if nr == M - 1 and nc == N - 1:
            answer += 1
            continue
        stack.append((nr, nc))
    visit[cr][cc] = False

print(answer)
