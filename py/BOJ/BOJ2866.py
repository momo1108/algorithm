import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/2866

R, C = [int(_) for _ in input().split()]
table = []

for r in range(R):
    row = input().rstrip()
    table.append(row)


def checkPossible(rowStart):
    words = set()
    # 열별 단어를 찾아서 세트에 저장
    for c in range(C):
        word = ""
        for currentRow in range(rowStart, R):
            word += table[currentRow][c]
        words.add(word)
    # 중복 단어가 있으면 정지
    if len(words) < C:
        return False
    else:
        return True


# 지울수 있는 행의 최대를 찾기위해
# 이분 탐색을 진행하여 upperbound 를 찾는다.
Left, Right = 1, R - 1
Middle = (Left + Right) // 2

while Left <= Right:
    Middle = (Left + Right) // 2
    if checkPossible(Middle):
        Left = Middle + 1
    else:
        Right = Middle - 1

print(Left - 1)
