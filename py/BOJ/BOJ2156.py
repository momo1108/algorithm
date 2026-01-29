import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/2156

n = int(input())
wines = [0]

for _ in range(n):
    wines.append(int(input()))

"""
dy[i][0~2] : i번째 와인을 마실 때, 이전 와인을 0잔 ~ 2잔 마신경우
dy[i][0] : i - 2번째 위치의 최대값 + 현재 와인 양
dy[i][1] : i - 1번째 위치의 이전에 아무것도 안마신 양 + 현재 와인 양
dy[i][2] : i - 1번째 위치의 이전 한잔도 마신 양(현재 와인은 못마심)
"""
dy = [[0] * 3, [wines[1]] * 3]

for i in range(2, n + 1):
    dy.append([max(dy[i - 2]) + wines[i], dy[i - 1][0] + wines[i], dy[i - 1][1]])

print(max(dy[-1]))
