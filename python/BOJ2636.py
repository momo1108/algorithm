from collections import deque
import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/2636


N, M = [int(a) for a in input().rstrip().split()]
cheeseMap = []

for _ in range(N):
    cheeseMap.append([int(a) for a in input().rstrip().split()])

cheeseCount = 0
for r in range(N):
    for c in range(M):
        if cheeseMap[r][c] == 1:
            cheeseCount += 1


def getNextLocation(r, c):
    return tuple(
        filter(
            lambda loc: 0 <= loc[0] < N and 0 <= loc[1] < M,
            ((r + 1, c), (r, c - 1), (r - 1, c), (r, c + 1)),
        )
    )


def meltBfs():
    """
    치즈가 아니라 바깥쪽 0을 BFS 로 돌리면 되겠네!
    매 시간마다 0 을 bfs 를 돌려서 마주치는 1을 0으로 바꾼다.
    지워야할 1의 위치들은 set에 저장한다.
    이때, 행 * 100 + 열 의값으로 저장하면 될듯
    """
    q = deque()
    visit = [[False] * M for _ in range(N)]
    q.append((0, 0))
    visit[0][0] = True
    cheeseSet = set()

    while q:
        r, c = q.popleft()

        for nr, nc in getNextLocation(r, c):
            if visit[nr][nc]:
                continue

            if cheeseMap[nr][nc] == 1:
                cheeseSet.add(nr * 100 + nc)
            else:
                q.append((nr, nc))
            visit[nr][nc] = True

    return cheeseSet


def groupBfs(r, c, visit):
    """
    치즈 개수가 0이 되기 직전 시간에 치즈 개수를 카운트
    """
    q = deque()
    q.append((r, c))
    visit[r][c] = True
    count = 1

    while q:
        cr, cc = q.popleft()

        for nr, nc in getNextLocation(cr, cc):
            if visit[nr][nc] or cheeseMap[nr][nc] == 0:
                continue
            q.append((nr, nc))
            visit[nr][nc] = True
            count += 1

    return count


time = 0
lastCheeseCount = 0
while True:
    # 매시간마다 녹이기고 시간누적
    cheeseSet = meltBfs()
    time += 1

    # 다 녹기 직전이면 치즈개수 카운트 후 break
    if len(cheeseSet) == cheeseCount:
        groupVisit = [[False] * M for _ in range(N)]
        for r in range(N):
            for c in range(M):
                if groupVisit[r][c] or cheeseMap[r][c] == 0:
                    continue
                lastCheeseCount += groupBfs(r, c, groupVisit)
        break
    # 치즈가 더 남았으면 치즈를 녹이자
    else:
        for location in cheeseSet:
            r, c = location // 100, location % 100
            cheeseMap[r][c] = 0
        cheeseCount -= len(cheeseSet)

print(time)
print(lastCheeseCount)
