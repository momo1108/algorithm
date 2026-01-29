import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/1874

n = int(input())

array = []
for _ in range(n):
    array.append(int(input()))
array.reverse()

stack = []
answer = []

for i in range(1, n + 1):
    answer.append("+")
    # 함수로 체크
