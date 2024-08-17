import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/10799

stickCount = 0

S = input().rstrip()

answer = 0
for i, s in enumerate(S):
    if s == "(":
        stickCount += 1
    else:
        stickCount -= 1
        if S[i - 1] == "(":
            answer += stickCount
        else:
            answer += 1

print(answer)
