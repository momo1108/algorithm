import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/25195

N, M = [int(a) for a in input().rstrip().split()]

"""
시작 정점부터 팬이 없는곳만 골라서 끝까지 갈 수 있으면 yes 이다.
간선도 적고 DAG 이므로 visit이 따로 필요없다
"""


def solution():
    graph = [[] for _ in range(N + 1)]
    for _ in range(M):
        start, end = [int(a) for a in input().rstrip().split()]
        graph[start].append(end)

    S = int(input())
    hidden = [int(a) for a in input().rstrip().split()]

    stack = []
    stack.append(1)

    # 시작부터 만나면 바로 리턴
    if 1 in hidden:
        print("Yes")
        return

    answer = "Yes"
    while stack:
        cur = stack.pop()

        # 끝까지 간 경우 안만난것
        if not graph[cur]:
            answer = "yes"
            break

        for adj in graph[cur]:
            # 다음 경로 중 팬 없는곳으로만
            if adj not in hidden:
                stack.append(adj)

    print(answer)


if __name__ == "__main__":
    solution()
