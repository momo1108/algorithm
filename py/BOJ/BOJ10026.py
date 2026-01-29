import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/10026

DIR = [[1, 0], [-1, 0], [0, 1], [0, -1]]


# 다음 위치를 좌표들을 리턴
def getAdj(r, c):
    return [[r + dr, c + dc] for [dr, dc] in DIR]


N = int(input())

paintRGB = []
visitRGB = [[False] * N for _ in range(N)]

# 적록색약을 위한 배열(R,G = C)
paintCB = []
visitCB = [[False] * N for _ in range(N)]

for _ in range(N):
    row = input().rstrip()
    paintRGB.append([c for c in row])
    paintCB.append(["B" if c == "B" else "C" for c in row])


def dfs(map, visit, r, c):
    stack = []
    stack.append((r, c))
    visit[r][c] = True

    while stack:
        cr, cc = stack.pop()

        for ar, ac in getAdj(cr, cc):
            if (
                ar < 0
                or ar >= N
                or ac < 0
                or ac >= N
                or visit[ar][ac]
                or map[cr][cc] != map[ar][ac]
            ):
                continue
            stack.append((ar, ac))
            visit[ar][ac] = True


countRGB, countCB = 0, 0
for r in range(N):
    for c in range(N):
        if not visitRGB[r][c]:
            dfs(paintRGB, visitRGB, r, c)
            countRGB += 1
        if not visitCB[r][c]:
            dfs(paintCB, visitCB, r, c)
            countCB += 1

print(countRGB, countCB)
