from collections import deque
import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/3055

"""
물이 차는 시간을 먼저 bfs 로 저장
고슴도시를 bfs 돌리면서 물 차는 시간보다 먼저갈 수 있는지 체크
"""

global DIR
DIR = [[1, 0], [-1, 0], [0, 1], [0, -1]]


# 다음 위치를 좌표들을 리턴
def getAdj(r, c):
    return [[r + dr, c + dc] for [dr, dc] in DIR]


def init():
    global R, C
    R, C = [int(a) for a in input().split()]
    global myMap
    myMap = []
    global waterMap
    waterMap = [[9999] * C for _ in range(R)]
    global start, end
    start, end = (), ()

    # 물 차는 시간 찾기
    q = deque()
    visit = [[False] * C for _ in range(R)]

    for r in range(R):
        row = [c for c in input().rstrip()]
        for c in range(C):
            if row[c] == "*":
                q.append((r, c))
                waterMap[r][c] = 0
                visit[r][c] = True
            elif row[c] == "S":
                start = (r, c)
            elif row[c] == "D":
                end = (r, c)
        myMap.append(row)

    while q:
        cr, cc = q.popleft()

        for ar, ac in getAdj(cr, cc):
            if (
                ar < 0
                or ar >= R
                or ac < 0
                or ac >= C
                or visit[ar][ac]
                or myMap[ar][ac] == "D"
                or myMap[ar][ac] == "X"
                or waterMap[cr][cc] + 1 >= waterMap[ar][ac]
            ):
                continue
            q.append((ar, ac))
            visit[ar][ac] = True
            waterMap[ar][ac] = waterMap[cr][cc] + 1


def solution():
    visit = [[False] * C for _ in range(R)]

    # 실제 걸리는 시간 계산
    # BFS: 큐에 행, 열, 걸린 시간 저장
    q = deque()
    q.append((start[0], start[1], 0))
    visit[start[0]][start[1]] = True

    while q:
        cr, cc, time = q.popleft()

        for ar, ac in getAdj(cr, cc):
            # 못가는 곳들 제외
            if ar < 0 or ar >= R or ac < 0 or ac >= C:
                continue
            if waterMap[ar][ac] <= (time + 1) or myMap[ar][ac] == "X" or visit[ar][ac]:
                continue

            # 도착하면 시간 출력 후 종료
            if (ar, ac) == end:
                print(time + 1)
                return
            # 빈공간이면 큐에 삽입
            q.append((ar, ac, time + 1))
            visit[ar][ac] = True

    print("KAKTUS")


if __name__ == "__main__":
    init()
    solution()
