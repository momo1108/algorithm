import sys
from collections import defaultdict

input = sys.stdin.readline
# https://www.acmicpc.net/problem/2143

"""
각 배열의 모든 부배열의 합에 대해 개수를 카운팅하여 { 부배열합 : 부배열개수 } 형태로 저장한다.
각 배열의 부배열의 갯수는 최대 SUM(1~1000) = 500500 개 이다.
이후 가능한 부배열합의 목록만 체크하여, 첫번째 부배열의 합에따라 T 를 만들 수 있는 두번째 부배열의 합이 있는지 체크 후 갯수를 곱하여 경우의 수를 누적한다.
"""

T = int(input())

n = int(input())
A = [int(a) for a in input().rstrip().split()]

m = int(input())
B = [int(b) for b in input().rstrip().split()]

subA_Dict = defaultdict(int)
for start in range(n):
    total = 0
    for index in range(start, n):
        total += A[index]
        subA_Dict[total] += 1

answer = 0
for start in range(m):
    total = 0
    for index in range(start, m):
        total += B[index]
        answer += subA_Dict[T - total]

print(answer)
