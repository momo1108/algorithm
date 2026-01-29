import sys
import math

input = sys.stdin.readline
# https://www.acmicpc.net/problem/1244

N = int(input())

# 0번에 dummy 데이터 추가.
switches = [-999, *[int(_) for _ in input().split()]]

Q = int(input())

for _ in range(Q):
    gender, number = [int(s) for s in input().split()]

    # 여자인 경우
    if gender - 1:
        width = 1
        switches[number] = (switches[number] + 1) % 2
        maxWidth = min(number - 1, N - number)
        while width <= maxWidth:
            if switches[number - width] == switches[number + width]:
                switches[number - width] = (switches[number - width] + 1) % 2
                switches[number + width] = (switches[number + width] + 1) % 2
                width += 1
            else:
                break
    # 남자인 경우
    else:
        multiply = 1
        while number * multiply <= N:
            switches[number * multiply] = (switches[number * multiply] + 1) % 2
            multiply += 1

# 20개씩 잘라서 출력
for lineIndex in range(math.ceil(N / 20)):
    start = lineIndex * 20 + 1
    switches20 = switches[start : start + 20]
    print(" ".join([str(_) for _ in switches20]))
