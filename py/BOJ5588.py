import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/5588

m = int(input())
zodiac = []
for i in range(m):
    zodiac.append([int(s) for s in input().split()])

n = int(input())
stars = []
for _ in range(n):
    stars.append([int(s) for s in input().split()])

for x, y in stars:
    answerFound = True
    offsetX, offsetY = x - zodiac[0][0], y - zodiac[0][1]

    for zx, zy in zodiac:
        if [zx + offsetX, zy + offsetY] not in stars:
            answerFound = False
            break

    if answerFound:
        print(f"{offsetX} {offsetY}")
        break
