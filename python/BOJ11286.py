from heapq import *
import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/11286

h = []
heapify(h)

"""
힙에 튜플을 사용하면 첫번째 요소가 비교 대상이 된다.

따라서 이런 형태로 힙을 사용하자.
(절대값 * 2 + (양수면 1, 음수면 0), 원본 값)
"""

answer = []
for _ in range(int(input())):
    x = int(input())
    valueToCompare = abs(x) * 2 + (1 if x > 0 else 0)
    if x:
        heappush(h, (valueToCompare, x))
    else:
        if h:
            answer.append(str(heappop(h)[1]))
        else:
            answer.append("0")

print("\n".join(answer))
