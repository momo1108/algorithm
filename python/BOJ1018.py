import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/1018

N, M = [int(_) for _ in input().split()]
map = []

for r in range(N):
    line = [c for c in input().rstrip()]
    map.append(line)


def checkRepaint(row, col):
    count = [0, 0]  # 첫번째칸 W 혹은 B 인 케이스의 페인트칠수
    for r in range(row, row + 8):
        for c in range(col, col + 8):
            if (r + c) % 2:
                if map[r][c] == "W":
                    count[0] += 1
                else:
                    count[1] += 1
            else:
                if map[r][c] == "B":
                    count[0] += 1
                else:
                    count[1] += 1
    return min(*count)


def solution():
    answer = 999999
    for r in range(0, N - 7):
        for c in range(0, M - 7):
            # 모든 시작점에 대해 최소 횟수 체크
            answer = min(answer, checkRepaint(r, c))
            if answer == 0:
                print(0)
                return
    print(answer)


if __name__ == "__main__":
    solution()
