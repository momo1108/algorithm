import sys
from collections import defaultdict
input = sys.stdin.readline
# https://www.acmicpc.net/problem/1316

N = int(input())
answer = 0

for _ in range(N):
    isGroupWord = True
    wordMap = defaultdict(bool)
    word = input().strip()

    alpha = 'none'
    for w in word:
        if alpha != w:
            alpha = w
            if wordMap[w]:
                isGroupWord = False
                break
            else:
                wordMap[w] = True
    
    if isGroupWord:
        answer += 1

print(answer)