import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/1051

N, M = [int(_) for _ in input().split()]
map = []

for r in range(N):
    line = [c for c in input().rstrip()]
    map.append(line)


def solution():
    maxSize = min(N, M)
    # 최대 사이즈부터 가능한지 모든 위치 체크
    while maxSize > 1:
        offset = maxSize - 1
        for startRow in range(0, N - offset):
            for startCol in range(0, M - offset):
                if (
                    map[startRow][startCol]
                    == map[startRow + offset][startCol]
                    == map[startRow][startCol + offset]
                    == map[startRow + offset][startCol + offset]
                ):
                    print(maxSize**2)
                    return
        maxSize -= 1
    print(1)


if __name__ == "__main__":
    solution()
