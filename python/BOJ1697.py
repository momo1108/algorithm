from collections import deque
import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/1697

N, K = [int(a) for a in input().rstrip().split()]

"""
모든 위치별로 최단 도달 시간을 저장한다.
방법은 bfs 로 간선은 갈 수 있는 점이 된다.
만약 저장된 최소 시간이 더 짧으면 생략
"""

dist = [999999] * 100001

q = deque()
visit = [False] * 1000001


def bfs():
    q.append((N, 0))
    visit[N] = True
    dist[N] = 0

    while q:
        x, d = q.popleft()

        for ax in [x - 1, x + 1, x * 2]:
            if ax < 0 or ax > 100000 or visit[ax] or dist[ax] <= d + 1:
                continue
            q.append((ax, d + 1))
            visit[ax] = True
            dist[ax] = d + 1


bfs()
print(dist[K])
