from itertools import combinations as c
import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/15686

N, M = [int(_) for _ in input().split()]

homes = []
chickens = []

for row in range(N):
    rowData = [int(_) for _ in input().split()]
    for col in range(N):
        if rowData[col] == 1:
            homes.append([row, col])
        elif rowData[col] == 2:
            chickens.append([row, col])

answer = 10000
for chickenCombination in c(chickens, M):
    cDistance = [100] * len(homes)
    for chicken in chickenCombination:
        for i, h in enumerate(homes):
            cDistance[i] = min(
                abs(h[0] - chicken[0]) + abs(h[1] - chicken[1]), cDistance[i]
            )
    answer = min(answer, sum(cDistance))
print(answer)
