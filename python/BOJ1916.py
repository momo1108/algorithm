from heapq import *
import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/1916

"""
시작도시로부터의 최단경로를 구하는 다익스트라문제
버스가 간선 역할을 한다.
"""
N = int(input())
M = int(input())

graph = [[] for _ in range(N + 1)]
for _ in range(M):
    start, end, cost = [int(a) for a in input().rstrip().split()]
    graph[start].append((end, cost))

S, E = [int(a) for a in input().rstrip().split()]

MAX = 10000000000
D = [MAX] * (N + 1)
D[S] = 0

h = [(0, S)]

while h:
    w, v = heappop(h)

    if D[v] < w:
        continue

    for nv, nw in graph[v]:
        if D[nv] <= D[v] + nw:
            continue
        D[nv] = D[v] + nw
        heappush(h, (D[nv], nv))

print(D[E])
