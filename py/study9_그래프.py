"""
1. 그래프
그래프는 정점과 간선의 집합
정점 - 하나의 특별한 개체
간선 - 두 정점을 연결하는 선. 방향이나 비중을 가질 수 있다.

구현은 2가지
인접 배열, 인접 리스트
정점이 N 개라고 했을 때,
1. 인접 배열
N * N 크기의 배열로 정점들간의 간선정보를 배열로 표현
배열의 내부에는 정점들이 교차하는 지점에 간선 값을 작성
Ex) 3 * 3 배열(정점 1, 2 연결, 정점 2, 3 연결)
정점 1  2  3
  1  0  1  0
  2  1  0  2
  3  0  2  0

2. 인접 리스트
N 길이의 배열에 각 정점들에 연결된 간선 정보만 저장하는 배열을 넣는다
Ex) 정점 4개의 인접리스트(정점 1 - 2, 2 - 3, 1 - 3, 4 - 1 연결)
정점
  1 [2, 3, 4]
  2 [1, 3]
  3 [1, 2]
  4 [1]
"""

# 연습문제
# https://www.acmicpc.net/problem/1260
N, M, V = [int(x) for x in input().split()]
graph = [[] for _ in range(N + 1)]
visit = [False] * (N + 1)

for _ in range(M):
    start, end = [int(x) for x in input().rstrip().split()]
    graph[start].append(end)
    graph[end].append(start)

for i in range(N):
    graph[i + 1].sort()


def dfs(node):
    visit[node] = True
    result = str(node)

    for next in graph[node]:
        if visit[next]:
            continue
        result = " ".join([result, dfs(next)])

    return result


print(dfs(V))

from collections import deque

visit = [False] * (N + 1)


def bfs(node):
    q = deque()
    q.append(node)
    visit[node] = True
    result = str(node)

    while q:
        cur = q.popleft()

        for next in graph[cur]:
            if visit[next]:
                continue
            q.append(next)
            visit[next] = True
            result = " ".join([result, str(next)])

    return result


print(bfs(V))
