import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/16918

R, C, N = [int(a) for a in input().rstrip().split()]

init = []

for r in range(R):
    init.append([c for c in input().rstrip()])

full = [["O"] * C for _ in range(R)]

"""
1초 이후 짝수초에는 전체 타일에 폭탄에 깔린다.
홀수초에는 2초전에 있었던 폭탄이 터진 후 나머지 폭탄만 남는다.
따라서 홀수초의 폭탄 배치는 2초 간격으로 뒤집히고, 4초 간격으로 반복된다.
"""
DIR = ((-1, 0), (1, 0), (0, -1), (0, 1))

reverse1 = [["O"] * C for _ in range(R)]

for r in range(R):
    for c in range(C):
        if init[r][c] == "O":
            reverse1[r][c] = "."
            for dr, dc in DIR:
                if 0 <= r + dr < R and 0 <= c + dc < C:
                    reverse1[r + dr][c + dc] = "."


reverse2 = [["O"] * C for _ in range(R)]

for r in range(R):
    for c in range(C):
        if reverse1[r][c] == "O":
            reverse2[r][c] = "."
            for dr, dc in DIR:
                if 0 <= r + dr < R and 0 <= c + dc < C:
                    reverse2[r + dr][c + dc] = "."

if N <= 1:
    for r in init:
        print(*r, sep="")
elif N % 2 == 0:
    for r in full:
        print(*r, sep="")
else:
    if N % 4 == 1:
        for r in reverse2:
            print(*r, sep="")
    else:
        for r in reverse1:
            print(*r, sep="")
