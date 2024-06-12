import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/4673

"""
10000까지의 숫자에 대해서 셀프 넘버 검증 작업을 하면?
시간 너무 오래걸리네

어떻게 할까? 1부터 순서대로 1씩 증가하며 d 작업을 수행하는데
어짜피 10000이하의 셀프넘버를 찾아야하니 결과가 10000넘으면 스톱
"""

isSelf = [True] * 10001

for n in range(1, 10000):
    d = n + (n // 1000 % 10) + (n // 100 % 10) + (n // 10 % 10) + (n % 10)
    if d <= 10000:
        isSelf[d] = False

answer = []
for i in range(1, 10001):
    if isSelf[i]:
        answer.append(i)

print(*answer, sep="\n")
