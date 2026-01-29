from heapq import *
import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/10282

"""
해킹당한 컴퓨터로부터 다익스트라로 최단 경로를 구하면 감염 시간이된다.
"""

MAX = 1000000000


def dijk(start, graph):
    D = [MAX] * (n + 1)
    D[start] = 0

    minH = [(0, start)]

    while minH:
        w, v = heappop(minH)

        if D[v] < w:
            continue

        for nv, nw in graph[v]:
            if D[v] + nw < D[nv]:
                D[nv] = D[v] + nw
                heappush(minH, (D[nv], nv))

    return D


for T in range(int(input())):
    n, d, c = [int(_) for _ in input().rstrip().split()]
    graph = [[] for _ in range(n + 1)]

    for _ in range(d):
        a, b, s = [int(x) for x in input().rstrip().split()]
        graph[b].append((a, s))

    D = dijk(c, graph)

    # 최단경로가 계산된 컴퓨터들의 개수, 최대 경로
    print(len([a for a in D[1:] if a < MAX]), max([a for a in D[1:] if a < MAX]))
