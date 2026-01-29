from heapq import *
import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/1238

"""
학생들의 왕복 시간을 구해야 한다.
마을 기준으로 최단 거리로 방문하는 거리 다익스트라 + 
마을 기준으로 최단 거리로 귀가하는 거리 다익스트라
방문 거리는 파티가 일어나는 마을에서 간선을 역추적해서 구한다
귀가는 방향 그대로 사용한다.
"""
MAX = 10000000
N, M, X = [int(a) for a in input().rstrip().split()]
graph = [[] for _ in range(N + 1)]
graphReverse = [[] for _ in range(N + 1)]
for _ in range(M):
    start, end, weight = [int(a) for a in input().rstrip().split()]
    graph[start].append((end, weight))
    graphReverse[end].append((start, weight))


def dijk(graph):
    D = [MAX] * (N + 1)
    D[X] = 0

    minH = [(0, X)]

    while minH:
        w, v = heappop(minH)

        if D[v] < w:
            continue

        for nv, nw in graph[v]:
            if D[nv] <= w + nw:
                continue
            D[nv] = w + nw
            heappush(minH, (D[nv], nv))

    return D


dVisit = dijk(graphReverse)
dReturn = dijk(graph)

dResult = [dVisit[i] + dReturn[i] for i in range(0, N + 1)]

print(max(dResult[1:]))
