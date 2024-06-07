from collections import defaultdict
from functools import reduce
import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/9375

T = int(input())

"""
모든 의상 종류별로 개수를 저장한다.

상의 : 3
하의 : 2
모자 : 4

이렇게 저장하고 모든 조합을 구하기 위해 combination 을 쓰면 너무 오래걸린다.
간단한 방법으로 종류별로 입지 않는 경우 또한 하나의 경우로 포함한다.

상의 : 4
하의 : 3
모자 : 5

이렇게 하면 모든 경우의 수는 4 * 3 * 5 가 된다.
여기에는 특정 종류를 입지 않는 경우도 모두 포함되어 있다.

다만, 모두 입지 않는 경우는 문제에서 불가능하므로 전체 경우의 수에서
1을 빼주도록 하자.
"""

answer = []
for _ in range(T):
    n = int(input())

    # 의상 종류별 개수
    typeCountMap = defaultdict(int)

    for __ in range(n):
        name, clothType = input().rstrip().split()
        typeCountMap[clothType] += 1

    # 의상 종류별 개수를 reduce 를 통해 누적곱한다.
    # 누적곱 결과에 알몸인 경우를 빼준다.
    answer.append(
        str(reduce(lambda acc, x: acc * (x + 1), typeCountMap.values(), 1) - 1)
    )

print("\n".join(answer))
