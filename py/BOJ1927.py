from heapq import *
import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/1927

N = int(input())

h = []
heapify(h)

answer = []
for _ in range(N):
    num = int(input())
    if num:
        heappush(h, num)
    else:
        if h:
            answer.append(str(heappop(h)))
        else:
            answer.append("0")

print("\n".join(answer))
