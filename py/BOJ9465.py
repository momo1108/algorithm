import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/9465

for _ in range(int(input())):
    n = int(input())
    sticker = []
    for _ in range(2):
        sticker.append([int(a) for a in input().rstrip().split()])
    """
    dy[i][0~2]: i 열의 0번째, 1번째 스티커를 뗀 경우, 안뗀경우 최대점수
    """
    dy = [[0, 0, 0] for _ in range(n)]
    dy[0] = [sticker[0][0], sticker[1][0], 0]
    for i in range(1, n):
        dy[i][0] = max(dy[i - 1][1], dy[i - 1][2]) + sticker[0][i]
        dy[i][1] = max(dy[i - 1][0], dy[i - 1][2]) + sticker[1][i]
        dy[i][2] = max(dy[i - 1][0], dy[i - 1][1], dy[i - 1][2])
    print(max(dy[n - 1]))
