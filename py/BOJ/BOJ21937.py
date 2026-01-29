import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/21937

N, M = [int(a) for a in input().rstrip().split()]

"""
문제에서 주어지는 마지막 작업 X의 사전작업들을 알아야 한다.
끝에서부터 이전작업을 추적하기 위해서는 후작업에서 전작업으로 그래프가
이어져야 한다.
"""

graph = [[] for _ in range(N + 1)]
visit = [False] * (N + 1)

for _ in range(M):
    start, end = [int(a) for a in input().rstrip().split()]
    # 역추적을 위해, 뒤에서 앞으로 단방향 그래프 생성
    graph[end].append(start)

X = int(input())

stack = []
stack.append(X)
visit[X] = True

answer = set()
while stack:
    cur = stack.pop()

    for adj in graph[cur]:
        if visit[adj]:
            continue
        stack.append(adj)
        visit[adj] = True
        answer.add(adj)

print(len(answer))
