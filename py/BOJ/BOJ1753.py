from heapq import *
import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/1753

V, E = [int(a) for a in input().rstrip().split()]
K = int(input())
graph = [[] for _ in range(V + 1)]

for _ in range(E):
    start, end, weight = [int(a) for a in input().rstrip().split()]
    graph[start].append((end, weight))

D = [9999999] * (V + 1)
D[K] = 0

minH = [(0, K)]

while minH:
    w, u = heappop(minH)

    if D[u] <= w:
        continue

    for v, w in graph[u]:
        if D[v] <= D[u] + w:
            continue
        D[v] = D[u] + w
        heappush(minH, (D[v], v))

print(*[d if d < 9999999 else "INF" for d in D[1:]], sep="\n")
