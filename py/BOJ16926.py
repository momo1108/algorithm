import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/16926

"""
최외각 사각형부터 회전을 완료한다.
완료되면 그 안쪽, 그 안쪽을 반복한다.
회전수 R을 사용해 현재 위치에 어떤 값을 가져올 지 판단한다.
외각 사각형의 위치별로 번호를 매기자.
좌상단부터 0, 회전 시 들어오는 숫자 방향으로 +1 씩 늘려간다.

0  1  2  3
11 0  1  4
10 3  2  5
9  8  7  6

최외각(depth=0)부터 번호(0~11)를 기준으로 같은 위치의 원본값을 저장해놓는다.
그 다음 안쪽(depth=1)으로 들어가서 번호(0~3) 기준으로 같은 위치의 원본값을 저장한다.

이 값은 실제 회전 작업을 수행하면 어떤 값을 가져올지 제공해준다.
"""
N, M, R = [int(_) for _ in input().split()]
map = []
resultMap = [[""] * M for _ in range(N)]
level = 0  # 현재 외각 사각형

for r in range(N):
    map.append(input().split())

# depth 별 번호에 맞는 원본값을 저장할 배열
numberMap = [[] for _ in range(min(N, M) // 2)]
depth = 0
while depth < (min(N, M) // 2):
    # 상변
    for col in range(depth, M - depth):
        numberMap[depth].append(map[depth][col])
    # 우변
    for row in range(depth + 1, N - depth):
        numberMap[depth].append(map[row][M - depth - 1])
    # 하변
    for col in range(M - depth - 2, depth - 1, -1):
        numberMap[depth].append(map[N - depth - 1][col])
    # 좌변
    for row in range(N - depth - 2, depth, -1):
        numberMap[depth].append(map[row][depth])
    depth += 1

# 여기서부터는 실제 회전 작업이다.
depth = 0
while depth < (min(N, M) // 2):
    number = 0
    # 지정한 번호순서대로 회전작업 수행
    # 회전 작업은 (현재 번호 + R) 위치의 원본 값을 가져오는 방식
    # 상변
    for col in range(depth, M - depth):
        index = (number + R) % len(numberMap[depth])
        map[depth][col] = numberMap[depth][index]
        number += 1
    # 우변
    for row in range(depth + 1, N - depth):
        index = (number + R) % len(numberMap[depth])
        map[row][M - depth - 1] = numberMap[depth][index]
        number += 1
    # 하변
    for col in range(M - depth - 2, depth - 1, -1):
        index = (number + R) % len(numberMap[depth])
        map[N - depth - 1][col] = numberMap[depth][index]
        number += 1
    # 좌변
    for row in range(N - depth - 2, depth, -1):
        index = (number + R) % len(numberMap[depth])
        map[row][depth] = numberMap[depth][index]
        number += 1

    depth += 1  # 안쪽 사각형으로 이동

print("\n".join([" ".join(row) for row in map]))
