import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/1074

N, r, c = [int(_) for _ in input().split()]


"""
행 열 중 최대값이 2^x 이상 2^x+1 미만 범위에 들어가는지가 기준이 될듯
5행 3열 => 5행 = 2^2 이상 2^3 미만이므로 전체 행, 열 범위를
0 ~ 2^3 미만으로 제한
여기서 열만 절반(2^x = 2^2) 이상이면 
전체 카운트에 직전 블록 개수(2^2 * 2^2 = 16) 추가
행만 절반(2^2) 이상이면
전체 카운트에 직전 블록 개수 2개(2^2 * 2^2 * 2 = 32) 추가
둘다 절반(2^2) 이상이면
전체 카운트에 직전 블록 개수 3개(2^2 * 2^2 * 3 = 48) 추가.
이 작업을 함수화하여 재귀적으로 남은 작은 블록을 파고든다.
"""


def checkBox(r, c, x):
    count = 0
    formerBlock = (2**x) ** 2
    if r >= 2**x and c >= 2**x:
        count += formerBlock * 3
    elif r >= 2**x:
        count += formerBlock * 2
    elif c >= 2**x:
        count += formerBlock

    if x == 0:
        return r * 2 + c
    else:
        return count + checkBox(r % (2**x), c % (2**x), x - 1)


x = 0
maxIndex = max(r, c)
for exp in range(1, 15):
    if maxIndex >= 2**exp:
        x = exp
    else:
        break

if x == 0:
    print(r * 2 + c)
else:
    print(checkBox(r, c, x))
