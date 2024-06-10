import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/1240

N, M = [int(a) for a in input().rstrip().split()]

tree = [[] for _ in range(N + 1)]
dist = [[0] * (N + 1) for _ in range(N + 1)]

for _ in range(N - 1):
    start, end, d = [int(a) for a in input().rstrip().split()]
    tree[start].append(end)
    tree[end].append(start)
    dist[start][end] = d
    dist[end][start] = d

answer = []
for _ in range(M):
    visit = [False] * (N + 1)
    start, end = [int(a) for a in input().rstrip().split()]

    stack = []
    stack.append((start, 0))
    visit[start] = True

    # stack 에 거리정보를 같이 저장해서 누적
    while stack:
        cur, d = stack.pop()
        if cur == end:
            answer.append(str(d))
            break

        for adj in tree[cur]:
            if visit[adj]:
                continue
            stack.append((adj, d + dist[cur][adj]))
            visit[adj] = True

print("\n".join(answer))
