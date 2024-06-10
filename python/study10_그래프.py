"""
그래프의 탐색 방법

1. DFS
한 노드에서 인접한 노드에서 갈 수 있는 노드들을 모두 탐색한 뒤, 
다른 인접노드를 탐색
"""

n = 5
graph = [[] for _ in range(n + 1)]
graph[1].append(2)
graph[1].append(4)
graph[2].append(4)
graph[4].append(1)
graph[4].append(5)
graph[5].append(3)

"""
스택을 사용한 구현법부터 알아보자.
"""

visited = [False] * (n + 1)


def dfs1(index):
    stack = []
    stack.append(index)
    visited[index] = True

    while stack:
        cur = stack.pop()
        print("visit", cur)
        for adj in graph[cur]:
            if not visited[adj]:
                stack.append(adj)
                visited[adj] = True


dfs1(1)


"""
재귀함수를 이용한 구현
- 파이썬의 경우 재귀의 깊이가 1000번으로 제한이 되어있다.
더 깊은 재귀가 필요하면 다음과 같은 모듈이 필요하다.
from sys import setrecursionlimit
setrecursionlimit(10 ** 6)
"""
visited = [False] * (n + 1)


def dfs2(index):
    visited[index] = True
    print("visit", index)

    for adj in graph[index]:
        if not visited[adj]:
            dfs2(adj)


dfs2(1)


"""
2. BFS
한 노드에서 가까운 노드부터 차례대로 탐색하는 방법.
거리순으로 탐색하기 때문에, 같은 가중치를 가진 간선들로만 이루어지면 최단거리에 사용할 수 있다.
"""
from collections import deque

visited = [False] * (n + 1)


def bfs(index):
    q = deque()
    q.append(index)
    visited[index] = True

    while q:
        cur = q.popleft()
        print("visit", cur)

        for adj in graph[cur]:
            if not visited[adj]:
                q.append(adj)
                visited[adj] = True


bfs(1)

"""
연습문제
https://www.acmicpc.net/problem/2606
"""

n = int(input())
graph = [[] for _ in range(n + 1)]
for _ in range(int(input())):
    start, end = [int(node) for node in input().rstrip().split()]
    graph[start].append(end)
    graph[end].append(start)

visited = [False] * (n + 1)


def dfs(idx):
    stack = []
    count = 0
    stack.append(idx)
    visited[idx] = True

    while stack:
        cur = stack.pop()
        count += 1

        for adj in graph[cur]:
            if not visited[adj]:
                stack.append(adj)
                visited[adj] = True

    return count


print(dfs(1) - 1)

"""
연습문제
https://www.acmicpc.net/problem/1012
"""


T = int(input())

result = []
for t in range(T):
    DIR = ((-1, 0), (0, 1), (1, 0), (0, -1))
    M, N, K = [int(_) for _ in input().rstrip().split()]
    map = [[False] * M for _ in range(N)]
    visit = [[False] * M for _ in range(N)]

    for _ in range(K):
        col, row = [int(a) for a in input().rstrip().split()]
        map[row][col] = True

    def dfs(row, col):
        stack = []
        stack.append((row, col))
        visit[row][col] = True

        while stack:
            r, c = stack.pop()

            for dr, dc in DIR:
                if (
                    0 <= r + dr < N
                    and 0 <= c + dc < M
                    and map[r + dr][c + dc]
                    and not visit[r + dr][c + dc]
                ):
                    stack.append((r + dr, c + dc))
                    visit[r + dr][c + dc] = True

    answer = 0
    for row in range(N):
        for col in range(M):
            if map[row][col] and not visit[row][col]:
                dfs(row, col)
                answer += 1

    result.append(str(answer))

print("\n".join(result))


"""
연습문제
https://www.acmicpc.net/problem/7576
"""
