import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/14890

N, L = [int(a) for a in input().rstrip().split()]

myMap = []

for _ in range(N):
    myMap.append([int(a) for a in input().rstrip().split()])

roads = [m[:] for m in myMap]

for c in range(N):
    col = []
    for r in range(N):
        col.append(myMap[r][c])
    roads.append(col)


def canCross(road):
    # 이미 경사로를 놓은곳 표시
    hasRunway = [False] * N
    for i in range(N - 1):
        # 2칸이상 차이나면 못놓음
        if abs(road[i] - road[i + 1]) > 1:
            return False
        # 더 낮아 지는경우
        # 1칸차이면 계산
        if road[i] > road[i + 1]:
            # 경사로의 마지막 바닥 위치
            runwayEnd = i + L
            # 경사로를 놓을 길이가 안되면 pass
            if runwayEnd >= N:
                return False
            # 이미 다른 경사로 있으면 pass
            for j in range(i + 1, runwayEnd + 1):
                if hasRunway[j]:
                    return False
            # 경사로의 바닥이 모두 접하지 않으면 pass
            for j in range(i + 2, runwayEnd + 1):
                if road[i + 1] != road[j]:
                    return False
            # 설치된 경사로 위치 표시
            for j in range(i + 1, runwayEnd + 1):
                hasRunway[j] = True
        # 더 높아지는 경우
        elif road[i] < road[i + 1]:
            # 경사로의 첫번째 바닥 위치
            runwayStart = i - L + 1
            # 경사로를 놓을 길이가 안되면 pass
            if runwayStart < 0:
                return False
            # 이미 다른 경사로 있으면 pass
            for j in range(runwayStart, i + 1):
                if hasRunway[j]:
                    return False
            # 경사로의 바닥이 모두 접하지 않으면 pass
            for j in range(runwayStart, i):
                if road[i] != road[j]:
                    return False
            # 설치된 경사로 위치 표시
            for j in range(runwayStart, i + 1):
                hasRunway[j] = True
    return True


answer = 0
for road in roads:
    if canCross(road):
        answer += 1
print(answer)
