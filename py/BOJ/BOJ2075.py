from heapq import *
import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/2075

"""
첫번째 행은 모두 삽입한다.
두번재 행부터 삽입하면서 최소값 N개를 빼자.
그럼 어짜피 2N개 중 최대값 N개는 남아있는다
이런식으로 체크하면 1개행씩 누적하며 최소값들을
제외하는 것이기 대문에, 마지막에는 최대값 5개만 남아있을 것이다.

남아있는 최대값 5개 중 pop을 하면 N번째 최대값이 나온다.
"""

N = int(input())

h = []
heapify(h)

for c in [int(value) for value in input().split()]:
    heappush(h, c)

for _ in range(1, N):
    row = [int(value) for value in input().split()]
    for c in row:
        heappush(h, c)
    for c in row:
        heappop(h)

print(heappop(h))
