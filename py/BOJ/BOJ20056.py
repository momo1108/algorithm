from collections import defaultdict
import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/20056

DIR = ((-1, 0), (-1, 1), (0, 1), (1, 1), (1, 0), (1, -1), (0, -1), (-1, -1))

N, M, K = [int(a) for a in input().rstrip().split()]

fbArr = []

for _ in range(M):
    r, c, m, s, d = [int(a) for a in input().rstrip().split()]

    fbArr.append((r - 1, c - 1, m, s, d))

for _ in range(K):
    # 1. 파이어볼 이동
    fbArr = [
        (
            (r + DIR[d][0] * s) % N,
            (c + DIR[d][1] * s) % N,
            m,
            s,
            d,
        )
        for r, c, m, s, d in fbArr
    ]

    mapDict = defaultdict(list)
    for r, c, m, s, d in fbArr:
        mapDict[r * N + c].append((m, s, d))

    # 2. 합치기
    fbArr = []
    for i, fbs in mapDict.items():
        if len(fbs) > 1:
            m = sum([fb[0] for fb in fbs]) // 5
            if m == 0:
                continue
            s = sum([fb[1] for fb in fbs]) // len(fbs)
            dArr = [0, 2, 4, 6]
            if len(fbs) > 1:
                for next in range(1, len(fbs)):
                    if (fbs[next][2] % 2) != (fbs[next - 1][2] % 2):
                        dArr = [1, 3, 5, 7]
                        break
            for d in dArr:
                fbArr.append((i // N, i % N, m, s, d))
        else:
            fbArr.append((i // N, i % N, fbs[0][0], fbs[0][1], fbs[0][2]))

print(sum([fb[2] for fb in fbArr]))
