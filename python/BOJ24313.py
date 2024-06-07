import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/24313

a1, a0 = [int(s) for s in input().split()]
c = int(input())
n0 = int(input())

# a1 * n + a0    <=    c * n
# n 이 최소값 n0 일때를 체크해야 한다.
# 단 a1 이 c 보다 크면 n0 일때 만족해도 더 큰 n값에서 불만족이므로 의미가 없다.
print(1 if a1 * n0 + a0 <= c * n0 and c >= a1 else 0)
