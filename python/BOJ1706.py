from im import fileInput as input
import sys

# input = sys.stdin.readline
# https://www.acmicpc.net/problem/1706

R, C = [int(_) for _ in input().split()]
map = []
words = []
rowWords = [""] * R
colWords = [""] * C

for r in range(R):
    row = input().rstrip()
    # 각 행에서 2글자 이상 단어를 추가한다.
    rowWords[r] = [*filter(lambda s: len(s) > 1, row.split("#"))]
    map.append(row)
    words += rowWords[r]

    for c in range(C):
        if row[c] == "#":
            # 열 단어가 중간에 막히면 길이 체크 후 저장한다.
            if len(colWords[c]) > 1:
                words.append(colWords[c])
            colWords[c] = ""
        else:
            colWords[c] += row[c]
            # 마지막 행까지 봤으면 길이 체크 후 저장한다.
            if r == (R - 1) and len(colWords[c]) > 1:
                words.append(colWords[c])
words.sort()
print(words[0])
