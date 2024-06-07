import sys
from collections import deque

input = sys.stdin.readline
# https://www.acmicpc.net/problem/1021

N, M = [int(_) for _ in input().split()]

A = [int(_) for _ in input().split()]

dq = deque(range(1, N + 1))

answer = 0

for indexToFind in A:
    while True:
        # 찾으면 빼고 다음 숫자로
        if dq[0] == indexToFind:
            dq.popleft()
            break
        # 못찾으면 짧은쪽으로 회전
        else:
            i = dq.index(indexToFind)
            if i <= len(dq) - i:
                dq.rotate(-i)
                answer += i
            else:
                dq.rotate(len(dq) - i)
                answer += len(dq) - i

print(answer)
