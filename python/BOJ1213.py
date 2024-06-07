from collections import defaultdict
import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/1213

name = input().rstrip()

alphaCount = defaultdict(int)

pairCount = 0
for char in name:
    alphaCount[char] += 1
    if (alphaCount[char] % 2) == 0:
        pairCount += 1

if pairCount < len(name) // 2:
    # 알파벳 쌍의 개수가 모자란 경우 실패
    print("I'm Sorry Hansoo")
else:
    alphas = list(alphaCount.keys())
    alphas.sort()
    # 이름 길이가 홀수인 경우, 가운데에 들어갈 알파벳은 홀수개인 알파벳이다.
    lastChar = ""
    beforeMidArray = []

    for alpha in alphas:
        if alphaCount[alpha] % 2 == 1:
            lastChar = alpha
        # 완성될 팰린드롬 문자열의 중앙 전을 나타낼 배열
        beforeMidArray.append(alpha * (alphaCount[alpha] // 2))

    answer = "".join(beforeMidArray)
    print(answer + lastChar + answer[::-1])
