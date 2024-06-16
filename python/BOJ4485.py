from heapq import *
import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/4485

"""
인접 배열 형태의 그래프를 활용한 다익스트라.
"""

T = 1
MAX = 2500
DIR = ((1, 0), (0, -1), (-1, 0), (0, 1))


def getNextVertex(r, c):
    next = []
    for dr, dc in DIR:
        if (0 <= r + dr < N) and (0 <= c + dc < N):
            next.append((r + dr, c + dc))
    return next


while True:
    try:
        N = int(input())
        answer = f"Problem {T}:"
        graph = []
        for _ in range(N):
            graph.append([int(a) for a in input().rstrip().split()])
        D = [[MAX] * N for _ in range(N)]
        D[0][0] = graph[0][0]

        h = [(D[0][0], 0, 0)]

        while h:
            w, r, c = heappop(h)

            if D[r][c] < w:
                continue
            for nr, nc in getNextVertex(r, c):
                if D[nr][nc] <= D[r][c] + graph[nr][nc]:
                    continue
                D[nr][nc] = D[r][c] + graph[nr][nc]
                heappush(h, (D[nr][nc], nr, nc))

        print(answer, D[N - 1][N - 1])
        T += 1
    except:
        break
