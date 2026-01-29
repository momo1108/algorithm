import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/2573

N, M = [int(a) for a in input().rstrip().split()]

glacierMap = []
visit = [[False] * M for _ in range(N)]

for _ in range(N):
    glacierMap.append([int(s) for s in input().rstrip().split()])

"""
매년마다 dfs 돌면서, 그룹의 개수를 카운팅
개수가 2개 이상일 때 정지 후 년도 출력
모두 0이 되면 0 출력
"""


def getNextLocation(r, c):
    return ((r + 1, c), (r, c - 1), (r - 1, c), (r, c + 1))


def dfs(r, c):
    stack = []
    stack.append((r, c))
    visit[r][c] = True

    while stack:
        cr, cc = stack.pop()

        for nr, nc in getNextLocation(cr, cc):
            if visit[nr][nc] or glacierMap[nr][nc] == 0:
                continue
            stack.append((nr, nc))
            visit[nr][nc] = True


def getNextYearMap():
    nextGlacierMap = [[0] * M for _ in range(N)]

    for r in range(1, N - 1):
        for c in range(1, M - 1):
            glacier = glacierMap[r][c]
            for nr, nc in getNextLocation(r, c):
                if glacierMap[nr][nc] == 0:
                    glacier -= 1
            nextGlacierMap[r][c] = max(glacier, 0)

    return nextGlacierMap


year = 0
while True:
    visit = [[False] * M for _ in range(N)]
    glacierMap = getNextYearMap()
    year += 1

    groupCount = 0
    for r in range(1, N - 1):
        for c in range(1, M - 1):
            if glacierMap[r][c] == 0 or visit[r][c]:
                continue
            dfs(r, c)
            groupCount += 1

    if groupCount > 1:
        break
    elif groupCount == 0:
        year = 0
        break

print(year)
