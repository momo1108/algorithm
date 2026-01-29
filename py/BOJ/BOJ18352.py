from collections import deque
import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/18352

N, M, K, X = [int(_) for _ in input().rstrip().split()]

graph = [[] for _ in range(N + 1)]
visit = [False] * (N + 1)
for _ in range(M):
    start, end = [int(a) for a in input().rstrip().split()]
    graph[start].append(end)

q = deque()
answer = []

"""
bfs 큐에 정점, 거리를 저장
"""
q.append((X, 0))
visit[X] = True

while q:
    cur, dist = q.popleft()
    # 정답 도시를 추가.
    if dist == K:
        answer.append(cur)

    for adj in graph[cur]:
        if not visit[adj]:
            q.append((adj, dist + 1))
            visit[adj] = True

if answer:
    print("\n".join(map(str, sorted(answer))))
else:
    print(-1)
