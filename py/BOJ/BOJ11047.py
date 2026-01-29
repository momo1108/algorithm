import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/11047

"""
최대값 동전부터 사용할 수 있는만큼 사용하고 그 다음 비싼 동전으로 넘어간다
위 작업을 K원을 만들때 까지 반복한다.
"""
N, K = [int(a) for a in input().rstrip().split()]

A = []

for _ in range(N):
    A.append(int(input()))

answer = 0
for a in A[::-1]:
    answer += K // a
    K %= a
    if K == 0:
        break
print(answer)
