import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/2512

N = int(input())
M = [int(a) for a in input().rstrip().split()]
T = int(input())


def checkBudget(b):
    """
    예산에 맞춰서 지방 예산의 총합이 국가예산 이하인지 체크한다.
    """
    total = 0
    for m in M:
        total += m if m <= b else b
    return total <= T


"""
이분탐색으로 최대 예산을 찾아낸다.
이분탐색의 최대값은 받은 지방의 예산요청 중 최대값으로 설정한다.
"""
left, right = 0, max(M)
mid = (left + right) // 2
answer = 0

while left <= right:
    mid = (left + right) // 2

    if checkBudget(mid):
        left = mid + 1
        answer = mid
    else:
        right = mid - 1

print(answer)
