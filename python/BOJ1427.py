import sys
from collections import defaultdict

input = sys.stdin.readline
# https://www.acmicpc.net/problem/1427

N = input().strip()
decimalDict = defaultdict(int)

for n in N:
    decimalDict[int(n)] += 1

answerArray = []

for d in range(9, -1, -1):
    answerArray.append(str(d)*decimalDict[d])

print("".join(answerArray))