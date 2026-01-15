import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/5582

S1 = input().rstrip()
S2 = input().rstrip()

dy = [[0] * len(S2) for _ in range(len(S1))]

answer = 0
for i1, s1 in enumerate(S1):
    for i2, s2 in enumerate(S2):
        if s1 == s2:
            dy[i1][i2] = dy[i1 - 1][i2 - 1] + 1 if i1 * i2 >= 1 else 1
            answer = max(answer, dy[i1][i2])

print(answer)
