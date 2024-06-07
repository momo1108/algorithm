import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/1519

"""
Dy[n]: n에서 선공으로 이길 수 있는가?
Yes) Dy[n] = int(최소 부분 문자열)
No) Dy[n] = -1
n의 진 부분 문자열을 x 라 할때, Dy[n - x] = -1 이면 가능, 자연수면 불가능
"""

Dy = [-1] * 1000001
N = int(input())


def properSubStrLoop(n):
    numStr = str(n)
    maxLen = len(numStr)
    properSubStrSet = set()
    for length in range(1, maxLen):
        for start in range(maxLen):
            if start + length > maxLen:
                break
            if numStr[start] == "0":
                continue
            properSubStrSet.add(int(numStr[start : start + length]))

    for pss in sorted(list(properSubStrSet)):
        if Dy[n - pss] < 0:
            Dy[n] = pss
            return


for n in range(10, N + 1):
    properSubStrLoop(n)

print(Dy[N])
