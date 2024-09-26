import sys
from collections import deque

input = sys.stdin.readline
# https://www.acmicpc.net/problem/2206

N, M = [int(_) for _ in input().split()]

graph = []

for _ in range(N):
    graph.append([int(_) for _ in input().rstrip()])


def bfs():
    # 벽을 부쉈는지 여부는 숫자 0, 1 로 표현한다.
    # 안부순경우 : 0, 부순경우 : 1
    DIR = ((-1, 0), (0, 1), (1, 0), (0, -1))
    visit = [[[False] * M for _ in range(N)] for _ in range(2)]  # 벽부수기, 행, 열

    q = deque()
    q.append((0, 0, 1, 0))  # 행, 열, 이동 횟수, 벽을 부쉈는가?
    visit[0][0][0] = True

    while q:
        r, c, count, didBreak = q.popleft()
        if r == (N - 1) and c == (M - 1):
            return count

        for dr, dc in DIR:
            nr, nc = r + dr, c + dc
            if nr < 0 or nr >= N or nc < 0 or nc >= M or visit[didBreak][nr][nc]:
                continue

            if didBreak:
                if graph[nr][nc] == 1:
                    continue
                q.append((nr, nc, count + 1, 1))
                visit[1][nr][nc] = True
            else:
                if graph[nr][nc] == 1:
                    q.append((nr, nc, count + 1, 1))
                    visit[1][nr][nc] = True
                else:
                    q.append((nr, nc, count + 1, 0))
                    visit[0][nr][nc] = True

    return -1


print(bfs())
