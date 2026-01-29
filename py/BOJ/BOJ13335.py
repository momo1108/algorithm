import sys
from collections import deque

input = sys.stdin.readline
# https://www.acmicpc.net/problem/13335

n, w, L = [int(a) for a in input().rstrip().split()]
trucks = deque([int(a) for a in input().rstrip().split()])

onBridge = deque([[trucks.popleft(), w]])
time = 1


def getCurrentL():
    """
    현재 다리 위의 무게를 출력합니다.
    """
    return sum([t[0] for t in onBridge])


def moveTrucksOnBridge():
    """
    다리 위의 트럭을 한번 움직인다.
    """
    for i in range(len(onBridge)):
        onBridge[i][1] -= 1
    if onBridge[0][1] <= 0:
        onBridge.popleft()


"""
남은 트럭이 존재하는 동안 1초 간격으로 계속 체크한다.
"""
while trucks:
    if onBridge:
        moveTrucksOnBridge()
        if (getCurrentL() + trucks[0]) <= L:
            onBridge.append([trucks.popleft(), w])
    else:
        onBridge.append([trucks.popleft(), w])
    time += 1
time += w  # 마지막 트럭이 지나가는 시간도 누적
print(time)
