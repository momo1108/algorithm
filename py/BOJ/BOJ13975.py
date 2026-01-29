from heapq import *
import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/13975

"""
한번 합체시마다 파일 하나가 줄어들고, 총 장수 K - 1번 합체한다.
이 때, 합체에 사용된 원본 파일 크기는 합체에 사용된 횟수만큼 누적된다.
따라서, 가장 작은 파일을 많이 합치는게 중요하다.
매 합치는 시점에서 최소값을 골라야 한다.
최소 힙을 사용하자.
"""


T = int(input())

result = []
for _ in range(T):
    K = int(input())
    h = [int(a) for a in input().rstrip().split()]
    heapify(h)
    answer = 0
    for _ in range(K - 1):
        c1, c2 = heappop(h), heappop(h)
        heappush(h, c1 + c2)
        answer += c1 + c2

    result.append(answer)

print(*result, sep="\n")
