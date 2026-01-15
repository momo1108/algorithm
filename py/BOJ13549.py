from collections import deque
import sys
input = sys.stdin.readline
# https://www.acmicpc.net/problem/13549

timeArray = [999999] * 200001
N, K = [int(_) for _ in input().strip().split(" ")]
timeArray[N] = 0

def bfs():
    queue = deque()
    queue.append((N, 0)) # (현재 위치, 걸린 시간)

    while len(queue) > 0:
        location, time = queue.popleft()
        nextLocations = [location - 1, location + 1, location * 2]
        if (nextLocations[0] >= 0) and (time + 1 < timeArray[nextLocations[0]]):
            queue.append((nextLocations[0], time + 1))
            timeArray[nextLocations[0]] = time + 1
        if (nextLocations[1] <= 200000) and (time + 1 < timeArray[nextLocations[1]]):
            queue.append((nextLocations[1], time + 1))
            timeArray[nextLocations[1]] = time + 1
        if (nextLocations[2] <= 200000) and (time < timeArray[nextLocations[2]]):
            queue.append((nextLocations[2], time))
            timeArray[nextLocations[2]] = time

bfs()
print(timeArray[K])