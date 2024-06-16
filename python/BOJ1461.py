from heapq import *
from collections import deque
import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/1461

"""
가장 먼쪽의 책으로부터 가까운 책들을 개수만큼 묶는다.
남은 책들로 다시 반복 수행한다.

처음에 고른 책들은 편도로 계산
M 2 이상일 때, 만약 가장 먼쪽을 골랐는데 0기준 반대쪽에 있으면
그냥 0으로 와서 반납 후 다시 작업을 한다.
"""

N, M = [int(_) for _ in input().rstrip().split()]


books = [int(a) for a in input().rstrip().split()]

maxH = []

for b in books:
    heappush(maxH, (-abs(b), b > 0))

answer = 0
maxDistance = 0

while maxH:
    group = []
    temp = []
    while maxH and len(group) < M:
        size, sign = heappop(maxH)
        maxDistance = max(maxDistance, -size)
        if not group:
            group.append((size, sign))
        else:
            if group[0][1] == sign:
                group.append((size, sign))
            else:
                temp.append((size, sign))

    answer += (-group[0][0]) * 2

    for t in temp:
        heappush(maxH, t)

print(answer - maxDistance)
