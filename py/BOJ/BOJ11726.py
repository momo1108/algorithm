import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/11726

"""
가로 축을 기준으로 위치 N 까지 채우는 방법은 다음과 같다.
1. 마지막을 2x1 로 채우는 방법
 - N - 1 위치까지 채우는 방법의 개수와 같다.
2. 마지막과 그 전 칸까지 1x2 두개를 위아래로 채우는 방법
 - N - 2 위치까지 채우는 방법의 개수와 같다.

dy[n] = dy[n-1] + dy[n-2]
"""
N = int(input())
dy = [0] * 1001
dy[1] = 1
dy[2] = 2
for n in range(3, N + 1):
    dy[n] = dy[n - 1] + dy[n - 2]
    dy[n] %= 10007

print(dy[N])
