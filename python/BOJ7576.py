from collections import deque
import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/7576


def solution():
    DIR = ((-1, 0), (0, 1), (1, 0), (0, -1))
    M, N = [int(_) for _ in input().rstrip().split()]

    box = []

    for _ in range(N):
        box.append([int(t) for t in input().rstrip().split()])

    q = deque()
    nomatoCount = 0
    for r in range(N):
        for c in range(M):
            if box[r][c] == 1:
                q.append((r, c))
            elif box[r][c] == 0:
                nomatoCount += 1

    answer = 0
    while q:
        r, c = q.popleft()
        answer = max(answer, box[r][c])

        for dr, dc in DIR:
            if 0 <= r + dr < N and 0 <= c + dc < M and box[r + dr][c + dc] == 0:
                q.append((r + dr, c + dc))
                box[r + dr][c + dc] = box[r][c] + 1
                nomatoCount -= 1

    if nomatoCount > 0:
        print(-1)
        return

    print(answer - 1)


if __name__ == "__main__":
    solution()
