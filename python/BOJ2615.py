import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/2615

directions = [
    [[-1, 0], [1, 0]],
    [[1, -1], [-1, 1]],
    [[0, -1], [0, 1]],
    [[-1, -1], [1, 1]],
]

map = []

for _ in range(19):
    map.append([int(_) for _ in input().split()])


def checkBoard(row, col, color):
    if row < 0 or row >= 19 or col < 0 or col >= 19:
        return False
    else:
        if map[row][col] == color:
            return True
        else:
            return False


def solution():
    for r in range(19):
        for c in range(19):
            if map[r][c] == 0:
                continue
            color = map[r][c]

            count = 1
            location = [r, c]

            for twoWay in directions:
                count = 1
                location = [r, c]
                for i, way in enumerate(twoWay):
                    nextR, nextC = r + way[0], c + way[1]
                    while checkBoard(nextR, nextC, color):
                        count += 1
                        if i == 0:
                            location = [nextR, nextC]
                        nextR += way[0]
                        nextC += way[1]
                if count == 5:
                    print(color)
                    print(location[0] + 1, location[1] + 1)
                    return

    print(0)


if __name__ == "__main__":
    solution()
