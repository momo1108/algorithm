from heapq import *
import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/5972

"""
다익스트라 문제인듯?
1번 헛간부터 N번 헛간까지의 최단거리
"""
N, M = [int(a) for a in input().rstrip().split()]

dist = [999999999] * (N + 1)
dist[1] = 0
h = [(0, 1)]

graph = [[] for _ in range(N + 1)]

for _ in range(M):
    start, end, cost = [int(a) for a in input().rstrip().split()]
    graph[start].append((end, cost))
    graph[end].append((start, cost))

while h:
    cost, node = heappop(h)

    if dist[node] < cost:
        continue

    for nextNode, nextCost in graph[node]:
        if cost + nextCost >= dist[nextNode]:
            continue
        dist[nextNode] = cost + nextCost
        heappush(h, (dist[nextNode], nextNode))

print(dist[N])
