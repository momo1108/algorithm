from heapq import *
import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/1715

"""
이 문제도 전체 카드 묶기 횟수를 최소화 하기 위해,
매번 카드 묶기마다 최소 카드뭉치 2개를 묶어야 한다.
카드뭉치 개수가 같으면 전체를 묶기위한 뭉치 선택 횟수는 똑같은데,
한번 비교가 된 카드뭉치들의 개수가 총 비교회수에 누적되기 때문된다.
이때문에 전체를 최소화하기 위해서는 앞에서 더해지는 비교회수를 최소화
해야한다.
그 방법은 가장 작은 카드뭉치만 선택하는 것이다.

heap 에 전체 카드뭉치를 넣고, 최소 2개를 pop 한 후, 더한 값을 push
heap 이 비면 마지막으로 뽑은게 최종 비교횟수가 된다.

시간 복잡도는 카드뭉치를 모두 넣는데 NlogN = 1700000
총 묶기를 N - 1 번 하고, 총 2번 pop, 1번 push 넉넉잡아서
(N-1)(3*logN) = 3NlogN = 5100000
시간이 충분하다~
"""

h = []
heapify(h)

N = int(input())

# 모두 넣기
for _ in range(N):
    heappush(h, int(input()))

# 2개씩 빼서 비교회수 더하고 뭉친 개수 넣기
answer = 0
for _ in range(N - 1):
    c1 = heappop(h)
    c2 = heappop(h)
    answer += c1 + c2
    heappush(h, c1 + c2)
print(answer)
