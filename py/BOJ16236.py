from collections import deque
import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/16236

"""
물고기를 먹을 시점마다 먹을 수 있는 물고기별 거리를 구한다.
물고기를 먹은 후 다시 똑같이 거리를 구한다.
만약 크기가 커진 경우라면 먹을 수 있는 물고기를 다시 구한다.
먹을 물고기를 구하는 방식은 최소힙에 저장해서 꺼내는 방식으로 한다.
최소힙에 저장될 데이터는 다음과 같다 - (거리, 행, 열)
"""
N = int(input())
myMap = []
for _ in range(N):
    myMap.append([int(a) for a in input().rstrip().split()])

shark = [0, 0]
sharkSize = 2
eatCount = 0
fish = {size: [] for size in range(1, 7)}
for r in range(N):
    for c in range(N):
        if myMap[r][c] == 9:
            shark = [r, c]
            myMap[r][c] = 0
        elif myMap[r][c] != 0:
            fish[myMap[r][c]].append((r, c))


def getNext(r, c):
    return tuple(
        filter(
            lambda loc: 0 <= loc[0] < N and 0 <= loc[1] < N,
            ((r - 1, c), (r, c - 1), (r, c + 1), (r + 1, c)),
        )
    )


def bfs():
    global shark
    global myMap
    q = deque()
    visit = [[False] * N for _ in range(N)]
    q.append((shark[0], shark[1], 0))
    visit[shark[0]][shark[1]] = True
    prays = []
    minTime = 99999

    while q:
        r, c, time = q.popleft()

        for nr, nc in getNext(r, c):
            if myMap[nr][nc] > sharkSize or visit[nr][nc]:
                continue
            if 0 < myMap[nr][nc] < sharkSize:
                if not prays:
                    minTime = time + 1
                    prays.append((nr, nc))
                elif time + 1 <= minTime:
                    prays.append((nr, nc))
            visit[nr][nc] = True
            q.append((nr, nc, time + 1))
    if prays:
        prays.sort()
        shark = prays[0]
        myMap[prays[0][0]][prays[0][1]] = 0
        return minTime
    else:
        return 0


time = 0
while True:
    timeToPray = bfs()
    if timeToPray:
        eatCount += 1
        time += timeToPray
    else:
        break

    if eatCount == sharkSize:
        sharkSize += 1
        eatCount = 0
print(time)
