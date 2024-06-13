import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/8911


def moveTurtle(command):
    """
    커맨드별로 방향전환과 이동을 구현하고, 이동종료 후 방향별
    최대 거리를 찾아서 넓이를 계산한다.
    """
    x, y = 0, 0
    xSet, ySet = set([0]), set([0])
    DIR = ((-1, 0), (0, 1), (1, 0), (0, -1))
    dirIndex = 0

    for c in command:
        if c == "F":
            x += DIR[dirIndex][0]
            y += DIR[dirIndex][1]
            xSet.add(x)
            ySet.add(y)
        elif c == "B":
            x -= DIR[dirIndex][0]
            y -= DIR[dirIndex][1]
            xSet.add(x)
            ySet.add(y)
        elif c == "L":
            dirIndex = (dirIndex - 1) % 4
        else:
            dirIndex = (dirIndex + 1) % 4
    return (max(xSet) - min(xSet)) * (max(ySet) - min(ySet))


answer = []
for _ in range(int(input())):
    command = input().rstrip()
    answer.append(moveTurtle(command))
print(*answer, sep="\n")
