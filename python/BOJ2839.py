import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/2839

"""
3키로 적은 경우와, 5키로 적은 겨우 중 봉지수가 더 적은 경우에
+1 을 하면 현재 무게의 최소 봉지수가 된다.
"""

N = int(input())

dy = [9999] * 5001
dy[3] = 1
dy[5] = 1

for n in range(6, N + 1):
    dy[n] = min(dy[n - 3], dy[n - 5]) + 1

print(dy[N] if dy[N] < 9999 else -1)
