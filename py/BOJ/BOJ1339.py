import sys
from collections import defaultdict

input = sys.stdin.readline
# https://www.acmicpc.net/problem/1339

# 합을 최대로 만들기 위해 각 대문자별로 높은 숫자를 배정할 기준으로 weight 를 설정한다.
# weight 는 설정하는 기준
# 1. 높은 자릿수인가
# 2. 자릿수가 같은 경우 개수가 많은가
# 이를 만족하도록 10 ^ 자릿수 의 weight 를 대문자별로 누적한다.

N = int(input())

words = []

for _ in range(N):
    words.append(input().rstrip())

weightDict = defaultdict(int)
for word in words:
    for i, alpha in enumerate(word[::-1]):
        weightDict[alpha] += 10**i

sortedWeightArray = sorted(
    list(zip(weightDict.values(), weightDict.keys())), reverse=True
)
answer = 0
max = 9
for weight, alpha in sortedWeightArray:
    answer += weight * max
    max -= 1

print(answer)
