import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/2012

"""
예상 등수를 오름차순으로 정렬하고, 앞에서부터 1등, 2등, ... 지정
오차만큼 정답에 누적한다.
"""
N = int(input())

arr = []
for _ in range(N):
    arr.append(int(input()))

arr.sort()

answer = 0
for i in range(1, N + 1):
    answer += abs(i - arr[i - 1])

print(answer)
