import sys
import time
from copy import deepcopy

input = sys.stdin.readline
# https://www.acmicpc.net/problem/21610

DIR = ((0, -1), (-1, -1), (-1, 0), (-1, 1), (0, 1), (1, 1), (1, 0), (1, -1))
N, M = [int(a) for a in input().rstrip().split()]
waterMap = []

for _ in range(N):
    waterMap.append([int(a) for a in input().rstrip().split()])

visit = [[False] * N for _ in range(N)]
currentClouds = [[N - 2, 0], [N - 2, 1], [N - 1, 0], [N - 1, 1]]
for _ in range(M):
    direction, dist = [int(a) for a in input().rstrip().split()]

    # 1. 구름 이동
    for i in range(len(currentClouds)):
        currentClouds[i][0] = (currentClouds[i][0] + DIR[direction - 1][0] * dist) % N
        currentClouds[i][1] = (currentClouds[i][1] + DIR[direction - 1][1] * dist) % N

    # 2. 비내리기
    for cloudR, cloudC in currentClouds:
        waterMap[cloudR][cloudC] += 1

    # 3. 구름 사라지기
    visit = [[False] * N for _ in range(N)]
    for r, c in currentClouds:
        visit[r][c] = True

    # 4. 2번과정 위치에서 물복사버그 시전(맵밖은 제외)
    for cloudR, cloudC in currentClouds:
        # 대각선방향 체크
        for d in DIR[1::2]:
            nr, nc = cloudR + d[0], cloudC + d[1]
            # 맵밖은 제외
            if nr < 0 or nr >= N or nc < 0 or nc >= N:
                continue
            # 물이 있으면 복사
            if waterMap[nr][nc]:
                waterMap[cloudR][cloudC] += 1

    # 5. 물 양 2 이상인 곳에 구름 생성 후 물 2 감소(직전 구름 위치는 제외)
    currentClouds = []
    for r in range(N):
        for c in range(N):
            if waterMap[r][c] < 2 or visit[r][c]:
                continue
            currentClouds.append([r, c])
            waterMap[r][c] -= 2


answer = 0
for r in waterMap:
    for c in r:
        answer += c
print(answer)
