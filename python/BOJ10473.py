import math
import sys
from heapq import *

input = sys.stdin.readline
# https://www.acmicpc.net/problem/10473

"""
시작점부터 다른 모든점까지 걸어가는 시간,
각 대포에서 다른 모든 대포와 도착점까지 가는 시간 구한다.
그래프로 만들어서 다익스트라
시작점 = 0
대포 번호 = 1 ~ n
도착점 = n + 1
"""
start = [float(a) for a in input().rstrip().split()]
end = [float(a) for a in input().rstrip().split()]

n = int(input())

cannons = []

for _ in range(n):
    cannons.append([float(a) for a in input().rstrip().split()])

graph = [[] for _ in range(n + 2)]

# 시작점부터 모든 점까지 간선 추가
for i, c in enumerate(cannons):
    graph[0].append(
        (i + 1, math.sqrt(abs(start[0] - c[0]) ** 2 + abs(start[1] - c[1]) ** 2) / 5)
    )
graph[0].append(
    (n + 1, math.sqrt(abs(start[0] - end[0]) ** 2 + abs(start[1] - end[1]) ** 2) / 5)
)

# 대포들끼리의 간선 추가
for i in range(n):
    for j in range(n):
        if i == j:
            continue
        timeToWalk = (
            math.sqrt(
                abs(cannons[i][0] - cannons[j][0]) ** 2
                + abs(cannons[i][1] - cannons[j][1]) ** 2
            )
            / 5
        )
        timeToShootAndWalk = (
            abs(
                50
                - math.sqrt(
                    abs(cannons[i][0] - cannons[j][0]) ** 2
                    + abs(cannons[i][1] - cannons[j][1]) ** 2
                )
            )
            / 5
            + 2
        )
        graph[i + 1].append((j + 1, min(timeToWalk, timeToShootAndWalk)))
        graph[j + 1].append((i + 1, min(timeToWalk, timeToShootAndWalk)))

# 모든 대포로부터 도착점까지 간선 추가
for i in range(n):
    timeToWalk = (
        math.sqrt(abs(cannons[i][0] - end[0]) ** 2 + abs(cannons[i][1] - end[1]) ** 2)
        / 5
    )
    timeToShootAndWalk = (
        abs(
            50
            - math.sqrt(
                abs(cannons[i][0] - end[0]) ** 2 + abs(cannons[i][1] - end[1]) ** 2
            )
        )
        / 5
        + 2
    )
    graph[i + 1].append((n + 1, min(timeToWalk, timeToShootAndWalk)))

minH = [(0, 0)]
dist = [1000] * (n + 2)

while minH:
    d, v = heappop(minH)

    if dist[v] < d:
        continue

    for nv, nd in graph[v]:
        if d + nd > dist[nv]:
            continue
        dist[nv] = d + nd
        heappush(minH, (dist[nv], nv))

print(dist[n + 1])
