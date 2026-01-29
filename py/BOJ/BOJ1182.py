from itertools import combinations as c
import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/1182

"""
20개 숫자배열의 모든 부분수열(조합)의 개수는 1048575개 이다.
브루트포스로 돌리자.
"""
N, S = [int(a) for a in input().rstrip().split()]
arr = [int(a) for a in input().rstrip().split()]

answer = 0
for length in range(1, N + 1):
    # combinations 로 부분수열을 길이별 찾기
    for subArr in c(arr, length):
        if sum(subArr) == S:
            answer += 1
print(answer)
