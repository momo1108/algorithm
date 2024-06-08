import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/3079

"""
로직은?
각 심사대별로 걸리는 시간이 존재
예를 들어서
1번 2번 3번 4번 5번
3   7   4  10   9
일 때
어디로 들어가야하는지 결정할 때는, 심사대별로
이전 사람까지 쌓인 심사 시간 + 내 심사 시간 이 가장 적은 곳으로 간다.
근데 이건 너무 오래걸리고....

새로운 방법이 생각났다.
정답에 사용될 전체 걸린 시간을 범위로 잡고 이분탐색을 하면 될듯하다.
전체 걸린 시간을 각 심사대별로 1명 심사 시간으로 나누면,
전체 시간 내에 심사대별로 몇명 심사할 수 있는지 알 수 있다.
이를 모두 더했을 때, 요구 인원수인 M 이상이면서 최소인 시간을 찾으면된다
"""

N, M = [int(_) for _ in input().split()]
T = []

for _ in range(N):
    T.append(int(input()))


def checkTime(totalTime):
    return sum([totalTime // t for t in T]) >= M


left, right = 1, 10**18
answer = -1

while left <= right:
    mid = (left + right) // 2
    if checkTime(mid):
        answer = mid
        right = mid - 1
    else:
        left = mid + 1

print(answer)
