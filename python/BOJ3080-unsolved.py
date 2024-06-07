import sys
import functools
from collections import defaultdict
from itertools import permutations as p

input = sys.stdin.readline

N = int(input())
names = []

for _ in range(N):
    names.append(f" {input().rstrip()}")

names.sort()

"""
같은 그룹 문자열인 슬라이스는 무조건 하나의 요소 인식되어야 한다.
예를 들어 특정 슬라이스의 그룹 문자열별 개수가 다음과 같다 가정하자

A    AB    ABC    AB     AC    A    B
3    2      5     3      4     1    4
           5P5
    |   6P6 * 5P5   |
    |   6P6 * 5P5   |   4P4  |
|  6P6 * (6P6 * 5P5) * 4P4       | 4P4 |
| 2P2 * (6P6 * (6P6 * 5P5) * 4P4) * 4P4 |

따라서 현재 순열 개수와 이전에 있었던 순열 개수들이 곱해져야 한다.

정답 개수는 global 로 누적하게 해놓고?

그룹 문자열이 연장될 때마다 재귀가 들어가고,
줄어들 때 줄어들기 전 순열개수를 정답에 누적곱 해준다.
"""
answer = 1
checkIndex = 1


def findPrefix(s1, s2):
    print(f'"{s1}"', f'"{s2}"')
    length = min(len(s1), len(s2))
    for i in range(length):
        if s1[i] != s2[i]:
            return s1[: i - 1]
    return s1[:length]


groupCount = defaultdict(int)
index = 0
prefix = " "
while index < N:
    if index + 1 < N:
        prefix = findPrefix(names[index], names[index + 1])
    groupCount[prefix] += 1
    index += 1


def factorial(num):
    return functools.reduce(lambda x, y: x * y, range(1, num + 1), 1)


def rec(index, prefix):
    groupCount = 1
    result = 1
    while index < N:
        newPrefix = findPrefix(names[index], names[index + 1])
        print(index, f'"{prefix}"', f'"{newPrefix}"')
        if prefix != newPrefix:
            if newPrefix.startswith(prefix):
                index, nextResult = rec(index, newPrefix)
                result *= nextResult
            else:
                return index + 1, result * factorial(groupCount)
        else:
            groupCount += 1
            index += 1
    return index, result * factorial(groupCount)


print(rec(0, " "))
