import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/1012

T = int(input())

result = []
DIR = ((-1, 0), (0, 1), (1, 0), (0, -1))
for t in range(T):
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
