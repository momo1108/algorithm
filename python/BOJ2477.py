import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/2477

"""
가로 세로의 제일 긴 선의 양옆을 보았을 때,
더 짧은 쪽으로 2번 가면 비어있는 공간의 가로, 세로가 된다.
"""

K = int(input())
maxInfo = {"x": [0, 0], "y": [0, 0]}  # 최대 가로세로의 [index, value]
emptyInfo = {"x": 0, "y": 0}  # 빈 공간의 가로세로 길이
map = []

# 최대 가로세로 정보 찾기
for i in range(6):
    map.append([int(num) for num in input().split()])
    if map[i][0] < 3 and map[i][1] > maxInfo["x"][1]:
        maxInfo["x"] = [i, map[i][1]]

    if map[i][0] > 2 and map[i][1] > maxInfo["y"][1]:
        maxInfo["y"] = [i, map[i][1]]

# 빈 공간의 가로세로 찾기
# 음수 인덱싱은 되지만, 양수는 범위를 넘어는것을 방지해야함
if map[maxInfo["x"][0] - 1][1] < map[(maxInfo["x"][0] + 1) % 6][1]:
    emptyInfo["x"] = map[maxInfo["x"][0] - 2][1]
else:
    emptyInfo["x"] = map[(maxInfo["x"][0] + 2) % 6][1]

if map[maxInfo["y"][0] - 1][1] < map[(maxInfo["y"][0] + 1) % 6][1]:
    emptyInfo["y"] = map[maxInfo["y"][0] - 2][1]
else:
    emptyInfo["y"] = map[(maxInfo["y"][0] + 2) % 6][1]

print((maxInfo["x"][1] * maxInfo["y"][1] - emptyInfo["x"] * emptyInfo["y"]) * K)
