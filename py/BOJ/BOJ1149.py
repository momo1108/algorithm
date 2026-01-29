import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/1149

"""
n 번째 집을 칠하는 최소 비용 dy[n]
dy[n][0] = n번째 집을 빨간색칠했을때 n번째까지의 최소비용
dy[n][1] = n번째 집을 초록색칠했을때 n번째까지의 최소비용
dy[n][2] = n번째 집을 파란색칠했을때 n번째까지의 최소비용
n - 1 번째 집까지의 비용 중 다른 색깔이면서 최소인 경우 선택
"""

N = int(input())

dy = [[0, 0, 0] for _ in range(N + 1)]

for n in range(1, N + 1):
    nthCost = [int(a) for a in input().rstrip().split()]
    for color in range(3):
        dy[n][color] = (
            min(*[dy[n - 1][i] for i in range(3) if i != color]) + nthCost[color]
        )

print(min(*dy[N]))
