import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/11399

N = int(input())

times = [int(_) for _ in input().split()]

times.sort()

# 정렬된 결과를 기준으로 i 번째 숫자가 N - i 번 누적된다.
# i 는 0 ~ N-1
answer = 0
for i in range(N):
    answer += times[i] * (N - i)
print(answer)
