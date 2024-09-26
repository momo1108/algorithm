import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/11404

n = int(input())
m = int(input())

graph = [[10000000] * n for _ in range(n)]

for city in range(n):
    graph[city][city] = 0

for _ in range(m):
    a, b, c = [int(a) for a in input().rstrip().split()]
    graph[a - 1][b - 1] = min(graph[a - 1][b - 1], c)

for mid in range(n):
    for a in range(n):
        for b in range(n):
            if a == mid or b == mid or a == b:
                continue
            graph[a][b] = min(graph[a][mid] + graph[mid][b], graph[a][b])

answer = []

for start in range(n):
    answer.append(
        " ".join(["0" if cost >= 10000000 else str(cost) for cost in graph[start]])
    )

print("\n".join(answer))
