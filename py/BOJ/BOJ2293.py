import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/2293

"""
https://www.acmicpc.net/problem/9084 와 똑같은 문제인듯
"""
n, k = [int(a) for a in input().rstrip().split()]

coins = []
for _ in range(n):
    coins.append(int(input()))

dy = [0] * (k + 1)
dy[0] = 1

for c in coins:
    for price in range(1, k + 1):
        if price >= c:
            dy[price] += dy[price - c]

print(dy[k])
