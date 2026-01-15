import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/2606

n = int(input())
graph = [[] for _ in range(n + 1)]
for _ in range(int(input())):
    start, end = [int(node) for node in input().rstrip().split()]
    graph[start].append(end)
    graph[end].append(start)

visited = [False] * (n + 1)


# 스택으로 dfs 구현
def dfs(idx):
    stack = []
    count = 0
    stack.append(idx)
    visited[idx] = True

    while stack:
        # 시작, 인접컴퓨터마다 바이러스 카운트
        cur = stack.pop()
        count += 1

        for adj in graph[cur]:
            if not visited[adj]:
                stack.append(adj)
                visited[adj] = True

    return count


print(dfs(1) - 1)
