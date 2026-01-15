import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/1863_test

"""
이분탐색으로 최대 중량을 찾아가는 문제인가?
최대중량이 가능한지 체크할 때는 dfs 로 하면 될듯...
시간복잡도는 이분탐색 시간 * dfs 시간
(log C) * (N + M) = 30 * 110000 = 3300000
"""

N, M = [int(a) for a in input().rstrip().split()]
graph = [[] for a in range(N + 1)]
for _ in range(M):
    A, B, C = [int(a) for a in input().rstrip().split()]
    graph[A].append((B, C))
    graph[B].append((A, C))
start, end = [int(a) for a in input().rstrip().split()]


def reachable(weight, start, end):
    stack = []
    visit = [False] * (N + 1)
    stack.append(start)
    visit[start] = True

    while stack:
        cur = stack.pop()
        if cur == end:
            return True

        for adj, w in graph[cur]:
            if weight > w or visit[adj]:
                continue
            visit[adj] = True
            stack.append(adj)

    return False


left, right = 1, 1000000000
answer = -1
while left <= right:
    mid = (left + right) // 2

    if reachable(mid, start, end):
        left = mid + 1
        answer = mid
    else:
        right = mid - 1

print(answer)
