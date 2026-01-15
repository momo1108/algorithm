import sys
input = sys.stdin.readline
# https://www.acmicpc.net/problem/1967

N = int(input().strip())
graph = [[] for _ in range(N + 1)]
print(graph)

for _ in range(N - 1):
    parent, child, weight = [int(_) for _ in input().strip().split(" ")]
    graph[parent].append((child, weight))

# 말단노드부터 접근하는 방식으로 해야할듯
def dfs(parent, accWeight):
    for child, weight in graph[parent]:
        dfs(child, accWeight + weight)