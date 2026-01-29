import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/1063

"""
명령 최대 50번
브루트포스로 가자
체스판의 행, 열범위를 0~7로 가정
행 순서는 체스판 그대로
"""
king, stone, N = input().rstrip().split()
king = (int(king[1]) - 1, ord(king[0]) - ord("A"))
stone = (int(stone[1]) - 1, ord(stone[0]) - ord("A"))
commandMap = {
    "R": (0, 1),
    "L": (0, -1),
    "B": (-1, 0),
    "T": (1, 0),
    "RT": (1, 1),
    "LT": (1, -1),
    "RB": (-1, 1),
    "LB": (-1, -1),
}


def outOfBoard(r, c):
    return r < 0 or r > 7 or c < 0 or c > 7


for _ in range(int(N)):
    c = input().rstrip()
    nk = (king[0] + commandMap[c][0], king[1] + commandMap[c][1])
    # 돌쪽으로 간 경우
    if nk == stone:
        ns = (nk[0] + commandMap[c][0], nk[1] + commandMap[c][1])
        if outOfBoard(*ns):
            continue
        else:
            king = nk
            stone = ns
    # 돌이 없는 경우
    else:
        if outOfBoard(*nk):
            continue
        else:
            king = nk

print(f"{chr(king[1] + 65)}{king[0]+1}")
print(f"{chr(stone[1] + 65)}{stone[0]+1}")
