from heapq import *
import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/1417

"""
max heap 사용하면 간단할듯?
자신을 제외한 후보들 득표수를 max heap 에 넣고,
pop 된 값이 자신 득표수보다 작아질 때 까지 표를 하나씩 뺏어온다.
시간복잡도도 뺏어오기를 최대 설정해도 (2*log100) * 49 * 100
대충 17만?
"""

others = []
heapify(others)

N = int(input())
dasom = int(input())

# 자신을 제외한 후보들 득표수를 max heap 에 넣고
for _ in range(N - 1):
    heappush(others, -int(input()))

if N == 1:
    print(0)
else:
    answer = 0
    # pop 된 값이 자신 득표수보다 작아질 때 까지 표를 하나씩 뺏어온다.
    while True:
        otherMax = -heappop(others)
        if otherMax >= dasom:
            dasom += 1
            answer += 1
            heappush(others, -otherMax + 1)
        else:
            break
    print(answer)
