from heapq import *
import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/15903

"""
문제의 핵심은 카드 합체를 얼마나 작게 하느냐이다.

왜냐하면 합체의 핵심은 두 카드의 합으로 두 카드를 덮어쓰는 개념인데,
이 과정에서 전체 합을 따져보면 원래 두 카드의 합만큼 늘어난다.
그렇기 때문에, 모든 합체에서 가장 작은 수 2개를 합치는 게
최종적으로 전체 카드 수의 합이 최소가 되는 방식이다.

시간 복잡도는 O(nlogn) + O(4*logm) + O(n)
= 10000 + 4*14 + 1000
넉넉하다
"""

n, m = [int(_) for _ in input().split()]

cards = [int(_) for _ in input().split()]
heapify(cards)

for _ in range(m):
    c1 = heappop(cards)
    c2 = heappop(cards)
    heappush(cards, c1 + c2)
    heappush(cards, c1 + c2)

print(sum(cards))
