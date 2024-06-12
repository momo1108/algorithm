import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/17144

R, C, T = [int(a) for a in input().rstrip().split()]
A = []
AP = []
for _ in range(R):
    A.append([int(a) for a in input().rstrip().split()])
for r in range(R):
    for c in range(C):
        if A[r][c] == -1:
            AP.append((r, c))


def nextDir(r, c):
    return ((r - 1, c), (r + 1, c), (r, c - 1), (r, c + 1))


def dust():
    diffusion = [[0] * C for a in range(R)]

    for r in range(R):
        for c in range(C):
            if A[r][c] < 5:
                continue
            d = A[r][c] // 5
            for nr, nc in nextDir(r, c):
                if nr < 0 or nr >= R or nc < 0 or nc >= C or A[nr][nc] == -1:
                    continue
                diffusion[nr][nc] += d
                diffusion[r][c] -= d

    for r in range(R):
        for c in range(C):
            A[r][c] += diffusion[r][c]


def purify():
    for ap in AP:
        dir = (
            ((0, -1), (-1, 0), (0, 1), (1, 0))
            if ap == AP[0]
            else ((0, -1), (1, 0), (0, 1), (-1, 0))
        )
        currentDir = 0
        r, c = ap
        while True:
            nr, nc = r + dir[currentDir % 4][0], c + dir[currentDir % 4][1]
            rowCond = (nr < 0 or nr > ap[0]) if ap == AP[0] else nr < ap[0] or nr >= R
            if rowCond or nc < 0 or nc >= C:
                currentDir += 1
                continue
            if (r, c) == ap:
                r, c = nr, nc
                continue
            if (nr, nc) == ap:
                A[r][c] = 0
                break
            A[r][c] = A[nr][nc]
            r, c = nr, nc


for _ in range(T):
    dust()
    purify()

answer = 0
for r in A:
    for c in r:
        if c > 0:
            answer += c

print(answer)
