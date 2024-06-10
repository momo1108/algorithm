from collections import deque
import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/7569

ROWD = [1, -1, 0, 0, 0, 0]
COLD = [0, 0, 1, -1, 0, 0]
HEIGHTD = [0, 0, 0, 0, 1, -1]
M, N, H = [int(a) for a in input().split()]

tomato = []

for h in range(H):
    tomatoFloor = []
    for n in range(N):
        tomatoFloor.append([int(a) for a in input().split()])
    tomato.append(tomatoFloor)


def solution():
    q = deque()

    # 0인 토마토의 개수를 미리 세어놔서 예외처리에 사용
    zeroCount = 0
    for h in range(H):
        for r in range(N):
            for c in range(M):
                # 모든 칸에 대해서 1은 큐에 저장
                if tomato[h][r][c] == 1:
                    q.append((r, c, h))
                # 0인 토마토는 개수 카운트
                elif tomato[h][r][c] == 0:
                    zeroCount += 1

    # 안익은 토마토가 없다면 0 출력 후 종료
    if zeroCount == 0:
        print(0)
        return

    answer = 0
    while q:
        r, c, h = q.popleft()
        # 최대 날짜 기록
        answer = max(answer, tomato[h][r][c])

        for d in range(6):
            nr, nc, nh = ROWD[d] + r, COLD[d] + c, HEIGHTD[d] + h
            if (
                nr < 0
                or nr >= N
                or nc < 0
                or nc >= M
                or nh < 0
                or nh >= H
                or tomato[nh][nr][nc] != 0
            ):
                continue
            q.append((nr, nc, nh))
            # 토마토 익은 날짜 갱신
            tomato[nh][nr][nc] = tomato[h][r][c] + 1
            # 익은 토마토 개수 감소
            zeroCount -= 1

    print(-1 if zeroCount else answer - 1)


if __name__ == "__main__":
    solution()
